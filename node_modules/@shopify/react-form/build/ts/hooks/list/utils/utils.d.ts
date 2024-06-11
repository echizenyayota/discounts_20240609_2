import type { Validator, FieldStates, ErrorValue, ListValidationContext } from '../../../types';
export declare function runValidation<Value, Record extends object>(updateError: (error: ErrorValue) => void, state: {
    value: Value;
    listItem: FieldStates<Record>;
    siblings: FieldStates<Record>[];
}, validators: Validator<Value, ListValidationContext<Record>>[]): ErrorValue;
//# sourceMappingURL=utils.d.ts.map