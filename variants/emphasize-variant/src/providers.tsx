'use client' // The exported `<EmphasizeVariantProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type ResolvedEmphasizeVariant,
}                           from './types.js'

// Contexts:
import {
    EmphasizeVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<EmphasizeVariantProvider>`.
 * 
 * Requires an `emphasized` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface EmphasizeVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedEmphasizeVariant, 'emphasized'>>
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
 *     EmphasizeVariantProps,
 *     EmphasizeVariantProvider,
 *     useEmphasizeVariant,
 * } from '@reusable-ui/emphasize-variant';
 * 
 * export interface ParentComponentProps extends EmphasizeVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its emphasized state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve emphasized state from props:
 *     const { emphasized } = useEmphasizeVariant(props, {
 *         defaultEmphasized: false, // fallback if not provided
 *     });
 *     
 *     // Propagate emphasized state to descendants:
 *     return (
 *         <EmphasizeVariantProvider emphasized={emphasized}>
 *             {props.children}
 *         </EmphasizeVariantProvider>
 *     );
 * };
 * ```
 */
const EmphasizeVariantProvider = (props: EmphasizeVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        emphasized,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <EmphasizeVariantContext value={emphasized}>
            {children}
        </EmphasizeVariantContext>
    );
};

export {
    EmphasizeVariantProvider,            // Named export for readability.
    EmphasizeVariantProvider as default, // Default export to support React.lazy.
}
