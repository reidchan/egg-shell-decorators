"use strict";

const { PARAM_INFO, HEADER } = require("./symbols");

require("reflect-metadata");

const Body = (key) => (target, propertyKey, parameterIndex) => {
  const current = Reflect.getOwnMetadata(PARAM_INFO, target, propertyKey) || [];
  const typeInfo = Reflect.getMetadata(
    "design:paramtypes",
    target,
    propertyKey
  )[parameterIndex];
  current[parameterIndex] = { extract: HEADER, typeInfo, key };
  Reflect.defineMetadata(PARAM_INFO, current, target, propertyKey);
};

module.exports = Body;
