// Types:
import {
    type StrippedVariantProps,
}                           from './types.js'



/**
 * A default declarative stripped state to apply when neither `stripped` prop nor `defaultStripped` option is explicitly provided.
 * 
 * This fallback preserves full visual framing by default,
 * ensuring the component appears with backgrounds, borders, and paddings unless explicitly set to stripped mode.
 * 
 * - `false`: preserves full visual framing by default.
 */
export const defaultDeclarativeStripped : Extract<Required<StrippedVariantProps<true>>['stripped'], false> = false;
