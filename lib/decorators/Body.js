"use strict";

const { BODY, PARAM_INFO } = require("./symbols");

require("reflect-metadata");

const Body = (target, propertyKey, parameterIndex) => {
  const current = Reflect.getOwnMetadata(PARAM_INFO, target, propertyKey) || [];
  const typeInfo = Reflect.getMetadata(
    "design:paramtypes",
    target,
    propertyKey
  )[parameterIndex];
  current[parameterIndex] = { extract: BODY, typeInfo };
  Reflect.defineMetadata(PARAM_INFO, current, target, propertyKey);
};

module.exports = Body;
