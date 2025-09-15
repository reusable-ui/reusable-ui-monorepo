// Types:
import {
    type ValidityStateProps,
}                           from './types.js'



/**
 * A default intermediate validity state to apply when no `validity` prop is explicitly provided.
 * 
 * This fallback signals that the component should operate in diagnostic mode,
 * deferring the actual validity resolution to external logic (e.g. `computedValidity`).
 *
 * - `'auto'`: enables reactive, externally derived validity behavior.
 */
export const semiDefaultValidity  : Required<ValidityStateProps>['validity'] = 'auto';



/**
 * A default final validity state to apply when no effective `validity` value can be resolved.
 * 
 * This fallback applies when `validity` prop is set to `'auto'` but no `computedValidity` is provided.
 * It ensures graceful rendering in the absence of diagnostic input—typically interpreted as 'unvalidated'.
 * 
 * - `null`: represents an unresolved or pending validity state.
 */
export const finalDefaultValidity : boolean | null = null;
