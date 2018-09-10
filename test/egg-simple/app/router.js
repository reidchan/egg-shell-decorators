'use strict';

const { EggShell } = require('egg-shell-decorators');

const Before1 = require('egg-shell-decorators/test/middlewares/before-1');
const Before2 = require('egg-shell-decorators/test/middlewares/before-2');
const After1 = require('egg-shell-decorators/test/middlewares/after-1');
const After2 = require('egg-shell-decorators/test/middlewares/after-2');

module.exports = app => {
  EggShell(app, {
    prefix: '/',
    quickStart: true,
    before: [ Before1, Before2 ],
    after: [ After1, After2 ],
    swaggerOpt: {
      open: false,
      title: '测试示例',
      version: '1.0.0',
      host: '127.0.0.1',
      port: 7001,
      schemes: [ 'http' ],
      paths: {
        outPath: '../api-docs/public/json/jd.json',
        definitionPath: './definitions',
        swaggerPath: './swagger',
      },
      tokenOpt: {
        tokens: {
          manager: '123',
          user: '321',
        },
      },
    },
  });
};
