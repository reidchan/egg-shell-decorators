'use strict';

const { Controller } = require('egg');
const { Get, Post, Put, Delete, Patch } = require('egg-shell-decorators');

class SubOrderController extends Controller {

  @Get('/:id')
  get({ params: { id }, query: { keyword } }) {
    this.ctx.body =  `resuful get : ${id}, ${keyword}`;
  }

  @Post('/:id')
  post({ params: { id }, request: { body: { keyword } } }) {
    this.ctx.body =  `resuful post : ${id}, ${keyword}`;
  }

  @Put('/:id')
  put({ params: { id }, request: { body: { keyword } } }) {
    this.ctx.body =  `resuful put : ${id}, ${keyword}`;
  }

  @Delete('/:id')
  delete({ params: { id }, request: { body: { keyword } } }) {
    this.ctx.body =  `resuful delete : ${id}, ${keyword}`;
  }

  @Patch('/:id')
  patch({ params: { id }, request: { body: { keyword } } }) {
    return `resuful patch : ${id}, ${keyword}`;
  }

}

module.exports = SubOrderController;
