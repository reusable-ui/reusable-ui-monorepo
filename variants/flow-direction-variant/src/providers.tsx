'use client' // The exported `<FlowDirectionVariantProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type ResolvedFlowDirectionVariant,
}                           from './types.js'

// Contexts:
import {
    FlowDirectionVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<FlowDirectionVariantProvider>`.
 * 
 * Requires a `flowDirection` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface FlowDirectionVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedFlowDirectionVariant, 'flowDirection'>>
{
}

/**
 * Provides a `flowDirection` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     FlowDirectionVariantProps,
 *     FlowDirectionVariantProvider,
 *     useFlowDirectionVariant,
 * } from '@reusable-ui/flow-direction-variant';
 * 
 * export interface ParentComponentProps extends FlowDirectionVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its flow direction with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve flow direction value from props:
 *     const { flowDirection } = useFlowDirectionVariant(props, {
 *         defaultFlowDirection: 'end', // fallback if not provided
 *     });
 *     
 *     // Propagate flow direction value to descendants:
 *     return (
 *         <FlowDirectionVariantProvider flowDirection={flowDirection}>
 *             {props.children}
 *         </FlowDirectionVariantProvider>
 *     );
 * };
 * ```
 */
const FlowDirectionVariantProvider = (props: FlowDirectionVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        flowDirection,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <FlowDirectionVariantContext value={flowDirection}>
            {children}
        </FlowDirectionVariantContext>
    );
};

export {
    FlowDirectionVariantProvider,            // Named export for readability.
    FlowDirectionVariantProvider as default, // Default export to support React.lazy.
}
