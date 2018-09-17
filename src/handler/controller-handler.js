'use strict';

require('reflect-metadata');

const {
  CONTROLLER_IGNORE_JWT_ALL_METADATA,
  CONTROLLER_AFTER_ALL_METADATA,
  CONTROLLER_BEFORE_ALL_METADATA,
  CONTROLLER_PREFIX_METADATA,
  CONTROLLER_TAGS_ALL_METADATA,
  CONTROLLER_HIDDEN_METADATA,
  CONTROLLER_TOKEN_TYPE_ALL_METADATA,
  CONTROLLER_RENDER_METADATA } = require('../constants');

const createArrayDecorator = Symbol('createArrayDecorator');
const createSingleDecorator = Symbol('createSingleDecorator');
const createCoupleDecorator = Symbol('createCoupleDecorator');

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

  tagsAll () {
    return this[createCoupleDecorator](CONTROLLER_TAGS_ALL_METADATA);
  }

  hiddenAll () {
    return this[createSingleDecorator](CONTROLLER_HIDDEN_METADATA)(true);
  }

  tokenTypeAll () {
    return this[createSingleDecorator](CONTROLLER_TOKEN_TYPE_ALL_METADATA);
  }

  renderController () {
    return this[createSingleDecorator](CONTROLLER_RENDER_METADATA)(true);
  }

  getMetada (target) {
    const ignoreJwtAll = Reflect.getMetadata(CONTROLLER_IGNORE_JWT_ALL_METADATA, target);
    const beforeAll = Reflect.getMetadata(CONTROLLER_BEFORE_ALL_METADATA, target) || [];
    const afterAll = Reflect.getMetadata(CONTROLLER_AFTER_ALL_METADATA, target) || [];
    const prefix = Reflect.getMetadata(CONTROLLER_PREFIX_METADATA, target);
    const tagsAll = Reflect.getMetadata(CONTROLLER_TAGS_ALL_METADATA, target);
    const hiddenAll = Reflect.getMetadata(CONTROLLER_HIDDEN_METADATA, target);
    const tokenTypeAll = Reflect.getMetadata(CONTROLLER_TOKEN_TYPE_ALL_METADATA, target);
    const renderController = Reflect.getMetadata(CONTROLLER_RENDER_METADATA, target);
    return {
      ignoreJwtAll,
      beforeAll,
      afterAll,
      prefix,
      tagsAll,
      hiddenAll,
      tokenTypeAll,
      renderController
    };
  }

  [createSingleDecorator] (metadata) {
    return value => {
      return (target, key, descriptor) => {
        Reflect.defineMetadata(metadata, value, target);
      };
    };
  }

  [createCoupleDecorator] (metadata) {
    return (value1, value2) => {
      return (target, key, descriptor) => {
        Reflect.defineMetadata(metadata, {
          name: value2,
          description: value1
        }, target);
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
