// Types:
import {
    type BareVariantProps,
    type BareVariantOptions,
    type BareVariant,
}                           from './types.js'

// Defaults:
import {
    finalDefaultBare,
}                           from './internal-defaults.js'

// Utilities:
import {
    getBareClassname,
}                           from './internal-utilities.js'



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
    // Extract options and assign defaults:
    const {
        defaultBare = finalDefaultBare,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        bare        : effectiveBare =  defaultBare,
    } = props;
    
    
    
    // Return resolved bare attributes:
    return {
        bare          : effectiveBare,
        bareClassname : getBareClassname<TBare>(effectiveBare),
    } satisfies BareVariant<TBare>;
};
