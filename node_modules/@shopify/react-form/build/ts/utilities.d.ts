import type { ChangeEvent } from 'react';
import type { Validates, Validator, FieldOutput, FieldBag, FormMapping, Field, FormError, DynamicListBag } from './types';
export declare function isField<T extends Object>(input: any): input is Field<T>;
export declare function mapObject<Output>(input: any, mapper: (value: any, key: any) => any): Output;
export declare function normalizeValidation<Value, Context extends object = {}>(input: Validates<Value, Context>): Validator<Value, Context>[];
export declare function isChangeEvent(value: any): value is ChangeEvent<HTMLInputElement>;
export declare function propagateErrors(fieldBag: {
    [key: string]: FieldOutput<any>;
}, errors: FormError[]): void;
export declare function reduceFields<V>(fieldBag: FieldBag, reduceFn: (accumulator: V, currentField: Field<any>, path: (string | number)[], fieldBag: FieldBag) => V, initialValue?: V, reduceEmptyFn?: (accumulator: V, value: any, path: (string | number)[], fieldBag: FieldBag) => V): V;
export declare function fieldsToArray(fieldBag: FieldBag): Field<any>[];
export declare function validateAll(fieldBag: FieldBag): FormError[];
export declare function getValues<T extends FieldBag>(fieldBag: T): FormMapping<T, "value">;
export declare function getDirtyValues<T extends FieldBag>(fieldBag: T): any;
export declare function noop(): void;
export declare function shallowArrayComparison(arrA: unknown[], arrB: any): boolean;
export declare function defaultDirtyComparator<Value>(defaultValue: Value, newValue: Value): boolean;
export declare function makeCleanFields(fieldBag: FieldBag): void;
export declare function makeCleanDynamicLists(dynamicLists?: DynamicListBag): void;
//# sourceMappingURL=utilities.d.ts.map