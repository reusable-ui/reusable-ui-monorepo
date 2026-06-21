'use client' // The exported hooks are client side only.

// Types:
import {
    type ExciteStateProps,
    type ExciteStateOptions,
    type ExciteClassname,
    type ExciteBehaviorState,
}                           from './types.js'
import {
    type ExciteBehaviorStateDefinition,
}                           from './internal-types.js'

// Utilities:
import {
    resolveExciteActivityClassname,
}                           from './internal-utilities.js'

// Reusable-ui states:
import {
    // Hooks:
    useActivityBehaviorState,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.

// Hooks:
import {
    useResolvedExciteState,
}                           from './general-hooks.js'



/** The behavior state definition for excited state management. */
const exciteBehaviorStateDefinition : ExciteBehaviorStateDefinition = {
    // State definitions:
    inactiveState            : false, // `false`: the value of un-excited state
    
    // Behavior definitions:
    defaultAnimationPattern  : 'exciting',                     // Matches animation names for activities.
    defaultAnimationBubbling : false,
    resolveActivityClassname : resolveExciteActivityClassname, // Resolves classnames.
};

/**
 * Resolves the excited state, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 *
 * Supports controlled excitement with automatic re-triggering if the parent
 * does not reset the `excited` prop after animation completion.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param {ExciteStateProps} props - The component props that may include a controlled `excited` value and an `onExcitedComplete` callback.
 * @param {ExciteStateOptions} options - An optional configuration for customizing excitement behavior and animation lifecycle.
 * @returns {ExciteBehaviorState<TElement>} - The resolved excited state, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useExciteBehaviorState,
 *     ExciteStateProps,
 * } from '@reusable-ui/excite-state';
 * import styles from './ExcitableBox.module.css';
 * 
 * export interface ExcitableBoxProps extends ExciteStateProps {}
 * 
 * // A box that can be excited.
 * export const ExcitableBox: FC<ExcitableBoxProps> = (props) => {
 *     const {
 *         excited,
 *         actualExcited,
 *         exciteClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useExciteBehaviorState(props, {
 *         defaultExcited    : false,          // Defaults the `excited` prop to `false` if not provided.
 *         animationPattern  : 'box-exciting', // Matches animation names ending with 'box-exciting'.
 *         animationBubbling : false,          // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${exciteClassname}`}
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
export const useExciteBehaviorState = <TElement extends Element = HTMLElement>(props: ExciteStateProps, options?: ExciteStateOptions): ExciteBehaviorState<TElement> => {
    // Extract props:
    const {
        onExcitedComplete : onStateComplete,
        // ...restProps // Not needed the rest since all resolvers in the definition are *not* dependent of the props.
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective excited state:
    const effectiveState = useResolvedExciteState(props, options);
    
    // Activity orchestration:
    const {
        state             : excited,
        actualState       : actualExcited,
        activityClassname : exciteClassname,
        ...animationHandlers
    } = useActivityBehaviorState<
        boolean,
        ExciteClassname,
        
        ExciteStateProps,
        ExciteStateOptions,
        ExciteBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateComplete, /* ...restProps */ },
        
        // Options:
        options,
        
        // Definition:
        exciteBehaviorStateDefinition,
    );
    
    
    
    // Return resolved excitement attributes:
    return {
        excited,
        actualExcited,
        exciteClassname,
        ...animationHandlers,
    } satisfies ExciteBehaviorState<TElement>;
};
