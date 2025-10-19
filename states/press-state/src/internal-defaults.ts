// Types:
import {
    type PressStateProps,
}                           from './types.js'



/**
 * A default declarative press state to apply when neither `pressed` prop nor `defaultPressed` option is explicitly provided.
 * 
 * This fallback ensures the component uses diagnostic mode by default,
 * deferring the actual press resolution to external logic via `computedPress` (if provided), or internal press observer.
 * 
 * - `'auto'`: enables automatic press resolution based on `computedPress` (if provided), or internal press observer.
 */
export const defaultDeclarativePressed : Required<PressStateProps>['pressed'] = 'auto';
