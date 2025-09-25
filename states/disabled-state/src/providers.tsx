'use client' // The exported `<DisabledStateProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type DisabledBehaviorState,
}                           from './types.js'

// Contexts:
import {
    DisabledStateContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<DisabledStateProvider>`.
 * 
 * Requires a `disabled` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface DisabledStateProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<DisabledBehaviorState<Element>, 'disabled'>>
{
}

/**
 * Provides a `disabled` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     DisabledStateProps,
 *     DisabledStateProvider,
 *     useDisabledBehaviorState,
 *     useDisabledState,
 * } from '@reusable-ui/disabled-state';
 * 
 * export interface ParentComponentProps extends DisabledStateProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its disabled state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve disabled state from props and handle animation phases:
 *     const {
 *         disabled,
 *         disabledPhase,
 *         disabledClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useDisabledBehaviorState(props, {
 *         defaultDisabled        : false,                 // Defaults to enabled.
 *         defaultCascadeDisabled : true,                  // Defaults to allow contextual disabling.
 *         animationPattern       : ['enable', 'disable'], // Matches animation names ending with 'enable' or 'disable'.
 *         animationBubbling      : false,                 // Ignores bubbling animation events from children.
 *     });
 *     
 *     // Or use `useDisabledState()` if not concerned with animation phases:
 *     // const disabled = useDisabledState(props, {
 *     //     defaultDisabled        : false, // Defaults to enabled.
 *     //     defaultCascadeDisabled : true,  // Defaults to allow contextual disabling.
 *     // });
 *     
 *     // Propagate disabled state to descendants:
 *     return (
 *         <DisabledStateProvider disabled={disabled}>
 *             {props.children}
 *         </DisabledStateProvider>
 *     );
 * };
 * ```
 */
const DisabledStateProvider = (props: DisabledStateProviderProps): ReactElement | null => {
    // Extract props:
    const {
        disabled,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <DisabledStateContext value={disabled}>
            {children}
        </DisabledStateContext>
    );
};

export {
    DisabledStateProvider,            // Named export for readability.
    DisabledStateProvider as default, // Default export to support React.lazy.
}
