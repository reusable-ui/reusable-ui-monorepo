'use client' // The exported `<ActiveStateProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type ActiveBehaviorState,
}                           from './types.js'

// Contexts:
import {
    ActiveStateContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<ActiveStateProvider>`.
 * 
 * Requires an `active` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface ActiveStateProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ActiveBehaviorState<Element>, 'active'>>
{
}

/**
 * Provides an `active` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     ActiveStateProps,
 *     ActiveStateProvider,
 *     useActiveBehaviorState,
 *     useActiveState,
 * } from '@reusable-ui/active-state';
 * 
 * export interface ParentComponentProps extends ActiveStateProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its active state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve active state from props and handle animation phases:
 *     const {
 *         active,
 *         activePhase,
 *         activeClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useActiveBehaviorState(props, {
 *         defaultActive        : false,                          // Fallback for uncontrolled mode.
 *         defaultCascadeActive : false,                          // Defaults to prevent contextual activation.
 *         animationPattern     : ['activating', 'deactivating'], // Matches animation names ending with 'activating' or 'deactivating'.
 *         animationBubbling    : false,                          // Ignores bubbling animation events from children.
 *     });
 *     
 *     // Or use `useActiveState()` if not concerned with animation phases:
 *     // const active = useActiveState(props, {
 *     //     defaultActive        : false, // Defaults to inactive.
 *     //     defaultCascadeActive : false, // Defaults to prevent contextual activation.
 *     //     defaultCascadeActive : false, // Defaults to prevent contextual activation.
 *     // });
 *     
 *     // Propagate active state to descendants:
 *     return (
 *         <ActiveStateProvider active={active}>
 *             {props.children}
 *         </ActiveStateProvider>
 *     );
 * };
 * ```
 */
const ActiveStateProvider = (props: ActiveStateProviderProps): ReactElement | null => {
    // Extract props:
    const {
        active,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <ActiveStateContext value={active}>
            {children}
        </ActiveStateContext>
    );
};

export {
    ActiveStateProvider,            // Named export for readability.
    ActiveStateProvider as default, // Default export to support React.lazy.
}
