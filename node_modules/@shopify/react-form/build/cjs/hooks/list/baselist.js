'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var isEqual = require('fast-deep-equal');
var utilities = require('../../utilities.js');
var dirty = require('../dirty.js');
var reducer = require('./hooks/reducer.js');
var handlers = require('./hooks/handlers.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

/*

 * A custom hook for handling the state and validations of fields for a list of objects which can be built upon. (e.g useList and useDynamicList).

 * @param listOrConfig - A configuration object specifying both the value and validation config.
 * @param validationDependencies - An array of dependencies to use to decide when to regenerate validators.
 * @returns A list of dictionaries of `Field` objects representing the state of your input and a dispatcher which can be used for other hooks to build around base list (e.g useList and useDynamicList).
 *
 * @remarks
 * **Reinitialization:** If the `list` property of the field configuration changes between calls to `useBaseList`,
 * the field will be reset to use it as it's new default value.
 *
 * **Imperative methods:** The returned `Field` objects contains a number of methods used to imperatively alter their state.
 * These should only be used as escape hatches where the existing hooks and components do not make your life easy,
 * or to build new abstractions in the same vein as `useForm`, `useSubmit` and friends.
 *
*/

function useBaseList(listOrConfig, validationDependencies = []) {
  const list = Array.isArray(listOrConfig) ? listOrConfig : listOrConfig.list;
  const validates = react.useMemo(() => {
    return Array.isArray(listOrConfig) ? {} : listOrConfig.validates || {};
  }, [listOrConfig]);
  const [state, dispatch] = reducer.useListReducer(list);
  react.useEffect(() => {
    if (!isEqual__default["default"](list, state.initial)) {
      dispatch(reducer.reinitializeAction(list));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, dispatch]);
  const validationConfigs = react.useMemo(() => utilities.mapObject(validates, utilities.normalizeValidation),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [validates, ...validationDependencies]);
  function reset() {
    dispatch(reducer.resetListAction());
  }
  function newDefaultValue(newDefaultItems) {
    dispatch(reducer.reinitializeAction(newDefaultItems));
  }
  const handlers$1 = handlers.useHandlers(state, dispatch, validationConfigs);
  const fields = react.useMemo(() => {
    return state.list.map((item, index) => {
      return utilities.mapObject(item, (field, key) => {
        return {
          ...field,
          ...handlers$1[index][key]
        };
      });
    });
  }, [state.list, handlers$1]);
  const listWithoutFieldStates = react.useMemo(() => {
    return state.list.map(item => {
      return utilities.mapObject(item, field => field.value);
    });
  }, [state.list]);
  const isBaseListDirty = react.useMemo(() => !isEqual__default["default"](listWithoutFieldStates, state.initial), [listWithoutFieldStates, state.initial]);
  const fieldsDirty = dirty.useDirty({
    fields
  });
  return {
    fields,
    dispatch,
    reset,
    dirty: fieldsDirty || isBaseListDirty,
    defaultValue: state.initial,
    value: listWithoutFieldStates,
    newDefaultValue
  };
}

exports.useBaseList = useBaseList;
