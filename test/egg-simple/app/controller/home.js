'use strict';

const { Controller } = require('egg');
const { Get } = require('egg-shell-decorators');

class HomeController extends Controller {

  @Get('/')
  index() {
    return 'hi, egg';
  }

}

module.exports = HomeController;