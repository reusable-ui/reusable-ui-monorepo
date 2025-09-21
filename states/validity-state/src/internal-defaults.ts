// Types:
import {
    type ValidityStateProps,
}                           from './types.js'



/**
 * A default declarative validity state to apply when neither `validity` prop nor `defaultValidity` option are explicitly provided.
 * 
 * This fallback ensures the component uses diagnostic mode by default,
 * deferring the actual validity resolution to external logic via `computedValidity`.
 * 
 * - `'auto'`: enables automatic validity resolution based on `computedValidity`.
 */
export const declarativeDefaultValidity : Required<ValidityStateProps>['validity'] = 'auto';



/**
 * A default effective validity state to apply when no effective `validity` value can be resolved.
 * 
 * This fallback applies when `validity` prop is set to `'auto'` but no `computedValidity` is provided.
 * It ensures the component remains in an unresolved state rather than defaulting to valid or invalid.
 * 
 * - `null`: represents an unresolved or pending validity state.
 */
export const effectiveDefaultValidity   : boolean | null = null;
