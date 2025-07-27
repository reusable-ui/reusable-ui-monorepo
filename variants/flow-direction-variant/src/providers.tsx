'use client' // The exported `<FlowDirectionVariantProvider>` component is client side only.

// React:
import {
    // React:
    default as React,
    
    
    
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
 * Requires a `flowDirection` prop to set the context value,
 * along with children to receive the propagated flow direction value.
 */
export interface FlowDirectionVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedFlowDirectionVariant, 'flowDirection'>>
{
}

/**
 * Provides a flow direction value to descendant components,
 * enabling inheritance of the value.
 * 
 * @example
 * ```ts
 * // Resolve flow direction from props:
 * const { flowDirection } = useFlowDirectionVariant(props, {
 *     defaultFlowDirection: 'end',
 * });
 * 
 * // Provide flow direction value to descendants:
 * return (
 *     <FlowDirectionVariantProvider flowDirection={flowDirection}>
 *         {props.children}
 *     </FlowDirectionVariantProvider>
 * );
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
