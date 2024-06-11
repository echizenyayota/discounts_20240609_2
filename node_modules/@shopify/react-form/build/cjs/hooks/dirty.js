'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utilities = require('../utilities.js');

function useDirty(fieldBag) {
  return utilities.reduceFields(fieldBag, (dirty, field) => dirty || field.dirty, false);
}

exports.useDirty = useDirty;
