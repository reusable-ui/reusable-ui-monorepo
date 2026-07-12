'use client' // The exported `<EmphasizedVariantProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type EmphasizedVariant,
}                           from './types.js'

// Contexts:
import {
    EmphasizedVariantContext,
}                           from './internal-contexts.js'



// React components:

/**
 * Props for `<EmphasizedVariantProvider>`.
 * 
 * Requires an `emphasized` value to establish the context,
 * and renders `children` that consume the propagated value.
 */
export interface EmphasizedVariantProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<EmphasizedVariant, 'emphasized'>>
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
 *     EmphasizedVariantProps,
 *     EmphasizedVariantProvider,
 *     useEmphasizedVariant,
 * } from '@reusable-ui/emphasized-variant';
 * 
 * export interface ParentComponentProps extends EmphasizedVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that shares its emphasized state with descendant components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve emphasized state from props:
 *     const { emphasized } = useEmphasizedVariant(props, {
 *         defaultEmphasized: false, // fallback if not provided
 *     });
 *     
 *     // Propagate emphasized state to descendants:
 *     return (
 *         <EmphasizedVariantProvider emphasized={emphasized}>
 *             {props.children}
 *         </EmphasizedVariantProvider>
 *     );
 * };
 * ```
 */
const EmphasizedVariantProvider = (props: EmphasizedVariantProviderProps): ReactElement | null => {
    // Extract props:
    const {
        emphasized,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <EmphasizedVariantContext value={emphasized}>
            {children}
        </EmphasizedVariantContext>
    );
};

export {
    EmphasizedVariantProvider,            // Named export for readability.
    EmphasizedVariantProvider as default, // Default export to support React.lazy.
}
