'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var isEqual = require('fast-deep-equal');
var utilities = require('../../utilities.js');
var reducer = require('./reducer.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

/**
 * A custom hook for handling the state and validations of an input field.
 *
 * In it's simplest form `useField` can be called with a single parameter for the default value of the field.
 *
 * ```typescript
 * const field = useField('default value');
 * ```
 *
 * You can also pass a more complex configuration object specifying a validation function.
 *
 *
 * ```typescript
 *const field = useField({
 *  value: someRemoteData.title,
 *  validates: (title) => {
 *    if (title.length > 3) {
 *      return 'Title must be longer than three characters';
 *    }
 *  }
 *});
 * ```
 *
 * You may also pass multiple validators.
 *
 *```typescript
 * const field = useField({
 *   value: someRemoteData.title,
 *   validates: [
 *      (title) => {
 *         if (title.length > 3) {
 *           return 'Title must be longer than three characters';
 *         }
 *      },
 *      (title) => {
 *         if (!title.includes('radical')) {
 *           return 'only radical items allowed!';
 *         }
 *       }
 *    ],
 * });
 * ```
 *
 * Generally, you will want to use the object returned from useField to handle state for exactly one form input.
 *
 * ```typescript
 * const field = useField('default value');
 * return (
 *   <div>
 *     <label htmlFor="test-field">
 *       Test field{' '}
 *       <input
 *         id="test-field"
 *         name="test-field"
 *         value={field.value}
 *         onChange={field.onChange}
 *         onBlur={field.onBlur}
 *       />
 *     </label>
 *     {field.error && <p>{field.error}</p>}
 *   </div>
 * );
 * ```
 *
 * If using `@shopify/polaris` or other custom components that support `onChange`, `onBlur`, `value`, and `error` props then
 * you can accomplish the above more tersely by using the ES6 `spread` (...) operator.
 *
 * ```typescript
 * const title = useField('default title');
 * return (<TextField label="Title" {...title} />);
 * ```
 *
 * @param config - The default value of the input, or a configuration object specifying both the value and validation config.
 * @param validationDependencies - An array of values for determining when to regenerate the field's validation callbacks. Any value that is referenced by a validator other than those passed into it should be included.
 * @returns A `Field` object representing the state of your input. It also includes functions to manipulate that state. Generally, you will want to pass these callbacks down to the component or components representing your input.
 *
 * @remarks
 * **Reinitialization:** If the `value` property of the field configuration changes between calls to `useField`,
 * the field will be reset to use it as it's new default value.
 *
 * **Imperative methods:** The returned `Field` object contains a number of methods used to imperatively alter its state.
 * These should only be used as escape hatches where the existing hooks and components do not make your life easy,
 * or to build new abstractions in the same vein as `useForm`, `useSubmit` and friends.
 */
function useField(input, dependencies = []) {
  const {
    value,
    validates,
    dirtyStateComparator
  } = normalizeFieldConfig(input);
  const validators = utilities.normalizeValidation(validates);
  const [state, dispatch] = reducer.useFieldReducer(value, dirtyStateComparator);
  const resetActionObject = react.useMemo(() => reducer.resetAction(), []);
  const reset = react.useCallback(() => dispatch(resetActionObject), [dispatch, resetActionObject]);
  const newDefaultValue = react.useCallback(value => dispatch(reducer.newDefaultAction(value)), [dispatch]);
  const runValidation = react.useCallback((value = state.value) => {
    const errors = validators.map(check => check(value, {})).filter(value => value != null);
    if (errors && errors.length > 0) {
      const [firstError] = errors;
      dispatch(reducer.updateErrorAction(errors));
      return firstError;
    }
    dispatch(reducer.updateErrorAction(undefined));
    return undefined;
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [state.value, ...dependencies]);
  const onChange = react.useCallback(value => {
    const normalizedValue = utilities.isChangeEvent(value) ? value.target.value : value;
    dispatch(reducer.updateAction(normalizedValue));
    if (state.error) {
      runValidation(normalizedValue);
    }
  }, [runValidation, state.error, dispatch]);
  const setError = react.useCallback(value => dispatch(reducer.updateErrorAction(value)), [dispatch]);
  const onBlur = react.useCallback(() => {
    if (state.touched === false && state.error == null) {
      return;
    }
    runValidation();
  }, [runValidation, state.touched, state.error]);

  // We want to reset the field whenever a new `value` is passed in
  react.useEffect(() => {
    if (!isEqual__default["default"](value, state.defaultValue)) {
      newDefaultValue(value);
    }
    // We actually do not want this to rerun when our `defaultValue` is updated. It can
    // only happen independently of this callback when `newDefaultValue` is called by a user,
    // and we don't want to undue their hard work by resetting to `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, newDefaultValue]);
  const field = react.useMemo(() => {
    return {
      ...state,
      onBlur,
      onChange,
      newDefaultValue,
      runValidation,
      setError,
      reset
    };
  }, [state, onBlur, onChange, newDefaultValue, runValidation, setError, reset]);
  return field;
}
/**
 * Converts a standard `Field<Value>` into a `ChoiceField` that is compatible
 * with `<Checkbox />` and `<RadioButton />` components in `@shopify/polaris`.
 *
 * For fields that are used by both a choice components and other components, it
 * can be beneficial to retain the original `Field<Value>` shape and convert
 * the field on the fly for the choice component.
 *
 * For multi-value base fields (not simple boolean fields), you can provide a
 * checkedValue predicate to project the base field's value into the boolean
 * checked state so that it can function with multiple <RadioButton /> choice
 * components.
 *
 * ```typescript
 * const enabled = useField(false);
 * return (<Checkbox label="Enabled" {...asChoiceField(enabled)} />);
 *
 * const field = useField<'A' | 'B'>('A');
 * const radioA = (<RadioButton label="A" {...asChoiceField(field, 'A')} />)
 * const radioB = (<RadioButton label="B" {...asChoiceField(field, 'B')} />)
 * ```
 */
function asChoiceField({
  value,
  ...fieldData
}, checkedValue = true) {
  return {
    ...fieldData,
    checked: value === checkedValue,
    onChange(checked) {
      if (typeof checkedValue === 'boolean') {
        fieldData.onChange(checked);
      } else if (checked) {
        fieldData.onChange(checkedValue);
      }
    }
  };
}

/**
 * Converts a standard `Field<Value>` into a form that is compatible
 * with the `<ChoiceList />` component in `@shopify/polaris`.
 *
 * For fields that are used by both choice components and other components, it
 * can be beneficial to retain the original `Field<Value>` shape and convert
 * the field on the fly for the choice component.
 *
 * It only works with Radio buttons (single selection), not checkboxes.
 *
 * ```typescript
 * enum Color { Red = "red", Green = "green" }
 *
 * const choices = [
 *   { label: "Red", value: Color.Red },
 *   { label: "Green", value: Color.Green },
 * ]
 *
 * const color = useField(Color.Red);
 * return (<ChoiceList {...asChoiceList(color)} title="Color" choices={choices} />);
 * ```
 */
function asChoiceList({
  value,
  onChange,
  ...fieldData
}) {
  return {
    ...fieldData,
    selected: value === undefined || value === null ? [] : [value],
    onChange: selected => {
      onChange(selected[0]);
    },
    allowMultiple: false
  };
}

/**
 * A simplification to `useField` that returns a `ChoiceField` by automatically
 * converting a boolean field using `asChoiceField` for direct use in choice
 * components.
 *
 * ```typescript
 * const enabled = useChoiceField(false);
 * return (<Checkbox label="Enabled" {...enabled} />);
 * ```
 */
function useChoiceField(input, dependencies = []) {
  return asChoiceField(useField(input, dependencies));
}
function normalizeFieldConfig(input) {
  if (isFieldConfig(input)) {
    return input;
  }
  return {
    value: input,
    validates: () => undefined
  };
}
function isFieldConfig(input) {
  return input != null && typeof input === 'object' && Reflect.has(input, 'value') && Reflect.has(input, 'validates');
}

exports.asChoiceField = asChoiceField;
exports.asChoiceList = asChoiceList;
exports.useChoiceField = useChoiceField;
exports.useField = useField;
