// Cssfn:
import {
    // Writes css in javascript:
    style,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssPressEffectOptions,
    type CssPressEffect,
}                           from './types.js'

// CSS Variables:
import {
    pressEffectVars,
}                           from './css-variables.js'

// Reusable-ui states:
import {
    usesPressState,
}                           from '@reusable-ui/press-state'         // Lifecycle-aware press/release state with transition animations and semantic styling hooks for UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.



/**
 * Applies press-state effects that acknowledge user input,
 * making components **visually confirming command** when pressed (clicked).
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between press and release states by animating filter effects.
 * Preserves the current theme colors and variants while enhancing emphasis
 * through responsive visual cues.
 * 
 * @param options - An optional configuration for customizing press effects.
 * @returns A CSS API containing effect rules and CSS variables for confirming user input on press.
 */
export const usesPressEffect = (options?: CssPressEffectOptions): CssPressEffect => {
    // Extract options and assign defaults:
    const {
        enablesReverseIntent = true, // Defaults to `true` (enables reverse intent, allowing negative values to fade *out* the effect on press).
        brightness           = 0.6,  // Defaults to `0.6` (fairly darken in light mode, fairly lighten in dark mode).
        
        ...restOptions
    } = options ?? {};
    
    
    
    // States:
    const { pressStateVars : { pressFactor } } = usesPressState();
    
    
    
    return {
        pressEffectRule : () => style({
            // Press filter:
            [pressEffectVars.pressFilter]: composeFilterEffect(pressFactor, { ...restOptions, enablesReverseIntent, brightness }),
        }),
        
        pressEffectVars,
    } satisfies CssPressEffect;
};
