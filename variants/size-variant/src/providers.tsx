'use client' // The exported `<SizeVariantProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type BasicSize,
    type ResolvedSizeVariant,
}                           from './types.js'

// Contexts:
import {
    SizeVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<SizeVariantProvider>`.
 * 
 * Requires a `size` value to establish the context,
 * and renders `children` that consume the propagated value.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface SizeVariantProviderProps<TSize extends string = BasicSize>
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedSizeVariant<TSize>, 'size'>>
{
}

/**
 * Provides a `size` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     SizeVariantProps,
 *     SizeVariantProvider,
 *     useSizeVariant,
 * } from '@reusable-ui/size-variant';
 * 
 * export interface ParentComponentProps extends SizeVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its size with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve size value from props:
 *     const { size } = useSizeVariant(props, {
 *         defaultSize: 'md', // fallback if not provided
 *         supportedSizes: ['sm', 'md', 'lg'], // list of supported sizes
 *     });
 *     
 *     // Propagate size value to descendants:
 *     return (
 *         <SizeVariantProvider size={size}>
 *             {props.children}
 *         </SizeVariantProvider>
 *     );
 * };
 * ```
 */
const SizeVariantProvider = <TSize extends string = BasicSize>(props: SizeVariantProviderProps<TSize>): ReactElement | null => {
    // Extract props:
    const {
        size,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <SizeVariantContext value={size}>
            {children}
        </SizeVariantContext>
    );
};

export {
    SizeVariantProvider,            // Named export for readability.
    SizeVariantProvider as default, // Default export to support React.lazy.
}
