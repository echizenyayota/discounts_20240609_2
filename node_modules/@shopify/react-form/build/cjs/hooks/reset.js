'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var visitFields = require('./visitFields.js');

function useReset(fieldBag) {
  return visitFields["default"](fieldBag, resetField);
}
function resetField(field) {
  field.reset();
}

exports.useReset = useReset;
