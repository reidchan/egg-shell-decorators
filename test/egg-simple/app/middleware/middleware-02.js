'use strict';

module.exports = () => {
  return async (ctx, next) => {
    console.log('middleware-02...');
    const flag = true;
    if (flag) {
      ctx.body = '233';
      return;
    }
    next();
  };
};
