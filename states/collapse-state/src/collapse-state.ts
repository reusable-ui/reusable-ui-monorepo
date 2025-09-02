'use client' // The exported `useCollapseState()` hook is client side only.

// React:
import {
    // Hooks:
    useEffect,
}                           from 'react'

// Types:
import {
    type CollapseStateProps,
    type CollapseStateOptions,
    type CollapseStateApi,
}                           from './types.js'

// Defaults:
import {
    finalDefaultExpanded,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveExpandPhase,
    getExpandClassname,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Resolves the expand/collapse state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 *
 * @template TElement - The type of the target DOM element.
 * 
 * @param {CollapseStateProps} props - The component props that may include a controlled `collapsed` value.
 * @param {CollapseStateOptions} options - An optional configuration for customizing expand/collapse behavior.
 * @returns {CollapseStateApi<TElement>} - The resolved expand/collapse state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useCollapseState,
 *     CollapseStateProps,
 * } from '@reusable-ui/collapse-state';
 * import styles from './CollapsibleBox.module.css';
 * 
 * export interface CollapsibleBoxProps extends CollapseStateProps {}
 * 
 * // A box that can be expanded and collapsed.
 * export const CollapsibleBox: FC<CollapsibleBoxProps> = (props) => {
 *     const {
 *         expanded,
 *         expandPhase,
 *         expandClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useCollapseState(props, {
 *         defaultExpanded   : false,                  // Defaults the `expanded` prop to `false` if not provided.
 *         animationPattern  : ['expand', 'collapse'], // Matches animation names ending with 'expand' or 'collapse'.
 *         animationBubbling : false,                  // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${expandClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {expanded && <span className={styles.badge}>🔔</span>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useCollapseState = <TElement extends Element = HTMLElement>(props: CollapseStateProps, options?: CollapseStateOptions): CollapseStateApi<TElement> => {
    // Extract options and assign defaults:
    const {
        defaultExpanded   = finalDefaultExpanded,
        animationPattern  = ['expand', 'collapse'], // Matches animation names for transitions
        animationBubbling = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        expanded : expandedIntent = defaultExpanded,
    } = props;
    
    
    
    // States and flags:
    
    // Controlled expansion state with animation lifecycle:
    const [expanded, setExpanded, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent : expandedIntent,
        animationPattern,
        animationBubbling,
    });
    
    // Derive semantic phase from animation lifecycle:
    const expandPhase = resolveExpandPhase(expanded, runningIntent); // 'expanding', 'collapsing', 'expanded', 'collapsed'
    
    
    
    // Sync animation state with expansion intent:
    useEffect(() => {
        setExpanded(expandedIntent);
    }, [expandedIntent]);
    
    
    
    // Return resolved expansion attributes:
    return {
        expanded,
        expandPhase,
        expandClassname : getExpandClassname(expandPhase),
        ...animationHandlers,
    } satisfies CollapseStateApi<TElement>;
};
