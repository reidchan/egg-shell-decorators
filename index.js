'use strict';

require('reflect-metadata');
const _ = require('lodash');
const ControllerHandler = require('./src/handler/controller-handler');
const MethodHandler = require('./src/handler/method-handler');

const ctMap = new Map();
const ctHandler = new ControllerHandler();
const methodHandler = new MethodHandler(ctMap);

const EggShell = app => {
  const { router } = app;

  for (const c of ctMap.values()) {
    // 解析控制器元数据
    let { prefix } = ctHandler.getMetada(c.constructor);
    const propertyNames = _.filter(Object.getOwnPropertyNames(c), pName => {
      return pName !== 'constructor' && pName !== 'pathName' && pName !== 'fullPath';
    });

    // 解析前缀
    const fullPath = c.fullPath.
      split('\\').join('/').
      replace(/[\/]{2,9}/g, '/').
      replace(/(\.ts)|(\.js)/g, '');
    const rootPath = 'controller/';
    prefix = prefix || fullPath.substring(fullPath.indexOf(rootPath) + rootPath.length);
    prefix = prefix.startsWith('/') ? prefix : '/' + prefix;

    for (const pName of propertyNames) {
      // 解析函数元数据
      const { reqMethod, path, middlewares } = methodHandler.getMetada(c[pName]);

      const routerCb = async ctx => {
        const instance = new c.constructor(ctx);
        try {
          await instance[pName](ctx);
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

  Get: methodHandler.get(),
  All: methodHandler.all(),
  Post: methodHandler.post(),
  Put: methodHandler.put(),
  Delete: methodHandler.delete(),
  Patch: methodHandler.patch(),
  Options: methodHandler.options(),
  Head: methodHandler.head(),
  Middleware: methodHandler.middleware(),

  Prefix: ctHandler.prefix()
};
