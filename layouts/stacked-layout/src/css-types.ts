// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssCustomRef,
    type CssRule,
    type CssSelectorCollection,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * A list of CSS variables used for stacked-layout styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface StackedLayoutVars {
    /**
     * A captured and adjusted inner radius for the top-left corner (or top-right in RTL).
     * 
     * - Captures the parent container's `borderStartStartRadius`.
     *   Child components may override their own `--borderStartStartRadius`,
     *   but this variable preserves the parent's value for consistent radii.
     * - Acts as a **proxy** for reading the parent's custom property
     *   (analogy: `var-of-parent(--borderStartStartRadius)`).
     * - Adjusts the captured value to be slightly smaller than the container's radius.
     * - Resolves to `0px` when the container's corner is square.
     * - Resolves to `0px` when the container's border width is too large relative to its radius.
     * - Applied to the corners of the first and last children.
     */
    innerCornerStartStartRadius : unknown
    
    /**
     * A captured and adjusted inner radius for the top-right corner (or top-left in RTL).
     * 
     * - Captures the parent container's `borderStartEndRadius`.
     *   Child components may override their own `--borderStartEndRadius`,
     *   but this variable preserves the parent's value for consistent radii.
     * - Acts as a **proxy** for reading the parent's custom property
     *   (analogy: `var-of-parent(--borderStartEndRadius)`).
     * - Adjusts the captured value to be slightly smaller than the container's radius.
     * - Resolves to `0px` when the container's corner is square.
     * - Resolves to `0px` when the container's border width is too large relative to its radius.
     * - Applied to the corners of the first and last children.
     */
    innerCornerStartEndRadius   : unknown
    
    /**
     * A captured and adjusted inner radius for the bottom-left corner (or bottom-right in RTL).
     * 
     * - Captures the parent container's `borderEndStartRadius`.
     *   Child components may override their own `--borderEndStartRadius`,
     *   but this variable preserves the parent's value for consistent radii.
     * - Acts as a **proxy** for reading the parent's custom property
     *   (analogy: `var-of-parent(--borderEndStartRadius)`).
     * - Adjusts the captured value to be slightly smaller than the container's radius.
     * - Resolves to `0px` when the container's corner is square.
     * - Resolves to `0px` when the container's border width is too large relative to its radius.
     * - Applied to the corners of the first and last children.
     */
    innerCornerEndStartRadius   : unknown
    
    /**
     * A captured and adjusted inner radius for the bottom-right corner (or bottom-left in RTL).
     * 
     * - Captures the parent container's `borderEndEndRadius`.
     *   Child components may override their own `--borderEndEndRadius`,
     *   but this variable preserves the parent's value for consistent radii.
     * - Acts as a **proxy** for reading the parent's custom property
     *   (analogy: `var-of-parent(--borderEndEndRadius)`).
     * - Adjusts the captured value to be slightly smaller than the container's radius.
     * - Resolves to `0px` when the container's corner is square.
     * - Resolves to `0px` when the container's border width is too large relative to its radius.
     * - Applied to the corners of the first and last children.
     */
    innerCornerEndEndRadius     : unknown
    
    /**
     * A captured inline-axis border width for separating inner child components.
     * 
     * - Captures the parent container's `borderInlineBaseWidth`.
     *   Child components may override their own `--borderInlineBaseWidth`,
     *   but this variable preserves the parent's value for consistent separators.
     * - Acts as a **proxy** for reading the parent's custom property
     *   (analogy: `var-of-parent(--borderInlineBaseWidth)`).
     * - Applied to the inline sides facing the previous sibling
     *   (stacked horizontally in horizontal-tb).
     */
    separatorBorderInlineWidth  : unknown
    
    /**
     * A captured block-axis border width for separating inner child components.
     * 
     * - Captures the parent container's `borderBlockBaseWidth`.
     *   Child components may override their own `--borderBlockBaseWidth`,
     *   but this variable preserves the parent's value for consistent separators.
     * - Acts as a **proxy** for reading the parent's custom property
     *   (analogy: `var-of-parent(--borderBlockBaseWidth)`).
     * - Applied to the block sides facing the previous sibling
     *   (stacked vertically in horizontal-tb).
     */
    separatorBorderBlockWidth   : unknown
}



/**
 * Configuration options for customizing stacked layouts.
 */
