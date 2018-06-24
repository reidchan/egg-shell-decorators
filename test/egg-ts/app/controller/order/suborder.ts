import { Controller } from 'egg';
import { Get, Post, Put, Delete, Patch, IgnoreJwtAll } from 'egg-shell-decorators';

@IgnoreJwtAll
export default class SubOrderController extends Controller {

  @Get('/:id')
  public get({ params: { id }, query: { keyword } }) {
    return `resuful get : ${id}, ${keyword}`;
  }

  @Post('/:id')
  public post({ params: { id }, request: { body: { keyword } } }) {
    return `resuful post : ${id}, ${keyword}`;
  }

  @Put('/:id')
  public put({ params: { id }, request: { body: { keyword } } }) {
    return `resuful put : ${id}, ${keyword}`;
  }

  @Delete('/:id')
  public async delete({ params: { id }, request: { body: { keyword } } }) {
    return `resuful delete : ${id}, ${keyword}`;
  }

  @Patch('/:id')
  public patch({ params: { id }, request: { body: { keyword } } }) {
    return `resuful patch : ${id}, ${keyword}`;
  }

}
