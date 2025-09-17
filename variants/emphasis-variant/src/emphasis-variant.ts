'use client' // The exported `useEmphasisVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type EmphasisVariantProps,
    type EmphasisVariantOptions,
    type EmphasisVariant,
}                           from './types.js'

// Defaults:
import {
    semiDefaultEmphasized,
    finalDefaultEmphasized,
}                           from './internal-defaults.js'

// Utilities:
import {
    getEmphasisClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    EmphasisVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective emphasized value based on props and context.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the emphasized value from context, if available.
 * - `'invert'`  : flips the emphasized value from context (`true` ⇄ `false`), if available.
 * - Otherwise   : uses the explicitly provided emphasized value as-is.
 * 
 * @param {Required<EmphasisVariantProps>['emphasized']} emphasized - The pre-resolved emphasized value from props.
 * @param {boolean} defaultEmphasized - Fallback emphasized value when context is missing.
 * @returns {boolean} - The resolved emphasized value.
 */
const useEffectiveEmphasizedValue = (emphasized: Required<EmphasisVariantProps>['emphasized'], defaultEmphasized: boolean): boolean => {
    switch (emphasized) {
        // If the emphasized is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited emphasized from context:
            const inheritedEmphasized = use(EmphasisVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedEmphasized !== undefined) return inheritedEmphasized;
            
            
            
            // Otherwise, fallback to the default emphasized:
            return defaultEmphasized;
        }
        
        
        
        // If the emphasized is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited emphasized from context:
            const inheritedEmphasized = use(EmphasisVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedEmphasized !== undefined) return !inheritedEmphasized;
            
            
            
            // Otherwise, fallback to the default emphasized:
            return defaultEmphasized;
        }
        
        
        
        // The emphasized is explicitly defined, return it as-is:
        default        : return emphasized;
    } // switch
};

/**
 * Resolves the emphasized state along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {EmphasisVariantProps} props - The component props that may include an `emphasized` value.
 * @param {EmphasisVariantOptions} options - An optional configuration specifying a default emphasized value when no `emphasized` prop is explicitly provided.
 * @returns {EmphasisVariant} - The resolved emphasized state along with its associated CSS class name.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useEmphasisVariant,
 *     EmphasisVariantProps,
 * } from '@reusable-ui/emphasis-variant';
 * import styles from './EmphasizedBox.module.css';
 * 
 * export interface EmphasizedBoxProps extends EmphasisVariantProps {}
 * 
 * // A box that conditionally emphasizes its appearance.
 * export const EmphasizedBox: FC<EmphasizedBoxProps> = (props) => {
 *     const {
 *         emphasized,
 *         emphasisClassname,
 *     } = useEmphasisVariant(props, {
 *         defaultEmphasized: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${emphasisClassname}`}
 *         >
 *             {emphasized && <strong>Important Content</strong>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useEmphasisVariant = (props: EmphasisVariantProps, options?: EmphasisVariantOptions): EmphasisVariant => {
    // Extract options and assign defaults:
    const {
        defaultEmphasized = finalDefaultEmphasized,
    } = options ?? {};
    
    const {
        defaultEmphasized : intermediateDefaultEmphasized = semiDefaultEmphasized,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        emphasized        = intermediateDefaultEmphasized,
    } = props;
    
    
    
    // Resolve the effective emphasized value:
    const effectiveIsEmphasized = useEffectiveEmphasizedValue(emphasized, defaultEmphasized);
    
    
    
    // Return resolved emphasized attributes:
    return {
        emphasized         : effectiveIsEmphasized,
        emphasisClassname  : getEmphasisClassname(effectiveIsEmphasized),
    } satisfies EmphasisVariant;
};
