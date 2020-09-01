"use strict";

require("reflect-metadata");

const {
  CONTROLLER_PREFIX_METADATA,
  CONTROLLER_RENDER_METADATA,
} = require("../constants");

const createArrayDecorator = Symbol("createArrayDecorator");
const createSingleDecorator = Symbol("createSingleDecorator");
const createCoupleDecorator = Symbol("createCoupleDecorator");

class ControllerHandler {
  prefix() {
    return this[createSingleDecorator](CONTROLLER_PREFIX_METADATA);
  }

  getMetada(target) {
    const prefix = Reflect.getMetadata(CONTROLLER_PREFIX_METADATA, target);
    const renderController = Reflect.getMetadata(
      CONTROLLER_RENDER_METADATA,
      target
    );
    return {
      prefix,
      renderController,
    };
  }

  [createSingleDecorator](metadata) {
    return (value) => {
      return (target, key, descriptor) => {
        Reflect.defineMetadata(metadata, value, target);
      };
    };
  }

  [createCoupleDecorator](metadata) {
    return (value1, value2) => {
      return (target, key, descriptor) => {
        Reflect.defineMetadata(
          metadata,
          {
            name: value2,
            description: value1,
          },
          target
        );
      };
    };
  }

  [createArrayDecorator](metadata) {
    return (values) => {
      return (target) => {
        const _values = Reflect.getMetadata(metadata, target) || [];
        values = values instanceof Array ? values : [values];
        values = values.concat(_values);
        Reflect.defineMetadata(metadata, values, target);
      };
    };
  }
}

module.exports = ControllerHandler;
