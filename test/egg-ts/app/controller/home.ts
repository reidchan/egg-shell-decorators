import { Controller } from 'egg';
import { Get } from 'egg-shell-decorators';

export default class HomeController extends Controller {

  @Get('/')
  public index () {
    this.ctx.body = 'hello';
  }

  @Get('/pinduoduo')
  public async pinduoduo () {
    await this.ctx.render('pinduoduo.ejs');
  }

}
