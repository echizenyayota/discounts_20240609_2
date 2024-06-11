import type { Reducer } from 'react';
import type { FieldState, ErrorValue, DirtyStateComparator } from '../../types';
export interface ReducerOptions<Value> {
    dirtyStateComparator?: DirtyStateComparator<Value>;
}
interface UpdateErrorAction {
    type: 'updateError';
    payload: ErrorValue[] | ErrorValue;
}
interface ResetAction {
    type: 'reset';
}
interface UpdateAction<Value> {
    type: 'update';
    payload: Value;
}
interface NewDefaultAction<Value> {
    type: 'newDefaultValue';
    payload: Value;
}
export declare function updateAction<Value>(value: Value): UpdateAction<Value>;
export declare function resetAction(): ResetAction;
export declare function newDefaultAction<Value>(value: Value): NewDefaultAction<Value>;
export declare function updateErrorAction(error: ErrorValue[] | ErrorValue): UpdateErrorAction;
export type FieldAction<Value> = UpdateErrorAction | ResetAction | UpdateAction<Value> | NewDefaultAction<Value>;
export declare function reduceField<Value>(prevState: FieldState<Value>, action: FieldAction<Value>): FieldState<Value>;
export declare function makeFieldReducer<Value>({ dirtyStateComparator, }: ReducerOptions<Value>): Reducer<FieldState<Value>, FieldAction<Value>>;
export declare function useFieldReducer<Value>(value: Value, dirtyStateComparator?: DirtyStateComparator<Value>): [FieldState<Value>, import("react").Dispatch<FieldAction<Value>>];
export declare function initialFieldState<Value>(value: Value): FieldState<Value>;
export {};
//# sourceMappingURL=reducer.d.ts.map