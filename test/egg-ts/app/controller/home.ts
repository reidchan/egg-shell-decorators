import { Controller } from 'egg';
import { Get, Prefix } from 'egg-shell-decorators';

@Prefix('/super2god')
export default class HomeController extends Controller {

  @Get('/')
  public index () {
    this.ctx.body = 'hello';
  }

}
