'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1529456660474_7482';

  config.middleware = [];

  const customizeConfig = {
    jwt: {
      secret: '123456',
      enable: true,
      match: '/jwt',
    },
  };

  return { ...config, ...customizeConfig };
};
