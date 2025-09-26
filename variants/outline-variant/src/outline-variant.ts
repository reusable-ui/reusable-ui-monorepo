'use client' // The exported `useOutlineVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type OutlineVariantProps,
    type OutlineVariantOptions,
    type OutlineVariant,
}                           from './types.js'

// Defaults:
import {
    declarativeDefaultOutlined,
    effectiveDefaultOutlined,
}                           from './internal-defaults.js'

// Utilities:
import {
    getOutlineClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    OutlineVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective outlined value based on props and context.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the outlined value from context, if available.
 * - `'invert'`  : flips the outlined value from context (`true` ⇄ `false`), if available.
 * - Otherwise   : uses the explicitly provided outlined value as-is.
 * 
 * @param {Required<OutlineVariantProps>['outlined']} outlined - The pre-resolved outlined value from props.
 * @param {boolean} defaultOutlined - Fallback outlined value when context is missing.
 * @returns {boolean} - The resolved outlined value.
 */
const useEffectiveOutlinedValue = (outlined: Required<OutlineVariantProps>['outlined'], defaultOutlined: boolean): boolean => {
    switch (outlined) {
        // If the outlined is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited outlined from context:
            const inheritedOutlined = use(OutlineVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedOutlined !== undefined) return inheritedOutlined;
            
            
            
            // Otherwise, fallback to the default outlined:
            return defaultOutlined;
        }
        
        
        
        // If the outlined is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited outlined from context:
            const inheritedOutlined = use(OutlineVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedOutlined !== undefined) return !inheritedOutlined;
            
            
            
            // Otherwise, fallback to the default outlined:
            return defaultOutlined;
        }
        
        
        
        // The outlined is explicitly defined, return it as-is:
        default        : return outlined;
    } // switch
};

/**
 * Resolves the outlined state along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {OutlineVariantProps} props - The component props that may include an `outlined` value.
 * @param {OutlineVariantOptions} options - An optional configuration specifying a default outlined value when no `outlined` prop is explicitly provided.
 * @returns {OutlineVariant} - The resolved outlined state along with its associated CSS class name.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useOutlineVariant,
 *     OutlineVariantProps,
 * } from '@reusable-ui/outline-variant';
 * import styles from './OutlinedBox.module.css';
 * 
 * export interface OutlinedBoxProps extends OutlineVariantProps {}
 * 
 * // A box that conditionally outlines its appearance.
 * export const OutlinedBox: FC<OutlinedBoxProps> = (props) => {
 *     const {
 *         outlined,
 *         outlineClassname,
 *     } = useOutlineVariant(props, {
 *         defaultOutlined: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${outlineClassname}`}
 *         >
 *             {outlined && <span className={styles.badge}>🔔</span>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useOutlineVariant = (props: OutlineVariantProps, options?: OutlineVariantOptions): OutlineVariant => {
    // Extract options and assign defaults:
    const {
        defaultOutlined = declarativeDefaultOutlined,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        outlined : declarativeOutlined = defaultOutlined,
    } = props;
    
    
    
    // Resolve the effective outlined value:
    const effectiveIsOutlined = useEffectiveOutlinedValue(declarativeOutlined, effectiveDefaultOutlined);
    
    
    
    // Return resolved outlined attributes:
    return {
        outlined         : effectiveIsOutlined,
        outlineClassname : getOutlineClassname(effectiveIsOutlined),
    } satisfies OutlineVariant;
};
