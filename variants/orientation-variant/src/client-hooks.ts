'use client' // The exported `useOrientationVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InvertableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInvertableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

// Types:
import {
    type Orientation,
    type OrientationVariantProps,
    type OrientationVariantOptions,
    type OrientationVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeOrientation,
    defaultFallbackOrientation,
}                           from './internal-defaults.js'

// Utilities:
import {
    orientationClassnameMap,
}                           from './internal-utilities.js'

// Contexts:
import {
    OrientationVariantContext,
}                           from './internal-contexts.js'



/** The inheritable and invertable variant definition for orientation variant management. */
const invertableVariantDefinition : InvertableVariantDefinition<Orientation, 'inherit', 'invert'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeOrientation,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    invertableVariantToken  : 'invert',
    variantContext          : OrientationVariantContext,
    invertVariant           : (inheritedVariant) => inheritedVariant === 'inline' ? 'block' : 'inline',
    
    // Fallbacks:
    fallbackVariant         : defaultFallbackOrientation,
};

/**
 * Resolves the current orientation variant.
 * 
 * Useful for derived components that need to determine the current orientation of the base component.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the orientation value from context.
 * - `'invert'`  : flips the orientation value from context (`'inline'` ⇄ `'block'`).
 * - Otherwise   : uses the explicitly provided orientation value as-is.
 * 
 * @param props - The component props that may include an `orientation` value.
 * @param options - An optional configuration specifying a default orientation when no `orientation` prop is explicitly provided.
 * @returns The resolved orientation value.
 */
export const useResolvedOrientation = (props: OrientationVariantProps, options?: OrientationVariantOptions): Orientation => {
    // Extract options:
    const {
        defaultOrientation  : defaultVariant,
        fallbackOrientation : fallbackVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        orientation : variant,
    } = props;
    
    
    
    // Resolve effective orientation variant:
    return useResolvedInvertableVariant<Orientation, 'inherit', 'invert'>(
        // Props:
        { variant },
        
        // Options:
        { defaultVariant, fallbackVariant },
        
        // Definition:
        invertableVariantDefinition,
    );
};



/**
 * Resolves the orientation value along with its associated CSS class name and accessibility metadata,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {OrientationVariantProps} props - The component props that may include an `orientation` value.
 * @param {OrientationVariantOptions} options - An optional configuration specifying a default orientation when no `orientation` prop is explicitly provided.
 * @returns {OrientationVariant} - The resolved orientation value along with its associated CSS class name and accessibility metadata.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useOrientationVariant,
 *     OrientationVariantProps,
 * } from '@reusable-ui/orientation-variant';
 * import styles from './OrientationBox.module.css';
 * 
 * export interface OrientationBoxProps extends OrientationVariantProps {}
 * 
 * // A layout container that adapts to horizontal or vertical orientation.
 * export const OrientationBox: FC<OrientationBoxProps> = (props) => {
 *     const {
 *         orientation,
 *         orientationClassname,
 *         isOrientationInline,
 *         isOrientationBlock,
 *         ariaOrientation,
 *     } = useOrientationVariant(props, {
 *         defaultOrientation: 'block', // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${orientationClassname}`}
 *             aria-orientation={ariaOrientation}
 *         >
 *             {isOrientationInline && (
 *                 <div className={styles.inlineContent}>
 *                     <h4>Horizontal Layout</h4>
 *                     <p>Rendering horizontal content based on logical flow.</p>
 *                 </div>
 *             )}
 *             {isOrientationBlock && (
 *                 <div className={styles.blockContent}>
 *                     <h4>Vertical Layout</h4>
 *                     <p>Rendering vertical content in a block-oriented flow.</p>
 *                 </div>
 *             )}
 *         </div>
 *     );
 * };
 * ```
 */
export const useOrientationVariant = (props: OrientationVariantProps, options?: OrientationVariantOptions): OrientationVariant => {
    // Resolve effective orientation value:
    const effectiveOrientation = useResolvedOrientation(props, options);
    
    
    
    // Determine orientation flags:
    const isOrientationInline = (effectiveOrientation === 'inline');
    
    
    
    // Return resolved orientation attributes:
    return {
        orientation          : effectiveOrientation,
        orientationClassname : orientationClassnameMap[effectiveOrientation],
        isOrientationInline,
        isOrientationBlock   : !isOrientationInline,
        ariaOrientation      : isOrientationInline ? 'horizontal' : 'vertical',
    } satisfies OrientationVariant;
};
