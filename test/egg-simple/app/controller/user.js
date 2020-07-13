const { Controller } = require('egg');
const { Get, Middleware } = require('egg-shell-decorators');
const Middleware01 = require('../middleware/middleware-01');
const Middleware02 = require('../middleware/middleware-02');
const Middleware03 = require('../middleware/middleware-03');

class JdUserController extends Controller {

  @Get('/')
  @Middleware([ Middleware01(), Middleware02(), Middleware03() ])
  getUser() {
    this.ctx.body = { name: 'super2god' };
  }

}

module.exports = JdUserController;