// Types:
import {
    type HoverStateProps,
}                           from './types.js'



/**
 * A default declarative hover state to apply when neither `hovered` prop nor `defaultHovered` option is explicitly provided.
 * 
 * This fallback ensures the component uses diagnostic mode by default,
 * deferring the actual hover resolution to external logic via `computedHover` (if provided), or internal hover observer.
 * 
 * - `'auto'`: enables automatic hover resolution based on `computedHover` (if provided), or internal hover observer.
 */
export const defaultDeclarativeHovered : Required<HoverStateProps>['hovered'] = 'auto';
