'use strict';

const { EggShell } = require('egg-shell-decorators');

module.exports = app => {
  EggShell(app, { prefix: '/', quickStart: true });
};
