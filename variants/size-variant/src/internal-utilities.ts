// Types:
import {
    type BasicSize,
}                           from './types.js'



/**
 * Resolves the CSS classname for the given size.
 * 
 * @template TSize Commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param size The size token to resolve, e.g. `'sm'`, `'md'`, `'lg'`, or a custom value.
 * @returns A CSS classname reflecting the size.
 */
export const resolveSizeClassname = <TSize extends string = BasicSize>(size: TSize): `s-${TSize}` => {
    return `s-${size}`;
};
