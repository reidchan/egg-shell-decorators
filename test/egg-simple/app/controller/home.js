'use strict';

const { Controller } = require('egg');
const { Get } = require('egg-shell-decorators');

class HomeController extends Controller {

  @Get('/')
  index() {
    this.ctx.body = 'hi, egg';
  }

}

module.exports = HomeController;