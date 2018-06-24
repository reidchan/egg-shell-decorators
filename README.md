<img width="100" src="http://outt0i9l8.bkt.clouddn.com/egg-shell-decorators.png"/>

<p>
  <img src="https://img.shields.io/badge/version-1.0.0-ff69b4.svg"/>
  <img src="https://img.shields.io/packagist/l/doctrine/orm.svg"/>
</p>

> Egg.js 路由装饰器，让你的开发更敏捷~

# Installation
```shell
$ npm install egg-shell-decorators -S
```

如果不是采用 TypeScript 脚手架，则需执行以下脚本安装相关的 Babel 插件：
```shell
$ npm install babel-register babel-plugin-transform-decorators-legacy -D
```

# Usage
> 示范代码均采用 TypeScript
```typescript
// app/router.ts
import { Application } from 'egg';
import { EggShell } from 'egg-shell-decorators';

export default (app: Application) => {
  EggShell(app, { prefix: '/', quickStart: true });
};
```

配置参数：
```typescript
prefix: string // 全局前缀
quickStart: boolean // 开启QuickStart
```

如果不是采用 TypeScript 脚手架，则需在入口注册 Bable 插件使其支持 Decorator：
```javascript
// app.js
'use strict';
require('babel-register')({
  plugins: [
    'transform-decorators-legacy',
  ],
});
```

# Specialty
`路由解析`是 egg-shell-decorators 最大的特点，使用 Decorator 装饰的路由，则会被自动解析成对应的路由：
- 文件路径：`app/controller/home.ts`
  - @Get('/detail/:id')
  - @Post('/')
- 解析路由：
  - `[get]  全局前缀 + /home + /detail/:id`
  - `[post] 全局前缀 + /home + /`

这里的 全局前缀 指的是你在 EggShell 里配置的 `prefix`，路由解析`支持多层级解析噢`~

# Member
- Http相关
  - [x] Get
  - [x] Post
  - [x] Put
  - [x] Delete
  - [x] Patch
  - [x] Options
  - [x] Head
  - [ ] Header
- 中间件相关
  - [x] Before
  - [x] After
  - [x] BeforeAll
  - [x] AfterAll
- Swagger相关
  - [ ] 敬请期待下一个版本
- 其他
  - [x] Prefix
  - [x] Message
  - [x] IgnoreJwt
  - [x] IgnoreJwtAll
  
## Prefix
如果你不喜欢`路由解析`给你的路径，那么你可以自定义解析的路径：
```typescript
// app/controller/user
import { Controller } from 'egg';
import { Get, Message } from 'egg-shell-decorators';

@Prefix('/super2god')
export default class UserController extends Controller {

  @Get('/detail/:id')
  @Message('so great !')
  public async get({ params: { id } }) {
    return await this.service.user.getById(id)
  }

}
```
这样解析出来的路由就是：`全局前缀 + /super2god/detail/:id`，而不是`全局前缀 + /user/detail/:id`

## QuickStart
在 EggShell 里配置 `quickStart` 为 true 即可开启 QuickStart 模式，QuickStart 模式会自动处理响应体：
```typescript
import { Controller } from 'egg';
import { Get, Message, Error, StatusError } from 'egg-shell-decorators';

export default class UserController extends Controller {

  /**
   status: 200
   {
     success: true,
     message: '棒棒哒',
     data: {
       id: '123',
       name: 'super2god'
     },
   }
   */
  @Get('/:id')
  @Message('棒棒哒')
  public async get({ params: { id } }) {
    return await this.service.user.getById(id)
  }

  /**
   status: 200
   {
     success: false,
     message: '故意的'
   }
   */
  @Post('/:id')
  public post() {
    throw Error('故意的')
  }

  /**
   status: 403
   {
     success: false,
     message: '权限不足'
   }
   */
  @Post('/:id')
  public post() {
    // StatusError 的第二个参数默认值为500
    throw StatusError('权限不足', 403)
  }

}
```

## RESTful
让我们用 egg-shell-decorators 快速写一套 RESTful 风格的接口（QuickStart 模式）：
```typescript
import { Controller } from 'egg';
import { Get, Post, Put, Delete } from 'egg-shell-decorators';

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
  public delete({ params: { id }, request: { body: { keyword } } }) {
    return `resuful delete : ${id}, ${keyword}`;
  }

}
```

由于 egg-shell-decorators 内置把 `ctx` 对象传进 Controller 的函数里了，所以我们直接结构就可以获取到请求参数了，美滋滋~

当然，除了这四个常用的请求方法，egg-shell-decorators 还提供了其他比较常用的请求方法，具体请看上面的`Http请求方法`。

## Jwt
Jwt是目前比较流行的身份认证机制，所以 egg-shell-decorators 提供了相关的 Decorator。如果你使用了 `egg-jwt`，那默认所以路由都需要进行身份校验，而有时我们想让部分路由不用校验，那么你只需那么做：
```typescript
import { Controller } from 'egg';
import { Get, IgnoreJwt } from 'egg-shell-decorators';

export default class HomeController extends Controller {

  @IgnoreJwt
  @Get('/')
  public async index() {
    return 'hi, egg';
  }

}
```

是不是很简单呢，如果你想对整个 Controller 都进行校验忽略，那也很简单：
```typescript

import { Controller } from 'egg';
import { Get, Post, IgnoreJwtAll } from 'egg-shell-decorators';

@IgnoreJwtAll
export default class HomeController extends Controller {

  @Get('/')
  public async get() {
    return 'get';
  }

  @Post('/')
  public async post() {
    return 'post';
  }

}
```

## MiddleWare
egg-shell-decorators 提供了四个中间件相关的 Decorator，让你使用中间件更简单：
```typescript
import { Controller } from 'egg';
import { Get, IgnoreJwtAll, Before, After, BeforeAll, AfterAll } from 'egg-shell-decorators';

const Before1 = require('egg-shell-decorators/test/middlewares/before-1');
const Before2 = require('egg-shell-decorators/test/middlewares/before-2');
const Before3 = require('egg-shell-decorators/test/middlewares/before-3');
const Before4 = require('egg-shell-decorators/test/middlewares/before-4');

const After1 = require('egg-shell-decorators/test/middlewares/after-1');
const After2 = require('egg-shell-decorators/test/middlewares/after-2');
const After3 = require('egg-shell-decorators/test/middlewares/after-3');
const After4 = require('egg-shell-decorators/test/middlewares/after-4');

@BeforeAll([ Before1, Before2 ])
@AfterAll([ After1, After2 ])
@IgnoreJwtAll
export default class HomeController extends Controller {

  /**
   before middleware => 1
   before middleware => 2
   before middleware => 3
   before middleware => 4
   主业务...
   after middleware => 1
   after middleware => 2
   after middleware => 3
   after middleware => 4
   */
  @Before([ Before3, Before4 ])
  @After([ After3, After4 ])
  @Get('/')
  public async index() {
    return 'hi, egg';
  }

}
```
