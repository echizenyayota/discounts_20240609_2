/// <reference types="react" />
import type { ValidationDictionary, FieldDictionary, ListValidationContext } from '../../types';
import type { ListAction } from './hooks';
export interface FieldListConfig<Item extends object> {
    list: Item[];
    validates?: Partial<ValidationDictionary<Item, ListValidationContext<Item>>>;
}
interface BaseList<Item extends object> {
    fields: FieldDictionary<Item>[];
    dispatch: React.Dispatch<ListAction<Item>>;
    reset(): void;
    dirty: boolean;
    defaultValue: Item[];
    value: Item[];
    newDefaultValue(newDefaultItems: Item[]): void;
}
export declare function useBaseList<Item extends object>(listOrConfig: FieldListConfig<Item> | Item[], validationDependencies?: unknown[]): BaseList<Item>;
export {};
//# sourceMappingURL=baselist.d.ts.map