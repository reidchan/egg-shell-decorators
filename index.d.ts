interface EggShell {
  (app: object): void
}

interface GetRouterTarget{
  (path: string, method: string): [Function,string] | [null,null]
}

export declare class StatusError {
  constructor(message: string, status?: number);

  message: string;
  status: number;
}

interface SwaggerOpt {
  open?: boolean,
  title?: string;
  version?: string;
  host: string;
  port: string|number;
  schemes?: string[];
  paths: object;
  tokenOpt?: object;
}


interface Decorator {
  (target: any, key: string, descriptor: PropertyDescriptor): void
}

interface SingleDecorator {
  (value: any): Decorator
}

interface CoupleDecorator {
  (value1: any, value2?: any): Decorator
}

export const EggShell: EggShell
export const getRouterTarget: GetRouterTarget
export const Get: SingleDecorator
export const Post: SingleDecorator
export const Put: SingleDecorator
export const Delete: SingleDecorator
export const Patch: SingleDecorator
export const Options: SingleDecorator
export const Head: SingleDecorator
export const All: SingleDecorator
export const Prefix: Function
export const Middleware: Function