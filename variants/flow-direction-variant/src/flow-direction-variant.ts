'use client' // The exported `useFlowDirectionVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type FlowDirection,
    type FlowDirectionVariantProps,
    type FlowDirectionVariantOptions,
    type ResolvedFlowDirectionVariant,
}                           from './types.js'

// Defaults:
import {
    defaultFlowDirection,
}                           from './internal-defaults.js'

// Utilities:
import {
    flowDirectionClassnameMap,
}                           from './internal-utilities.js'

// Contexts:
import {
    FlowDirectionVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective flow direction value based on props and context.
 * 
 * Resolution order:
 * - `'inherit'` : retrieves the flow direction from context, if available.
 * - `'invert'`  : reverses the contextual flow direction (`'start'` ⇄ `'end'`), if available.
 * - `undefined` : falls back to the default flow direction.
 * - Otherwise   : returns the provided flow direction value as-is.
 * 
 * @param {FlowDirectionVariantProps['flowDirection']} flowDirection - The pre-resolved flow direction value derived from props.
 * @param {FlowDirection} defaultFlowDirection - Fallback flow direction when context is unavailable.
 * @returns {FlowDirection} - The resolved flow direction value.
 */
const useEffectiveFlowDirectionValue = (flowDirection: FlowDirectionVariantProps['flowDirection'], defaultFlowDirection: FlowDirection): FlowDirection => {
    switch (flowDirection) {
        // If the flow direction is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited flow direction from context:
            const inheritedFlowDirection = use(FlowDirectionVariantContext);
            
            
            
            // If the context provides a flow direction, return it:
            if (inheritedFlowDirection !== undefined) return inheritedFlowDirection;
            
            
            
            // Otherwise, fallback to the default flow direction:
            return defaultFlowDirection;
        }
        
        
        
        // If the flow direction is 'invert', return the opposite of the context value:
        case 'invert'  : {
            // Get the inherited flow direction from context:
            const inheritedFlowDirection = use(FlowDirectionVariantContext);
            
            
            
            // If the context provides a flow direction, invert it:
            if (inheritedFlowDirection !== undefined) return inheritedFlowDirection === 'start' ? 'end' : 'start';
            
            
            
            // Otherwise, fallback to the default flow direction:
            return defaultFlowDirection;
        }
        
        
        
        // If the flow direction is undefined, return the default flow direction:
        case undefined : return defaultFlowDirection;
        
        
        
        // The flow direction is explicitly defined, return it as-is:
        default        : return flowDirection;
    } // switch
};

/**
 * Resolves the flow direction value along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
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
        flowDirection,
    } = props;
    
    
    
    // Resolve the effective flow direction value:
    const effectiveFlowDirection = useEffectiveFlowDirectionValue(flowDirection, options?.defaultFlowDirection ?? defaultFlowDirection);
    
    
    
    // Return resolved flow direction attributes:
    return {
        flowDirection          : effectiveFlowDirection,
        flowDirectionClassname : flowDirectionClassnameMap[effectiveFlowDirection],
    } satisfies ResolvedFlowDirectionVariant;
};
