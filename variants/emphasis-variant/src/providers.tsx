'use client' // The exported `<EmphasisVariantProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type ResolvedEmphasisVariant,
}                           from './types.js'

// Contexts:
import {
    EmphasisVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<EmphasisVariantProvider>`.
 * 
 * Requires an `emphasized` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface EmphasisVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedEmphasisVariant, 'emphasized'>>
{
}

/**
 * Provides an `emphasized` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     EmphasisVariantProps,
 *     EmphasisVariantProvider,
 *     useEmphasisVariant,
 * } from '@reusable-ui/emphasis-variant';
 * 
 * export interface ParentComponentProps extends EmphasisVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its emphasized state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve emphasized state from props:
 *     const { emphasized } = useEmphasisVariant(props, {
 *         defaultEmphasized: false, // fallback if not provided
 *     });
 *     
 *     // Propagate emphasized state to descendants:
 *     return (
 *         <EmphasisVariantProvider emphasized={emphasized}>
 *             {props.children}
 *         </EmphasisVariantProvider>
 *     );
 * };
 * ```
 */
const EmphasisVariantProvider = (props: EmphasisVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        emphasized,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <EmphasisVariantContext value={emphasized}>
            {children}
        </EmphasisVariantContext>
    );
};

export {
    EmphasisVariantProvider,            // Named export for readability.
    EmphasisVariantProvider as default, // Default export to support React.lazy.
}
