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
