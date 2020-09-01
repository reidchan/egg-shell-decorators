"use strict";

require("reflect-metadata");
const { filter } = require("lodash");
const ControllerHandler = require("./handler/controller-handler");
const MethodHandler = require("./handler/method-handler");

const { PARAM_INFO, BODY, QUERY, HEADER } = require("./decorators/symbols");

const ctMap = new Map();
const ctHandler = new ControllerHandler();
const methodHandler = new MethodHandler(ctMap);
const { validateSync } = require("class-validator");
const { plainToClass } = require("class-transformer");

const EggShell = (app) => {
  const { router } = app;

  for (const c of ctMap.values()) {
    // 解析控制器元数据
    let { prefix } = ctHandler.getMetada(c.constructor);
    const propertyNames = filter(Object.getOwnPropertyNames(c), (pName) => {
      return (
        pName !== "constructor" && pName !== "pathName" && pName !== "fullPath"
      );
    });

    // 解析前缀
    const fullPath = c.fullPath
      .split("\\")
      .join("/")
      .replace(/[\/]{2,9}/g, "/")
      .replace(/(\.ts)|(\.js)/g, "");
    const rootPath = "controller/";
    prefix =
      prefix ||
      fullPath.substring(fullPath.indexOf(rootPath) + rootPath.length);
    prefix = prefix.startsWith("/") ? prefix : "/" + prefix;

    for (const pName of propertyNames) {
      // 解析函数元数据
      const { reqMethod, path, middlewares } = methodHandler.getMetada(
        c[pName]
      );

      // eslint-disable-next-line no-loop-func
      const routerCb = async (ctx) => {
        const instance = new c.constructor(ctx);
        try {
          ctx.body = ctx.request ? ctx.request.body : null;

          const params = Reflect.getMetadata(PARAM_INFO, instance, pName);

          return await instance[pName].apply(
            instance,
            params.map((param) => {
              if (!param) return undefined;
              switch (param.extract) {
                case BODY:
                  const containerClass = plainToClass(
                    param.typeInfo,
                    ctx.request.body
                  );

                  const errors = validateSync(containerClass);
                  if (errors.length) {
                    throw new Error(errors);
                  }
                  return containerClass;
                case QUERY:
                  return ctx.request.query[param.key] || undefined;
                case HEADER:
                  return (
                    ctx.request.headers[param.key.toLowerCase()] || undefined
                  );
                default:
                  return undefined;
              }
            })
          );
        } catch (error) {
          throw error;
        }
      };
      router[reqMethod](prefix + path, ...middlewares, routerCb);
    }
  }
};

module.exports = {
  EggShell,

  Body: require("./decorators/Body"),
  Query: require("./decorators/Query"),
  Header: require("./decorators/Header"),

  Get: methodHandler.get(),
  Post: methodHandler.post(),
  Put: methodHandler.put(),
  Delete: methodHandler.delete(),
  Patch: methodHandler.patch(),
  Options: methodHandler.options(),
  Head: methodHandler.head(),
  Middleware: methodHandler.middleware(),

  Prefix: ctHandler.prefix(),
};
