// Cssfn:
import {
    // Writes css in javascript:
    style,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type PressEffectVars,
    type CssPressEffectOptions,
    type CssPressEffect,
}                           from './types.js'

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesPressState,
}                           from '@reusable-ui/press-state'         // Lifecycle-aware press/release state with transition animations and semantic styling hooks for UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation by making components visually adapt their appearance in response to state changes.



/**
 * A strongly typed global mapping of press-effect CSS variables.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [pressEffectVars] = cssVars<PressEffectVars>({ prefix: 'hoe', minify: false });

// Register the press filter globally for composing a unified filter stack across effect packages:
filterRegistry.registerFilter(pressEffectVars.pressFilter);



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
