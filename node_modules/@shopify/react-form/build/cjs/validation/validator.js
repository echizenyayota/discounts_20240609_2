'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var predicates = require('@shopify/predicates');

/**
 * A factory for creating reusable validation functions.
 *
 * ```tsx
 *  const isAColor = validator((input) => ['red', 'blue', 'green', 'yellow'].includes(input));
 *
 *  // the returned function takes an error string or a function to generate errors
 *  const colorField = useField({
 *    value: 'green',
 *    validates: isAColor((input) => `${input} is not a color`);
 *  })
 * ```
 *
 * By default validators will return true automatically if the value is empty (`null`, `undefined` or `''`). You can circumvent this by using the `skipOnEmpty` option.
 *
 * ```tsx
 *  const isAColor = validator(
 *    (input) => ['red', 'blue', 'green', 'yellow'].includes(input),
 *    {skipOnEmpty: false},
 *  );
 * ```
 *
 * @param matcher - a function that takes in an input and returns `true` if the value is valid, or `false` if it is not.
 * @param options - an optional configuration object.
 */
function validator(matcher, {
  skipOnEmpty = true
} = {}) {
  return errorContent => {
    return input => {
      if (skipOnEmpty && predicates.isEmpty(input)) {
        return;
      }
      const matches = matcher(input);
      if (matches) {
        return;
      }
      if (typeof errorContent === 'function') {
        return errorContent(input);
      }
      return errorContent;
    };
  };
}

exports.validator = validator;
