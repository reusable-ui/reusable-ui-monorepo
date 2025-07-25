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
 * Props for controlling the primary axis orientation of the component.
 * 
 * Accepts an optional `orientation`, falling back to a default when not provided.
 */
export interface AxisOrientationVariantProps {
    /**
     * Specifies the desired orientation of primary axis of the component:
     * - `'inline'`: horizontal direction (e.g. left to right)
     * - `'block'` : vertical direction (e.g. top to bottom)
     */
    orientation         ?: AxisOrientation
}

/**
 * Optional configuration options for specifying the default axis orientation.
 * 
 * Applied when the component does not explicitly provide the `orientation` prop.
 */
export interface AxisOrientationVariantOptions {
    /**
     * The default orientation to apply when no `orientation` prop is explicitly provided.
     */
    defaultOrientation  ?: AxisOrientation
}

/**
 * Represents the final resolved axis orientation for the component, along with its associated CSS class name and accessibility metadata.
 */
export interface ResolvedAxisOrientationVariant {
    /**
     * The resolved axis orientation value.
     * 
     * Example values:
     * - `'inline'`: horizontal direction (e.g. left to right)
     * - `'block'` : vertical direction (e.g. top to bottom)
     */
    orientation          : AxisOrientation
    
    /**
     * CSS class name corresponding to the resolved orientation.
     * 
     * Example values:
     * - `'o-inline'`
     * - `'o-block'`
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
 * Resolves the axis orientation value along with its associated CSS class name and accessibility metadata,
 * based on component props and optional default configuration.
 * 
 * @param {AxisOrientationVariantProps} props - The component props that may include an `orientation` value.
 * @param {AxisOrientationVariantOptions} options - An optional configuration specifying a default orientation when no `orientation` prop is explicitly provided.
 * @returns {ResolvedAxisOrientationVariant} - The resolved orientation value along with its associated CSS class name and accessibility metadata.
 * 
 * @example
 * ```ts
 * import React, { FC } from 'react';
 * import {
 *     useAxisOrientationVariant,
 *     AxisOrientationVariantProps,
 * } from '@reusable-ui/orientation-variant';
 * import styles from './OrientationBox.module.css';
 * 
 * export interface OrientationBoxProps extends AxisOrientationVariantProps {}
 * 
 * // Layout-aware box that adapts its flow direction:
 * export const OrientationBox: FC<OrientationBoxProps> = (props) => {
 *     const {
 *         orientation,
 *         orientationClassname,
 *         isOrientationInline,
 *         isOrientationBlock,
 *         ariaOrientation,
 *     } = useAxisOrientationVariant(props, {
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
 * Props for controlling the directional orientation of the component.
 * 
 * Accepts an optional `orientation`, falling back to a default when not provided.
 */
export interface DirectionalOrientationVariantProps {
    /**
     * Specifies the desired orientation of direction of the component:
     * - `'inline-start'`: horizontal direction, start of inline axis (e.g. left in LTR, right in RTL)
     * - `'inline-end'`  : horizontal direction, end of inline axis (e.g. right in LTR, left in RTL)
     * - `'block-start'` : vertical direction, start of block axis (e.g. top in horizontal writing modes)
     * - `'block-end'`   : vertical direction, end of block axis (e.g. bottom in horizontal writing modes)
     */
    orientation         ?: DirectionalOrientation
}

/**
 * Optional configuration options for specifying the default directional orientation.
 * 
 * Applied when the component does not explicitly provide the `orientation` prop.
 */
export interface DirectionalOrientationVariantOptions {
    /**
     * The default orientation to apply when no `orientation` prop is explicitly provided.
     */
    defaultOrientation  ?: DirectionalOrientation
}

/**
 * Represents the final resolved directional orientation for the component, along with its associated CSS class name and accessibility metadata.
 */
export interface ResolvedDirectionalOrientationVariant {
    /**
     * The resolved directional orientation value.
     * 
     * Example values:
     * - `'inline-start'`: horizontal direction, start of inline axis (e.g. left in LTR, right in RTL)
     * - `'inline-end'`  : horizontal direction, end of inline axis (e.g. right in LTR, left in RTL)
     * - `'block-start'` : vertical direction, start of block axis (e.g. top in horizontal writing modes)
     * - `'block-end'`   : vertical direction, end of block axis (e.g. bottom in horizontal writing modes)
     */
    orientation          : DirectionalOrientation
    
    /**
     * CSS class name corresponding to the resolved orientation.
     * 
     * Example values:
     * - `'o-inline-end'`
     * - `'o-block-start'`
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
 * Resolves the directional orientation value along with its associated CSS class name and accessibility metadata,
 * based on component props and optional default configuration.
 * 
 * @param {DirectionalOrientationVariantProps} props - The component props that may include an `orientation` value.
 * @param {DirectionalOrientationVariantOptions} options - An optional configuration specifying a default orientation when no `orientation` prop is explicitly provided.
 * @returns {ResolvedDirectionalOrientationVariant} - The resolved orientation value along with its associated CSS class name and accessibility metadata.
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
 *         defaultOrientation: 'inline-end', // fallback if not provided
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
