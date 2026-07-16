'use client' // The exported `useMildVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InvertableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInvertableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

// Types:
import {
    type MildVariantProps,
    type MildVariantOptions,
    type MildVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeMild,
    defaultFallbackMild,
}                           from './internal-defaults.js'

// Utilities:
import {
    getMildClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    MildVariantContext,
}                           from './internal-contexts.js'



/** The inheritable and invertable variant definition for mild variant management. */
const invertableVariantDefinition : InvertableVariantDefinition<boolean, 'inherit', 'invert'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeMild,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    invertableVariantToken  : 'invert',
    variantContext          : MildVariantContext,
    invertVariant           : (inheritedVariant) => !inheritedVariant,
    
    // Fallbacks:
    fallbackVariant         : defaultFallbackMild,
};

/**
 * Resolves the current mild variant.
 * 
 * Useful for derived components that need to determine the current mild variant of the base component.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the mild value from context.
 * - `'invert'`  : flips the mild value from context (`true` ⇄ `false`).
 * - Otherwise   : uses the explicitly provided mild value as-is.
 * 
 * @param props The component props that may include a `mild` value.
 * @param options An optional configuration specifying a default mild value when no `mild` prop is explicitly provided.
 * @returns The resolved mild value.
 */
export const useResolvedMild = (props: MildVariantProps, options?: MildVariantOptions): boolean => {
    // Extract options:
    const {
        defaultMild  : defaultVariant,
        fallbackMild : fallbackVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        mild : variant,
    } = props;
    
    
    
    // Resolve effective mild variant:
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
 * Resolves the mild state along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param props The component props that may include a `mild` value.
 * @param options An optional configuration specifying a default mild value when no `mild` prop is explicitly provided.
 * @returns The resolved mild state along with its associated CSS class name.
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
    // Resolve effective mild value:
    const effectiveIsMild = useResolvedMild(props, options);
    
    
    
    // Return resolved mild attributes:
    return {
        mild          : effectiveIsMild,
        mildClassname : getMildClassname(effectiveIsMild),
    } satisfies MildVariant;
};
