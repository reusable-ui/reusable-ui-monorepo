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
    defaultDeclarativeOutlined,
    defaultFallbackOutlined,
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
 * - `'inherit'` : uses the outlined value from context, if available, otherwise falls back to `fallbackOutlined`.
 * - `'invert'`  : flips the outlined value from context (`true` ⇄ `false`), if available, otherwise falls back to `fallbackOutlined`.
 * - Otherwise   : uses the explicitly provided outlined value as-is.
 * 
 * @param {Required<OutlineVariantProps>['outlined']} declarativeOutlined - The declared outlined value from props.
 * @param {boolean} fallbackOutlined - The fallback outlined when context is missing.
 * @returns {boolean} - The resolved outlined value.
 */
const useEffectiveOutlineValue = (declarativeOutlined: Required<OutlineVariantProps>['outlined'], fallbackOutlined: boolean): boolean => {
    switch (declarativeOutlined) {
        // If the outlined is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited outlined from context:
            const inheritedOutlined = use(OutlineVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedOutlined !== undefined) return inheritedOutlined;
            
            
            
            // Otherwise, fallback to the specified fallback outlined:
            return fallbackOutlined;
        }
        
        
        
        // If the outlined is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited outlined from context:
            const inheritedOutlined = use(OutlineVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedOutlined !== undefined) return !inheritedOutlined;
            
            
            
            // Otherwise, fallback to the specified fallback outlined:
            return fallbackOutlined;
        }
        
        
        
        // The outlined is explicitly defined, return it as-is:
        default        : return declarativeOutlined;
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
        defaultOutlined  = defaultDeclarativeOutlined,
        fallbackOutlined = defaultFallbackOutlined,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        outlined : declarativeOutlined = defaultOutlined,
    } = props;
    
    
    
    // Resolve the effective outlined value:
    const effectiveIsOutlined = useEffectiveOutlineValue(declarativeOutlined, fallbackOutlined);
    
    
    
    // Return resolved outlined attributes:
    return {
        outlined         : effectiveIsOutlined,
        outlineClassname : getOutlineClassname(effectiveIsOutlined),
    } satisfies OutlineVariant;
};
