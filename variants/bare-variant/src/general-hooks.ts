// Reusable-ui variants:
import {
    // Types:
    type ControlledVariantDefinition,
    
    
    
    // Hooks:
    useResolvedControlledVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

// Types:
import {
    type BareVariantProps,
    type BareVariantOptions,
    type BareVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeBare,
}                           from './internal-defaults.js'

// Utilities:
import {
    getBareClassname,
}                           from './internal-utilities.js'



/** The controlled variant definition for bare variant management. */
const controlledVariantDefinition : ControlledVariantDefinition<boolean | string> = {
    // Defaults:
    defaultVariant : defaultDeclarativeBare,
};

/**
 * Resolves the current bare variant.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 * 
 * @param props - The component props that may include a `bare` value.
 * @param options - An optional configuration specifying a default bare value when no `bare` prop is explicitly provided.
 * @returns The resolved bare value.
 */
export const useResolvedBare = <TBare extends true | string = true>(props: BareVariantProps<TBare>, options?: BareVariantOptions<TBare>): false | TBare => {
    // Extract options:
    const {
        defaultBare : defaultVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        bare : variant,
    } = props;
    
    
    
    // Resolve effective bare variant:
    return useResolvedControlledVariant<false | TBare>(
        // Props:
        { variant },
        
        // Options:
        { defaultVariant },
        
        // Definition:
        controlledVariantDefinition as ControlledVariantDefinition<false | TBare>,
    );
};



/**
 * Resolves the bare state along with its associated CSS class name,
 * based on component props and optional default configuration.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 * 
 * @param {BareVariantProps} props - The component props that may include a `bare` value.
 * @param {BareVariantOptions} options - An optional configuration specifying a default bare value when no `bare` prop is explicitly provided.
 * @returns {BareVariant} - The resolved bare state along with its associated CSS class name.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useBareVariant,
 *     BareVariantProps,
 * } from '@reusable-ui/bare-variant';
 * import styles from './BareBox.module.css';
 * 
 * export interface BareBoxProps extends BareVariantProps {}
 * 
 * // A box that conditionally removes visual framing (no borders, no paddings) for seamless embedding.
 * export const BareBox: FC<BareBoxProps> = (props) => {
 *     const {
 *         bare,
 *         bareClassname,
 *     } = useBareVariant(props, {
 *         defaultBare: false, // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${bareClassname}`}
 *             style={bare ? {
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
export const useBareVariant = <TBare extends true | string = true>(props: BareVariantProps<TBare>, options?: BareVariantOptions<TBare>): BareVariant<TBare> => {
    // Resolve effective bare value:
    const effectiveBare = useResolvedBare<TBare>(props, options);
    
    
    
    // Return resolved bare attributes:
    return {
        bare          : effectiveBare,
        bareClassname : getBareClassname<TBare>(effectiveBare),
    } satisfies BareVariant<TBare>;
};
