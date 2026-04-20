// Types:
import {
    type DragStateProps,
}                           from './types.js'



/**
 * A default declarative drag state to apply when neither `dragged` prop nor `defaultDragged` option is explicitly provided.
 * 
 * This fallback ensures the component uses automatic mode by default,
 * deferring the actual drag resolution to external logic via `computedDrag`.
 * 
 * - `'auto'`: enables automatic drag resolution based on `computedDrag`.
 */
export const defaultDeclarativeDragged : Required<DragStateProps>['dragged'] = 'auto';



/**
 * A default fallback drag state to apply when no `fallbackDragged` option is explicitly provided and no effective drag value can be resolved.
 * 
 * This fallback applies when `dragged` prop is set to `'auto'` but no `computedDrag` is provided.
 * It ensures the component remains in the original position rather than defaulting to dragged state.
 * 
 * - `false`: placed at the target or original position.
 */
export const defaultFallbackDragged    : boolean                             = false;
