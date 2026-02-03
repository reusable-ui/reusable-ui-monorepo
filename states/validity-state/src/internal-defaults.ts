// Types:
import {
    type ValidityStateProps,
}                           from './types.js'



/**
 * A default enable validation setting for `<ValidityStateProvider>` when no `enableValidation` prop is explicitly provided.
 * 
 * This fallback ensures the validation is enabled within the provider's scope by default,
 * allowing descendant components to participate in validation.
 * This continues unless a child explicitly sets `cascadeValidation = false`.
 * 
 * - `true`: enables validation by default.
 */
export const defaultProviderEnableValidation : Required<ValidityStateProps>['enableValidation']  = true;



/**
 * A default declarative validity state to apply when neither `validity` prop nor `defaultValidity` option is explicitly provided.
 * 
 * This fallback ensures the component uses automatic mode by default,
 * deferring the actual validity resolution to external logic via `computedValidity`.
 * 
 * - `'auto'`: enables automatic validity resolution based on `computedValidity`.
 */
export const defaultDeclarativeValidity      : Required<ValidityStateProps>['validity']          = 'auto';



/**
 * A default cascade validation setting to apply when no `cascadeValidation` prop is explicitly provided.
 * 
 * This fallback ensures the component (or `<ValidityStateProvider>`) inherits the validation policy
 * from its nearest `<ValidityStateProvider>` by default,
 * ensuring consistent cascading behavior across the tree.
 * 
 * - `true`: enables cascading of the validation policy by default.
 */
export const defaultCascadeValidation        : Required<ValidityStateProps>['cascadeValidation'] = true;



/**
 * A default fallback validity state to apply when no `fallbackValidity` option is explicitly provided and no effective validity value can be resolved.
 * 
 * This fallback applies when `validity` prop is set to `'auto'` but no `computedValidity` is provided.
 * It ensures the component remains in an unresolved state rather than defaulting to valid or invalid.
 * 
 * - `null`: represents an unresolved or pending validity state.
 */
export const defaultFallbackValidity         : boolean | null                                    = null;
