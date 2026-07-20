'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type Dispatch,
}                           from 'react'

// Reusable-ui states:
import {
    // Types:
    type SetAnimationIntentAction,
    
    
    
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Types:
import {
    type EphemeralStateProps,
    type EphemeralStateOptions,
    
    type ResolveEphemeralClassnameArgs,
    type EphemeralStateDefinition,
    
    type EphemeralState,
}                           from './types.js'



/**
 * Animates short-lived UI feedback whenever an activity or status change occurs,
 * making activity-driven state changes feel visible and intuitive
 * by animating the transition.
 * 
 * Without this hook, updating UI directly (e.g. toggling the like icon: `showLikeIcon(true)`, toggling the saved icon: `showSavedIcon(true)`)
 * changes the indicator immediately, without visual feedback of *how* the indicator changes.  
 * With this hook, the indicator updates gradually with a nice animation — clearly conveying the change.
 * 
 * Can be specialized into **sort-state**, **liked-state**, or **saved-state**
 * by defining the `definition` parameter.
 * 
 * **Definition parameters:**
 * - **Ephemeral classname resolver**  
 *   Resolves the semantic classname from the current activity status.
 * - **Default animation pattern**  
 *   Default animation names to match against.
 * - **Default animation bubbling**  
 *   Whether to enable bubbling from nested child elements.
 * 
 * @param props The behavior-specific props (currently empty unless derived hooks extend it).
 * @param options Optional per-component customization for animation lifecycle (pattern, bubbling, etc.).
 * @param definition The ephemeral-specific definition that declares how classnames are resolved.
 * 
 * @template TActivity A value type representing the activity kind.
 * @template TClassname The type representing semantic ephemeral classnames.
 * @template TBehaviorProps The type of the behavior-specific props.
 * @template TBehaviorOptions The type of the behavior-specific options.
 * @template TBehaviorDefinition The type of the behavior-specific definition.
 * @template TElement The type of the target DOM element.
 * 
 * @returns The resolved ephemeral behavior state API, including a dispatcher for triggering activity status.
 */
export const useEphemeralState = <
    TActivity  extends {} | null,
    TClassname extends string,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TElement   extends Element = HTMLElement
>(
    props      : EphemeralStateProps,
    options    : EphemeralStateOptions | undefined,
    definition : EphemeralStateDefinition<TActivity, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
): readonly [EphemeralState<TActivity, TClassname, TElement>, Dispatch<SetAnimationIntentAction<TActivity>>] => {
    // Extract definition and assign defaults:
    const {
        defaultAnimationPattern,
        defaultAnimationBubbling = false, // No bubbling by default.
        
        resolveEphemeralClassname,
    } = definition;
    
    
    
    // Extract options and assign defaults:
    const {
        animationPattern  = defaultAnimationPattern,
        bubblingAnimation = defaultAnimationBubbling,
    } = options ?? {};
    
    
    
    // States and flags:
    
    // Internal activity state with animation lifecycle:
    const [/* _latestActivity */, setActivity, runningActivity, animationHandlers] = useAnimationState<TActivity, TElement>({
        initialIntent: undefined as unknown as TActivity, // Initially there is no activity. It's OK to pass `undefined` since we only care about `runningActivity`, ignoring `_latestActivity`.
        animationPattern,
        bubblingAnimation,
    });
    
    // Derive semantic ephemeral classname from the current activity status:
    const ephemeralClassname = resolveEphemeralClassname({
        activity   : runningActivity,
        props      : props      as TBehaviorProps,
        options    : options    as TBehaviorOptions,
        definition : definition as TBehaviorDefinition,
    } satisfies ResolveEphemeralClassnameArgs<TActivity, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>);
    
    
    
    // Return resolved ephemeral state API along with activity setter:
    const ephemeralState : EphemeralState<TActivity, TClassname, TElement> = {
        activity : runningActivity,
        ephemeralClassname,
        ...animationHandlers,
    };
    return [
        // Resolved ephemeral behavior state:
        ephemeralState,
        
        // Setter for updating activity status:
        setActivity,
    ] satisfies readonly [EphemeralState<TActivity, TClassname, TElement>, Dispatch<SetAnimationIntentAction<TActivity>>];
};
