'use strict';

module.exports = () => {
  return () => {
    console.log('after middleware => 6');
  };
};
