'use strict';

require('reflect-metadata');
const _ = require('lodash');
const nodePath = require('path');
const fs = require('fs');

const StatusError = require('./src/exception/status-error');
const ControllerHandler = require('./src/handler/controller-handler');
const MethodHandler = require('./src/handler/method-handler');

const ctMap = new Map();
const ctHandler = new ControllerHandler();
const methodHandler = new MethodHandler(ctMap);

const EggShell = (app, options = {}) => {
  const { router } = app;
  // 设置全局路由前缀
  if (options.prefix) router.prefix(options.prefix);
  options.before = options.before || [];
  options.after = options.after || [];

  for (const c of ctMap.values()) {
    // 解析控制器元数据
    let { prefix, renderController } = ctHandler.getMetada(c.constructor);
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
      const { reqMethod, path, message, ignoreJwt, render } = methodHandler.getMetada(c[pName]);

      const routerCb = async (ctx, next) => {
        const instance = new c.constructor(ctx);
        try {
          ctx.body = ctx.request ? ctx.request.body : null;
          const result = await instance[pName](ctx);
          if (options.quickStart && !render && !renderController) {
            ctx.response.body = {
              success: true,
              message,
              data: result,
            };
          } else if (renderController || render) {
            ctx.set('Content-Type', 'text/html;charset=utf-8');
          }
        } catch (error) {
          throw error;
        }
      };

      router[reqMethod](prefix + path, routerCb);
    }
  }
};

const paramsRegex = /:[\w-]*/g;
function replaceColon (path) {
  const matchs = paramsRegex.exec(path);
  if (!matchs) return path;
  const pathItem = matchs[0].replace(':', '{') + '}';
  path = path.replace(matchs[0], pathItem);
  return replaceColon(path);
}

function getDefinition (definitions, definitionPath) {
  const files = fs.readdirSync(definitionPath, { encoding: 'utf8' });
  for (const file of files) {
    const subDefinitionPath = nodePath.join(definitionPath, file);
    const stat = fs.statSync(subDefinitionPath);
    if (stat.isFile()) {
      const data = fs.readFileSync(subDefinitionPath, { encoding: 'utf8' });
      definitions = Object.assign(definitions, JSON.parse(data));
    } else if (stat.isDirectory()) {
      definitions = Object.assign(definitions, this._getDefinition(definitions, subDefinitionPath));
    }
  }
  return definitions;
}

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

  Message: methodHandler.message(),

  Render: methodHandler.render(),

  Prefix: ctHandler.prefix(),
  RenderController: ctHandler.renderController()
};
