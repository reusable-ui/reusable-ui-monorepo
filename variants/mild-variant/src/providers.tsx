'use client' // The exported `<MildVariantProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type ResolvedMildVariant,
}                           from './types.js'

// Contexts:
import {
    MildVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<MildVariantProvider>`.
 * 
 * Requires a `mild` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface MildVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedMildVariant, 'mild'>>
{
}

/**
 * Provides a `mild` value to descendant components,
 * allowing them to inherit the value.
 * 
 * @example
 * ```tsx
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     MildVariantProps,
 *     MildVariantProvider,
 *     useMildVariant,
 * } from '@reusable-ui/mild-variant';
 * 
 * export interface ParentComponentProps extends MildVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its mild state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve mild state from props:
 *     const { mild } = useMildVariant(props, {
 *         defaultMild: false, // fallback if not provided
 *     });
 *     
 *     // Propagate mild state to descendants:
 *     return (
 *         <MildVariantProvider mild={mild}>
 *             {props.children}
 *         </MildVariantProvider>
 *     );
 * };
 * ```
 */
const MildVariantProvider = (props: MildVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        mild,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <MildVariantContext value={mild}>
            {children}
        </MildVariantContext>
    );
};

export {
    MildVariantProvider,            // Named export for readability.
    MildVariantProvider as default, // Default export to support React.lazy.
}
