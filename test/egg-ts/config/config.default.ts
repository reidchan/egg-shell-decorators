import * as path from 'path';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

export interface BizConfig {
  sourceUrl: string;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${appInfo.name}`;

  config.keys = appInfo.name + '_1529465732315_8896';

  config.middleware = [];

  config.view = {
    defaultViewEngine: 'ejs',
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.ejs': 'ejs',
    },
  };

  config.onerror = {
    all (error: any, ctx: any) {
      ctx.response.status = error.status || 500;
      ctx.response.body = JSON.stringify({
        success: false,
        message: error.message,
      });
    },
  };

  const customizeConfig = {
    jwt: {
      secret: '123456',
      enable: true,
      match: '/jwt',
    },
  };

  return { ...config, ...customizeConfig };
};
