import type { Validates, Field, DirtyStateComparator } from '../../types';
export interface FieldConfig<Value> {
    value: Value;
    validates: Validates<Value>;
    dirtyStateComparator?: DirtyStateComparator<Value>;
}
/**
 * A custom hook for handling the state and validations of an input field.
 *
 * In it's simplest form `useField` can be called with a single parameter for the default value of the field.
 *
 * ```typescript
 * const field = useField('default value');
 * ```
 *
 * You can also pass a more complex configuration object specifying a validation function.
 *
 *
 * ```typescript
 *const field = useField({
 *  value: someRemoteData.title,
 *  validates: (title) => {
 *    if (title.length > 3) {
 *      return 'Title must be longer than three characters';
 *    }
 *  }
 *});
 * ```
 *
 * You may also pass multiple validators.
 *
 *```typescript
 * const field = useField({
 *   value: someRemoteData.title,
 *   validates: [
 *      (title) => {
 *         if (title.length > 3) {
 *           return 'Title must be longer than three characters';
 *         }
 *      },
 *      (title) => {
 *         if (!title.includes('radical')) {
 *           return 'only radical items allowed!';
 *         }
 *       }
 *    ],
 * });
 * ```
 *
 * Generally, you will want to use the object returned from useField to handle state for exactly one form input.
 *
 * ```typescript
 * const field = useField('default value');
 * return (
 *   <div>
 *     <label htmlFor="test-field">
 *       Test field{' '}
 *       <input
 *         id="test-field"
 *         name="test-field"
 *         value={field.value}
 *         onChange={field.onChange}
 *         onBlur={field.onBlur}
 *       />
 *     </label>
 *     {field.error && <p>{field.error}</p>}
 *   </div>
 * );
 * ```
 *
 * If using `@shopify/polaris` or other custom components that support `onChange`, `onBlur`, `value`, and `error` props then
 * you can accomplish the above more tersely by using the ES6 `spread` (...) operator.
 *
 * ```typescript
 * const title = useField('default title');
 * return (<TextField label="Title" {...title} />);
 * ```
 *
 * @param config - The default value of the input, or a configuration object specifying both the value and validation config.
 * @param validationDependencies - An array of values for determining when to regenerate the field's validation callbacks. Any value that is referenced by a validator other than those passed into it should be included.
 * @returns A `Field` object representing the state of your input. It also includes functions to manipulate that state. Generally, you will want to pass these callbacks down to the component or components representing your input.
 *
 * @remarks
 * **Reinitialization:** If the `value` property of the field configuration changes between calls to `useField`,
 * the field will be reset to use it as it's new default value.
 *
 * **Imperative methods:** The returned `Field` object contains a number of methods used to imperatively alter its state.
 * These should only be used as escape hatches where the existing hooks and components do not make your life easy,
 * or to build new abstractions in the same vein as `useForm`, `useSubmit` and friends.
 */
export declare function useField<Value = string>(input: FieldConfig<Value> | Value, dependencies?: unknown[]): Field<Value>;
export type ChoiceField<Value = boolean> = Omit<Field<Value>, 'value' | 'onChange'> & {
    checked: boolean;
    onChange(checked: boolean): void;
};
/**
 * Converts a standard `Field<Value>` into a `ChoiceField` that is compatible
 * with `<Checkbox />` and `<RadioButton />` components in `@shopify/polaris`.
 *
 * For fields that are used by both a choice components and other components, it
 * can be beneficial to retain the original `Field<Value>` shape and convert
 * the field on the fly for the choice component.
 *
 * For multi-value base fields (not simple boolean fields), you can provide a
 * checkedValue predicate to project the base field's value into the boolean
 * checked state so that it can function with multiple <RadioButton /> choice
 * components.
 *
 * ```typescript
 * const enabled = useField(false);
 * return (<Checkbox label="Enabled" {...asChoiceField(enabled)} />);
 *
 * const field = useField<'A' | 'B'>('A');
 * const radioA = (<RadioButton label="A" {...asChoiceField(field, 'A')} />)
 * const radioB = (<RadioButton label="B" {...asChoiceField(field, 'B')} />)
 * ```
 */
export declare function asChoiceField<Value>({ value, ...fieldData }: Field<Value>, checkedValue?: Value): ChoiceField<Value>;
/**
 * Converts a standard `Field<Value>` into a form that is compatible
 * with the `<ChoiceList />` component in `@shopify/polaris`.
 *
 * For fields that are used by both choice components and other components, it
 * can be beneficial to retain the original `Field<Value>` shape and convert
 * the field on the fly for the choice component.
 *
 * It only works with Radio buttons (single selection), not checkboxes.
 *
 * ```typescript
 * enum Color { Red = "red", Green = "green" }
 *
 * const choices = [
 *   { label: "Red", value: Color.Red },
 *   { label: "Green", value: Color.Green },
 * ]
 *
 * const color = useField(Color.Red);
 * return (<ChoiceList {...asChoiceList(color)} title="Color" choices={choices} />);
 * ```
 */
export declare function asChoiceList<Value extends string | undefined | null>({ value, onChange, ...fieldData }: Field<Value>): {
    selected: (Value & {})[];
    onChange: (selected: Exclude<Value, null | undefined>[]) => void;
    allowMultiple: boolean;
    error: import("../../types").ErrorValue;
    allErrors?: import("../../types").ErrorValue[] | undefined;
    defaultValue: Value;
    touched: boolean;
    dirty: boolean;
    onBlur(): void;
    runValidation(value?: Value | undefined): import("../../types").ErrorValue;
    setError(value: import("../../types").ErrorValue): void;
    newDefaultValue(value: Value): void;
    reset(): void;
};
/**
 * A simplification to `useField` that returns a `ChoiceField` by automatically
 * converting a boolean field using `asChoiceField` for direct use in choice
 * components.
 *
 * ```typescript
 * const enabled = useChoiceField(false);
 * return (<Checkbox label="Enabled" {...enabled} />);
 * ```
 */
export declare function useChoiceField(input: FieldConfig<boolean> | boolean, dependencies?: unknown[]): ChoiceField<boolean>;
//# sourceMappingURL=field.d.ts.map