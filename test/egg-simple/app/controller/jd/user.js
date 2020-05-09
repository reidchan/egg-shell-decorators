const { Controller } = require('egg');
const { Get, Post, Put, Delete } = require('egg-shell-decorators');

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
  put({ params: { id }, request: { body: { name, phone, age } }}) {
    return `[put] user : ${id} ${name} ${phone} ${age}`;
  }

  @Delete('/:id')
  delete({ params: { id } }) {
    return `[delete] user : ${id}`;
  }

}

module.exports = JdUserController;