interface EggShell {
  (app: object): void;
}

interface Decorator {
  (target: any, key: string, descriptor: PropertyDescriptor): void;
}

interface SingleDecorator {
  (value: any): Decorator;
}

interface CoupleDecorator {
  (value1: any, value2?: any): Decorator;
}

export const EggShell: EggShell;
export const StatusError: StatusError;

export const Get: SingleDecorator;
export const Post: SingleDecorator;
export const Put: SingleDecorator;
export const Delete: SingleDecorator;
export const Patch: SingleDecorator;
export const Options: SingleDecorator;
export const Head: SingleDecorator;

export const Get: SingleDecorator;
export const Post: SingleDecorator;
export const Put: SingleDecorator;
export const Delete: SingleDecorator;
export const Patch: SingleDecorator;
export const Options: SingleDecorator;
export const Head: SingleDecorator;
export const Prefix: Function;
export const Middleware: Function;

export const Body: ParameterDecorator;
export const Query: (key: String) => ParameterDecorator;
export const Header: (key: String) => ParameterDecorator;
