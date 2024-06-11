'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var utilities = require('../../../utilities.js');
var reducer = require('./reducer.js');
var utils = require('../utils/utils.js');

function useHandlers(state, dispatch, validationConfigs) {
  return react.useMemo(() => {
    return state.list.map((item, index) => {
      return utilities.mapObject(item, (field, key) => {
        const target = {
          index,
          key
        };
        function validate(value = field.value) {
          const validates = validationConfigs[key];
          if (validates == null) {
            return;
          }
          const siblings = state.list.filter(listItem => listItem !== item);
          return utils.runValidation(error => dispatch(reducer.updateErrorAction({
            target,
            error: error || ''
          })), {
            value,
            siblings,
            listItem: item
          }, validates);
        }
        return {
          onChange(value) {
            const normalizedValue = utilities.isChangeEvent(value) ? value.target.value : value;
            dispatch(reducer.updateAction({
              target,
              value: normalizedValue
            }));
            if (field.error) {
              validate(normalizedValue);
            }
          },
          reset() {
            dispatch(reducer.resetAction({
              target
            }));
          },
          newDefaultValue(value) {
            dispatch(reducer.newDefaultAction({
              target,
              value
            }));
          },
          runValidation: validate,
          onBlur() {
            const {
              touched,
              error
            } = field;
            if (touched === false && error == null) {
              return;
            }
            validate();
          },
          setError(error) {
            dispatch(reducer.updateErrorAction({
              target,
              error
            }));
          }
        };
      });
    });
  }, [dispatch, state.list, validationConfigs]);
}

exports.useHandlers = useHandlers;
