export default () => {
  return async (_ctx, next) => {
    console.log('middleware-03...');
    next();
  };
};
