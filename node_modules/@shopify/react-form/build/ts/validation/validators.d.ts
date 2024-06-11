import type { ErrorContent } from './validator';
export declare function lengthMoreThan(length: any, error: ErrorContent<string>): (input: {
    length: number;
}) => string | undefined;
export declare function lengthLessThan(length: number, error: ErrorContent<string>): (input: {
    length: number;
}) => string | undefined;
export declare function notEmpty(error: ErrorContent<string>): (input: any) => string | undefined;
export declare function notEmptyString(error: ErrorContent<string>): (input: string) => string | undefined;
export declare function positiveIntegerString(error: ErrorContent<string>): (input: string) => string | undefined;
export declare function positiveNumericString(error: ErrorContent<string>): (input: string) => string | undefined;
export declare function numericString(error: ErrorContent<string>): (input: string) => string | undefined;
//# sourceMappingURL=validators.d.ts.map