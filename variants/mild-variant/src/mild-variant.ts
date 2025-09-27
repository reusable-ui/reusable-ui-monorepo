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
    type MildVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeMild,
    defaultEffectiveMild,
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
 * - `'inherit'` : uses the mild value from context, if available, otherwise falls back to `fallbackMild`.
 * - `'invert'`  : flips the mild value from context (`true` ⇄ `false`), if available, otherwise falls back to `fallbackMild`.
 * - Otherwise   : uses the explicitly provided mild value as-is.
 * 
 * @param {Required<MildVariantProps>['mild']} declarativeMild - The declared mild value from props.
 * @param {boolean} fallbackMild - The fallback mild when context is missing.
 * @returns {boolean} - The resolved mild value.
 */
const useEffectiveMildValue = (declarativeMild: Required<MildVariantProps>['mild'], fallbackMild: boolean): boolean => {
    switch (declarativeMild) {
        // If the mild is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited mild from context:
            const inheritedMild = use(MildVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedMild !== undefined) return inheritedMild;
            
            
            
            // Otherwise, fallback to the specified fallback mild:
            return fallbackMild;
        }
        
        
        
        // If the mild is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited mild from context:
            const inheritedMild = use(MildVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedMild !== undefined) return !inheritedMild;
            
            
            
            // Otherwise, fallback to the specified fallback mild:
            return fallbackMild;
        }
        
        
        
        // The mild is explicitly defined, return it as-is:
        default        : return declarativeMild;
    } // switch
};

/**
 * Resolves the mild state along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {MildVariantProps} props - The component props that may include a `mild` value.
 * @param {MildVariantOptions} options - An optional configuration specifying a default mild value when no `mild` prop is explicitly provided.
 * @returns {MildVariant} - The resolved mild state along with its associated CSS class name.
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
export const useMildVariant = (props: MildVariantProps, options?: MildVariantOptions): MildVariant => {
    // Extract options and assign defaults:
    const {
        defaultMild = defaultDeclarativeMild,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        mild : declarativeMild = defaultMild,
    } = props;
    
    
    
    // Resolve the effective mild value:
    const effectiveIsMild = useEffectiveMildValue(declarativeMild, defaultEffectiveMild);
    
    
    
    // Return resolved mild attributes:
    return {
        mild          : effectiveIsMild,
        mildClassname : getMildClassname(effectiveIsMild),
    } satisfies MildVariant;
};
