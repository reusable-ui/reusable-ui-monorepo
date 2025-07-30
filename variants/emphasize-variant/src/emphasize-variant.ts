'use client' // The exported `useEmphasizeVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type EmphasizeVariantProps,
    type EmphasizeVariantOptions,
    type ResolvedEmphasizeVariant,
}                           from './types.js'

// Defaults:
import {
    defaultEmphasized,
}                           from './internal-defaults.js'

// Utilities:
import {
    getEmphasizedClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    EmphasizeVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective emphasized value based on props and context.
 * 
 * Resolution order:
 * - `'inherit'` : retrieves the emphasized value from context, if available.
 * - `'invert'`  : reverses the emphasized value from context (`true` ⇄ `false`), if available.
 * - `undefined` : falls back to the default emphasized value.
 * - Otherwise   : uses the explicitly provided emphasized value as-is.
 * 
 * @param {EmphasizeVariantProps['emphasized']} emphasized - The pre-resolved emphasized value provided from props.
 * @param {boolean} defaultEmphasized - Fallback emphasized value when context is unavailable.
 * @returns {boolean} - The resolved emphasized value.
 */
const useEffectiveEmphasizedValue = (emphasized: EmphasizeVariantProps['emphasized'], defaultEmphasized: boolean): boolean => {
    switch (emphasized) {
        // If the emphasized is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited emphasized from context:
            const inheritedEmphasized = use(EmphasizeVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedEmphasized !== undefined) return inheritedEmphasized;
            
            
            
            // Otherwise, fallback to the default emphasized:
            return defaultEmphasized;
        }
        
        
        
        // If the emphasized is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited emphasized from context:
            const inheritedEmphasized = use(EmphasizeVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedEmphasized !== undefined) return !inheritedEmphasized;
            
            
            
            // Otherwise, fallback to the default emphasized:
            return defaultEmphasized;
        }
        
        
        
        // If the emphasized is undefined, return the default emphasized:
        case undefined : return defaultEmphasized;
        
        
        
        // The emphasized is explicitly defined, return it as-is:
        default        : return emphasized;
    } // switch
};

/**
 * Resolves the emphasized state along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {EmphasizeVariantProps} props - The component props that may include an `emphasized` value.
 * @param {EmphasizeVariantOptions} options - An optional configuration specifying a default emphasized value when no `emphasized` prop is explicitly provided.
 * @returns {ResolvedEmphasizeVariant} - The resolved emphasized state along with its associated CSS class name.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useEmphasizeVariant,
 *     EmphasizeVariantProps,
 * } from '@reusable-ui/emphasize-variant';
 * import styles from './EmphasizedBox.module.css';
 * 
 * export interface EmphasizedBoxProps extends EmphasizeVariantProps {}
 * 
 * // A box that conditionally emphasizes its appearance.
 * export const EmphasizedBox: FC<EmphasizedBoxProps> = (props) => {
 *     const {
 *         emphasized,
 *         emphasizedClassname,
 *     } = useEmphasizeVariant(props, {
 *         defaultEmphasized: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${emphasizedClassname}`}
 *         >
 *             {emphasized && <strong>Important Content</strong>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useEmphasizeVariant = (props: EmphasizeVariantProps, options?: EmphasizeVariantOptions): ResolvedEmphasizeVariant => {
    // Extract props and assign defaults:
    const {
        emphasized,
    } = props;
    
    
    
    // Resolve the effective emphasized value:
    const effectiveIsEmphasized = useEffectiveEmphasizedValue(emphasized, options?.defaultEmphasized ?? defaultEmphasized);
    
    
    
    // Return resolved emphasized attributes:
    return {
        emphasized          : effectiveIsEmphasized,
        emphasizedClassname : getEmphasizedClassname(effectiveIsEmphasized),
    } satisfies ResolvedEmphasizeVariant;
};
