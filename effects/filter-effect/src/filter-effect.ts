// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssFilterEffectOptions,
    type CssFilterEffectFormula,
}                           from './types.js'

// Utilities:
import {
    // Types:
    type CssNumericFormula,
    type CssNumeric,
    
    
    
    // Filter functions:
    opacity,
    invert,
    sepia,
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
    type CssFilterCondition,
    
    
    
    // Utilities:
    schemaToCssFormula,
}                           from './css-schemas.js'

// Reusable-ui configs:
import {
    colorParamVars,
}                           from '@reusable-ui/colors'              // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.



/**
 * Composes filter-based effects that adjust the component's visual presentation,
 * making components **visually adapt their appearance** in response to state changes.
 * 
 * The transitions are controlled by the provided `activeFactor`.
 * Interpolates filter values based on this factor, but does not perform any animation itself.
 * The state logic provider (such as `disabled-state`, `focus-state`, `hover-state`, etc.)
 * is responsible for driving `activeFactor` through its own animation or transition logic
 * to achieve smooth visual transitions between states.
 * 
 * Behavior:
 * - No filter options specified → always invalid (`unset`).
 * - At factor = 0 → all filters = neutral (no adjustment).
 * - At factor = 1 → filters = configured target values.
 * - Between 0 and 1 → smooth interpolation between neutral and target.
 * - Saturation, brightness, and contrast may overshoot/undershoot if factor goes beyond [0,1].
 * - Each filter formula is safeguarded by clamping mechanisms to avoid invalid ranges.
 * 
 * @param activeFactor - A CSS variable reference representing how far the transition has progressed (from inactive → fully active).
 * @param options - An optional configuration for customizing filter effects.
 * @returns A `CssFilterEffectFormula` composing the configured filters or `'unset'`.
 * 
 * @example
 * ```ts
 * export default style({
 *     display  : 'grid',
 *     fontSize : '1rem',
 *     // Base styling for the component goes here.
 *     
 *     // Apply filter-based effects driven by the provided state factor:
 *     filter: composeFilterEffect(
 *         activeStateVars.activeFactor, // Driver for inactive ⇄ active state.
 *         {
 *             enablesReverseIntent : true, // Enables reverse intent (fade out when active).
 *             opacity              : -0.5, // Semi transparent when inactive (requires reverse intent).
 *             brightness           : 1.2,  // Boost brightness when active.
 *         }
 *     ),
 * });
 * ```
 */
export const composeFilterEffect = (activeFactor: CssCustomRef, options?: CssFilterEffectOptions): CssFilterEffectFormula | 'unset' => {
    // Extract options and assign defaults:
    const {
        enablesReverseIntent          = false,
        opacity    : activeOpacity    = null,
        invert     : activeInvert     = null,
        sepia      : activeSepia      = null,
        brightness : activeBrightness = null,
        contrast   : activeContrast   = null,
        saturate   : activeSaturate   = null,
        hueRotate  : activeHueRotate  = null,
        blur       : activeBlur       = null,
        dropShadow : activeDropShadow = null,
    } = options ?? {};
    
    
    
    // Configs:
    const { mode: colorMode } = colorParamVars;
    
    
    
    // Opacity, brightness, contrast, saturate, hue rotate, and blur schemas:
    const simpleFilterSchemas : (FilterSchema | false)[] = [
        // Opacity:
        (activeOpacity !== null) && {
            filterFunction  : opacity,
            inputType       : 'ratio',
            inputLimit      : 'betweenZeroAndOne',
            neutralBaseline : 1,
            targetValue     : activeOpacity,
            directionValue  : activeOpacity,
        },
        
        // Invert:
        (activeInvert !== null) && {
            filterFunction  : invert,
            inputType       : 'ratio',
            inputLimit      : 'betweenZeroAndOne',
            neutralBaseline : 0,
            targetValue     : activeInvert,
            directionValue  : activeInvert,
        },
        
        // Sepia:
        (activeSepia !== null) && {
            filterFunction  : sepia,
            inputType       : 'ratio',
            inputLimit      : 'betweenZeroAndOne',
            neutralBaseline : 0,
            targetValue     : activeSepia,
            directionValue  : activeSepia,
        },
        
        // Brightness (light/dark mode aware):
        (activeBrightness !== null) && {
            filterFunction  : brightness,
            inputType       : 'ratio',
            inputLimit      : 'nonNegative',
            neutralBaseline : 1,
            targetValue     : activeBrightness,
            directionValue  : activeBrightness,
            
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
        (activeContrast !== null) && {
            filterFunction  : contrast,
            inputType       : 'ratio',
            inputLimit      : 'nonNegative',
            neutralBaseline : 1,
            targetValue     : activeContrast,
            directionValue  : activeContrast,
        },
        
        // Saturate:
        (activeSaturate !== null) && {
            filterFunction  : saturate,
            inputType       : 'ratio',
            inputLimit      : 'nonNegative',
            neutralBaseline : 1,
            targetValue     : activeSaturate,
            directionValue  : activeSaturate,
        },
        
        // Hue Rotate:
        (activeHueRotate !== null) && {
            filterFunction  : hueRotate,
            inputType       : 'angle',
            inputLimit      : 'unlimited',
            neutralBaseline : 0,
            targetValue     : activeHueRotate,
            directionValue  : activeHueRotate,
        },
        
        // Blur:
        (activeBlur !== null) && {
            filterFunction  : blur,
            inputType       : 'length',
            inputLimit      : 'nonNegative',
            neutralBaseline : 0,
            targetValue     : activeBlur,
            directionValue  : activeBlur,
        },
    ];
    
    // Drop shadow parameter schemas:
    const dropShadowParameterSchemas : (FilterSchema | false)[] | false = (activeDropShadow !== null) && ((): (FilterSchema | false)[] => {
        // Extract options and assign defaults:
        const {
            offsetX,
            offsetY,
            blur    = null,
            color   = null,
        } = activeDropShadow;
        
        // If no blur is specified → treat as `0px`:
        const blurOrZero = blur ?? 0;
        
        
        
        // Return drop shadow parameter schemas:
        return [
            // Offset X (required):
            {
                inputType       : 'position',
                inputLimit      : 'unlimited',
                neutralBaseline : 0,
                targetValue     : offsetX,
                directionValue  : blurOrZero,
            },
            
            // Offset Y (required):
            {
                inputType       : 'position',
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
        .map(schemaToCssFormula, { activeFactor, colorMode, enablesReverseIntent } satisfies CssFilterCondition),
        
        
        
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
                .map((schema) => !schema ? undefined : schemaToCssFormula.call({ activeFactor, colorMode, enablesReverseIntent } satisfies CssFilterCondition, schema))
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
    // - When the CSS is rendered, values inside are concatenated with spaces.
    return [filterFunctions] as CssFilterEffectFormula;
};
