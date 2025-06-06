import {
    decimalify,
} from '../dist/numbers.js'
import {
    Decimal,
} from 'decimal.js'

const LimitedDecimal = Decimal.clone({ precision: 15, rounding: Decimal.ROUND_HALF_CEIL });



// Utilities:

/**
 * Validates if a decimalified output is human-friendly by checking for excessive trailing zeroes or nines.
 *
 * @param value - The number to check. Returns `true` if the number is `null`, `undefined`, or non-finite.
 * @param decimal - Optional `Decimal` instance for precise comparison.
 * @returns `true` if the number is human-friendly; otherwise, `false`.
 */
const isHumanFriendlyNumber = (value: number|null|undefined, decimal?: Decimal): boolean => {
    // Preserve special cases:
    if ((value === null) || (value === undefined) || !isFinite(value)) return true;
    
    if (decimal) {
        /**
         * Example values:
         * - 0.05179704017
         * - 26.999
         */
        const valueString = value.toString();
        // Count significant digits:
        let significantDigits = valueString.replace('.', '').match(/[1-9][0-9]*/)?.[0]?.length ?? 1;
        const decimalString = decimal.toPrecision(significantDigits).toString()
        
        // Log potential mismatch:
        if (valueString !== decimalString) {
            console.warn(`Decimal mismatch: value=${valueString}, decimal=${decimalString}, precision=${significantDigits}`);
        }
        
        return valueString === decimalString;
    }
    else {
        // Detect excessive trailing `000` or `999` sequences after the decimal:
        return !(/\.\d*(0{3}|9{3})\d*/).test(value.toString());
    } // if
};

/**
 * Generates a random fractional number with a random precision (0-2 decimal places).
 *
 * @returns A randomly generated fractional number within a reasonable range.
 */
const getRandomFraction = () => {
    const precision = Math.floor(Math.random() * 3); // Random integer from 0 to 2
    return parseFloat((Math.random() * 10).toFixed(precision));
};



//#region Tests for special cases
test('test decimalify(undefined)', () => {
    const value = decimalify(undefined);
    expect(value).toBe(undefined);
    expect(isHumanFriendlyNumber(value)).toBe(true);
});

test('test decimalify(null)', () => {
    const value = decimalify(null);
    expect(value).toBe(null);
    expect(isHumanFriendlyNumber(value)).toBe(true);
});

test('test decimalify(NaN)', () => {
    const value = decimalify(NaN);
    expect(value).toBe(NaN);
    expect(isHumanFriendlyNumber(value)).toBe(true);
});

test('test decimalify(Infinity)', () => {
    const value = decimalify(Infinity);
    expect(value).toBe(Infinity);
    expect(isHumanFriendlyNumber(value)).toBe(true);
});

test('test decimalify(-Infinity)', () => {
    const value = decimalify(-Infinity);
    expect(value).toBe(-Infinity);
    expect(isHumanFriendlyNumber(value)).toBe(true);
});
//#endregion Tests for special cases



//#region Tests for crazy decimal fractions
test('test decimalify(0.1 * 0.2)', () => { // 0.020000000000000004
    const value = decimalify(0.1 * 0.2);
    const decimalValue = new LimitedDecimal(0.1).times(0.2);
    expect(value).toBe(0.02);
    expect(isHumanFriendlyNumber(value, decimalValue)).toBe(true);
});

test('test decimalify(0.1 * 0.3)', () => { // 0.030000000000000006
    const value = decimalify(0.1 * 0.3);
    const decimalValue = new LimitedDecimal(0.1).times(0.3);
    expect(value).toBe(0.03);
    expect(isHumanFriendlyNumber(value, decimalValue)).toBe(true);
});

test('test decimalify(0.1 * 0.4)', () => { // 0.04000000000000001
    const value = decimalify(0.1 * 0.4);
    const decimalValue = new LimitedDecimal(0.1).times(0.4);
    expect(value).toBe(0.04);
    expect(isHumanFriendlyNumber(value, decimalValue)).toBe(true);
});

test('test decimalify(0.4 * 0.7)', () => { // 0.27999999999999997
    const value = decimalify(0.4 * 0.7);
    const decimalValue = new LimitedDecimal(0.4).times(0.7);
    expect(value).toBe(0.28);
    expect(isHumanFriendlyNumber(value, decimalValue)).toBe(true);
});

test('test decimalify(1.7 * 2.9)', () => { // 4.929999999999999
    const value = decimalify(1.7 * 2.9);
    const decimalValue = new LimitedDecimal(1.7).times(2.9);
    expect(value).toBe(4.93);
    expect(isHumanFriendlyNumber(value, decimalValue)).toBe(true);
});

test('test decimalify(4.9 * 5.51)', () => { // 26.999000000000002
    const value = decimalify(4.9 * 5.51);
    const decimalValue = new LimitedDecimal(4.9).times(5.51);
    expect(value).toBe(26.999);
    expect(isHumanFriendlyNumber(value, decimalValue)).toBe(true);
});

// Main test loop
test('test decimalify with 100000 random fractional inputs and varied precision', () => {
    for (let i = 0; i < 100000; i++) {
        const num1     = getRandomFraction();
        const num2     = getRandomFraction();
        
        const decimal1 = new LimitedDecimal(num1);
        
        
        
        // Perform multiplication and division:
        const multiplied        = decimalify(num1 * num2);
        const divided           = decimalify(num1 / (num2 || 1)); // Avoid division by zero
        
        const decimalMultiplied = decimal1.times(num2);
        const decimalDivided    = decimal1.dividedBy(num2 || 1); // Avoid division by zero
        
        
        
        // Validate results & log if unexpected:
        if (!isHumanFriendlyNumber(multiplied, decimalMultiplied)) {
            console.warn(`Unexpected multiplied value: num1=${num1}, num2=${num2}, multiplied=${multiplied}`);
        }
        if (!isHumanFriendlyNumber(divided, decimalDivided)) {
            console.warn(`Unexpected divided value: num1=${num1}, num2=${num2}, divided=${divided}`);
        }
        expect(isHumanFriendlyNumber(multiplied, decimalMultiplied)).toBe(true);
        expect(isHumanFriendlyNumber(divided, decimalDivided)).toBe(true);
    }
});
//#endregion Tests for crazy decimal fractions