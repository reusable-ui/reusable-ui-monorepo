// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
    type CssKnownBaseProps,
    
    
    
    // Writes css in javascript:
    style,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type HoverEffectVars,
    type CssHoverEffectOptions,
    type CssHoverEffect,
}                           from './types.js'

// Utilities:
import {
    // Types:
    type CssNumericFormula,
    type CssNumeric,
    
    
    
    // Filter functions:
    opacity,
    brightness,
    contrast,
    saturate,
    hueRotate,
    blur,
    dropShadow,
}                           from './css-formulas.js'
import {
    // Types:
    type FilterSchema,
    type ConditionContext,
    
    
    
    // Utilities:
    schemaToCssFormula,
}                           from './css-schemas.js'

// Reusable-ui configs:
import {
    colorParamVars,
}                           from '@reusable-ui/colors'              // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesHoverState,
}                           from '@reusable-ui/hover-state'         // Lifecycle-aware hover/unhover state with transition animations and semantic styling hooks for UI components.



/**
 * A strongly typed global mapping of hover-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [hoverEffectVars] = cssVars<HoverEffectVars>({ prefix: 'hoe', minify: false });

// Register the hover filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(hoverEffectVars.hoverFilter);



/**
 * Applies hover-state effects that signal interactivity,
 * making components **visually responsive and clearly distinguishable from static content**.
 * 
 * Hover effects convey clickability, editability, or other available actions
 * by providing subtle visual feedback during interaction.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between unhover and hover states by animating filter effects.
 * Preserves the current theme colors and variants while enhancing emphasis
 * through responsive visual cues.
 * 
 * @param options - An optional configuration for customizing hover effects.
 * @returns A CSS API containing effect rules and CSS variables for signaling component interactivity.
 */
