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
    type ResolvedOutlineVariant,
}                           from './types.js'

// Defaults:
import {
    defaultOutlined,
}                           from './internal-defaults.js'

// Utilities:
import {
    getOutlinedClassname,
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
 * - `undefined` : falls back to the default outlined value.
 * - Otherwise   : uses the explicitly provided outlined value as-is.
 * 
 * @param {OutlineVariantProps['outlined']} outlined - The pre-resolved outlined value from props.
 * @param {boolean} defaultOutlined - Fallback outlined value when context is missing.
 * @returns {boolean} - The resolved outlined value.
 */
const useEffectiveOutlinedValue = (outlined: OutlineVariantProps['outlined'], defaultOutlined: boolean): boolean => {
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
        
        
        
        // If the outlined is undefined, return the default outlined:
        case undefined : return defaultOutlined;
        
        
        
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
 * @returns {ResolvedOutlineVariant} - The resolved outlined state along with its associated CSS class name.
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
 *         outlinedClassname,
 *     } = useOutlineVariant(props, {
 *         defaultOutlined: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${outlinedClassname}`}
 *         >
 *             {outlined && <span className={styles.badge}>🔔</span>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useOutlineVariant = (props: OutlineVariantProps, options?: OutlineVariantOptions): ResolvedOutlineVariant => {
    // Extract props and assign defaults:
    const {
        outlined,
    } = props;
    
    
    
    // Resolve the effective outlined value:
    const effectiveIsOutlined = useEffectiveOutlinedValue(outlined, options?.defaultOutlined ?? defaultOutlined);
    
    
    
    // Return resolved outlined attributes:
    return {
        outlined          : effectiveIsOutlined,
        outlinedClassname : getOutlinedClassname(effectiveIsOutlined),
    } satisfies ResolvedOutlineVariant;
};
