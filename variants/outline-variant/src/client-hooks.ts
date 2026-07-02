'use client' // The exported `useOutlineVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InvertableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInvertableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

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
}                           from './internal-contexts.js'



/** The inheritable and invertable variant definition for outline variant management. */
const invertableVariantDefinition : InvertableVariantDefinition<boolean, 'inherit', 'invert'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeOutlined,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    invertableVariantToken  : 'invert',
    variantContext          : OutlineVariantContext,
    invertVariant           : (inheritedVariant) => !inheritedVariant,
    
    // Fallbacks:
    fallbackVariant         : defaultFallbackOutlined,
};

/**
 * Resolves the current outlined variant.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the outlined value from context.
 * - `'invert'`  : flips the outlined value from context (`true` ⇄ `false`).
 * - Otherwise   : uses the explicitly provided outlined value as-is.
 * 
 * @param props - The component props that may include an `outlined` value.
 * @param options - An optional configuration specifying a default outlined value when no `outlined` prop is explicitly provided.
 * @returns The resolved outlined value.
 */
export const useResolvedOutlined = (props: OutlineVariantProps, options?: OutlineVariantOptions): boolean => {
    // Extract options:
    const {
        defaultOutlined  : defaultVariant,
        fallbackOutlined : fallbackVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        outlined : variant,
    } = props;
    
    
    
    // Resolve effective outline variant:
    return useResolvedInvertableVariant<boolean, 'inherit', 'invert'>(
        // Props:
        { variant },
        
        // Options:
        { defaultVariant, fallbackVariant },
        
        // Definition:
        invertableVariantDefinition,
    );
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
    // Resolve effective outlined value:
    const effectiveIsOutlined = useResolvedOutlined(props, options);
    
    
    
    // Return resolved outlined attributes:
    return {
        outlined         : effectiveIsOutlined,
        outlineClassname : getOutlineClassname(effectiveIsOutlined),
    } satisfies OutlineVariant;
};
