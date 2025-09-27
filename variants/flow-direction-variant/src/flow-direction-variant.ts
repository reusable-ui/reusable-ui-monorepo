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
    type FlowDirectionVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeFlowDirection,
    defaultFallbackFlowDirection,
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
 * Resolution priority:
 * - `'inherit'` : uses the flow direction value from context, if available, otherwise falls back to `fallbackFlowDirection`.
 * - `'invert'`  : flips the flow direction value from context (`'start'` ⇄ `'end'`), if available, otherwise falls back to `fallbackFlowDirection`.
 * - Otherwise   : uses the explicitly provided flow direction value as-is.
 * 
 * @param {Required<FlowDirectionVariantProps>['flowDirection']} declarativeFlowDirection - The declared flow direction value from props.
 * @param {FlowDirection} fallbackFlowDirection - The fallback flow direction when context is missing.
 * @returns {FlowDirection} - The resolved flow direction value.
 */
const useEffectiveFlowDirectionValue = (declarativeFlowDirection: Required<FlowDirectionVariantProps>['flowDirection'], fallbackFlowDirection: FlowDirection): FlowDirection => {
    switch (declarativeFlowDirection) {
        // If the flow direction is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited flow direction from context:
            const inheritedFlowDirection = use(FlowDirectionVariantContext);
            
            
            
            // If context value exists, return it:
            if (inheritedFlowDirection !== undefined) return inheritedFlowDirection;
            
            
            
            // Otherwise, fallback to the specified fallback flow direction:
            return fallbackFlowDirection;
        }
        
        
        
        // If the flow direction is 'invert', flip the context value:
        case 'invert'  : {
            // Get the inherited flow direction from context:
            const inheritedFlowDirection = use(FlowDirectionVariantContext);
            
            
            
            // If context value exists, flip it:
            if (inheritedFlowDirection !== undefined) return inheritedFlowDirection === 'start' ? 'end' : 'start';
            
            
            
            // Otherwise, fallback to the specified fallback flow direction:
            return fallbackFlowDirection;
        }
        
        
        
        // The flow direction is explicitly defined, return it as-is:
        default        : return declarativeFlowDirection;
    } // switch
};

/**
 * Resolves the flow direction value along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param {FlowDirectionVariantProps} props - The component props that may include a `flowDirection` value.
 * @param {FlowDirectionVariantOptions} options - An optional configuration specifying a default flow direction when no `flowDirection` prop is explicitly provided.
 * @returns {FlowDirectionVariant} - The resolved flow direction value along with its associated CSS class name.
 * 
 * @example
 * ```tsx
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
export const useFlowDirectionVariant = (props: FlowDirectionVariantProps, options?: FlowDirectionVariantOptions): FlowDirectionVariant => {
    // Extract options and assign defaults:
    const {
        defaultFlowDirection = defaultDeclarativeFlowDirection,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        flowDirection : declarativeFlowDirection = defaultFlowDirection,
    } = props;
    
    
    
    // Resolve the effective flow direction value:
    const effectiveFlowDirection = useEffectiveFlowDirectionValue(declarativeFlowDirection, defaultFallbackFlowDirection);
    
    
    
    // Return resolved flow direction attributes:
    return {
        flowDirection          : effectiveFlowDirection,
        flowDirectionClassname : flowDirectionClassnameMap[effectiveFlowDirection],
    } satisfies FlowDirectionVariant;
};
