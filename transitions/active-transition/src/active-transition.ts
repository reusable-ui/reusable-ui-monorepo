// Cssfn:
import {
    // Writes css in javascript:
    rules,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
    switchOf,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type ActiveTransitionVars,
    type CssActiveTransitionOptions,
    type CssActiveTransition,
}                           from './types.js'

// Reusable-ui configs:
import {
    colorParamVars,
}                           from '@reusable-ui/colors'              // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
// Reusable-ui variants:
import {
    usesOutlineVariant,
}                           from '@reusable-ui/outline-variant'     // A utility for managing visual outline consistently across React components.
import {
    usesMildVariant,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.

// Reusable-ui features:
import {
    usesBackgroundFeature,
}                           from '@reusable-ui/background-feature'  // A styling utility for resolving the appropriate background color based on the currently active variants — including theme, emphasize, outline, mild, and bare.
import {
    usesForegroundFeature,
}                           from '@reusable-ui/foreground-feature'  // A styling utility for resolving the appropriate foreground color based on the currently active variants — including theme, outline, and mild.
import {
    usesDecorationFeature,
}                           from '@reusable-ui/decoration-feature'  // A styling utility for resolving the appropriate decoration color based on the currently active variants — including theme, outline, and mild.
import {
    usesBorderFeature,
}                           from '@reusable-ui/border-feature'      // A styling utility for resolving the appropriate border color, geometry, and radius based on the currently active variants — including theme, outline, mild, and bare.
import {
    filterRegistry
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesActiveState,
}                           from '@reusable-ui/active-state'        // Lifecycle-aware activation state with transition animations and semantic styling hooks for UI components.



/**
 * A strongly typed global mapping of active-transition CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [activeTransitionVars] = cssVars<ActiveTransitionVars>({ prefix: 'act', minify: false });

// Register the active filter globally for composing a unified filter stack across state packages:
filterRegistry.registerFilter(activeTransitionVars.activeFilter);



/**
 * Applies active-state transitions that emphasize the current theme colors,
 * making the component **visually stand out** when active.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Behavior:
 * - Regular variants: darken in light mode or lighten in dark mode.
 * - Outlined/mild variants: interpolate from variant colors to regular colors.
 * 
 * Smoothly transitions between inactive and active states.
 * Affects background, foreground, decoration, and border colors.
 * 
 * @param options - An optional configuration for customizing active-state transitions.
 * @returns A CSS API containing transition rules and active-transition CSS variables for highlighting theme colors.
 */
export const usesActiveTransition = (options?: CssActiveTransitionOptions): CssActiveTransition => {
    // Extract options and assign defaults:
    const {
        activeBrightness = 1,
        activeContrast   = 1,
        activeSaturate   = 1,
    } = options ?? {};
    
    
    // Configs:
    const { mode } = colorParamVars;
    
    // Variants:
    const { outlineVariantVars : { isOutlined } } = usesOutlineVariant();
    const { mildVariantVars    : { isMild     } } = usesMildVariant();
    
    // Features:
    const { backgroundFeatureVars : { backgRegularCond , backgVariantColor , backgColorOverride  } } = usesBackgroundFeature();
    const { foregroundFeatureVars : { foregRegularCond , foregVariantColor , foregColorOverride  } } = usesForegroundFeature();
    const { decorationFeatureVars : { decorRegularCond , decorVariantColor , decorColorOverride  } } = usesDecorationFeature();
    const { borderFeatureVars     : { borderRegularCond, borderVariantColor, borderColorOverride } } = usesBorderFeature();
    
    // States:
    const { activeStateVars : { activeFactorCond } } = usesActiveState();
    
    // Variables:
    const { bumpFactorCond, effectiveFactorCond, activeFilter } = activeTransitionVars;
    
    
    return {
        activeTransitionRule : () => style({
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
                         * - Fully inactive → ignored (browser skips invalid formula).
                         * - Regular        → ignored.
                         * - Outlined/mild  → interpolates between variant and regular colors.
                         * 
                         * 
                         * Behavior:
                         * - factor = 0      → color = original variant color.
                         * - factor = 1      → color = strong regular color.
                         * - Between 0 and 1 → smooth interpolation between original and strong color.
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
             * - Fully inactive : ignored (browser skips invalid formula).
             * - Regular        : ignored.
             * - Outlined/mild  :
             *   - activeFactor > 1 → grows positively (overshoot).
             *   - activeFactor < 0 → grows negatively (undershoot).
             *   - otherwise        → stays 0.
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
             * - Fully inactive : ignored (browser skips invalid formula).
             * - Regular        : mirrors activeFactor directly.
             * - Outlined/mild  :
             *   - activeFactor > 1 → grows positively (overshoot).
             *   - activeFactor < 0 → grows negatively (undershoot).
             *   - otherwise        → stays 0.
             */
            [effectiveFactorCond]: switchOf(
                bumpFactorCond,
                activeFactorCond
            ),
            
            /**
             * Active filter:
             * - Fully inactive → ignored (browser skips invalid formula).
             * - Regular        → interpolates brightness/contrast/saturate adjustment.
             * - Outlined/mild  → neutral at factor ∈ [0,1], but responds to overshoot/undershoot
             *                    via `bumpFactorCond` (darken/lighten beyond endpoints).
             * 
             * 
             * Behavior:
             * - factor = 0      → all filters = 1 (neutral, no adjustment).
             * - factor = 1      → filters = configured values (target).
             * - Between 0 and 1 → smooth interpolation between neutral and target.
             * 
             * 
             * Notes:
             * 
             * Brightness (adaptive for light/dark mode):
             *   brightness = 1 - (1 - targetBrightness) * effectiveFactorCond
             * 
             * Where targetBrightness is chosen automatically based on `mode`:
             * - Light mode (mode = +1) → targetBrightness = activeBrightness
             *   (values < 1 darken, values > 1 lighten).
             * - Dark mode  (mode = -1) → targetBrightness = 1.25 - (activeBrightness - 0.7) * 0.75
             *   (reciprocal flips darken ↔ lighten).
             * 
             * Implementation detail:
             * We avoid ternary conditionals by using a weighted-average trick:
             * 
             *   (((1 + mode) / 2) * activeBrightness)
             *   +
             *   (((1 - mode) / 2) * (1.25 - (activeBrightness - 0.7) * 0.75))
             * 
             * Because mode is guaranteed to be ±1:
             * - mode = +1 → resolves to `activeBrightness`.
             * - mode = -1 → resolves to `1.25 - (activeBrightness - 0.7) * 0.75`.
             * 
             * This ensures:
             * - At factor = 0 → brightness = 1 (neutral).
             * - At factor = 1 → brightness = targetBrightness.
             * - Between 0 and 1 → smooth interpolation.
             */
            [activeFilter]:
`
brightness(calc(
    1 - (1 - (
        (((1 + ${mode}) / 2) * ${activeBrightness})
        +
        (((1 - ${mode}) / 2) * (1.25 - (${activeBrightness} - 0.7) * 0.75))
    )) * ${effectiveFactorCond}
))
contrast(calc(1 - (1 - ${activeContrast}) * ${effectiveFactorCond}))
saturate(calc(1 - (1 - ${activeSaturate}) * ${effectiveFactorCond}))
`,
        }),
        
        activeTransitionVars,
    } satisfies CssActiveTransition;
};
