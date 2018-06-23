'use strict';

const { EggShell } = require('egg-shell');

module.exports = app => {
  EggShell(app, { prefix: '/', quickStart: true });
};
