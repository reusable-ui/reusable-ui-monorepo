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
    type DisabledEffectVars,
    type CssDisabledEffectOptions,
    type CssDisabledEffect,
}                           from './types.js'

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesDisabledState,
}                           from '@reusable-ui/disabled-state'      // Lifecycle-aware enabled/disabled state with transition animations and semantic styling hooks for UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.



/**
 * A strongly typed global mapping of disabled-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [disabledEffectVars] = cssVars<DisabledEffectVars>({ prefix: 'die', minify: false });

// Register the disabled filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(disabledEffectVars.disabledFilter);



/**
 * Applies disabled-state effects that de-emphasize the entire component surface,
 * making components **visually muted** when disabled.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between enabled and disabled states by animating filter effects.
 * Preserves the current theme colors and variants while reducing emphasis
 * through opacity and/or desaturation.
 * 
 * @param options - An optional configuration for customizing disabled effects.
 * @returns A CSS API containing effect rules and CSS variables for muting theme colors.
 */
export const usesDisabledEffect = (options?: CssDisabledEffectOptions): CssDisabledEffect => {
    // Extract options and assign defaults:
    const {
        enablesReverseIntent = false,         // Defaults to `false` (no reverse intent, always fade *in* the effect as the state activates).
        opacity              = 0.5,           // Defaults to `0.5` (half opacity).
        saturate             = 0.5,           // Defaults to `0.5` (muted colors).
        
        cursor               = 'not-allowed', // Defaults to `'not-allowed'` (indicates that the component is disabled and not interactive).
        
        ...restOptions
    } = options ?? {};
    
    
    
    // States:
    const { disabledStateVars : { isDisabled, disableFactor } } = usesDisabledState();
    
    
    
    return {
        disabledEffectRule : () => style({
            // Disabled filter:
            [disabledEffectVars.disabledFilter]: composeFilterEffect(disableFactor, { ...restOptions, enablesReverseIntent, opacity, saturate }),
            
            /**
             * Disabled cursor:
             * - Not specified → always invalid (`unset`).
             * - Fully enabled → ignored (browser skips invalid formula).
             * - Otherwise     → switches discretely to the configured cursor
             *                   when transitioning toward or fully disabled.
             */
            [disabledEffectVars.disabledCursor]: (
                (cursor !== null)
                ? `${isDisabled} ${cursor satisfies (Exclude<CssKnownBaseProps['cursor'], undefined | null> | CssCustomRef)}`
                : 'unset'
            ),
        }),
        
        disabledEffectVars,
    } satisfies CssDisabledEffect;
};
