// Types:
import {
    type BasicSize,
}                           from './types.js'



/**
 * Maps each size to its corresponding CSS class name.
 */
const sizeClassnameMap : Record<BasicSize | (string & {}), `s-${BasicSize | (string & {})}`> = {
    'sm' : 's-sm',
    'md' : 's-md',
    'lg' : 's-lg',
};

/**
 * Resolves and caches the class name for a given size.
 * 
 * If the value is already known, returns from cache.
 * If it's new, computes and stores `s-${size}`.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param {TSize} size - The size token to resolve, e.g. `'sm'`, `'md'`, `'lg'`, or custom value.
 */
export const getSizeClassname = <TSize extends string = BasicSize>(size: TSize): `s-${TSize}` => {
    // Return cached class name if available:
    const cachedClassname = sizeClassnameMap[size];
    if (cachedClassname !== undefined) return cachedClassname as `s-${TSize}`;
    
    
    
    // Compute the new value:
    const computedClassname : `s-${TSize}` = `s-${size}`;
    
    
    
    // Store the new value:
    sizeClassnameMap[size] = computedClassname;
    
    
    
    // Return the computed value:
    return computedClassname;
};
