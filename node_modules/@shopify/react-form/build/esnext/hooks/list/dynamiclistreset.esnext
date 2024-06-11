import { useCallback } from 'react';
import { useLazyRef } from '@shopify/react-hooks';

function useDynamicListReset(lists) {
  const listBagRef = useLazyRef(() => lists);
  listBagRef.current = lists;
  return useCallback(() => {
    return resetFields(listBagRef.current);
  }, [listBagRef]);
}
function resetFields(lists) {
  if (lists) {
    Object.entries(lists).forEach(([key]) => lists[key].reset());
  }
}

export { useDynamicListReset };
