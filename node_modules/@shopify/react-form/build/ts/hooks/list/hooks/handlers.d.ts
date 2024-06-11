/// <reference types="react" />
import type { FieldDictionary, NormalizedValidationDictionary } from '../../../types';
import type { ListState, ListAction } from './reducer';
export declare function useHandlers<Item extends object>(state: ListState<Item>, dispatch: React.Dispatch<ListAction<Item>>, validationConfigs: NormalizedValidationDictionary<any>): FieldDictionary<Item>[];
//# sourceMappingURL=handlers.d.ts.map