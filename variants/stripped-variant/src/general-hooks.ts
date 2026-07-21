// Reusable-ui variants:
import {
    // Types:
    type ControlledVariantDefinition,
    
    
    
    // Hooks:
    useResolvedControlledVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

// Types:
import {
    type StrippedVariantProps,
    type StrippedVariantOptions,
    type StrippedVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeStripped,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveStrippedClassname,
}                           from './internal-utilities.js'



/** The controlled variant definition for stripped variant management. */
const controlledVariantDefinition : ControlledVariantDefinition<boolean | string> = {
    // Defaults:
    defaultVariant : defaultDeclarativeStripped,
};

/**
 * Resolves the current stripped variant.
 * 
 * Useful for derived components that need to determine the current stripped variant of the base component.
 * 
 * @template TStripped The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 * 
 * @param props The component props that may include a `stripped` value.
 * @param options An optional configuration specifying a default stripped value when no `stripped` prop is explicitly provided.
 * @returns The resolved stripped value.
 */
export const useResolvedStripped = <TStripped extends true | string = true>(props: StrippedVariantProps<TStripped>, options?: StrippedVariantOptions<TStripped>): false | TStripped => {
    // Extract options:
    const {
        defaultStripped : defaultVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        stripped : variant,
    } = props;
    
    
    
    // Resolve effective stripped variant:
    return useResolvedControlledVariant<false | TStripped>(
        // Props:
        { variant },
        
        // Options:
        { defaultVariant },
        
        // Definition:
        controlledVariantDefinition as ControlledVariantDefinition<false | TStripped>,
    );
};



/**
 * Resolves the stripped mode along with its associated CSS classname,
 * based on component props and optional default configuration.
 * 
 * @template TStripped The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 * 
 * @param props The component props that may include a `stripped` value.
 * @param options An optional configuration specifying a default stripped value when no `stripped` prop is explicitly provided.
 * @returns The resolved stripped mode along with its associated CSS classname.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useStrippedVariant,
 *     StrippedVariantProps,
 * } from '@reusable-ui/stripped-variant';
 * import styles from './StrippedBox.module.css';
 * 
 * export interface StrippedBoxProps extends StrippedVariantProps {}
 * 
 * // A box that conditionally removes visual framing (no borders, no paddings) for seamless embedding.
 * export const StrippedBox: FC<StrippedBoxProps> = (props) => {
 *     const {
 *         stripped,
 *         strippedClassname,
 *     } = useStrippedVariant(props, {
 *         defaultStripped: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${strippedClassname}`}
 *             style={stripped ? {
 *                 // Kills padding and border:
 *                 padding: 0,
 *                 border: 'none',
 *             } : undefined}
 *         >
 *             <p>Some contents go here.</p>
 *         </div>
 *     );
 * };
 * ```
 */
export const useStrippedVariant = <TStripped extends true | string = true>(props: StrippedVariantProps<TStripped>, options?: StrippedVariantOptions<TStripped>): StrippedVariant<TStripped> => {
    // Resolve effective stripped value:
    const effectiveStripped = useResolvedStripped<TStripped>(props, options);
    
    
    
    // Return resolved stripped attributes:
    return {
        stripped          : effectiveStripped,
        strippedClassname : resolveStrippedClassname<TStripped>(effectiveStripped),
    } satisfies StrippedVariant<TStripped>;
};
