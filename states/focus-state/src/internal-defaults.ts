// Types:
import {
    type FocusStateProps,
}                           from './types.js'



/**
 * A default declarative focus state to apply when neither `focused` prop nor `defaultFocused` option is explicitly provided.
 * 
 * This fallback ensures the component uses diagnostic mode by default,
 * deferring the actual focus resolution to external logic via `computedFocus`.
 * 
 * - `'auto'`: enables automatic focus resolution based on `computedFocus`.
 */
export const defaultDeclarativeFocused : Required<FocusStateProps>['focused'] = 'auto';
