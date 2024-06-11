import { reduceFields } from '../utilities.mjs';

function useDirty(fieldBag) {
  return reduceFields(fieldBag, (dirty, field) => dirty || field.dirty, false);
}

export { useDirty };
