const { Controller } = require('egg');
const { Get, Post, Put, Delete, IgnoreJwtAll,
         TagsAll, Parameters, Description, Produces } = require('egg-shell-decorators');

@IgnoreJwtAll
@TagsAll('京东用户')
class JdUserController extends Controller {

  @Get('/:id/:name')
  get({ params: { id } }) {
    return `[get] user : ${id}`;
  }

  @Post('/')
  post({ request: { body: { name, phone, age } }}) {
    return {
      name,
      phone,
      age,
    };
  }

  @Put('/:id')
  @Description('根据id更新用户信息')
  put({ params: { id }, request: { body: { name, phone, age } }}) {
    return `[put] user : ${id} ${name} ${phone} ${age}`;
  }

  @Delete('/:id')
  @Description('根据id删除用户')
  @Produces('application/xml')
  @Parameters([{
    name: 'id', in: 'path', description: '用户id', required: true, type: 'integer',
  }])
  delete({ params: { id } }) {
    return `[delete] user : ${id}`;
  }

}

module.exports = JdUserController;