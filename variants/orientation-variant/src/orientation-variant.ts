// Types:
import {
    type AxisOrientation,
    type DirectionalOrientation,
}                           from './types.js'

// Defaults:
import {
    defaultAxisOrientation,
    defaultDirectionalOrientation,
}                           from './internal-defaults.js'

// Utilities:
import {
    axisOrientationClassnameMap,
    directionalOrientationClassnameMap,
}                           from './internal-utilities.js'



/**
 * Props for controlling the primary axis orientation of a component's appearance.
 * 
 * Accepts an optional `orientation`, falling back to the default when omitted.
 */
export interface AxisOrientationVariantProps {
    /**
     * Specifies the orientation of primary axis for component's appearance:
     * - `'inline'`: horizontal direction (e.g. left to right)
     * - `'block'` : vertical direction (e.g. top to bottom)
     */
    orientation         ?: AxisOrientation
}

/**
 * Configuration options for assigning the default axis orientation.
 * 
 * Used when a component does not explicitly provide an `orientation` prop.
 */
export interface AxisOrientationVariantOptions {
    /**
     * The default orientation to apply when the `orientation` property is not provided.
     */
    defaultOrientation  ?: AxisOrientation
}

/**
 * Represents the final resolved axis orientation, an associated class name, and accessibility metadata.
 */
export interface ResolvedAxisOrientationVariant {
    /**
     * The resolved axis orientation for the component.
     * - `'inline'`: horizontal direction (e.g. left to right)
     * - `'block'` : vertical direction (e.g. top to bottom)
     */
    orientation          : AxisOrientation
    
    /**
     * CSS class name that reflects the primary axis orientation.
     * e.g. `'o-inline'` or `'o-block'`
     */
    orientationClassname : `o-${AxisOrientation}`
    
    /**
     * `true` if the orientation is horizontal (inline).
     */
    isOrientationInline  : boolean
    
    /**
     * `true` if the orientation is vertical (block).
     */
    isOrientationBlock   : boolean
    
    /**
     * ARIA-compatible orientation attribute:
     * `'horizontal'` for inline, `'vertical'` for block.
     */
    ariaOrientation      : 'horizontal' | 'vertical'
}

/**
 * Resolves axis orientation, corresponding class name, and accessibility attribute
 * of a component based on its props and system defaults.
 * 
 * @param {AxisOrientationVariantProps} props - The component props containing axis orientation.
 * @param {AxisOrientationVariantOptions} options - An optional configuration specifying a default axis orientation fallback.
 * @returns {ResolvedAxisOrientationVariant} - The resolved orientation attributes.
 * 
 * @example
 * ```ts
 * import React, { FC } from 'react';
 * import {
 *     useAxisOrientationVariant,
 *     AxisOrientationVariantProps,
 * } from '@reusable-ui/orientation-variant';
 * import styles from 'OrientationBox.module.css';
 * 
 * export interface OrientationBoxProps extends AxisOrientationVariantProps {}
 * 
 * // Layout-aware box that adapts its flow direction:
 * export const OrientationBox : FC<OrientationBoxProps> = (props) => {
 *     const {
 *         orientation,
 *         orientationClassname,
 *         isOrientationInline,
 *         isOrientationBlock,
 *         ariaOrientation,
 *     } = useAxisOrientationVariant(props, {
 *         defaultOrientation: 'block', // fallback orientation
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${orientationClassname}`}
 *             aria-orientation={ariaOrientation}
 *         >
 *             {isOrientationInline && (
 *                 <div className={styles.inlineContent}>
 *                     Horizontal content
 *                 </div>
 *             )}
 *             {isOrientationBlock && (
 *                 <div className={styles.blockContent}>
 *                     Vertical content
 *                 </div>
 *             )}
 *         </div>
 *     );
 * };
 * ```
 */
export const useAxisOrientationVariant = (props: AxisOrientationVariantProps, options?: AxisOrientationVariantOptions): ResolvedAxisOrientationVariant => {
    // Extract props and assign defaults:
    const {
        orientation = options?.defaultOrientation ?? defaultAxisOrientation,
    } = props;
    
    
    
    // Determine orientation flags:
    const isOrientationInline = (orientation === 'inline');
    
    
    
    // Return resolved orientation attributes:
    return {
        orientation,
        orientationClassname : axisOrientationClassnameMap[orientation],
        isOrientationInline,
        isOrientationBlock   : !isOrientationInline,
        ariaOrientation      : isOrientationInline ? 'horizontal' : 'vertical',
    } satisfies ResolvedAxisOrientationVariant;
};



/**
 * Props for controlling the directional orientation of a component's appearance.
 * 
 * Accepts an optional `orientation`, falling back to the default when omitted.
 */
