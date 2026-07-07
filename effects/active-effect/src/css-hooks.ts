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
    usingOutlineVariant,
}                           from '@reusable-ui/outline-variant'     // A utility for managing visual outline consistently across React components.
import {
    usingMildVariant,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.

// Reusable-ui features:
import {
    usingBackgroundFeature,
}                           from '@reusable-ui/background-feature'  // A styling utility for resolving the appropriate background color based on the currently active variants — including theme, emphasize, outline, mild, and stripped.
import {
    usingForegroundFeature,
}                           from '@reusable-ui/foreground-feature'  // A styling utility for resolving the appropriate foreground color based on the currently active variants — including theme, outline, and mild.
import {
    usingDecorationFeature,
}                           from '@reusable-ui/decoration-feature'  // A styling utility for resolving the appropriate decoration color based on the currently active variants — including theme, outline, and mild.
import {
    usingBorderFeature,
}                           from '@reusable-ui/border-feature'      // A styling utility for resolving the appropriate border color, geometry, and radius based on the currently active variants — including theme, outline, mild, and stripped.

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
 * - Outlined/mild variants: interpolate from variant colors to regular colors.
 * 
 * Smoothly transitions between active and inactive states by animating colors and/or filter effects.
 * Affects background, foreground, decoration, and border colors.
 * 
 * @param options - An optional configuration for customizing active effects.
 * @returns A CSS API containing effect rules and CSS variables for highlighting theme colors.
 */
export const usingActiveEffect = (options?: CssActiveEffectOptions): CssActiveEffect => {
    // Extract options and assign defaults:
    const {
        brightness = 0.5, // Defaults to `0.5` (fairly darken in light mode, fairly lighten in dark mode).
        
        ...restOptions
    } = options ?? {};
    
    
    
    // Variants:
    const { outlineVariantVars : { isOutlined } } = usingOutlineVariant();
    const { mildVariantVars    : { isMild     } } = usingMildVariant();
    
    // Features:
    const { backgroundFeatureVars : { backgRegularCond , backgVariantColor , backgColorOverride  } } = usingBackgroundFeature();
    const { foregroundFeatureVars : { foregRegularCond , foregVariantColor , foregColorOverride  } } = usingForegroundFeature();
    const { decorationFeatureVars : { decorRegularCond , decorVariantColor , decorColorOverride  } } = usingDecorationFeature();
    const { borderFeatureVars     : { borderRegularCond, borderVariantColor, borderColorOverride } } = usingBorderFeature();
    
    // States:
    const { activeStateVars : { activeFactorCond } } = usingActiveState();
    
    // Variables:
    const { bumpFactorCond, effectiveFactorCond, activeFilter } = activeEffectVars;
    
    
    
    return {
        activeEffectRule : () => style({
            ...rules(
                [
                    // Domain-specific color overrides:
                    { regularColor: backgRegularCond , variantColor: backgVariantColor , overrideVar: backgColorOverride  },
                    { regularColor: foregRegularCond , variantColor: foregVariantColor , overrideVar: foregColorOverride  },
                    { regularColor: decorRegularCond , variantColor: decorVariantColor , overrideVar: decorColorOverride  },
                    { regularColor: borderRegularCond, variantColor: borderVariantColor, overrideVar: borderColorOverride },
                ].map(({ regularColor, variantColor, overrideVar }) =>
                    vars({
                        /**
                         * Color override:
                         * - Fully inactive         → `unset`
                         * - Regular variants       → `unset`
                         * - Outlined/mild variants → Interpolates between variant and regular colors.
                         * 
                         * Behavior:
                         * - factor = 0      → Original variant color.
                         * - factor = 1      → Strong regular color.
                         * - Between 0 and 1 → Smooth interpolation between original and strong color.
                         */
                        [overrideVar]:
`
${switchOf(isOutlined, isMild)}

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
             * - Regular variants       → `unset` (`isOutlined and `isMild` are both `unset` for regular variants, so the bump factor is also `unset`).
             * - Outlined/mild variants → The bump factor on overshoot/undershoot:
             *   - Factor > 1      → Positive (over-emphasizes).
             *   - Factor < 0      → Negative (under-emphasizes).
             *   - Between 0 and 1 → 0 (neutral).
             */
            [bumpFactorCond]:
`
${switchOf(isOutlined, isMild)}

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
             * - Outlined/mild variants → The bump factor on overshoot/undershoot (driven by `bumpFactorCond`):
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
             * - Outlined/mild variants → Neutral at factors between 0 and 1, but responds to overshoot/undershoot.
             */
            [activeFilter]: composeFilterEffect(effectiveFactorCond, { ...restOptions, enablesReverseIntent: false, brightness }),
        }),
        
        activeEffectVars,
    } satisfies CssActiveEffect;
};
