'use strict';

require('reflect-metadata');
const _ = require('lodash');
const ControllerHandler = require('./src/handler/controller-handler');
const MethodHandler = require('./src/handler/method-handler');

const pathMap = new Map();
const ctMap = new Map();
const ctHandler = new ControllerHandler();
const methodHandler = new MethodHandler(ctMap);
const swaggerHttpMethod = [ 'get', 'post', 'put', 'delete', 'patch' ];

/**
 * 根据request中的path，得到对应的controller处理方法
 * @param {string} path - 请求路径
 * @param {string} method - 请求方法
 * @returns {Array} 含target(ControllerX.prototype)和property两项的数组。 如果没有找到对应的数据，则为[null,null], 保持Array类型以便解构
 */
const getRouterTarget = (path,method) => {
  return pathMap.get(`${method.toLowerCase()}@${path}`) || [null,null];
};

const EggShell = (app, options = {}) => {
  const { router, jwt } = app;

  // 设置全局路由前缀
  if (options.prefix) router.prefix(options.prefix);
  options.before = options.before || [];
  options.after = options.after || [];

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

      router[reqMethod](prefix + path, routerCb);

      // 存入(method+pathm) 与 [target,property]的映射, 便于在中间件中根据path获取target上metaData，做出对应处理
      pathMap.set(`${reqMethod}@${prefix+path}`, [c.constructor, pName]);
    }
  }

  if (swaggerOpt && swaggerOpt.open && swaggerOpt.paths && swaggerOpt.paths.outPath) {
    const outPath = nodePath.join(__dirname, nodePath.normalize('../../' + swaggerOpt.paths.outPath));
    const stat = fs.statSync(outPath);
    if (stat) {
      fs.writeFileSync(outPath, JSON.stringify(swaggerJson), { encoding: 'utf8' });
    }
  }

};

module.exports = {
  EggShell,
  getRouterTarget,
  StatusError,
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
