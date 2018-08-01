import { Controller } from 'egg';
import { Get, Post, Put, Delete, IgnoreJwtAll,
         TagsAll, Parameters, Description, Produces } from 'egg-shell-decorators';

@IgnoreJwtAll
@TagsAll('京东用户')
export default class JdUserController extends Controller {

  @Get('/:id/:name')
  public get({ params: { id } }) {
    return `[get] user : ${id}`;
  }

  @Post('/')
  public post({ request: { body: { name, phone, age } }}) {
    return {
      name,
      phone,
      age,
    };
  }

  @Put('/:id')
  @Description('根据id更新用户信息')
  public put({ params: { id }, request: { body: { name, phone, age } }}) {
    return `[put] user : ${id} ${name} ${phone} ${age}`;
  }

  @Delete('/:id')
  @Description('根据id删除用户')
  @Produces('application/xml')
  @Parameters([{
    name: 'id', in: 'path', description: '用户id', required: true, type: 'integer',
  }])
  public delete({ params: { id } }) {
    return `[delete] user : ${id}`;
  }

}
