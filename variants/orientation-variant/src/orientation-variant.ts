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
    systemDefaultOrientation,
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
 * - `'inherit'` retrieves the orientation from context.
 * - `'invert'` reverses the contextual orientation (`'inline'` ⇄ `'block'`).
 * - Otherwise, returns the provided orientation value as-is.
 * 
 * @param {Required<OrientationVariantProps>['orientation']} orientation - The pre-resolved orientation value derived from props.
 * @returns {Orientation} - The resolved orientation value.
 */
const useEffectiveOrientationVariant = (orientation: Required<OrientationVariantProps>['orientation']): Orientation => {
    switch (orientation) {
        // If the orientation is 'inherit', use the context value:
        case 'inherit' : return use(OrientationVariantContext);
        
        
        
        // If the orientation is 'invert', return the opposite of the context value:
        case 'invert'  : return use(OrientationVariantContext) === 'inline' ? 'block' : 'inline';
        
        
        
        // Otherwise, return the already resolved effective orientation:
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
 * ```ts
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
    // Extract props and assign defaults:
    const {
        orientation = options?.defaultOrientation ?? systemDefaultOrientation,
    } = props;
    
    
    
    // Resolve the effective orientation value:
    const effectiveOrientation = useEffectiveOrientationVariant(orientation);
    
    
    
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
