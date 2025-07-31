'use client' // The exported `useMildVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type MildVariantProps,
    type MildVariantOptions,
    type ResolvedMildVariant,
}                           from './types.js'

// Defaults:
import {
    defaultMild,
}                           from './internal-defaults.js'

// Utilities:
import {
    getMildClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    MildVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective mild value based on props and context.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the mild value from context, if available.
 * - `'invert'`  : flips the mild value from context (`true` ⇄ `false`), if available.
 * - `undefined` : falls back to the default mild value.
 * - Otherwise   : uses the explicitly provided mild value as-is.
 * 
 * @param {MildVariantProps['mild']} mild - The pre-resolved mild value from props.
 * @param {boolean} defaultMild - Fallback mild value when context is missing.
 * @returns {boolean} - The resolved mild value.
 */
const useEffectiveMildValue = (mild: MildVariantProps['mild'], defaultMild: boolean): boolean => {
    switch (mild) {
        // If the mild is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited mild from context:
            const inheritedMild = use(MildVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedMild !== undefined) return inheritedMild;
            
            
            
            // Otherwise, fallback to the default mild:
            return defaultMild;
        }
        
        
        
        // If the mild is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited mild from context:
            const inheritedMild = use(MildVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedMild !== undefined) return !inheritedMild;
            
            
            
            // Otherwise, fallback to the default mild:
            return defaultMild;
        }
        
        
        
        // If the mild is undefined, return the default mild:
        case undefined : return defaultMild;
        
        
        
        // The mild is explicitly defined, return it as-is:
        default        : return mild;
    } // switch
};

/**
 * Resolves the mild state along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {MildVariantProps} props - The component props that may include a `mild` value.
 * @param {MildVariantOptions} options - An optional configuration specifying a default mild value when no `mild` prop is explicitly provided.
 * @returns {ResolvedMildVariant} - The resolved mild state along with its associated CSS class name.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useMildVariant,
 *     MildVariantProps,
 * } from '@reusable-ui/mild-variant';
 * import styles from './MildBox.module.css';
 * 
 * export interface MildBoxProps extends MildVariantProps {}
 * 
 * // A box that conditionally softens (reading friendly) its appearance.
 * export const MildBox: FC<MildBoxProps> = (props) => {
 *     const {
 *         mild,
 *         mildClassname,
 *     } = useMildVariant(props, {
 *         defaultMild: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${mildClassname}`}
 *         >
 *             {mild && <span className={styles.badge}>🔔</span>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useMildVariant = (props: MildVariantProps, options?: MildVariantOptions): ResolvedMildVariant => {
    // Extract props and assign defaults:
    const {
        mild,
    } = props;
    
    
    
    // Resolve the effective mild value:
    const effectiveIsMild = useEffectiveMildValue(mild, options?.defaultMild ?? defaultMild);
    
    
    
    // Return resolved mild attributes:
    return {
        mild          : effectiveIsMild,
        mildClassname : getMildClassname(effectiveIsMild),
    } satisfies ResolvedMildVariant;
};
