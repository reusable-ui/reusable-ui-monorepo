// Cssfn:
import {
    // Writes css in javascript:
    style,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssExcitedEffectOptions,
    type CssExcitedEffect,
}                           from './css-types.js'
import {
    type CssNumericFormula,
    type CssNumeric,
}                           from './css-internal-types.js'

// Utilities:
import {
    // Conditions:
    ifPositive,
    ifNegative,
    composeCases,
    
    // Interpolations:
    reverseFactor,
}                           from './css-internal-utilities.js'

// CSS Variables:
import {
    excitedEffectVars,
}                           from './css-internal-variables.js'

// Reusable-ui states:
import {
    usingExcitedState,
}                           from '@reusable-ui/excited-state'       // Lifecycle-aware excitement state with continuous attention-grabbing animations and semantic styling hooks for UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.



/**
 * Applies excited-state effects that blink by zooming in and flashing color,
 * making components **visually highlighted** when excited.
 * 
 * Exposes strongly typed CSS variables for activity-driven effects.
 * 
 * Runs continuously while the component is in the excited state by animating filter effects.
 * 
 * @param options - An optional configuration for customizing excitement effects.
 * @returns A CSS API containing effect rules and CSS variables for grabbing user attention when excited.
 */
export const usingExcitedEffect = (options?: CssExcitedEffectOptions): CssExcitedEffect => {
    // Extract options and assign defaults:
    const {
        enablesReverseIntent = true, // Defaults to `true` (enables reverse intent, allowing negative values to fade *out* the effect when excited).
        invert               = 1,    // Defaults to `1` (fully invert when excited, creating a strong highlight effect).
        scale                = 1.1,  // Defaults to `1.1` (slightly zoom in when excited, creating a subtle pop effect).
        
        ...restOptions
    } = options ?? {};
    
    
    
    // States:
    const { excitedStateVars : { excitedFactor } } = usingExcitedState();
    
    // Variables:
    const { excitedFilter, excitedTransform } = excitedEffectVars;
    
    
    
    return {
        excitedEffectRule : () => style({
            // Excitement filter:
            [excitedFilter   ] : composeFilterEffect(excitedFactor, { ...restOptions, enablesReverseIntent, invert }),
            
            // Excitement transform:
            [excitedTransform] : (
                (scale !== null)
                ? ((): `scale(${string})` => {
                    // Compose a direction-aware factor:
                    // - Factors are unitless numeric values.
                    // - They represent fade-in (0 → 1), fade-out (1 → 0),
                    //   or even extended ranges beyond [0, 1].
                    // - If reverse intent is not supported, only use the fade-in factor.
                    const directionAwareScaleFactor = ((): CssNumericFormula => {
                        // If reverse intent is not supported → fade-in only (no direction awareness):
                        if (!enablesReverseIntent) return composeCases(excitedFactor);
                        
                        
                        
                        // Base factors:
                        const fadeInFactor  : CssNumeric        = excitedFactor;
                        const fadeOutFactor : CssNumericFormula = reverseFactor(excitedFactor);
                        
                        
                        
                        // Ratio inputs (scale, opacity, brightness, contrast, saturate):
                        // - Direction value is the same as `scale`.
                        // - Direction is unitless (use `ifPositive/ifNegative` instead of `ifPositiveWithUnit/ifNegativeWithUnit`).
                        // - Make sure the `scale` is correctly descriminated to `CssNumeric`.
                        return composeCases(
                            ifPositive(scale satisfies CssNumeric, fadeInFactor),
                            ifNegative(scale satisfies CssNumeric, fadeOutFactor),
                        );
                    })();
                    
                    
                    
                    // Compose the final scale transform:
                    // - Neutral baseline scale is `1`.
                    // - At factor = 0 → scale = 1 (neutral, idle).
                    // - At factor = 1 → scale = `scale` (full target).
                    // - At factor between 0 ↔ 1 → scale interpolates between 1 and `scale`.
                    // - Overshoot (factor > 1) pushes beyond the target, creating a stronger pop.
                    // - Undershoot (factor < 0) is clamped by `max(0%, ...)` to avoid flipping the element.
                    return `scale(max(0%, (1 - (1 - max(${scale}, ${scale} * -1)) * ${directionAwareScaleFactor}) * 100%))`;
                })()
                : 'unset'
            ),
        }),
        
        excitedEffectVars,
    } satisfies CssExcitedEffect;
};
