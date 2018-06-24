'use strict';

require('reflect-metadata');
const _ = require('lodash');

const StatusError = require('./src/exception/status-error');
const ControllerHandler = require('./src/handler/controller-handler');
const MethodHandler = require('./src/handler/method-handler');

const ctMap = new Map();
const ctHandler = new ControllerHandler();
const methodHandler = new MethodHandler(ctMap);

const EggShell = (app, options) => {
  const { router, jwt } = app;
  // 设置全局路由前缀
  if (options && options.prefix) {
    router.prefix(options.prefix);
  }

  for (const c of ctMap.values()) {
    // 解析控制器元数据
    let { ignoreJwtAll, beforeAll, afterAll, prefix } = ctHandler.getMetada(c.constructor);
    const propertyNames = _.filter(Object.getOwnPropertyNames(c), pName => {
      return pName !== 'constructor' && pName !== 'pathName' && pName !== 'fullPath';
    });

    // 解析前缀
    const fullPath = c.fullPath;
    const rootPath = 'controller/';
    prefix = prefix || fullPath.substring(fullPath.indexOf(rootPath) + rootPath.length).replace('.js', '').replace('.ts', '');
    prefix = prefix.startsWith('/') ? prefix : '/' + prefix;

    for (const pName of propertyNames) {
      // 解析函数元数据
      const { reqMethod, path, before, after, message, ignoreJwt } = methodHandler.getMetada(c[pName]);
      const befores = [ ...beforeAll, ...before ];
      const afters = [ ...afterAll, ...after ];
      const routerCb = async ctx => {
        const instance = new c.constructor(ctx);
        for (const before of befores) {
          await before(ctx, instance);
        }
        try {
          const result = await instance[pName](ctx);
          if (options.quickStart) {
            ctx.response.body = {
              success: true,
              message,
              data: result,
            };
          }
        } catch (error) {
          if (options.quickStart) {
            ctx.response.status = error.status || 500;
            ctx.response.body = {
              success: false,
              message: error.message,
            };
          }
        }
        for (const after of afters) {
          await after(ctx, instance);
        }
      };

      if (ignoreJwt || ignoreJwtAll) {
        router[reqMethod](prefix + path, routerCb);
      } else {
        if (jwt) {
          router[reqMethod](prefix + path, jwt, routerCb);
        } else {
          router[reqMethod](prefix + path, routerCb);
        }
      }
    }
  }
};

module.exports = {
  EggShell,
  StatusError,

  Get: methodHandler.get(),
  Post: methodHandler.post(),
  Put: methodHandler.put(),
  Delete: methodHandler.delete(),
  Patch: methodHandler.patch(),
  Options: methodHandler.options(),
  Head: methodHandler.head(),

  Before: methodHandler.before(),
  After: methodHandler.after(),
  Message: methodHandler.message(),
  IgnoreJwt: methodHandler.ignoreJwt(),

  IgnoreJwtAll: ctHandler.ignoreJwtAll(),
  BeforeAll: ctHandler.beforeAll(),
  AfterAll: ctHandler.afterAll(),
  Prefix: ctHandler.prefix(),
};
