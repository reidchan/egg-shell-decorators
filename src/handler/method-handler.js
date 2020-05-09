'use strict';

const {
  METHOD_METADATA,
  PATH_METADATA,
  MESSAGE_METADATA,
  RENDER_METADATA } = require('../constants');
const RequestMethod = require('../enum/request-method');

const createMappingDecorator = Symbol('createMappingDecorator');
const createSingleDecorator = Symbol('createSingleDecorator');
const createArrayDecorator = Symbol('createArrayDecorator');
const mappingRequest = Symbol('mappingRequest');

class MethodHandler {
  constructor (cMap) {
    this.cMap = cMap;
  }

  getMetada (targetCb) {
    const reqMethod = Reflect.getMetadata(METHOD_METADATA, targetCb);
    const path = Reflect.getMetadata(PATH_METADATA, targetCb);
    const message = Reflect.getMetadata(MESSAGE_METADATA, targetCb);
    const render = Reflect.getMetadata(RENDER_METADATA, targetCb);
    return {
      reqMethod,
      path,
      message,
      render
    };
  }

  get () {
    return this[createMappingDecorator](RequestMethod.GET);
  }

  post () {
    return this[createMappingDecorator](RequestMethod.POST);
  }

  put () {
    return this[createMappingDecorator](RequestMethod.PUT);
  }

  delete () {
    return this[createMappingDecorator](RequestMethod.DELETE);
  }

  patch () {
    return this[createMappingDecorator](RequestMethod.PATCH);
  }

  options () {
    return this[createMappingDecorator](RequestMethod.OPTIONS);
  }

  head () {
    return this[createMappingDecorator](RequestMethod.HEAD);
  }

  message () {
    return this[createSingleDecorator](MESSAGE_METADATA);
  }

  render () {
    return this[createSingleDecorator](RENDER_METADATA)(true);
  }

  [createMappingDecorator] (method) {
    return path => {
      return this[mappingRequest]({
        [PATH_METADATA]: path,
        [METHOD_METADATA]: method,
      });
    };
  }

  [mappingRequest] (metadata) {
    const path = metadata[PATH_METADATA];
    const reqMethod = metadata[METHOD_METADATA];

    return (target, key, descriptor) => {
      this.cMap.set(target, target);
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
      Reflect.defineMetadata(METHOD_METADATA, reqMethod, descriptor.value);
      return descriptor;
    };
  }

  [createSingleDecorator] (metadata) {
    return value => {
      return (target, key, descriptor) => {
        this.cMap.set(target, target);
        Reflect.defineMetadata(metadata, value, descriptor.value);
        return descriptor;
      };
    };
  }

  [createArrayDecorator] (metadata) {
    return values => {
      return (target, key, descriptor) => {
        const _values = Reflect.getMetadata(metadata, descriptor.value) || [];
        values = (values instanceof Array) ? values : [ values ];
        values = values.concat(_values);
        Reflect.defineMetadata(metadata, values, descriptor.value);
        return descriptor;
      };
    };
  }
}

module.exports = MethodHandler;