export interface DirectionalOrientationVariantProps {
    /**
     * Specifies the orientation of direction for component's appearance:
     * - `'inline-start'`: horizontal direction, start of inline axis (e.g. left in LTR, right in RTL)
     * - `'inline-end'`  : horizontal direction, end of inline axis (e.g. right in LTR, left in RTL)
     * - `'block-start'` : vertical direction, start of block axis (e.g. top in horizontal writing modes)
     * - `'block-end'`   : vertical direction, end of block axis (e.g. bottom in horizontal writing modes)
     */
    orientation         ?: DirectionalOrientation
}

/**
 * Configuration options for assigning the default directional orientation.
 * 
 * Used when a component does not explicitly provide an `orientation` prop.
 */
export interface DirectionalOrientationVariantOptions {
    /**
     * The default orientation to apply when the `orientation` property is not provided.
     */
    defaultOrientation  ?: DirectionalOrientation
}

/**
 * Represents the final resolved directional orientation, an associated class name, and accessibility metadata.
 */
export interface ResolvedDirectionalOrientationVariant {
    /**
     * The resolved directional orientation for the component.
     * - `'inline-start'`: horizontal direction, start of inline axis (e.g. left in LTR, right in RTL)
     * - `'inline-end'`  : horizontal direction, end of inline axis (e.g. right in LTR, left in RTL)
     * - `'block-start'` : vertical direction, start of block axis (e.g. top in horizontal writing modes)
     * - `'block-end'`   : vertical direction, end of block axis (e.g. bottom in horizontal writing modes)
     */
    orientation          : DirectionalOrientation
    
    /**
     * CSS class name that reflects the directional orientation.
     * e.g. `'o-inline-end'`, `'o-block-start'`
     */
    orientationClassname : `o-${DirectionalOrientation}`
    
    /**
     * `true` if the orientation is horizontal (inline).
     */
    isOrientationInline  : boolean
    
    /**
     * `true` if the orientation is vertical (block).
     */
    isOrientationBlock   : boolean
    
    /**
     * ARIA-compatible orientation attribute:
     * `'horizontal'` for inline, `'vertical'` for block.
     */
    ariaOrientation      : 'horizontal' | 'vertical'
}

/**
 * Resolves directional orientation, corresponding class name, and accessibility attribute
 * of a component based on its props and system defaults.
 * 
 * @param {DirectionalOrientationVariantProps} props - The component props containing directional orientation.
 * @param {DirectionalOrientationVariantOptions} options - An optional configuration specifying a default directional orientation fallback.
 * @returns {ResolvedDirectionalOrientationVariant} - The resolved orientation attributes.
 * 
 * @example
 * ```ts
 * import React, { FC } from 'react';
 * import {
 *     useDirectionalOrientationVariant,
 *     DirectionalOrientationVariantProps,
 * } from '@reusable-ui/orientation-variant';
 * import styles from './PlacementArrow.module.css';
 * 
 * export interface PlacementArrowProps extends DirectionalOrientationVariantProps {
 *     children?: React.ReactNode
 * }
 * 
 * // Flow-aware placement arrow component:
 * export const PlacementArrow: FC<PlacementArrowProps> = (props) => {
 *     const {
 *         orientation,
 *         orientationClassname,
 *         isOrientationInline,
 *         isOrientationBlock,
 *         ariaOrientation,
 *     } = useDirectionalOrientationVariant(props, {
 *         defaultOrientation: 'inline-end', // fallback direction
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.arrow} ${orientationClassname}`}
 *             aria-orientation={ariaOrientation}
 *         >
 *             <span className={styles.tip} />
 *             <div className={styles.content}>
 *                 {props.children ?? 'Tooltip content'}
 *             </div>
 *             
 *             {isOrientationInline && <span className={styles.inlineNote}>←→ flow</span>}
 *             {isOrientationBlock && <span className={styles.blockNote}>↑↓ flow</span>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useDirectionalOrientationVariant = (props: DirectionalOrientationVariantProps, options?: DirectionalOrientationVariantOptions): ResolvedDirectionalOrientationVariant => {
    // Extract props and assign defaults:
    const {
        orientation = options?.defaultOrientation ?? defaultDirectionalOrientation,
    } = props;
    
    
    
    // Determine orientation flags:
    const isOrientationInline = (orientation === 'inline-start') || (orientation === 'inline-end');
    
    
    
    // Return resolved orientation attributes:
    return {
        orientation,
        orientationClassname : directionalOrientationClassnameMap[orientation],
        isOrientationInline,
        isOrientationBlock   : !isOrientationInline,
        ariaOrientation      : isOrientationInline ? 'horizontal' : 'vertical',
    } satisfies ResolvedDirectionalOrientationVariant;
};
