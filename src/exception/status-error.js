'use strict';

module.exports = class StatusError extends Error {
  constructor (message, status = 500) {
    super(message);
    this.status = status;
  }
};