export interface CssStackedLayoutOptions {
    /**
     * Defines the logical axis along which child components are stacked.
     * 
     * Accepts:
     * - `'inline'` → stack along the inline axis (horizontal in horizontal-tb).
     * - `'block'`  → stack along the block axis (vertical in horizontal-tb).
     * - `0`        → equivalent to `'inline'`.
     * - `1`        → equivalent to `'block'`.
     * - A CSS variable reference resolving to `0` or `1`, e.g. `var(--my-orientation)`.
     * 
     * Defaults to `'block'` (vertical stacking in horizontal-tb).
     */
    orientation              ?: 'inline' | 'block' | 0 | 1 | CssCustomRef
    
    /**
     * Defines the logical side from which the stack begins (the smallest index).
     * 
     * Accepts:
     * - `'start'` → the stack begins at the logical start side.
     * - `'end'`   → the stack begins at the logical end side.
     * - `0`        → equivalent to `'start'`.
     * - `1`        → equivalent to `'end'`.
     * - A CSS variable reference resolving to `0` or `1`, e.g. `var(--my-flowDirection)`.
     * 
     * Defaults to `'start'` (the stack begins at the logical start side).
     */
    flowDirection            ?: 'start' | 'end' | 0 | 1 | CssCustomRef
    
    /**
     * Defines one or more selectors used to match the child element
     * that should display the **starting rounded corners** of the stack.
     * 
     * Defaults to `':first-child'`.
     */
    innerStartCornerSelector ?: CssSelectorCollection
    
    /**
     * Defines one or more selectors used to match the child element
     * that should display the **ending rounded corners** of the stack.
     * 
     * Defaults to `':last-child'`.
     */
    innerEndCornerSelector   ?: CssSelectorCollection
    
    /**
     * Defines one or more selectors used to match child elements
     * that should render a **styled separator border before themselves**,
     * visually dividing them from the preceding sibling.
     * 
     * Defaults to `':not(:first-child)'`.
     */
    separatorBeforeSelector  ?: CssSelectorCollection
}



/**
 * Provides a CSS API for seamlessly stacking multiple components into a unified container,
 * making individual sub-elements **visually appear as a single composite component**.
 */
export interface CssStackedLayout {
    /**
     * Attaches CSS rules at the **container level** to capture the container's border properties (stroke and corners)
     * and expose the required CSS variables for stacked layout.
     * 
     * Only provides logical CSS variables needed for stacking.
     * Border style, color, and other properties are not affected.
     * 
     * Purpose:
     * - Captures the container's base border widths and corner radii before any child overrides.
     * - Exposes these values as CSS variables for consistent references across children.
     * 
     * Usage:
     * - Must be applied to the container element (or an intermediate wrapper between container and children)
     *   to establish a shared baseline.
     */
    stackedLogicRule       : Lazy<CssRule>
    
    /**
     * Attaches CSS rules at the **child level** to adjust corner radii to rounded or squared
     * so that the stacked children align with the container's outer corners.
     * 
     * Only manages border radii.
     * Border style, color, and other properties are not affected.
     * Optionally combine with `usingBorderFeature()` on child elements to render borders —
     * otherwise this rule only *clips* the corners (rounded corners remain visible with focus rings or shadows).
     * 
     * Purpose:
     * - Ensures the first and last children have rounded outer corners,
     *   and squared inner corners.
     * - Ensures middle children have all squared corners,
     *   for seamless interior edges.
     * - Ensures the overall group appears as a single rounded rectangle.
     * - Ensures inner corners visually align with the container's outer corners,
     *   even if children override their own base border radii.
     * 
     * Usage:
     * - Must be applied to child elements inside the stacked container.
     */
    stackedInnerCornerRule : Lazy<CssRule>
    
    /**
     * Attaches CSS rules at the **child level** (optional) to create visual separators
     * between stacked children.
     * 
     * Only manages border widths.
     * Border style and color must be provided separately.
     * Use `usingBorderFeature()` on child elements to correctly render separators.
     * 
     * Purpose:
     * - Adds separators between stacked children by applying borders
     *   to sides facing the previous sibling.
     * - Ensures consistent separator thickness,
     *   even if children override their own base border widths.
     * 
     * Usage:
     * - Apply only if visual separation between children is desired.
     */
    stackedSeparatorRule   : Lazy<CssRule>
    
    /**
     * Exposes strongly typed stacked-layout CSS variables.
     * 
     * Includes:
     * - `separatorBorder*Width` : Captured container's border widths for separators.
     * - `innerCorner*Radius`    : Captured and adjusted container's corner radii for inner children.
     * 
     * Typically, you don't need to use these variables directly —
     * `stackedInnerCornerRule()` and `stackedSeparatorRule()` are ready-to-use for you.
     * 
     * For advanced use cases, these variables can be used for custom styling
     * (e.g. feeding into `calc(…)` or other CSS functions).
     */
    stackedLayoutVars      : CssVars<StackedLayoutVars>
}
