'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var utilities = require('../utilities.js');

function useVisitFields(fieldBag, visitor) {
  const fieldBagRef = react.useRef(fieldBag);
  fieldBagRef.current = fieldBag;
  return react.useCallback(() => {
    utilities.reduceFields(fieldBagRef.current, (_, field) => visitor(field));
  }, [visitor]);
}

exports["default"] = useVisitFields;
