'use strict';

const { Controller } = require('egg');
const { Get, Post, Put, Delete, Patch, IgnoreJwtAll,
        TagsAll, Description, Parameters, Responses, Tags } = require('egg-shell-decorators');

@IgnoreJwtAll
@TagsAll('RESTful例子')
class SubOrderController extends Controller {

  @Get('/:id')
  @Description('Get请求')
  @Parameters([
    { name: 'id', in: 'path', description: 'id', required: true, type: 'string' },
    { name: 'keyword', in: 'query', description: '关键字', required: true, type: 'string' },
  ])
  @Responses({
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'id',
      },
      keyword: {
        type: 'string',
        description: '关键字',
      },
    },
  })
  get({ params: { id }, query: { keyword } }) {
    return `resuful get : ${id}, ${keyword}`;
  }

  @Post('/:id')
  @Description('Post请求')
  post({ params: { id }, request: { body: { keyword } } }) {
    return `resuful post : ${id}, ${keyword}`;
  }

  @Put('/:id')
  @Description('Put请求')
  put({ params: { id }, request: { body: { keyword } } }) {
    return `resuful put : ${id}, ${keyword}`;
  }

  @Delete('/:id')
  @Description('Delete请求')
  delete({ params: { id }, request: { body: { keyword } } }) {
    return `resuful delete : ${id}, ${keyword}`;
  }

  @Patch('/:id')
  @Tags('/jd/user')
  @Description('Patch请求')
  patch({ params: { id }, request: { body: { keyword } } }) {
    return `resuful patch : ${id}, ${keyword}`;
  }

}

module.exports = SubOrderController;
