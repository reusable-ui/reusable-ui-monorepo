'use client' // The exported `<OutlinedVariantProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type OutlinedVariant,
}                           from './types.js'

// Contexts:
import {
    OutlinedVariantContext,
}                           from './internal-contexts.js'



// React components:

/**
 * Props for `<OutlinedVariantProvider>`.
 * 
 * Requires an `outlined` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface OutlinedVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<OutlinedVariant, 'outlined'>>
{
}

/**
 * Provides an `outlined` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     OutlinedVariantProps,
 *     OutlinedVariantProvider,
 *     useOutlinedVariant,
 * } from '@reusable-ui/outlined-variant';
 * 
 * export interface ParentComponentProps extends OutlinedVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its outlined state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve outlined state from props:
 *     const { outlined } = useOutlinedVariant(props, {
 *         defaultOutlined: false, // fallback if not provided
 *     });
 *     
 *     // Propagate outlined state to descendants:
 *     return (
 *         <OutlinedVariantProvider outlined={outlined}>
 *             {props.children}
 *         </OutlinedVariantProvider>
 *     );
 * };
 * ```
 */
const OutlinedVariantProvider = (props: OutlinedVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        outlined,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <OutlinedVariantContext value={outlined}>
            {children}
        </OutlinedVariantContext>
    );
};

export {
    OutlinedVariantProvider,            // Named export for readability.
    OutlinedVariantProvider as default, // Default export to support React.lazy.
}
