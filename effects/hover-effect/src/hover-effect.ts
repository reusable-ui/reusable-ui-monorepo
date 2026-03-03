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

// Reusable-ui features:
import {
    filterRegistry,
}                           from '@reusable-ui/filter-feature'      // A styling utility for composing a unified filter stack from custom and registered state packages.

// Reusable-ui states:
import {
    usesHoverState,
}                           from '@reusable-ui/hover-state'         // Lifecycle-aware hover/unhover state with transition animations and semantic styling hooks for UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects when a component's active state changes. Adjusts the component's visual presentation by making components visually adapt their appearance in response to state changes.



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
        enablesReverseIntent = true, // Defaults to `true` (enables reverse intent, allowing negative values to fade *out* the effect on hover).
        brightness           = 0.95, // Defaults to `0.95` (slightly darken for light mode, slightly lighten for dark mode).
        
        textDecoration       = null, // Defaults to `null` (preserves the component's original text decoration).
        
        ...restOptions
    } = options ?? {};
    
    
    
    // States:
    const { hoverStateVars : { isHovered, hoverFactor } } = usesHoverState();
    
    
    
    return {
        hoverEffectRule : () => style({
            // Hover filter:
            [hoverEffectVars.hoverFilter]: composeFilterEffect(hoverFactor, { ...restOptions, enablesReverseIntent, brightness }),
            
            /**
             * Hover text decoration:
             * - Not specified   → always invalid (`unset`).
             * - Fully unhovered → ignored (browser skips invalid formula).
             * - Otherwise       → switches discretely to the configured text decoration
             *                     when transitioning toward or fully hovered.
             */
            [hoverEffectVars.hoverTextDecoration]: (
                (textDecoration !== null)
                ? `${isHovered} ${textDecoration satisfies (Exclude<CssKnownBaseProps['textDecoration'], undefined | null> | CssCustomRef)}`
                : 'unset'
            ),
        }),
        
        hoverEffectVars,
    } satisfies CssHoverEffect;
};
