// Utilities:

/**
 * Formats a floating-point number into a more human-friendly form, 
 * reducing excessive decimal places caused by floating-point precision errors.
 *
 * @template TNumber - The input type (`number`, `null`, or `undefined`).
 * @param value - The number to clean. Returns `null`, `undefined`, `NaN`, `Infinity`, or `-Infinity` unchanged.
 * @returns The formatted number with up to 11 decimal places, or the original input if special cases apply.
 */
export const decimalify = <TNumber extends number|null|undefined>(value: TNumber) : TNumber => {
    // Preserve special cases:
    if (typeof value !== 'number') return value;
    if (!Number.isFinite(value))   return value;
    
    
    
    // Round to 11 decimal places:
    const roundedNumber = Math.round(value * 1e11) / 1e11;
    return Number.parseFloat((roundedNumber).toFixed(11)) as TNumber;
};



/**
 * Clamps a number within a given range, optionally applying stepping increments.
 *
 * @template TNumber - The input type (`number`, `null`, or `undefined`).
 * @param min - The minimum allowed value. Defaults to `Number.MIN_SAFE_INTEGER` if not provided.
 * @param value - The number to clamp. Returns `null`, `undefined`, `NaN`, `Infinity`, or `-Infinity` unchanged.
 * @param max - The maximum allowed value. Defaults to `Number.MAX_SAFE_INTEGER` if not provided.
 * @param step - Optional stepping interval. If defined, the output is aligned to the nearest step.
 * @returns The clamped number, adjusted to the nearest valid step if applicable.
 */
export const clamp = <TNumber extends number|null|undefined>(min: number|TNumber, value: TNumber, max: number|TNumber, step?: number|TNumber): TNumber => {
    // Preserve special cases:
    if (typeof value !== 'number') return value;
    if (!Number.isFinite(value))   return value;
    
    
    
    // Set defaults:
    min  ??= Number.MIN_SAFE_INTEGER;
    max  ??= Number.MAX_SAFE_INTEGER;
    step ??= 0;
    
    
    
    // Clamp value within bounds:
    const isReversed : boolean = (typeof min === 'number') && (typeof max === 'number') && (min > max);
    let processedValue = Math.min(Math.max(
        value
    , (isReversed ? max : min)), (isReversed ? min : max));
    
    
    
    // Apply stepping if defined:
    if (step > 0) {
        // Calculate nearest stepped value:
        let steps      = Math.round((processedValue - min) / step);
        
        
        
        // Ensure step count does not exceed max boundary:
        let maxSteps   = (max - min) / step;
        // Remove the decimal fractions:
        maxSteps       = isReversed ? Math.ceil(maxSteps) : Math.floor(maxSteps);
        
        
        
        // Adjust step alignment:
        steps          = isReversed ? Math.max(steps, maxSteps) : Math.min(steps, maxSteps);
        
        
        
        // Compute final stepped value:
        processedValue = min + (steps * step);
    } // if
    
    
    
    // Format decimal places to avoid precision errors:
    return decimalify(processedValue) as TNumber;
};
