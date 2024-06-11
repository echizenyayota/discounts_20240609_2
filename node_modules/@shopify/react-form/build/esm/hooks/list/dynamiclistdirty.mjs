function useDynamicListDirty(lists) {
  return lists ? Object.entries(lists).some(([key]) => lists[key].dirty) : false;
}

export { useDynamicListDirty };
