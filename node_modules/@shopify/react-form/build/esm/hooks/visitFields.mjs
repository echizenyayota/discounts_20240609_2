import { useRef, useCallback } from 'react';
import { reduceFields } from '../utilities.mjs';

function useVisitFields(fieldBag, visitor) {
  const fieldBagRef = useRef(fieldBag);
  fieldBagRef.current = fieldBag;
  return useCallback(() => {
    reduceFields(fieldBagRef.current, (_, field) => visitor(field));
  }, [visitor]);
}

export { useVisitFields as default };
