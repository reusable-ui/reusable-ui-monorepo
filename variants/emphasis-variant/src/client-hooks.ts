'use client' // The exported `useEmphasisVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InvertableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInvertableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

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
}                           from './internal-contexts.js'



/** The inheritable and invertable variant definition for emphasized variant management. */
const invertableVariantDefinition : InvertableVariantDefinition<boolean, 'inherit', 'invert'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeEmphasized,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    invertableVariantToken  : 'invert',
    variantContext          : EmphasisVariantContext,
    invertVariant           : (inheritedVariant) => !inheritedVariant,
    
    // Fallbacks:
    fallbackVariant         : defaultFallbackEmphasized,
};

/**
 * Resolves the current emphasized variant.
 * 
 * Useful for derived components that need to determine the current emphasized variant of the base component.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the emphasized value from context.
 * - `'invert'`  : flips the emphasized value from context (`true` ⇄ `false`).
 * - Otherwise   : uses the explicitly provided emphasized value as-is.
 * 
 * @param props - The component props that may include an `emphasized` value.
 * @param options - An optional configuration specifying a default emphasized value when no `emphasized` prop is explicitly provided.
 * @returns The resolved emphasized value.
 */
export const useResolvedEmphasized = (props: EmphasisVariantProps, options?: EmphasisVariantOptions): boolean => {
    // Extract options:
    const {
        defaultEmphasized  : defaultVariant,
        fallbackEmphasized : fallbackVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        emphasized : variant,
    } = props;
    
    
    
    // Resolve effective emphasized variant:
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
    // Resolve effective emphasized value:
    const effectiveIsEmphasized = useResolvedEmphasized(props, options);
    
    
    
    // Return resolved emphasized attributes:
    return {
        emphasized         : effectiveIsEmphasized,
        emphasisClassname  : getEmphasisClassname(effectiveIsEmphasized),
    } satisfies EmphasisVariant;
};
