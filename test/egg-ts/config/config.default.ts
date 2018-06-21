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

  const customizeConfig = {
    jwt: {
      secret: '123456',
      enable: true,
      match: '/jwt',
    },
  };

  return { ...config, ...customizeConfig };
};
