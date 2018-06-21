'use strict';

require('reflect-metadata');

const {
  CONTROLLER_IGNORE_JWT_ALL_METADATA,
  CONTROLLER_AFTER_ALL_METADATA,
  CONTROLLER_BEFORE_ALL_METADATA,
  CONTROLLER_PREFIX_METADATA } = require('../constants');

const createArrayDecorator = Symbol('createArrayDecorator');
const createSingleDecorator = Symbol('createSingleDecorator');

class ControllerHandler {
  ignoreJwtAll () {
    return this[createSingleDecorator](CONTROLLER_IGNORE_JWT_ALL_METADATA)(true);
  }

  beforeAll () {
    return this[createArrayDecorator](CONTROLLER_BEFORE_ALL_METADATA);
  }

  afterAll () {
    return this[createArrayDecorator](CONTROLLER_AFTER_ALL_METADATA);
  }

  prefix () {
    return this[createSingleDecorator](CONTROLLER_PREFIX_METADATA);
  }

  getMetada (target) {
    const ignoreJwtAll = Reflect.getMetadata(CONTROLLER_IGNORE_JWT_ALL_METADATA, target);
    const beforeAll = Reflect.getMetadata(CONTROLLER_BEFORE_ALL_METADATA, target) || [];
    const afterAll = Reflect.getMetadata(CONTROLLER_AFTER_ALL_METADATA, target) || [];
    const prefix = Reflect.getMetadata(CONTROLLER_PREFIX_METADATA, target);
    return {
      ignoreJwtAll,
      beforeAll,
      afterAll,
      prefix,
    };
  }

  [createSingleDecorator] (metadata) {
    return value => {
      return (target, key, descriptor) => {
        Reflect.defineMetadata(metadata, value, target);
      };
    };
  }

  [createArrayDecorator] (metadata) {
    return values => {
      return target => {
        const _values = Reflect.getMetadata(metadata, target) || [];
        values = (values instanceof Array) ? values : [ values ];
        values = values.concat(_values);
        Reflect.defineMetadata(metadata, values, target);
      };
    };
  }
}
module.exports = ControllerHandler;
