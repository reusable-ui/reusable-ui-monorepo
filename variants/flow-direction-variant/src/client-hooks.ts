'use client' // The exported `useFlowDirectionVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InvertableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInvertableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

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
}                           from './internal-contexts.js'



/** The inheritable and invertable variant definition for flow direction variant management. */
const invertableVariantDefinition : InvertableVariantDefinition<FlowDirection, 'inherit', 'invert'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeFlowDirection,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    invertableVariantToken  : 'invert',
    variantContext          : FlowDirectionVariantContext,
    invertVariant           : (inheritedVariant) => inheritedVariant === 'start' ? 'end' : 'start',
    
    // Fallbacks:
    fallbackVariant         : defaultFallbackFlowDirection,
};

/**
 * Resolves the current flow direction variant.
 * 
 * Useful for derived components that need to determine the current flow direction of the base component.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the flow direction value from context.
 * - `'invert'`  : flips the flow direction value from context (`'start'` ⇄ `'end'`).
 * - Otherwise   : uses the explicitly provided flow direction value as-is.
 * 
 * @param props The component props that may include a `flowDirection` value.
 * @param options An optional configuration specifying a default flow direction when no `flowDirection` prop is explicitly provided.
 * @returns The resolved flow direction value.
 */
export const useResolvedFlowDirection = (props: FlowDirectionVariantProps, options?: FlowDirectionVariantOptions): FlowDirection => {
    // Extract options:
    const {
        defaultFlowDirection  : defaultVariant,
        fallbackFlowDirection : fallbackVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        flowDirection : variant,
    } = props;
    
    
    
    // Resolve effective flow direction variant:
    return useResolvedInvertableVariant<FlowDirection, 'inherit', 'invert'>(
        // Props:
        { variant },
        
        // Options:
        { defaultVariant, fallbackVariant },
        
        // Definition:
        invertableVariantDefinition,
    );
};



/**
 * Resolves the flow direction value along with its associated CSS classname,
 * based on component props, optional default configuration, and parent context.
 * 
 * @param props The component props that may include a `flowDirection` value.
 * @param options An optional configuration specifying a default flow direction when no `flowDirection` prop is explicitly provided.
 * @returns The resolved flow direction value along with its associated CSS classname.
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
    // Resolve effective flow direction value:
    const effectiveFlowDirection = useResolvedFlowDirection(props, options);
    
    
    
    // Return resolved flow direction attributes:
    return {
        flowDirection          : effectiveFlowDirection,
        flowDirectionClassname : flowDirectionClassnameMap[effectiveFlowDirection],
    } satisfies FlowDirectionVariant;
};
