'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function useDynamicListDirty(lists) {
  return lists ? Object.entries(lists).some(([key]) => lists[key].dirty) : false;
}

exports.useDynamicListDirty = useDynamicListDirty;
