<img width="100" src="https://super-github.oss-cn-shenzhen.aliyuncs.com/package/egg-shell-decorators.png"/>

<p>
  <img src="https://img.shields.io/badge/version-1.5.0-ff69b4.svg"/>
  <img src="https://img.shields.io/packagist/l/doctrine/orm.svg"/>
</p>

> 蛋壳\~给你的Egg加个壳\~（该项目本人会持续维护，欢迎大家提Issues和加入微信群~）

# 快速开始
```ts
import { Controller } from 'egg';
import { Get, Middleware } from 'egg-shell-decorators';
import JwtValidator from '../middleware/jwt-validator';

export default class UserController extends Controller {

  @Get('/')
  @Middleware([ JwtValidator() ])
  public getUser() {
    this.ctx.body = { name: 'super2god' };
  }

}
```

# 版本
| 版本 | 文档 | 上线时间 |
| ---- | ---- | ----  |
| v1.5.0 | [点击跳转](https://www.yuque.com/super2god/open-source/egg-shell-decorators-v1.5.0) | 2020-07-28 |
| v1.5.0-beta | [点击跳转](https://www.yuque.com/super2god/open-source/egg-shell-decorators-v1.5.0-beta) | 2020-07-13 |
| v1.0.7 | [点击跳转](https://www.yuque.com/super2god/open-source/egg-shell-decorators-v1.0.7) | 2018-12-29 |

# 示例代码
蛋壳示例代码请查看该项目：[egg-shell-example](https://github.com/super2god/egg-shell-example)（蛋壳示例代码）。

```ts
import { Controller } from 'egg';
import { Get, Post } from 'egg-shell-decorators';

export default class UserController extends Controller {

  @Get('/:id')
  public getUser({ params: { id } }) {
    this.ctx.body = `getUser:${id}`;
  }

  @Post('/')
  public createUser({ request: { body: { name, phone, age } } }) {
    this.ctx.body = { name, phone, age };
  }
}
```

# 加入小组来面基~
由于本人很少上QQ，所以建的是微信群，而微信群码很快就失效，所以想进交流群的小伙伴加我微信噢\~~我拉你进群，欢迎大佬们加入☺️

<img width="300" src="https://super-github.oss-cn-shenzhen.aliyuncs.com/common/wxqrcode.jpeg"/>
