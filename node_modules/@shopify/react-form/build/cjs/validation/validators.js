'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var predicates = require('@shopify/predicates');
var validator = require('./validator.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var predicates__namespace = /*#__PURE__*/_interopNamespace(predicates);

function lengthMoreThan(length, error) {
  return validator.validator(predicates__namespace.lengthMoreThan(length))(error);
}
function lengthLessThan(length, error) {
  return validator.validator(predicates__namespace.lengthLessThan(length))(error);
}
function notEmpty(error) {
  return validator.validator(predicates__namespace.notEmpty, {
    skipOnEmpty: false
  })(error);
}
function notEmptyString(error) {
  return validator.validator(predicates__namespace.notEmptyString, {
    skipOnEmpty: false
  })(error);
}
function positiveIntegerString(error) {
  return validator.validator(predicates__namespace.isPositiveIntegerString)(error);
}
function positiveNumericString(error) {
  return validator.validator(predicates__namespace.isPositiveNumericString)(error);
}
function numericString(error) {
  return validator.validator(predicates__namespace.isNumericString)(error);
}

exports.lengthLessThan = lengthLessThan;
exports.lengthMoreThan = lengthMoreThan;
exports.notEmpty = notEmpty;
exports.notEmptyString = notEmptyString;
exports.numericString = numericString;
exports.positiveIntegerString = positiveIntegerString;
exports.positiveNumericString = positiveNumericString;
