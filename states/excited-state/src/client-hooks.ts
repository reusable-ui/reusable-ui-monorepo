'use client' // The exported hooks are client side only.

// Types:
import {
    type ExcitedStateProps,
    type ExcitedStateOptions,
    type ExcitedClassname,
    type ExcitedState,
}                           from './types.js'
import {
    type ExcitedStateDefinition,
}                           from './internal-types.js'

// Utilities:
import {
    resolveExcitedActivityClassname,
}                           from './internal-utilities.js'

// Reusable-ui states:
import {
    // Hooks:
    useActivityState,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.

// Hooks:
import {
    useResolvedExcited,
}                           from './general-hooks.js'



/** The behavior state definition for excited state management. */
const excitedStateDefinition : ExcitedStateDefinition = {
    // State definitions:
    inactiveState            : false, // `false`: the value of un-excited state
    
    // Behavior definitions:
    defaultAnimationPattern  : 'exciting',                      // Matches animation names for activities.
    defaultAnimationBubbling : false,
    resolveActivityClassname : resolveExcitedActivityClassname, // Resolves classnames.
};

/**
 * Resolves the excited state, associated CSS classname, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 *
 * Supports controlled excitement with automatic re-triggering if the parent
 * does not reset the `excited` prop after animation completion.
 * 
 * @template TElement The type of the target DOM element.
 * 
 * @param props The component props that may include a controlled `excited` value and an `onExcitedComplete` callback.
 * @param options An optional configuration for customizing excitement behavior and its animation lifecycle.
 * @returns The resolved excited state, associated CSS classname, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useExcitedState,
 *     ExcitedStateProps,
 * } from '@reusable-ui/excited-state';
 * import styles from './ExcitableBox.module.css';
 * 
 * export interface ExcitableBoxProps extends ExcitedStateProps {}
 * 
 * // A box that can be excited.
 * export const ExcitableBox: FC<ExcitableBoxProps> = (props) => {
 *     const {
 *         excited,
 *         actualExcited,
 *         excitedClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useExcitedState(props, {
 *         defaultExcited    : false,          // Defaults the `excited` prop to `false` if not provided.
 *         animationPattern  : 'box-exciting', // Matches animation names ending with 'box-exciting'.
 *         bubblingAnimation : false,          // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${excitedClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {excited && <span className={styles.badge}>🔔</span>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useExcitedState = <TElement extends Element = HTMLElement>(props: ExcitedStateProps, options?: ExcitedStateOptions): ExcitedState<TElement> => {
    // Extract props:
    const {
        onExcitedComplete : onStateComplete,
        // ...restProps // Not needed the rest since all resolvers in the definition are *not* dependent of the props.
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective excited state:
    const effectiveState = useResolvedExcited(props, options);
    
    // Activity orchestration:
    const {
        state             : excited,
        actualState       : actualExcited,
        activityClassname : excitedClassname,
        ...animationHandlers
    } = useActivityState<
        boolean,
        ExcitedClassname,
        
        ExcitedStateProps,
        ExcitedStateOptions,
        ExcitedStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateComplete, /* ...restProps */ },
        
        // Options:
        options,
        
        // Definition:
        excitedStateDefinition,
    );
    
    
    
    // Return resolved excitement attributes:
    return {
        excited,
        actualExcited,
        excitedClassname,
        ...animationHandlers,
    } satisfies ExcitedState<TElement>;
};
