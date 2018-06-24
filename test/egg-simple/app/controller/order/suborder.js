'use strict';

const { Controller } = require('egg');
const { Get, Post, Put, Delete, Patch, IgnoreJwtAll } = require('egg-shell-decorators');

@IgnoreJwtAll
class SubOrderController extends Controller {

  @Get('/:id')
  get({ params: { id }, query: { keyword } }) {
    return `resuful get : ${id}, ${keyword}`;
  }

  @Post('/:id')
  post({ params: { id }, request: { body: { keyword } } }) {
    return `resuful post : ${id}, ${keyword}`;
  }

  @Put('/:id')
  put({ params: { id }, request: { body: { keyword } } }) {
    return `resuful put : ${id}, ${keyword}`;
  }

  @Delete('/:id')
  delete({ params: { id }, request: { body: { keyword } } }) {
    return `resuful delete : ${id}, ${keyword}`;
  }

  @Patch('/:id')
  patch({ params: { id }, request: { body: { keyword } } }) {
    return `resuful patch : ${id}, ${keyword}`;
  }

}

module.exports = SubOrderController;
