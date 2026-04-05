// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomRef,
    type CssKnownBaseProps,
    
    
    
    // Writes css in javascript:
    style,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssHoverEffectOptions,
    type CssHoverEffect,
}                           from './types.js'

// CSS Variables:
import {
    hoverEffectVars,
}                           from './css-variables.js'

// Reusable-ui states:
import {
    usesHoverState,
}                           from '@reusable-ui/hover-state'         // Lifecycle-aware hover/unhover state with transition animations and semantic styling hooks for UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.



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
        brightness           = 0.95, // Defaults to `0.95` (slightly darken in light mode, slightly lighten in dark mode).
        
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
