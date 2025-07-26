// Types:
import {
    type Orientation,
}                           from './types.js'

// Defaults:
import {
    defaultOrientation,
}                           from './internal-defaults.js'

// Utilities:
import {
    orientationClassnameMap,
}                           from './internal-utilities.js'



/**
 * Props for specifying the orientation of the component.
 * 
 * Accepts an optional `orientation`, falling back to a default when not provided.
 */
export interface OrientationVariantProps {
    /**
     * Specifies the desired orientation of the component:
     * - `'inline'`: horizontal orientation, aligns along the inline axis (e.g., left-to-right or right-to-left)
     * - `'block'` : vertical orientation, aligns along the block axis (e.g., top-to-bottom)
     */
    orientation          ?: Orientation
}

/**
 * Optional configuration options for specifying the default orientation.
 * 
 * Applied when the component does not explicitly provide the `orientation` prop.
 */
export interface OrientationVariantOptions {
    /**
     * The default orientation to apply when no `orientation` prop is explicitly provided.
     */
    defaultOrientation   ?: Orientation
}

/**
 * Represents the final resolved orientation for the component, along with its associated CSS class name and accessibility metadata.
 */
export interface ResolvedOrientationVariant {
    /**
     * The resolved orientation value.
     * 
     * Example values:
     * - `'inline'`: horizontal orientation, aligns along the inline axis (e.g., left-to-right or right-to-left)
     * - `'block'` : vertical orientation, aligns along the block axis (e.g., top-to-bottom)
     */
    orientation           : Orientation
    
    /**
     * CSS class name corresponding to the resolved orientation.
     * 
     * Example values:
     * - `'o-inline'`
     * - `'o-block'`
     */
    orientationClassname  : `o-${Orientation}`
    
    /**
     * Indicates whether the resolved orientation is horizontal (inline).
     */
    isOrientationInline   : boolean
    
    /**
     * Indicates whether the resolved orientation is vertical (block).
     */
    isOrientationBlock    : boolean
    
    /**
     * ARIA-compatible orientation attribute:
     * `'horizontal'` for inline, `'vertical'` for block.
     */
    ariaOrientation       : 'horizontal' | 'vertical'
}

/**
 * Resolves the orientation value along with its associated CSS class name and accessibility metadata,
 * based on component props and optional default configuration.
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
        orientation = options?.defaultOrientation ?? defaultOrientation,
    } = props;
    
    
    
    // Determine orientation flags:
    const isOrientationInline = (orientation === 'inline');
    
    
    
    // Return resolved orientation attributes:
    return {
        orientation,
        orientationClassname : orientationClassnameMap[orientation],
        isOrientationInline,
        isOrientationBlock   : !isOrientationInline,
        ariaOrientation      : isOrientationInline ? 'horizontal' : 'vertical',
    } satisfies ResolvedOrientationVariant;
};
