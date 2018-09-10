export default () => {
  return async () => {
    throw Error('用户不存在');
  };
};
