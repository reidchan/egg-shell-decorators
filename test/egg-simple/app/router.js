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
  });
};
