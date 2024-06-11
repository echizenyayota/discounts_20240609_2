/// <reference types="react" />
import type { FieldStates, ErrorValue } from '../../../types';
export type ListAction<Item> = ReinitializeAction<Item> | AddFieldItemAction<Item> | EditFieldItemAction<FieldStates<object>> | MoveFieldItemAction | RemoveFieldItemAction | RemoveFieldItemsAction | UpdateErrorAction<Item> | UpdateAction<Item, keyof Item> | ResetAction<Item, keyof Item> | NewDefaultAction<Item, keyof Item> | ResetListAction;
interface ReinitializeAction<Item> {
    type: 'reinitialize';
    payload: {
        list: Item[];
    };
}
interface AddFieldItemAction<Item> {
    type: 'addFieldItem';
    payload: {
        list: Item[];
    };
}
interface EditFieldItemAction<Item extends object> {
    type: 'editFieldItem';
    payload: {
        index: number;
        editedItem: Item;
    };
}
interface MoveFieldItemAction {
    type: 'moveFieldItem';
    payload: {
        fromIndex: number;
        toIndex: number;
    };
}
interface ResetListAction {
    type: 'resetList';
}
interface RemoveFieldItemAction {
    type: 'removeFieldItem';
    payload: {
        indexToRemove: number;
    };
}
interface RemoveFieldItemsAction {
    type: 'removeFieldItems';
    payload: {
        indicesToRemove: number[];
    };
}
interface TargetedPayload<Item, Key extends keyof Item> {
    target: {
        index: number;
        key: Key;
    };
    value: Item[Key];
}
interface UpdateErrorAction<Item> {
    type: 'updateError';
    payload: {
        target: {
            index: number;
            key: keyof Item;
        };
        error: ErrorValue;
    };
}
interface ResetAction<Item, Key extends keyof Item> {
    type: 'reset';
    payload: {
        target: {
            index: number;
            key: Key;
        };
    };
}
interface UpdateAction<Item, Key extends keyof Item> {
    type: 'update';
    payload: TargetedPayload<Item, Key>;
}
interface NewDefaultAction<Item, Key extends keyof Item> {
    type: 'newDefaultValue';
    payload: TargetedPayload<Item, Key>;
}
export declare function reinitializeAction<Item>(list: Item[]): ReinitializeAction<Item>;
export declare function addFieldItemAction<Item>(list: Item[]): AddFieldItemAction<Item>;
export declare function editFieldItemAction<Item extends object>(editedItem: Item, index: number): EditFieldItemAction<Item>;
export declare function moveFieldItemAction(fromIndex: number, toIndex: number): MoveFieldItemAction;
export declare function removeFieldItemAction(indexToRemove: number): RemoveFieldItemAction;
export declare function removeFieldItemsAction(indicesToRemove: number[]): RemoveFieldItemsAction;
export declare function updateAction<Item, Key extends keyof Item>(payload: TargetedPayload<Item, Key>): UpdateAction<Item, Key>;
export declare function resetAction<Item, Key extends keyof Item>(payload: ResetAction<Item, Key>['payload']): ResetAction<Item, Key>;
export declare function resetListAction(): ResetListAction;
export declare function newDefaultAction<Item, Key extends keyof Item>(payload: TargetedPayload<Item, Key>): NewDefaultAction<Item, Key>;
export declare function updateErrorAction<Item>(payload: UpdateErrorAction<Item>['payload']): UpdateErrorAction<Item>;
export interface ListState<Item extends object> {
    list: FieldStates<Item>[];
    initial: Item[];
}
export declare function useListReducer<Item extends object>(initial: Item[]): [ListState<Item>, import("react").Dispatch<ListAction<Item>>];
export {};
//# sourceMappingURL=reducer.d.ts.map