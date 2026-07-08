/**
 * Maps each stripped variant to its corresponding CSS class name.
 */
const strippedClassnameMap : Record<string, `is-${string}`> = {
    // This precomputed map enhances performance by avoiding runtime string interpolation:
    'flat'   : 'is-flat',
    'flush'  : 'is-flush',
    'joined' : 'is-joined',
};



/**
 * Resolves the CSS class name for the given stripped state.
 * 
 * - Returns `'is-stripped'` if `stripped` is `true`.
 * - Returns `'not-stripped'` if `stripped` is `false`.
 * - Returns `'is-{Mode}'` if `stripped` is a string variant.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 * 
 * @param stripped - A boolean or string flag indicating whether the component should appear stripped (frameless layout).
 * @returns A CSS class name reflecting the stripped state.
 */
export const getStrippedClassname = <TStripped extends true | string = true>(stripped: false | TStripped): 'is-stripped' | 'not-stripped' | (TStripped extends string ? `is-${TStripped}` : never) => {
    if (typeof stripped === 'string') {
        // Return cached class name if available:
        const cachedClassname = strippedClassnameMap[stripped];
        if (cachedClassname !== undefined) return cachedClassname as (TStripped extends string ? `is-${TStripped}` : never);
        
        
        
        // Compute the new value:
        const computedClassname = `is-${stripped}` as (TStripped extends string ? `is-${TStripped}` : never);
        
        
        
        // Store the new value:
        strippedClassnameMap[stripped] = computedClassname;
        
        
        
        // Return the computed string-based class name:
        return computedClassname;
    } // if
    
    
    
    // Return boolean-based class name:
    return stripped ? 'is-stripped' : 'not-stripped';
};
