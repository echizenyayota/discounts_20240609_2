import type { FieldDictionary, FieldStates } from '../../types';
import type { FieldListConfig } from './baselist';
export interface DynamicList<Item extends object> {
    fields: FieldDictionary<Item>[];
    addItem(factoryArgument?: any): void;
    editItem(item: FieldStates<Item>, index: number): void;
    removeItem(index: number): void;
    removeItems(indicesToRemove: number[]): void;
    moveItem(fromIndex: number, toIndex: number): void;
    reset(): void;
    dirty: boolean;
    value: Item[];
    defaultValue: Item[];
    newDefaultValue(newDefaultItems: Item[]): void;
}
type FactoryFunction<Item extends object> = (factoryArgument?: any) => Item | Item[];
export declare function useDynamicList<Item extends object>(listOrConfig: FieldListConfig<Item> | Item[], fieldFactory: FactoryFunction<Item>, validationDependencies?: unknown[]): DynamicList<Item>;
export {};
//# sourceMappingURL=dynamiclist.d.ts.map