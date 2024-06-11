'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var reactHooks = require('@shopify/react-hooks');
var utilities = require('../utilities.js');

function useSubmit(onSubmit = noopSubmission, fieldBag, makeCleanAfterSubmit = false, dynamicListBag) {
  const mounted = reactHooks.useMountedRef();
  const [submitting, setSubmitting] = react.useState(false);
  const [submitErrors, setSubmitErrors] = react.useState([]);
  const fieldBagRef = reactHooks.useLazyRef(() => fieldBag);
  fieldBagRef.current = fieldBag;
  const dynamicListBagRef = reactHooks.useLazyRef(() => dynamicListBag);
  const setErrors = react.useCallback(errors => {
    setSubmitErrors(errors);
    utilities.propagateErrors(fieldBagRef.current, errors);
  }, [fieldBagRef]);
  const submit = react.useCallback(async event => {
    const fields = fieldBagRef.current;
    const dynamicLists = dynamicListBagRef.current;
    if (event && event.preventDefault && !event.defaultPrevented) {
      event.preventDefault();
    }
    const clientErrors = utilities.validateAll(fields);
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }
    setSubmitting(true);
    const result = await onSubmit(utilities.getValues(fields));
    if (mounted.current === false) {
      return;
    }
    setSubmitting(false);
    if (result.status === 'fail') {
      setErrors(result.errors);
    } else {
      setSubmitErrors([]);
      if (makeCleanAfterSubmit) {
        utilities.makeCleanFields(fields);
        utilities.makeCleanDynamicLists(dynamicLists);
      }
    }
  }, [fieldBagRef, dynamicListBagRef, onSubmit, mounted, setErrors, makeCleanAfterSubmit]);
  return {
    submit,
    submitting,
    errors: submitErrors,
    setErrors
  };
}

/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`.
 * @return Returns a `SubmitResult` representing your successful form submission.
 */
function submitSuccess() {
  return {
    status: 'success'
  };
}

/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`
 * @param errors - An array of errors with the user's input. These can either include both a `field` and a `message`, in which case they will be passed down to a matching field, or just a `message`.
 * @return Returns a `SubmitResult` representing your failed form submission.
 */
function submitFail(errors = []) {
  return {
    status: 'fail',
    errors
  };
}
function noopSubmission(_) {
  return Promise.resolve(submitSuccess());
}

exports.submitFail = submitFail;
exports.submitSuccess = submitSuccess;
exports.useSubmit = useSubmit;
