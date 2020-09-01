'use strict';

module.exports = () => {
  return async (_ctx, next) => {
    console.log('middleware-03...');
    next();
  };
};
