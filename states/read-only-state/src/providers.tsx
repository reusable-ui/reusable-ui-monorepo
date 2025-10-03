'use client' // The exported `<ReadOnlyStateProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type ReadOnlyBehaviorState,
}                           from './types.js'

// Contexts:
import {
    ReadOnlyStateContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<ReadOnlyStateProvider>`.
 * 
 * Requires a `readOnly` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface ReadOnlyStateProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ReadOnlyBehaviorState<Element>, 'readOnly'>>
{
}

/**
 * Provides a `readOnly` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     ReadOnlyStateProps,
 *     ReadOnlyStateProvider,
 *     useReadOnlyBehaviorState,
 *     useReadOnlyState,
 * } from '@reusable-ui/read-only-state';
 * 
 * export interface ParentComponentProps extends ReadOnlyStateProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its read-only state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve read-only state from props and handle animation phases:
 *     const {
 *         readOnly,
 *         readOnlyPhase,
 *         readOnlyClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useReadOnlyBehaviorState(props, {
 *         defaultReadOnly        : false,              // Defaults to editable.
 *         defaultCascadeReadOnly : true,               // Defaults to allow contextual read-only.
 *         animationPattern       : ['thaw', 'freeze'], // Matches animation names ending with 'thaw' or 'freeze'.
 *         animationBubbling      : false,              // Ignores bubbling animation events from children.
 *     });
 *     
 *     // Or use `useReadOnlyState()` if not concerned with animation phases:
 *     // const readOnly = useReadOnlyState(props, {
 *     //     defaultReadOnly        : false, // Defaults to editable.
 *     //     defaultCascadeReadOnly : true,  // Defaults to allow contextual read-only.
 *     // });
 *     
 *     // Propagate read-only state to descendants:
 *     return (
 *         <ReadOnlyStateProvider readOnly={readOnly}>
 *             {props.children}
 *         </ReadOnlyStateProvider>
 *     );
 * };
 * ```
 */
const ReadOnlyStateProvider = (props: ReadOnlyStateProviderProps): ReactElement | null => {
    // Extract props:
    const {
        readOnly,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <ReadOnlyStateContext value={readOnly}>
            {children}
        </ReadOnlyStateContext>
    );
};

export {
    ReadOnlyStateProvider,            // Named export for readability.
    ReadOnlyStateProvider as default, // Default export to support React.lazy.
}
