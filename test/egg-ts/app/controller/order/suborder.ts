import { Controller } from 'egg';
import { Get, Post, Put, Delete, Patch  } from 'egg-shell-decorators';

export default class SubOrderController extends Controller {

  @Get('/:id')
  public get({ params: { id }, query: { keyword } }) {
    this.ctx.body = {
      id,
      keyword,
    };
  }

  @Post('/')
  public post({ request: { body: { productInfo, price } } }) {
    this.ctx.body = `resuful post : ${productInfo}, ${price}`;
  }

  @Put('/:id')
  public put({ params: { id }, request: { body: { productInfo, price } } }) {
    this.ctx.body = `resuful put : ${id}, ${productInfo}, ${price}`;
  }

  @Delete('/:id')
  public async delete({ params: { id } }) {
    this.ctx.body = `resuful delete : ${id}`;
  }

  @Patch('/:id')
  public patch({ params: { id } }) {
    this.ctx.body = `resuful patch : ${id}`;
  }

}
