'use client' // The exported `<OutlineVariantProvider>` component is client side only.

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
    type ResolvedOutlineVariant,
}                           from './types.js'

// Contexts:
import {
    OutlineVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<OutlineVariantProvider>`.
 * 
 * Requires an `outlined` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface OutlineVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedOutlineVariant, 'outlined'>>
{
}

/**
 * Provides an outlined value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     OutlineVariantProps,
 *     OutlineVariantProvider,
 *     useOutlineVariant,
 * } from '@reusable-ui/outline-variant';
 * 
 * export interface ParentComponentProps extends OutlineVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its outlined state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve outlined state from props:
 *     const { outlined } = useOutlineVariant(props, {
 *         defaultOutlined: false, // fallback if not provided
 *     });
 *     
 *     // Propagate outlined state to descendants:
 *     return (
 *         <OutlineVariantProvider outlined={outlined}>
 *             {props.children}
 *         </OutlineVariantProvider>
 *     );
 * };
 * ```
 */
const OutlineVariantProvider = (props: OutlineVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        outlined,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <OutlineVariantContext value={outlined}>
            {children}
        </OutlineVariantContext>
    );
};

export {
    OutlineVariantProvider,            // Named export for readability.
    OutlineVariantProvider as default, // Default export to support React.lazy.
}
