// utilities:
const isSingleValue = (expression: string|ReadonlyArray<string>): expression is string => (typeof(expression) === 'string') || (Array.isArray(expression) && (expression.length === 1));
export const parseNumber = (expression: number|string|ReadonlyArray<string>|null|undefined): number|null => {
    if (typeof(expression) === 'number') {
        if (isNaN(expression)) return null;
        return expression;
    } // if
    if (!expression) return null;
    
    
    
    if (!isSingleValue(expression)) return null;
    
    
    
    const result = Number.parseFloat(expression);
    if (isNaN(result)) return null;
    return result;
};

export const decimalify = <TNumber extends number|null|undefined>(number: TNumber) : TNumber => {
    // conditions:
    if (typeof(number) !== 'number') return number;
    if (!Number.isFinite(number))    return number;
    
    
    
    const roundedNumber = Math.round(number * 1000000000000000) / 1000000000000000;
    return Number.parseFloat(roundedNumber.toFixed(11)) as TNumber;
};

export const clamp = (min: number, value: number, max: number, step?: number): number => {
    // defaults:
    min  ??= Number.MIN_SAFE_INTEGER;
    max  ??= Number.MAX_SAFE_INTEGER;
    step ??= 0;
    const negative : boolean = (max < min);
    
    
    
    // make sure the requested value is between the min value & max value:
    value     = Math.min(Math.max(
        value
    , (negative ? max : min)), (negative ? min : max));
    
    // if step was specified => stepping the value starting from min value:
    if (step > 0) {
        let steps    = Math.round((value - min) / step); // get the_nearest_stepped_value
        
        // make sure the_nearest_stepped_value is not exceeded the max value:
        let maxSteps = (max - min) / step;
        maxSteps     = negative ? Math.ceil(maxSteps) : Math.floor(maxSteps); // remove the decimal fraction
        
        // re-align the steps:
        steps        = negative ? Math.max(steps, maxSteps) : Math.min(steps, maxSteps);
        
        // calculate the new value:
        value        = min + (steps * step);
    } // if
    
    
    
    return decimalify(value);
};
