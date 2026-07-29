// Cssfn:
import {
    // Cssfn css specific types:
    // type CssCustomRef,
    
    
    
    // Writes css in javascript:
    rule,
    rules,
    // fallback,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    // switchOf,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui features:
import {
    usingBorderFeature,
}                           from '@reusable-ui/border-feature'      // A styling utility for resolving the appropriate border color, geometry, and radius based on the currently active variants — including theme, mild, outlined, and stripped.

// Types:
import {
    type CssStackedLayoutOptions,
    type CssStackedLayout,
}                           from './css-types.js'

// CSS Variables:
import {
    stackedLayoutVars,
}                           from './css-internal-variables.js'

// Utilities:
import {
    logicalSides,
    sideFactorMap,
    logicalAxes,
    axisFactorMap,
}                           from './css-internal-utilities.js'



/**
 * Seamlessly stacks multiple components into a unified container,
 * making individual sub-elements **visually appear as a single composite component**.
 * 
 * It provides a **common foundation** for building composite components with sectioned sub-elements, such as:
 * - `<Group>` — grouping controls inline or block.
 * - `<List>` — stacked list items with unified borders.
 * - `<Card>` — content with optional header and footer.
 * - Any custom groupable components.
 * 
 * Exposes strongly typed CSS variables for advanced customization.
 * 
 * Reactively adapts to the configured orientation and direction
 * by consuming the provided configuration CSS variables.
 * Dynamically adjusts the container's corner radii and stroke widths.
 * All runtime calculations are performed entirely in CSS,
 * leveraging `calc(…)` and algebraic logic.
 * 
 * @param options An optional configuration for customizing stacked layouts.
 * @returns A CSS API containing logic, corner, and separator rules, along with CSS variables for the stacked layout.
 */
export const usingStackedLayout = (options?: CssStackedLayoutOptions): CssStackedLayout => {
    // Extract options and assign defaults:
    const {
        orientation              = 'block',              // Defaults to `'block'` (vertical stacking in horizontal-tb).
        flowDirection            = 'start',              // Defaults to `'start'` (the stack begins at the logical start side).
        
        innerStartCornerSelector = ':first-child',       // Defaults to `':first-child'`.
        innerEndCornerSelector   = ':last-child',        // Defaults to `':last-child'`.
        separatorBeforeSelector  = ':not(:first-child)', // Defaults to `':not(:first-child)'`.
    } = options ?? {};
    
    
    
    /**
     * Normalizes `orientation` into a numeric factor usable in CSS math:
     * - Resolves to `+1` for `'block'` (or `1`).
     * - Resolves to `-1` for `'inline'` (or `0`).
     * - Resolves to a math expression that evaluates to `+1` or `-1`.
     * 
     * The result is guaranteed to be either `+1`, `-1`, or a calc-safe math formula,
     * so it can be safely consumed inside `calc()` or other CSS functions.
     */
    const orientationFactor : 1 | -1 | `(${string})` = (
        ((orientation === 'block') || (orientation === 1))
        ? 1
        : (
            ((orientation === 'inline') || (orientation === 0))
            ? -1
            : `(2 * ${orientation} - 1)`
        )
    );
    
    /**
     * Normalizes `flowDirection` into a numeric factor usable in CSS math:
     * - Resolves to `+1` for `'start'` (or `0`).
     * - Resolves to `-1` for `'end'` (or `1`).
     * - Resolves to a math expression that evaluates to `+1` or `-1`.
     * 
     * The result is guaranteed to be either `+1`, `-1`, or a calc-safe math formula,
     * so it can be safely consumed inside `calc()` or other CSS functions.
     */
    const flowDirectionFactor : 1 | -1 | `(${string})` = (
        ((flowDirection === 'start') || (flowDirection === 0))
        ? 1
        : (
            ((flowDirection === 'end') || (flowDirection === 1))
            ? -1
            : `(1 - 2 * ${flowDirection})`
        )
    );
    
    
    
    // Features:
    const { borderFeatureVars } = usingBorderFeature();
    
    
    
    return {
        stackedLogicRule       : () => style({
            // Computes the four inner corner radii:
            // - Captures the parent container's `border*Radius`.
            //   Child components may override their own `--border*Radius`,
            //   but this variable preserves the parent's value for consistent radii.
            // - Acts as a **proxy** for reading the parent's custom property
            //   (analogy: `var-of-parent(--borderStartStartRadius)`).
            // - Adjusts the captured value to be slightly smaller than the container's radius.
            // - Resolves to `0px` when the container's corner is square.
            // - Resolves to `0px` when the container's border width is too large relative to its radius.
            // - Base formula: `container border radius - container border width`.
            // - Extended formula: `container border radius - (average of border block width and border inline width)`.
            // - `max(0px, …)` ensures a square radius in cases where the container's corner is square or the border width exceeds the radius.
            ...rules(
                logicalSides.map((blockSide) =>
                    logicalSides.map((inlineSide) =>
                        vars({
                            [stackedLayoutVars[`innerCorner${blockSide}${inlineSide}Radius`]] :
                                `max(0px, ${borderFeatureVars[`border${blockSide}${inlineSide}Radius`]} - ((${borderFeatureVars[`borderBlock${blockSide}Width`]} + ${borderFeatureVars[`borderInline${inlineSide}Width`]}) / 2))`,
                        })
                    )
                )
            ),
            
            
            
            // Captures the container's base border widths:
            // - Captures the parent container's `border*BaseWidth`.
            //   Child components may override their own `--border*BaseWidth`,
            //   but this variable preserves the parent's value for consistent separators.
            // - Acts as a **proxy** for reading the parent's custom property
            //   (analogy: `var-of-parent(--borderInlineBaseWidth)`).
            // - Used for consistent separator thickness between stacked children.
            ...rules(
                logicalAxes.map((axis) =>
                    vars({
                        [stackedLayoutVars[`separatorBorder${axis}Width`]] :
                            borderFeatureVars[`border${axis}BaseWidth`],
                    })
                )
            ),
        }),
        
        stackedInnerCornerRule : () => style({
            // Reset all corner factors to zero by default:
            ...vars({
                [stackedLayoutVars.innerStartCornerFactor] : 0,
                [stackedLayoutVars.innerEndCornerFactor  ] : 0,
            }),
            
            
            
            /**
             * Applies inner corner radii to children based on orientation, flow direction, and position.
             * 
             * ### Activation Rules
             * - Matches the configured **orientation** (`block` or `inline`).
             * - Matches the configured **flow direction** (`start` or `end`).
             * - Matches the target **child position** (first, last, or only).
             * 
             * ### Behavior
             * - When active, the computed `innerCorner*Radius` is applied to the corresponding corner.
             * - When inactive, the radius resolves to `0px`.
             * - `innerStartCornerFactor` and `innerEndCornerFactor` act as binary flags (0 or 1).
             * - Factors normally evaluate to `+1` (default) but flip to `-1` for opposite configurations.
             * - `min(1, …)` ensures that when both factors are set (only child), gates clamp to `1` instead of `2`.
             * - `max(0, …)` ensures inactive formulas clamp to `0`.
             * 
             * ### Active Gate Table (LTR writing mode)
             * 
             * The table below shows which corners activate depending on orientation, flow direction, and child position.
             * "Active" means the corner receives its `innerCorner*Radius`, while "Inactive" means it resolves to `0px`.
             * 
             * | Flow Direction | Orientation | Block Side | Inline Side | Gate          | Start-Corner Activation   | End-Corner Activation     |
             * |----------------|-------------|------------|-------------|---------------|---------------------------|---------------------------|
             * | Start (+1)     | Block  (+1) | Start (+1) | Start (+1)  | Active   (+1) | Top-Left         Active   | Top-Left         Inactive |
             * | Start (+1)     | Block  (+1) | Start (+1) | End   (-1)  | Active   (+1) | Top-Right        Active   | Top-Right        Inactive |
             * | Start (+1)     | Block  (+1) | End   (-1) | Start (+1)  | Inactive (-1) | Bottom-Left      Inactive | Bottom-Left      Active   |
             * | Start (+1)     | Block  (+1) | End   (-1) | End   (-1)  | Inactive (-1) | Bottom-Right     Inactive | Bottom-Right     Active   |
             * | Start (+1)     | Inline (-1) | Start (+1) | Start (+1)  | Active   (+1) | Left-Top         Active   | Left-Top         Inactive |
             * | Start (+1)     | Inline (-1) | Start (+1) | End   (-1)  | Inactive (-1) | Right-Top        Inactive | Right-Top        Active   |
             * | Start (+1)     | Inline (-1) | End   (-1) | Start (+1)  | Active   (+1) | Left-Bottom      Active   | Left-Bottom      Inactive |
             * | Start (+1)     | Inline (-1) | End   (-1) | End   (-1)  | Inactive (-1) | Right-Bottom     Inactive | Right-Bottom     Active   |
             * | End   (-1)     | Block  (+1) | Start (+1) | Start (+1)  | Inactive (-1) | Top-Left         Inactive | Top-Left         Active   |
             * | End   (-1)     | Block  (+1) | Start (+1) | End   (-1)  | Inactive (-1) | Top-Right        Inactive | Top-Right        Active   |
             * | End   (-1)     | Block  (+1) | End   (-1) | Start (+1)  | Active   (+1) | Bottom-Left      Active   | Bottom-Left      Inactive |
             * | End   (-1)     | Block  (+1) | End   (-1) | End   (-1)  | Active   (+1) | Bottom-Right     Active   | Bottom-Right     Inactive |
             * | End   (-1)     | Inline (-1) | Start (+1) | Start (+1)  | Inactive (-1) | Left-Top         Inactive | Left-Top         Active   |
             * | End   (-1)     | Inline (-1) | Start (+1) | End   (-1)  | Active   (+1) | Right-Top        Active   | Right-Top        Inactive |
             * | End   (-1)     | Inline (-1) | End   (-1) | Start (+1)  | Inactive (-1) | Left-Bottom      Inactive | Left-Bottom      Active   |
             * | End   (-1)     | Inline (-1) | End   (-1) | End   (-1)  | Active   (+1) | Right-Bottom     Active   | Right-Bottom     Inactive |
             * 
             * ### Compact Corner Activation (LTR writing mode)
             * 
             * | Orientation | Flow Direction | Start-Corner Activation   | End-Corner Activation     |
             * |-------------|----------------|---------------------------|---------------------------|
             * | Block  (+1) | Start (+1)     | Top-Left,    Top-Right    | Bottom-Left, Bottom-Right |
             * | Block  (+1) | End   (-1)     | Bottom-Left, Bottom-Right | Top-Left,    Top-Right    |
             * | Inline (-1) | Start (+1)     | Left-Top,    Left-Bottom  | Right-Top,   Right-Bottom |
             * | Inline (-1) | End   (-1)     | Right-Top,   Right-Bottom | Left-Top,    Left-Bottom  |
             * 
             * **Note:** When the container has only one child, both `innerStartCornerFactor` and `innerEndCornerFactor` are set to `1`, so all four corners activate.
             */
            ...rule(innerStartCornerSelector, {
                ...vars({
                    [stackedLayoutVars.innerStartCornerFactor] : 1,
                }),
            }),
            ...rule(innerEndCornerSelector, {
                ...vars({
                    [stackedLayoutVars.innerEndCornerFactor  ] : 1,
                }),
            }),
            ...rules(
                logicalSides.map((blockSide) =>
                    logicalSides.map((inlineSide) =>
                        vars({
                            [borderFeatureVars[`border${blockSide}${inlineSide}Radius`]]:
                                `calc(${stackedLayoutVars[`innerCorner${blockSide}${inlineSide}Radius`]} * (max(0, ${orientationFactor}) * min(1, max(0, ${sideFactorMap[blockSide]} * ${stackedLayoutVars.innerStartCornerFactor} * ${flowDirectionFactor}) + max(0, ${sideFactorMap[blockSide]} * -1 * ${stackedLayoutVars.innerEndCornerFactor} * ${flowDirectionFactor})) + max(0, ${orientationFactor} * -1) * min(1, max(0, ${sideFactorMap[inlineSide]} * ${stackedLayoutVars.innerStartCornerFactor} * ${flowDirectionFactor}) + max(0, ${sideFactorMap[inlineSide]} * -1 * ${stackedLayoutVars.innerEndCornerFactor} * ${flowDirectionFactor}))))`,
                        })
                    )
                )
            ),
        }),
        
        stackedSeparatorRule   : () => style({
            // Reset the separator factor to zero by default:
            ...vars({
                [stackedLayoutVars.separatorBeforeFactor] : 0,
            }),
            
            
            
            /**
             * Applies separator borders to the sides facing the previous sibling when activation conditions are met.
             * 
             * ### Activation Rules
             * - Matches the configured **orientation** (`block` or `inline`).
             * - Matches the configured **flow direction** (`start` or `end`).
             * - Matches the target **child position** (applies only to children after the first).
             * 
             * ### Behavior
             * - When active, the computed `separatorBorder*Width` is applied to the corresponding side.
             * - When inactive, the width resolves to `0px`.
             * - Factors normally evaluate to `+1` (default) but flip to `-1` for opposite configurations.
             * - `max(0, …)` ensures inactive formulas clamp to `0`.
             * 
             * ### Active Gate Table (LTR writing mode)
             * 
             * The table below shows which side borders activate depending on orientation and flow direction.
             * "Active" means the side receives its `separatorBorder*Width`, while "Inactive" means it resolves to `0px`.
             * 
             * | Flow Direction | Orientation | Axis        | Side       | Gate          | Separator Activation |
             * |----------------|-------------|-------------|------------|---------------|----------------------|
             * | Start (+1)     | Block  (+1) | Block  (+1) | Start (+1) | Active   (+1) | Top         Active   |
             * | Start (+1)     | Block  (+1) | Block  (+1) | End   (-1) | Inactive (-1) | Bottom      Inactive |
             * | Start (+1)     | Block  (+1) | Inline (-1) | Start (+1) | Inactive (-1) | Left        Inactive |
             * | Start (+1)     | Block  (+1) | Inline (-1) | End   (-1) | Inactive (-1) | Right       Inactive |
             * | Start (+1)     | Inline (-1) | Block  (+1) | Start (+1) | Active   (+1) | Top         Inactive |
             * | Start (+1)     | Inline (-1) | Block  (+1) | End   (-1) | Inactive (-1) | Bottom      Inactive |
             * | Start (+1)     | Inline (-1) | Inline (-1) | Start (+1) | Active   (+1) | Left        Active   |
             * | Start (+1)     | Inline (-1) | Inline (-1) | End   (-1) | Inactive (-1) | Right       Inactive |
             * | End   (-1)     | Block  (+1) | Block  (+1) | Start (+1) | Inactive (-1) | Top         Inactive |
             * | End   (-1)     | Block  (+1) | Block  (+1) | End   (-1) | Active   (+1) | Bottom      Active   |
             * | End   (-1)     | Block  (+1) | Inline (-1) | Start (+1) | Inactive (-1) | Left        Inactive |
             * | End   (-1)     | Block  (+1) | Inline (-1) | End   (-1) | Inactive (-1) | Right       Inactive |
             * | End   (-1)     | Inline (-1) | Block  (+1) | Start (+1) | Inactive (-1) | Top         Inactive |
             * | End   (-1)     | Inline (-1) | Block  (+1) | End   (-1) | Inactive (-1) | Bottom      Inactive |
             * | End   (-1)     | Inline (-1) | Inline (-1) | Start (+1) | Inactive (-1) | Left        Inactive |
             * | End   (-1)     | Inline (-1) | Inline (-1) | End   (-1) | Active   (+1) | Right       Active   |
             * 
             * ### Compact Border Activation (LTR writing mode)
             * 
             * | Orientation | Flow Direction | Separator Activation |
             * |-------------|----------------|----------------------|
             * | Block  (+1) | Start (+1)     | Top                  |
             * | Block  (+1) | End   (-1)     | Bottom               |
             * | Inline (-1) | Start (+1)     | Left                 |
             * | Inline (-1) | End   (-1)     | Right                |
             */
            ...rule(separatorBeforeSelector, {
                ...vars({
                    [stackedLayoutVars.separatorBeforeFactor] : 1,
                }),
            }),
            ...rules(
                logicalAxes.map((axis) =>
                    logicalSides.map((side) =>
                        vars({
                            [borderFeatureVars[`border${axis}${side}Width`]]:
                                `calc(${stackedLayoutVars[`separatorBorder${axis}Width`]} * max(0, ${orientationFactor} * ${axisFactorMap[axis]}) * max(0, ${sideFactorMap[side]} * ${stackedLayoutVars.separatorBeforeFactor} * ${flowDirectionFactor}))`,
                        })
                    )
                )
            ),
        }),
        
        stackedLayoutVars,
    } satisfies CssStackedLayout;
};
