/**
 * Ensures that no foreign properties are present by setting their types to `never`.
 * This type is used to display all forgotten foreign props so we know which props were forgotten to be removed.
 */
export type DisallowedProps<TRestProps extends TBaseProps, TBaseProps extends {}, TExtraProps extends {} = {}> = {
    [prop in Exclude<keyof TRestProps, keyof TBaseProps | keyof TExtraProps>] : never
}

/**
 * Asserts that no foreign properties are present in the given props.
 * If foreign properties are found, it returns `never`.
 * 
 * @template TRestProps - The type of the remaining properties.
 * @template TBaseProps - The base properties type.
 * @template TExtraProps - The extra properties type.
 */
export type AssertNoForeignProps<TRestProps extends TBaseProps, TBaseProps extends {}, TExtraProps extends {} = {}> =
    {} extends Omit<Required<TRestProps>, keyof TBaseProps | keyof TExtraProps>
    ? unknown
    : never

/**
 * Ensures that no foreign properties are present in the given props.
 * If foreign properties are found, it returns `DisallowedProps`.
 * 
 * @template TRestProps - The type of the remaining properties.
 * @template TBaseProps - The base properties type.
 * @template TExtraProps - The extra properties type.
 */
export type NoForeignProps<TRestProps extends TBaseProps, TBaseProps extends {}, TExtraProps extends {} = {}> =
    {} extends Omit<Required<TRestProps>, keyof TBaseProps | keyof TExtraProps>
    ? TRestProps
    : DisallowedProps<TRestProps, TBaseProps, TExtraProps>

/**
 * Validates that no foreign properties are present in the given props.
 * This function does not perform any runtime validation; all checks are done by TypeScript.
 * 
 * @template TRestProps - The type of the remaining properties.
 * @template TBaseProps - The base properties type.
 * @template TExtraProps - The extra properties type.
 * @param {TRestProps} restProps - The remaining properties to validate.
 * @returns {true} - Always returns true as the validation is done by TypeScript.
 */
export const validateNoForeignProps =
    <TRestProps extends TBaseProps, TBaseProps extends {}, TExtraProps extends {} = {}>(restProps: TRestProps):
        restProps is {} extends Omit<Required<TRestProps>, keyof TBaseProps | keyof TExtraProps> ? TRestProps : (DisallowedProps<TRestProps, TBaseProps, TExtraProps> & TRestProps) => true // no actual runtime validation, all is done by TypeScript check
