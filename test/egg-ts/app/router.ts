import { Application } from 'egg';
import { EggShell } from 'egg-shell';

export default (app: Application) => {
  EggShell(app, { prefix: '/', quick: true });
};
