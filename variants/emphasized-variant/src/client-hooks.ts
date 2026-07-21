'use client' // The exported `useEmphasizedVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InvertableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInvertableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

// Types:
import {
    type EmphasizedVariantProps,
    type EmphasizedVariantOptions,
    type EmphasizedVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeEmphasized,
    defaultFallbackEmphasized,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveEmphasizedClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    EmphasizedVariantContext,
}                           from './internal-contexts.js'



/** The inheritable and invertable variant definition for emphasized variant management. */
const invertableVariantDefinition : InvertableVariantDefinition<boolean, 'inherit', 'invert'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeEmphasized,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    invertableVariantToken  : 'invert',
    variantContext          : EmphasizedVariantContext,
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
 * @param props The component props that may include an `emphasized` value.
 * @param options An optional configuration specifying a default emphasized value when no `emphasized` prop is explicitly provided.
 * @returns The resolved emphasized value.
 */
export const useResolvedEmphasized = (props: EmphasizedVariantProps, options?: EmphasizedVariantOptions): boolean => {
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
 * Resolves the emphasized state along with its associated CSS classname,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param props The component props that may include an `emphasized` value.
 * @param options An optional configuration specifying a default emphasized value when no `emphasized` prop is explicitly provided.
 * @returns The resolved emphasized state along with its associated CSS classname.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useEmphasizedVariant,
 *     EmphasizedVariantProps,
 * } from '@reusable-ui/emphasized-variant';
 * import styles from './EmphasizedBox.module.css';
 * 
 * export interface EmphasizedBoxProps extends EmphasizedVariantProps {}
 * 
 * // A box that conditionally emphasizes its appearance.
 * export const EmphasizedBox: FC<EmphasizedBoxProps> = (props) => {
 *     const {
 *         emphasized,
 *         emphasizedClassname,
 *     } = useEmphasizedVariant(props, {
 *         defaultEmphasized: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${emphasizedClassname}`}
 *         >
 *             {emphasized && <strong>Important Content</strong>}
 *             <p>Additional details go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useEmphasizedVariant = (props: EmphasizedVariantProps, options?: EmphasizedVariantOptions): EmphasizedVariant => {
    // Resolve effective emphasized value:
    const effectiveIsEmphasized = useResolvedEmphasized(props, options);
    
    
    
    // Return resolved emphasized attributes:
    return {
        emphasized          : effectiveIsEmphasized,
        emphasizedClassname : resolveEmphasizedClassname(effectiveIsEmphasized),
    } satisfies EmphasizedVariant;
};
