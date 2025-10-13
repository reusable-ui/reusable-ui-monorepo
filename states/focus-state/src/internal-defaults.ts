// Types:
import {
    type FocusStateProps,
    type FocusStateOptions,
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



/**
 * A default input-like focus behavior to apply when the `inputLikeFocus` prop is not explicitly provided.
 * 
 * This fallback determines whether the component should visually behave like a native input—
 * always showing a focus ring when focused, regardless of input modality.
 * 
 * - `false`: disables input-like styling by default, relying on `:focus-visible` heuristics.
 */
export const defaultInputLikeFocus: Required<FocusStateOptions>['inputLikeFocus'] = false;
