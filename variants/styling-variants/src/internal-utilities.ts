// Types:
import {
    type StylingVariantsProps,
}                           from './types.js'



/**
 * Filters out styling-related variant entries with `undefined` values.
 * 
 * Useful for narrowing down styling props to only those explicitly set,
 * enabling clean forwarding to nested components or class resolution logic.
 * 
 * @param entry - A key-value pair from `StylingVariantsProps`.
 * @returns `true` if the value is defined; otherwise `false`.
 */
export const isDefinedStylingVariant = (entry: readonly [string, StylingVariantsProps[keyof StylingVariantsProps]]): entry is [string, Exclude<StylingVariantsProps[keyof StylingVariantsProps], undefined>] => {
    return (entry[1] !== undefined);
};
