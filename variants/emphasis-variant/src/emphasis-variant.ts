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
    defaultDeclarativeEmphasized,
    defaultFallbackEmphasized,
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
 * - `'inherit'` : uses the emphasized value from context, if available, otherwise falls back to `fallbackEmphasized`.
 * - `'invert'`  : flips the emphasized value from context (`true` ⇄ `false`), if available, otherwise falls back to `fallbackEmphasized`.
 * - Otherwise   : uses the explicitly provided emphasized value as-is.
 * 
 * @param {Required<EmphasisVariantProps>['emphasized']} declarativeEmphasized - The declared emphasized value from props.
 * @param {boolean} fallbackEmphasized - The fallback emphasized when context is missing.
 * @returns {boolean} - The resolved emphasized value.
 */
const useEffectiveEmphasisValue = (declarativeEmphasized: Required<EmphasisVariantProps>['emphasized'], fallbackEmphasized: boolean): boolean => {
    switch (declarativeEmphasized) {
        // If the emphasized is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited emphasized from context:
            const inheritedEmphasized = use(EmphasisVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedEmphasized !== undefined) return inheritedEmphasized;
            
            
            
            // Otherwise, fallback to the specified fallback emphasized:
            return fallbackEmphasized;
        }
        
        
        
        // If the emphasized is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited emphasized from context:
            const inheritedEmphasized = use(EmphasisVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedEmphasized !== undefined) return !inheritedEmphasized;
            
            
            
            // Otherwise, fallback to the specified fallback emphasized:
            return fallbackEmphasized;
        }
        
        
        
        // The emphasized is explicitly defined, return it as-is:
        default        : return declarativeEmphasized;
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
        defaultEmphasized = defaultDeclarativeEmphasized,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        emphasized : declarativeEmphasized = defaultEmphasized,
    } = props;
    
    
    
    // Resolve the effective emphasized value:
    const effectiveIsEmphasized = useEffectiveEmphasisValue(declarativeEmphasized, defaultFallbackEmphasized);
    
    
    
    // Return resolved emphasized attributes:
    return {
        emphasized         : effectiveIsEmphasized,
        emphasisClassname  : getEmphasisClassname(effectiveIsEmphasized),
    } satisfies EmphasisVariant;
};
