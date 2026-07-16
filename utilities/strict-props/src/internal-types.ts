/**
 * Surfaces forgotten or unintended props in component contracts,
 * making them easy to spot and remove during development.
 * 
 * Any prop outside the allowed set is flagged by typing it as `never`.
 * 
 * @template TRestProps The remaining properties being validated.
 * @template TBaseProps The base props type (e.g. HTML attributes).
 * @template TExtraProps Any additional allowed props.
 */
export type ForbiddenProps<
    TRestProps extends TBaseProps,
    TBaseProps extends {},
    TExtraProps extends {} = {}
> = {
    /**
     * 🚫 The foreign properties that should be removed.
     */
    [Key in Exclude<keyof TRestProps, keyof TBaseProps | keyof TExtraProps>]: never
}
