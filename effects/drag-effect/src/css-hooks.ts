// Cssfn:
import {
    // Writes css in javascript:
    style,
    vars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssDragEffectOptions,
    type CssDragEffect,
}                           from './types.js'

// CSS Variables:
import {
    dragEffectVars,
}                           from './css-variables.js'

// Reusable-ui states:
import {
    usesDragState,
}                           from '@reusable-ui/drag-state'          // Lifecycle-aware drag/drop state with transition animations and semantic styling hooks for draggable UI components.

// Reusable-ui effects:
import {
    // Utilities:
    composeFilterEffect,
}                           from '@reusable-ui/filter-effect'       // Provides default visual effects for components when their active state changes. Adjusts the component's visual presentation to make components visually adapt their appearance in response to state changes.



/**
 * Applies drag-state effects that follow the cursor movement,
 * making components **visually carried and repositioned** while being dragged.
 * 
 * Exposes strongly typed CSS variables for transitional effects.
 * 
 * Smoothly transitions between drag and drop states by animating transform and filter effects.
 * 
 * @param options - An optional configuration for customizing drag effects.
 * @returns A CSS API containing effect rules and CSS variables for following the cursor movement while being dragged.
 */
export const usesDragEffect = (options?: CssDragEffectOptions): CssDragEffect => {
    // Extract options and assign defaults:
    const {
        enablesReverseIntent = false, // Defaults to `false` (no reverse intent, always fade *in* the effect as the state activates).
        
        ...restOptions
    } = options ?? {};
    
    
    
    // States:
    const { dragStateVars : { dragOffsetX, dragOffsetY, dragFactor } } = usesDragState();
    
    // Variables:
    const { dragFilter, dragTransform } = dragEffectVars;
    
    
    
    return {
        dragEffectRule : () => style({
            ...vars({
                // Drag filter:
                [dragFilter   ] : composeFilterEffect(dragFactor, { ...restOptions, enablesReverseIntent }),
                
                [dragTransform] : `translate(calc(${dragOffsetX} * 1px * ${dragFactor}), calc(${dragOffsetY} * 1px * ${dragFactor}))`,
            }),
        }),
        
        dragEffectVars,
    } satisfies CssDragEffect;
};
