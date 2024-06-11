import useVisitFields from './visitFields.mjs';

function useReset(fieldBag) {
  return useVisitFields(fieldBag, resetField);
}
function resetField(field) {
  field.reset();
}

export { useReset };
