import type { FormMapping, SubmitHandler, SubmitResult, FieldBag, FormError, DynamicListBag } from '../types';
export declare function useSubmit<T extends FieldBag>(onSubmit: SubmitHandler<FormMapping<T, "value">> | undefined, fieldBag: T, makeCleanAfterSubmit?: boolean, dynamicListBag?: DynamicListBag): {
    submit: (event?: React.FormEvent) => Promise<void>;
    submitting: boolean;
    errors: FormError[];
    setErrors: (errors: FormError[]) => void;
};
/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`.
 * @return Returns a `SubmitResult` representing your successful form submission.
 */
export declare function submitSuccess(): SubmitResult;
/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`
 * @param errors - An array of errors with the user's input. These can either include both a `field` and a `message`, in which case they will be passed down to a matching field, or just a `message`.
 * @return Returns a `SubmitResult` representing your failed form submission.
 */
export declare function submitFail(errors?: FormError[]): SubmitResult;
//# sourceMappingURL=submit.d.ts.map