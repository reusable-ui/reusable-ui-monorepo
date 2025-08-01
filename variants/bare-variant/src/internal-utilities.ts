/**
 * Maps each bare variant to its corresponding CSS class name.
 */
const bareClassnameMap : Record<string, `is-${string}`> = {
    // This precomputed map enhances performance by avoiding runtime string interpolation:
    'flat'   : 'is-flat',
    'flush'  : 'is-flush',
    'joined' : 'is-joined',
};



/**
 * Resolves the CSS class name for the given bare state.
 * 
 * - Returns `'is-bare'` if `bare` is `true`.
 * - Returns `'not-bare'` if `bare` is `false`.
 * - Returns `'is-{mode}'` if `bare` is a string variant.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or string modes.
 * 
 * @param bare - A boolean or string flag indicating whether the component should appear in a bare (frameless) layout.
 * @returns A CSS class name reflecting the bare state.
 */
export const getBareClassname = <TBare extends true | string = true>(bare: false | TBare): 'is-bare' | 'not-bare' | (TBare extends string ? `is-${TBare}` : never) => {
    if (typeof bare === 'string') {
        // Return cached class name if available:
        const cachedClassname = bareClassnameMap[bare];
        if (cachedClassname !== undefined) return cachedClassname as (TBare extends string ? `is-${TBare}` : never);
        
        
        
        // Compute the new value:
        const computedClassname = `is-${bare}` as (TBare extends string ? `is-${TBare}` : never);
        
        
        
        // Store the new value:
        bareClassnameMap[bare] = computedClassname;
        
        
        
        // Return the computed string-based class name:
        return computedClassname;
    } // if
    
    
    
    // Return boolean-based class name:
    return bare ? 'is-bare' : 'not-bare';
};
