'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var utilities = require('../../utilities.js');

function updateAction(value) {
  return {
    type: 'update',
    payload: value
  };
}
function resetAction() {
  return {
    type: 'reset'
  };
}
function newDefaultAction(value) {
  return {
    type: 'newDefaultValue',
    payload: value
  };
}
function updateErrorAction(error) {
  return {
    type: 'updateError',
    payload: error
  };
}
const shallowFieldReducer = makeFieldReducer({
  dirtyStateComparator: utilities.defaultDirtyComparator
});
function reduceField(prevState, action) {
  return shallowFieldReducer(prevState, action);
}
function makeFieldReducer({
  dirtyStateComparator = utilities.defaultDirtyComparator
}) {
  return (state, action) => {
    switch (action.type) {
      case 'update':
        {
          const newValue = action.payload;
          const {
            defaultValue
          } = state;
          const dirty = dirtyStateComparator(defaultValue, newValue);
          return {
            ...state,
            dirty,
            value: newValue,
            touched: true
          };
        }
      case 'updateError':
        {
          const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
          const [firstError] = payload;
          const allErrors = firstError ? payload : [];
          if (utilities.shallowArrayComparison(allErrors, state.allErrors)) {
            return {
              ...state,
              error: firstError
            };
          } else {
            return {
              ...state,
              error: firstError,
              allErrors
            };
          }
        }
      case 'reset':
        {
          const {
            defaultValue
          } = state;
          return {
            ...state,
            error: undefined,
            value: defaultValue,
            dirty: false,
            touched: false,
            allErrors: []
          };
        }
      case 'newDefaultValue':
        {
          const newDefaultValue = action.payload;
          return {
            ...state,
            error: undefined,
            value: newDefaultValue,
            defaultValue: newDefaultValue,
            touched: false,
            dirty: false
          };
        }
    }
  };
}
function useFieldReducer(value, dirtyStateComparator) {
  return react.useReducer(makeFieldReducer({
    dirtyStateComparator
  }), initialFieldState(value));
}
function initialFieldState(value) {
  return {
    value,
    defaultValue: value,
    error: undefined,
    touched: false,
    dirty: false,
    allErrors: []
  };
}

exports.initialFieldState = initialFieldState;
exports.makeFieldReducer = makeFieldReducer;
exports.newDefaultAction = newDefaultAction;
exports.reduceField = reduceField;
exports.resetAction = resetAction;
exports.updateAction = updateAction;
exports.updateErrorAction = updateErrorAction;
exports.useFieldReducer = useFieldReducer;
