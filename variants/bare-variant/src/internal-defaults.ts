// Types:
import {
    type BareVariantProps,
}                           from './types.js'



/**
 * A default declarative bare state to apply when neither `bare` prop nor `defaultBare` option is explicitly provided.
 * 
 * This fallback preserves full visual framing by default,
 * ensuring the component appears with backgrounds, borders, and paddings unless explicitly set to bare mode.
 * 
 * - `false`: preserves full visual framing by default.
 */
export const defaultDeclarativeBare : Extract<Required<BareVariantProps<true>>['bare'], false> = false;
