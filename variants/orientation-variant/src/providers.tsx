'use client' // The exported `<OrientationVariantProvider>` component is client side only.

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
    type ResolvedOrientationVariant,
}                           from './types.js'

// Contexts:
import {
    OrientationVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<OrientationVariantProvider>`.
 * 
 * Requires an `orientation` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface OrientationVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedOrientationVariant, 'orientation'>>
{
}

/**
 * Provides an `orientation` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     OrientationVariantProps,
 *     OrientationVariantProvider,
 *     useOrientationVariant,
 * } from '@reusable-ui/orientation-variant';
 * 
 * export interface ParentComponentProps extends OrientationVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its orientation with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve orientation value from props:
 *     const { orientation } = useOrientationVariant(props, {
 *         defaultOrientation: 'block', // fallback if not provided
 *     });
 *     
 *     // Propagate orientation value to descendants:
 *     return (
 *         <OrientationVariantProvider orientation={orientation}>
 *             {props.children}
 *         </OrientationVariantProvider>
 *     );
 * };
 * ```
 */
const OrientationVariantProvider = (props: OrientationVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        orientation,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <OrientationVariantContext value={orientation}>
            {children}
        </OrientationVariantContext>
    );
};

export {
    OrientationVariantProvider,            // Named export for readability.
    OrientationVariantProvider as default, // Default export to support React.lazy.
}
