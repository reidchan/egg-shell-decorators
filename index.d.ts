interface EggShell {
  (app: object, options: object): void
}

declare class StatusError {
  constructor(message: string, status?: number);

  message: string;
  status: number;
}

interface Decorator {
  (target: any, key: string, descriptor: PropertyDescriptor): void
}

interface ValueDecorator {
  (value: any): Decorator
}

export const EggShell: EggShell
export const StatusError: StatusError

export const Get: ValueDecorator
export const Post: ValueDecorator
export const Put: ValueDecorator
export const Delete: ValueDecorator
export const Patch: ValueDecorator
export const Options: ValueDecorator
export const Head: ValueDecorator

export const Before: ValueDecorator
export const After: ValueDecorator
export const Message: ValueDecorator
export const IgnoreJwt: Decorator

export const IgnoreJwtAll: Function
export const BeforeAll: Function
export const AfterAll: Function
export const Prefix: Function