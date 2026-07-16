// Types:
import {
    type StylingVariantsProps,
    type CollectedStylingProps,
}                           from './types.js'

// Utilities:
import {
    isDefinedStylingVariant,
}                           from './internal-utilities.js'



/**
 * Extracts all known styling-related variant props of the component and returns a filtered object suitable for forwarding.
 * 
 * Useful for forwarding styling-related variants to **nested** or **sibling** components without manual prop selection.
 * 
 * Includes:
 * - `size`
 * - `theme`
 * - `emphasized`
 * - `mild`
 * - `outlined`
 * 
 * Values may be absolute or relative (e.g. `'inherit'`, `'invert'`),
 * and are captured as-is without computing the final visual outcome.
 * `undefined` props are excluded from the result.
 * 
 * @param props The component props that may include styling-related variants.
 * @returns A subset of styling-related variant props with defined values.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useStylingProps,
 *     StylingVariantsProps,
 * } from '@reusable-ui/styling-variants';
 * import { InputBase } from '@/components/InputBase';
 * import { DropdownList } from '@/components/DropdownList';
 * 
 * export interface InputWithAutocompleteProps extends StylingVariantsProps {
 *     // ...other props
 * }
 * 
 * // A component that forwards styling variants to a sibling UI.
 * export const InputWithAutocomplete : FC<InputWithAutocompleteProps> = (props) => {
 *     // Extract all known styling-related variant props:
 *     const stylingProps = useStylingProps(props);
 *     
 *     return (
 *         <>
 *             <InputBase {...props} />
 *             <DropdownList {...stylingProps} />
 *         </>
 *     );
 * };
 * ```
 */
export const useStylingProps = (props: StylingVariantsProps): CollectedStylingProps => {
    // Extract props:
    const {
        size,
        theme,
        emphasized,
        mild,
        outlined,
    } = props;
    
    
    
    // Return the collected styling-related variants:
    return Object.fromEntries(
        // Collect known styling-related variants:
        Object.entries({
            size,
            theme,
            emphasized,
            mild,
            outlined,
        } satisfies CollectedStylingProps)
        
        // Filter out the entries with `undefined` values:
        .filter(isDefinedStylingVariant)
    ) satisfies CollectedStylingProps;
};