export const usesHoverEffect = (options?: CssHoverEffectOptions): CssHoverEffect => {
    // Extract options and assign defaults:
    const {
        hoverOpacity        = null,
        hoverBrightness     = 0.95, // Defaults to `0.95` (slightly darken for light mode, slightly lighten for dark mode).
        hoverContrast       = null,
        hoverSaturate       = null,
        hoverHueRotate      = null,
        hoverBlur           = null,
        hoverDropShadow     = null,
        hoverTextDecoration = null,
    } = options ?? {};
    
    
    
    // Configs:
    const { mode } = colorParamVars;
    
    // States:
    const { hoverStateVars : { isHovered, hoverFactorCond } } = usesHoverState();
    
    
    
    return {
        hoverEffectRule : () => style({
            /**
             * Hover filter:
             * - No filter options specified → always invalid (`unset`).
             * - Fully unhovered → ignored (browser skips invalid formula).
             * - Otherwise → interpolates configured filter functions toward their target values.
             * 
             * Behavior:
             * - factor = 0      → all filters = neutral (no adjustment).
             * - factor = 1      → filters = configured target values.
             * - Between 0 and 1 → smooth interpolation between neutral and target.
             * - Saturation, brightness, contrast may overshoot/undershoot if factor goes beyond [0,1].
             * - `ensureBetweenZeroAndOne(...)` clamps `opacity()` within 0…1.
             * - `ensureNonNegative(...)` ensures `brightness()`, `contrast()`, and `saturate()` remain non-negative.
             * - `ensureNonNegativeLength(...)` ensures `blur()` and blur radius remain non-negative lengths.
             * 
             * Note:
             * - A "double array" (`[[...]]`) is intended.
             *   When the CSS is rendered, values inside are concatenated with spaces.
             */
            [hoverEffectVars.hoverFilter]: ((): 'unset' | [string[]] => {
                // Opacity, brightness, contrast, saturate, hue rotate, and blur schemas:
                const simpleFilterSchemas : (FilterSchema | false)[] = [
                    // Opacity:
                    (hoverOpacity !== null) && {
                        filterFunction  : opacity,
                        inputType       : 'ratio',
                        inputLimit      : 'betweenZeroAndOne',
                        neutralBaseline : 1,
                        targetValue     : hoverOpacity,
                        directionValue  : hoverOpacity,
                    },
                    
                    // Brightness (light/dark mode aware):
                    (hoverBrightness !== null) && {
                        filterFunction  : brightness,
                        inputType       : 'ratio',
                        inputLimit      : 'nonNegative',
                        neutralBaseline : 1,
                        targetValue     : hoverBrightness,
                        directionValue  : hoverBrightness,
                        
                        /**
                         * Dark mode brightness mapping:
                         * - Light mode dimming (0.7–0.9) → Dark mode brightening (1.25–1.1).
                         * - Light mode neutral (1.0) → Dark mode neutral (~1.0).
                         * - Light mode brightening (≥1.25) → Dark mode dimming (~0.9).
                         * 
                         * Formula:
                         *   darkModeBrightness = 1.25 - (lightModeBrightness - 0.7) * 0.75
                         * 
                         * Intent:
                         * - Usually darken in light mode.
                         * - Usually lighten in dark mode.
                         * - Brightening in light mode flips into dimming in dark mode for symmetry.
                         * - Keeps values within practical ranges (0.7–1.25 in light, 0.9–1.25 in dark).
                         */
                        darkFormula     : (value: CssNumeric): CssNumericFormula => `(1.25 - ((${value}) - 0.7) * 0.75)`,
                    },
                    
                    // Contrast:
                    (hoverContrast !== null) && {
                        filterFunction  : contrast,
                        inputType       : 'ratio',
                        inputLimit      : 'nonNegative',
                        neutralBaseline : 1,
                        targetValue     : hoverContrast,
                        directionValue  : hoverContrast,
                    },
                    
                    // Saturate:
                    (hoverSaturate !== null) && {
                        filterFunction  : saturate,
                        inputType       : 'ratio',
                        inputLimit      : 'nonNegative',
                        neutralBaseline : 1,
                        targetValue     : hoverSaturate,
                        directionValue  : hoverSaturate,
                    },
                    
                    // Hue Rotate:
                    (hoverHueRotate !== null) && {
                        filterFunction  : hueRotate,
                        inputType       : 'angle',
                        inputLimit      : 'unlimited',
                        neutralBaseline : 0,
                        targetValue     : hoverHueRotate,
                        directionValue  : hoverHueRotate,
                    },
                    
                    // Blur:
                    (hoverBlur !== null) && {
                        filterFunction  : blur,
                        inputType       : 'length',
                        inputLimit      : 'nonNegative',
                        neutralBaseline : 0,
                        targetValue     : hoverBlur,
                        directionValue  : hoverBlur,
                    },
                ];
                
                // Drop shadow parameter schemas:
                const dropShadowParameterSchemas : (FilterSchema | false)[] | false = (hoverDropShadow !== null) && ((): (FilterSchema | false)[] => {
                    // Extract options and assign defaults:
                    const {
                        offsetX,
                        offsetY,
                        blur    = null,
                        color   = null,
                    } = hoverDropShadow;
                    
                    // If no blur is specified → treat as `0px`:
                    const blurOrZero = blur ?? 0;
                    
                    
                    
                    // Return drop shadow parameter schemas:
                    return [
                        // Offset X (required):
                        {
                            inputType       : 'length',
                            inputLimit      : 'unlimited',
                            neutralBaseline : 0,
                            targetValue     : offsetX,
                            directionValue  : blurOrZero,
                        },
                        
                        // Offset Y (required):
                        {
                            inputType       : 'length',
                            inputLimit      : 'unlimited',
                            neutralBaseline : 0,
                            targetValue     : offsetY,
                            directionValue  : blurOrZero,
                        },
                        
                        // Blur radius (optional):
                        (blur !== null) && {
                            inputType       : 'length',
                            inputLimit      : 'nonNegative',
                            neutralBaseline : 0,
                            targetValue     : blur,
                            directionValue  : blur,
                        },
                        
                        // Color (optional):
                        (color !== null) && {
                            inputType       : 'color',
                            inputLimit      : 'unlimited',
                            neutralBaseline : 'transparent',
                            targetValue     : color,
                            directionValue  : blurOrZero,
                        },
                    ];
                })();
                
                const filterFunctions = [
                    // Opacity, brightness, contrast, saturate, hue rotate, and blur:
                    ...simpleFilterSchemas
                    
                    // Remove `false` entries:
                    .filter((schema): schema is FilterSchema => (schema !== false))
                    
                    // Convert each schema into a filter function formula:
                    .map(schemaToCssFormula, { hoverFactorCond, mode } satisfies ConditionContext),
                    
                    
                    
                    // Drop shadow:
                    dropShadowParameterSchemas && ((): `drop-shadow(${string})` => {
                        // Build drop-shadow() parameters:
                        const [
                            offsetX,
                            offsetY,
                            blur,
                            color,
                        ] = (
                            dropShadowParameterSchemas
                            
                            // Convert each schema into a filter function formula:
                            .map((schema) => !schema ? undefined : schemaToCssFormula.call({ hoverFactorCond, mode } satisfies ConditionContext, schema))
                        );
                        
                        // Construct drop-shadow() with ordered parameters:
                        return dropShadow({
                            offsetX : offsetX!, // Guaranteed to exist.
                            offsetY : offsetY!, // Guaranteed to exist.
                            blur,
                            color,
                        });
                    })(),
                ]
                // Remove unused options:
                .filter((colorFunction): colorFunction is Exclude<typeof colorFunction, false> => (colorFunction !== false))
                ;
                
                
                
                // Ensure the whole filter is invalid (`unset`) if all filter options are not specified:
                if (!filterFunctions.length) return 'unset';
                
                
                
                // Otherwise, compose the filter functions in "double array":
                return [filterFunctions];
            })(),
            
            /**
             * Hover text decoration:
             * - Not specified   → always invalid (`unset`).
             * - Fully unhovered → ignored (browser skips invalid formula).
             * - Otherwise       → switches discretely to the configured text decoration
             *                     when transitioning toward or fully hovered.
             */
            [hoverEffectVars.hoverTextDecoration]: (
                (hoverTextDecoration !== null)
                ? `${isHovered} ${hoverTextDecoration satisfies (Exclude<CssKnownBaseProps['textDecoration'], undefined | null> | CssCustomRef)}`
                : 'unset'
            ),
        }),
        
        hoverEffectVars,
    } satisfies CssHoverEffect;
};
