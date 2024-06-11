'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var reactHooks = require('@shopify/react-hooks');

function useDynamicListReset(lists) {
  const listBagRef = reactHooks.useLazyRef(() => lists);
  listBagRef.current = lists;
  return react.useCallback(() => {
    return resetFields(listBagRef.current);
  }, [listBagRef]);
}
function resetFields(lists) {
  if (lists) {
    Object.entries(lists).forEach(([key]) => lists[key].reset());
  }
}

exports.useDynamicListReset = useDynamicListReset;
