import type { FieldBag, Field } from '../types';
interface FieldVisitor {
    (field: Field<any>): void;
}
export default function useVisitFields(fieldBag: FieldBag, visitor: FieldVisitor): () => void;
export {};
//# sourceMappingURL=visitFields.d.ts.map