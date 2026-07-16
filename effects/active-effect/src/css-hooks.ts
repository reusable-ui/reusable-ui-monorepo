// Cssfn:
import {
    // Writes css in javascript:
    rules,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    switchOf,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssActiveEffectOptions,
    type CssActiveEffect,
}                           from './css-types.js'

// CSS Variables:
import {
    activeEffectVars,
}                           from './css-internal-variables.js'

// Reusable-ui variants:
import {
    usingMildVariant,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.
import {
    usingOutlinedVariant,
}                           from '@reusable-ui/outlined-variant'    // A utility for managing visual outline consistently across React components.

// Reusable-ui features:
import {
    usingBackgroundFeature,
}                           from '@reusable-ui/background-feature'  // A styling utility for resolving the appropriate background color based on the currently active variants — including theme, emphasize, mild, outlined, and stripped.
import {
    usingForegroundFeature,
}                           from '@reusable-ui/foreground-feature'  // A styling utility for resolving the appropriate foreground color based on the currently active variants — including theme, mild, and outlined.
import {
    usingDecorationFeature,
}                           from '@reusable-ui/decoration-feature'  // A styling utility for resolving the appropriate decoration color based on the currently active variants — including theme, mild, and outlined.
import {
    usingBorderFeature,
}                           from '@reusable-ui/border-feature'      // A styling utility for resolving the appropriate border color, geometry, and radius based on the currently active variants — including theme, mild, outlined, and stripped.

// Reusable-ui states:
import {
    usingActiveState,
}                           from '@reusable-ui/active-state'        // Lifecycle-aware activation state with transition animations and semantic styling hooks for UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.



/**
 * Applies active-state effects that emphasize the current theme colors,
 * making components **visually stand out** when active.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Behavior:
 * - Regular variants: darken in light mode or lighten in dark mode.
 * - Mild/outlined variants: interpolate from variant colors to regular colors.
 * 
 * Smoothly transitions between active and inactive states by animating colors and/or filter effects.
 * Affects background, foreground, decoration, and border colors.
 * 
 * @param options An optional configuration for customizing active effects.
 * @returns A CSS API containing effect rules and CSS variables for highlighting theme colors.
 */
export const usingActiveEffect = (options?: CssActiveEffectOptions): CssActiveEffect => {
    // Extract options and assign defaults:
    const {
        brightness = 0.5, // Defaults to `0.5` (fairly darken in light mode, fairly lighten in dark mode).
        
        ...restOptions
    } = options ?? {};
    
    
    
    // Variants:
    const { mildVariantVars     : { isMild     } } = usingMildVariant();
    const { outlinedVariantVars : { isOutlined } } = usingOutlinedVariant();
    
    // Features:
    const { backgroundFeatureVars : { regularBackgCond , backgVariantColor , backgColorOverride  } } = usingBackgroundFeature();
    const { foregroundFeatureVars : { regularForegCond , foregVariantColor , foregColorOverride  } } = usingForegroundFeature();
    const { decorationFeatureVars : { regularDecorCond , decorVariantColor , decorColorOverride  } } = usingDecorationFeature();
    const { borderFeatureVars     : { regularBorderCond, borderVariantColor, borderColorOverride } } = usingBorderFeature();
    
    // States:
    const { activeStateVars : { activeFactorCond } } = usingActiveState();
    
    // Variables:
    const { bumpFactorCond, effectiveFactorCond, activeFilter } = activeEffectVars;
    
    
    
    return {
        activeEffectRule : () => style({
            ...rules(
                [
                    // Domain-specific color overrides:
                    { regularColor: regularBackgCond , variantColor: backgVariantColor , overrideVar: backgColorOverride  },
                    { regularColor: regularForegCond , variantColor: foregVariantColor , overrideVar: foregColorOverride  },
                    { regularColor: regularDecorCond , variantColor: decorVariantColor , overrideVar: decorColorOverride  },
                    { regularColor: regularBorderCond, variantColor: borderVariantColor, overrideVar: borderColorOverride },
                ].map(({ regularColor, variantColor, overrideVar }) =>
                    vars({
                        /**
                         * Color override:
                         * - Fully inactive         → `unset`
                         * - Regular variants       → `unset`
                         * - Mild/outlined variants → Interpolates between variant and regular colors.
                         * 
                         * Behavior:
                         * - factor = 0      → Original variant color.
                         * - factor = 1      → Strong regular color.
                         * - Between 0 and 1 → Smooth interpolation between original and strong color.
                         */
                        [overrideVar]:
`
${switchOf(isMild, isOutlined)}

color-mix(in oklch,
    ${variantColor}
    calc((1 - ${activeFactorCond}) * 100%),
    
    ${switchOf(regularColor, variantColor)}
    calc(${activeFactorCond} * 100%)
)`,
                    })
                ),
            ),
            
            
            
            /**
             * Bump factor:
             * - Fully inactive         → `unset` (`activeFactorCond` is `unset` when fully inactive, so the bump factor is also `unset`).
             * - Regular variants       → `unset` (`isMild` and `isOutlined` are both `unset` for regular variants, so the bump factor is also `unset`).
             * - Mild/outlined variants → The bump factor on overshoot/undershoot:
             *   - Factor > 1      → Positive (over-emphasizes).
             *   - Factor < 0      → Negative (under-emphasizes).
             *   - Between 0 and 1 → 0 (neutral).
             */
            [bumpFactorCond]:
`
${switchOf(isMild, isOutlined)}

calc(
    max(0, ${activeFactorCond} - 1)
    +
    min(0, ${activeFactorCond})
)
`,
            
            /**
             * Effective factor:
             * - Fully inactive         → `unset` (`bumpFactorCond` and `activeFactorCond` are both `unset` when fully inactive, so the effective factor is also `unset`).
             * - Regular variants       → Mirrors the active factor (`bumpFactorCond` is `unset` but falls back to `activeFactorCond` for regular variants, so the effective factor directly reflects the active factor).
             * - Mild/outlined variants → The bump factor on overshoot/undershoot (driven by `bumpFactorCond`):
             *   - Factor > 1      → Positive (over-emphasizes).
             *   - Factor < 0      → Negative (under-emphasizes).
             *   - Between 0 and 1 → 0 (neutral).
             */
            [effectiveFactorCond]: switchOf(
                bumpFactorCond,
                activeFactorCond
            ),
            
            /**
             * Active filter:
             * - Fully inactive         → `unset`
             * - Regular variants       → Interpolates filter effect adjustments.
             * - Mild/outlined variants → Neutral at factors between 0 and 1, but responds to overshoot/undershoot.
             */
            [activeFilter]: composeFilterEffect(effectiveFactorCond, { ...restOptions, enablesReverseIntent: false, brightness }),
        }),
        
        activeEffectVars,
    } satisfies CssActiveEffect;
};
