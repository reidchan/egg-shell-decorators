import { Controller } from 'egg';
import { Get, Middleware } from 'egg-shell-decorators';
import Middleware01 from '../middleware/middleware-01';
import Middleware02 from '../middleware/middleware-02';
import Middleware03 from '../middleware/middleware-03';

export default class UserController extends Controller {

  @Get('/')
  @Middleware([ Middleware01(), Middleware02(), Middleware03() ])
  public getUser() {
    this.ctx.body = { name: 'super2god' };
  }

}
