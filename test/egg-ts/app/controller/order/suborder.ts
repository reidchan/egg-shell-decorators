import { Controller } from 'egg';
import { Get, Post, Put, Delete, Patch, IgnoreJwtAll,
         TagsAll, Description, Parameters, Responses, Tags  } from 'egg-shell-decorators';

@IgnoreJwtAll
@TagsAll('RESTful例子')
export default class SubOrderController extends Controller {

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
  public get({ params: { id }, query: { keyword } }) {
    return {
      id,
      keyword,
    };
  }

  @Post('/')
  @Description('Post请求')
  public post({ request: { body: { productInfo, price } } }) {
    return `resuful post : ${productInfo}, ${price}`;
  }

  @Put('/:id')
  @Description('Put请求')
  public put({ params: { id }, request: { body: { productInfo, price } } }) {
    return `resuful put : ${id}, ${productInfo}, ${price}`;
  }

  @Delete('/:id')
  @Description('Delete请求')
  public async delete({ params: { id } }) {
    return `resuful delete : ${id}`;
  }

  @Patch('/:id')
  @Tags('/jd/user')
  @Description('Patch请求')
  public patch({ params: { id } }) {
    return `resuful patch : ${id}`;
  }

}
