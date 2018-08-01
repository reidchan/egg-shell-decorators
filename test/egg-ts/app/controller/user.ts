import { Controller } from 'egg';
import { Post, IgnoreJwtAll, TagsAll } from 'egg-shell-decorators';

@TagsAll('用户')
@IgnoreJwtAll
export default class UserController extends Controller {

  @Post('/')
  public listUser({ body: { name, phone, age } }) {
    return { name, phone, age };
  }

}
