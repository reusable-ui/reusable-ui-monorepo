'use client' // The exported `useOrientationVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type Orientation,
    type OrientationVariantProps,
    type OrientationVariantOptions,
    type ResolvedOrientationVariant,
}                           from './types.js'

// Defaults:
import {
    semiDefaultOrientation,
    finalDefaultOrientation,
}                           from './internal-defaults.js'

// Utilities:
import {
    orientationClassnameMap,
}                           from './internal-utilities.js'

// Contexts:
import {
    OrientationVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective orientation value based on props and context.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the orientation value from context, if available.
 * - `'invert'`  : flips the orientation value from context (`'inline'` ⇄ `'block'`), if available.
 * - Otherwise   : uses the explicitly provided orientation value as-is.
 * 
 * @param {Required<OrientationVariantProps>['orientation']} orientation - The pre-resolved orientation value from props.
 * @param {Orientation} defaultOrientation - Fallback orientation value when context is missing.
 * @returns {Orientation} - The resolved orientation value.
 */
const useEffectiveOrientationValue = (orientation: Required<OrientationVariantProps>['orientation'], defaultOrientation: Orientation): Orientation => {
    switch (orientation) {
        // If the orientation is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited orientation from context:
            const inheritedOrientation = use(OrientationVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedOrientation !== undefined) return inheritedOrientation;
            
            
            
            // Otherwise, fallback to the default orientation:
            return defaultOrientation;
        }
        
        
        
        // If the orientation is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited orientation from context:
            const inheritedOrientation = use(OrientationVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedOrientation !== undefined) return inheritedOrientation === 'inline' ? 'block' : 'inline';
            
            
            
            // Otherwise, fallback to the default orientation:
            return defaultOrientation;
        }
        
        
        
        // The orientation is explicitly defined, return it as-is:
        default        : return orientation;
    } // switch
};

/**
 * Resolves the orientation value along with its associated CSS class name and accessibility metadata,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {OrientationVariantProps} props - The component props that may include an `orientation` value.
 * @param {OrientationVariantOptions} options - An optional configuration specifying a default orientation when no `orientation` prop is explicitly provided.
 * @returns {ResolvedOrientationVariant} - The resolved orientation value along with its associated CSS class name and accessibility metadata.
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
export const useOrientationVariant = (props: OrientationVariantProps, options?: OrientationVariantOptions): ResolvedOrientationVariant => {
    // Extract options and assign defaults:
    const {
        defaultOrientation = finalDefaultOrientation,
    } = options ?? {};
    
    const {
        defaultOrientation : intermediateDefaultOrientation = semiDefaultOrientation,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        orientation        = intermediateDefaultOrientation,
    } = props;
    
    
    
    // Resolve the effective orientation value:
    const effectiveOrientation = useEffectiveOrientationValue(orientation, defaultOrientation);
    
    
    
    // Determine orientation flags:
    const isOrientationInline = (effectiveOrientation === 'inline');
    
    
    
    // Return resolved orientation attributes:
    return {
        orientation          : effectiveOrientation,
        orientationClassname : orientationClassnameMap[effectiveOrientation],
        isOrientationInline,
        isOrientationBlock   : !isOrientationInline,
        ariaOrientation      : isOrientationInline ? 'horizontal' : 'vertical',
    } satisfies ResolvedOrientationVariant;
};
