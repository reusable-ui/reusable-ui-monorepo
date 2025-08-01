// Reusable-ui variants:
import {
    type SizeVariantProps,
}                           from '@reusable-ui/size-variant'        // A utility for managing sizes consistently across React components.
import {
    type ThemeVariantProps,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.
import {
    type EmphasizeVariantProps,
}                           from '@reusable-ui/emphasize-variant'   // A utility for managing visual emphasis consistently across React components.
import {
    type OutlineVariantProps,
}                           from '@reusable-ui/outline-variant'     // A utility for managing visual outline consistently across React components.
import {
    type MildVariantProps,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.



/**
 * Props for specifying all known styling-related variants of the component.
 * 
 * These variants affect the visual tone and appearance of the component,
 * and can be extracted or forwarded to synchronize styling across composite UIs.
 * 
 * Includes:
 * - `size`
 * - `theme`
 * - `emphasized`
 * - `outlined`
 * - `mild`
 */
export interface StylingVariantsProps
    extends
        // Known styling-related variants:
        SizeVariantProps,
        ThemeVariantProps,
        EmphasizeVariantProps,
        OutlineVariantProps,
        MildVariantProps
{
}

/**
 * Represents the collected known styling-related variant props of the component.
 * 
 * Includes:
 * - `size`
 * - `theme`
 * - `emphasized`
 * - `outlined`
 * - `mild`
 * 
 * Values may be absolute or relative (e.g. `'inherit'`, `'invert'`),
 * and are captured as-is without computing the final visual outcome.
 * Undefined props are excluded from the result.
 * 
 * Useful for forwarding styling-related variants to nested or sibling components without manual prop selection.
 */
export interface CollectedStylingVariants
    extends
        StylingVariantsProps
{
    /* All known styling props are included with their current values. */
}
