'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = appInfo.name + '_1529456660474_7482';

  config.middleware = [];

  config.onerror = {
    all (error, ctx) {
      ctx.response.status = error.status || 500;
      ctx.response.body = {
        success: false,
        message: error.message,
      };
    },
  };

  const customizeConfig = {
    jwt: {
      secret: '123456',
      enable: true,
      match: '/jwt',
    },
  };

  return { ...config, ...customizeConfig };
};
