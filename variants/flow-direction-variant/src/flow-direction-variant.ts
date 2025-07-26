// Types:
import {
    type FlowDirection,
}                           from './types.js'

// Defaults:
import {
    defaultFlowDirection,
}                           from './internal-defaults.js'

// Utilities:
import {
    flowDirectionClassnameMap,
}                           from './internal-utilities.js'



/**
 * Props for specifying the flow direction of the component.
 * 
 * Accepts an optional `flowDirection`, falling back to a default when not provided.
 */
export interface FlowDirectionVariantProps {
    /**
     * Specifies the desired flow direction of the component:
     * - `'start'`: aligns to the logical start edge (e.g. left in LTR, top in top-down modes)
     * - `'end'`  : aligns to the logical end edge (e.g. right in LTR, bottom in top-down modes)
     */
    flowDirection          ?: FlowDirection
}

/**
 * Optional configuration options for specifying the default flow direction.
 * 
 * Applied when the component does not explicitly provide the `flowDirection` prop.
 */
export interface FlowDirectionVariantOptions {
    /**
     * The default flow direction to apply when no `flowDirection` prop is explicitly provided.
     */
    defaultFlowDirection   ?: FlowDirection
}

/**
 * Represents the final resolved flow direction for the component, along with its associated CSS class name.
 */
export interface ResolvedFlowDirectionVariant {
    /**
     * The resolved flow direction value.
     * 
     * Example values:
     * - `'start'`: aligns to the logical start edge (e.g. left in LTR, top in top-down modes)
     * - `'end'`  : aligns to the logical end edge (e.g. right in LTR, bottom in top-down modes)
     */
    flowDirection           : FlowDirection
    
    /**
     * CSS class name corresponding to the resolved flow direction.
     * 
     * Example values:
     * - `'f-start'`
     * - `'f-end'`
     */
    flowDirectionClassname  : `f-${FlowDirection}`
}

/**
 * Resolves the flow direction value along with its associated CSS class name,
 * based on component props and optional default configuration.
 * 
 * @param {FlowDirectionVariantProps} props - The component props that may include a `flowDirection` value.
 * @param {FlowDirectionVariantOptions} options - An optional configuration specifying a default flow direction when no `flowDirection` prop is explicitly provided.
 * @returns {ResolvedFlowDirectionVariant} - The resolved flow direction value along with its associated CSS class name.
 * 
 * @example
 * ```ts
 * import React, { FC } from 'react';
 * import {
 *     useFlowDirectionVariant,
 *     FlowDirectionVariantProps,
 * } from '@reusable-ui/flow-direction-variant';
 * import styles from './PlacementArrow.module.css';
 * 
 * export interface PlacementArrowProps extends FlowDirectionVariantProps {
 *     children?: React.ReactNode
 * }
 * 
 * // Direction-sensitive arrow indicator.
 * // Direction-sensitive arrow indicator.
 * export const PlacementArrow: FC<PlacementArrowProps> = (props) => {
 *     const {
 *         flowDirection,
 *         flowDirectionClassname,
 *     } = useFlowDirectionVariant(props, {
 *         defaultFlowDirection: 'end', // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.arrow} ${flowDirectionClassname}`}
 *         >
 *             <span className={styles.tip} />
 *             <div className={styles.content}>
 *                 {props.children ?? 'Tooltip content'}
 *             </div>
 *         </div>
 *     );
 * };
 * ```
 */
export const useFlowDirectionVariant = (props: FlowDirectionVariantProps, options?: FlowDirectionVariantOptions): ResolvedFlowDirectionVariant => {
    // Extract props and assign defaults:
    const {
        flowDirection = options?.defaultFlowDirection ?? defaultFlowDirection,
    } = props;
    
    
    
    // Return resolved flow direction attributes:
    return {
        flowDirection,
        flowDirectionClassname : flowDirectionClassnameMap[flowDirection],
    } satisfies ResolvedFlowDirectionVariant;
};
