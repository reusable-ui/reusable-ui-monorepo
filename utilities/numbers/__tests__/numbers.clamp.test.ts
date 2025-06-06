import {
    clamp,
} from '../dist/numbers.js'



//#region Tests for special cases
test('test clamp(undefined, undefined, undefined)', () => {
    expect(clamp(undefined, undefined, undefined)).toBe(undefined);
});

test('test clamp(null, null, null)', () => {
    expect(clamp(null, null, null)).toBe(null);
});

test('test clamp(undefined, 123, undefined)', () => {
    expect(clamp(undefined, 123, undefined)).toBe(123);
});



test('test clamp(null, 123, null)', () => {
    expect(clamp(null, 123, null)).toBe(123);
});

test('test clamp(null, 123, undefined)', () => {
    expect(clamp(null, 123, undefined)).toBe(123);
});

test('test clamp(undefined, 123, null)', () => {
    expect(clamp(undefined, 123, null)).toBe(123);
});



test('test clamp(undefined, NaN, undefined)', () => {
    expect(clamp(undefined, NaN, undefined)).toBe(NaN);
});

test('test clamp(null, NaN, null)', () => {
    expect(clamp(null, NaN, null)).toBe(NaN);
});

test('test clamp(null, NaN, undefined)', () => {
    expect(clamp(null, NaN, undefined)).toBe(NaN);
});

test('test clamp(undefined, NaN, null)', () => {
    expect(clamp(undefined, NaN, null)).toBe(NaN);
});



test('test clamp(undefined, Infinity, undefined)', () => {
    expect(clamp(undefined, Infinity, undefined)).toBe(Infinity);
});

test('test clamp(null, Infinity, null)', () => {
    expect(clamp(null, Infinity, null)).toBe(Infinity);
});

test('test clamp(null, Infinity, undefined)', () => {
    expect(clamp(null, Infinity, undefined)).toBe(Infinity);
});

test('test clamp(undefined, Infinity, null)', () => {
    expect(clamp(undefined, Infinity, null)).toBe(Infinity);
});



test('test clamp(undefined, -Infinity, undefined)', () => {
    expect(clamp(undefined, -Infinity, undefined)).toBe(-Infinity);
});

test('test clamp(null, -Infinity, null)', () => {
    expect(clamp(null, -Infinity, null)).toBe(-Infinity);
});

test('test clamp(null, -Infinity, undefined)', () => {
    expect(clamp(null, -Infinity, undefined)).toBe(-Infinity);
});

test('test clamp(undefined, -Infinity, null)', () => {
    expect(clamp(undefined, -Infinity, null)).toBe(-Infinity);
});
//#endregion Tests for special cases


//#region Tests for common cases

// Special cases: must return as-is
test('test clamp(undefined, undefined, undefined)', () => {
    expect(clamp(undefined, undefined, undefined)).toBe(undefined);
});

test('test clamp(null, null, null)', () => {
    expect(clamp(null, null, null)).toBe(null);
});

test('test clamp(5, undefined, 10)', () => {
    expect(clamp(5, undefined, 10)).toBe(undefined);
});

test('test clamp(5, null, 10)', () => {
    expect(clamp(5, null, 10)).toBe(null);
});

test('test clamp(5, NaN, 10)', () => {
    expect(clamp(5, NaN, 10)).toBe(NaN);
});

test('test clamp(5, Infinity, 10)', () => {
    expect(clamp(5, Infinity, 10)).toBe(Infinity);
});

test('test clamp(5, -Infinity, 10)', () => {
    expect(clamp(5, -Infinity, 10)).toBe(-Infinity);
});

// Value within the range
test('test clamp(5, 6, 10)', () => {
    expect(clamp(5, 6, 10)).toBe(6);
});

test('test clamp(5, 10, 10)', () => {
    expect(clamp(5, 10, 10)).toBe(10);
});

// Value outside the range
test('test clamp(5, 2, 10)', () => {
    expect(clamp(5, 2, 10)).toBe(5);
});

test('test clamp(5, 15, 10)', () => {
    expect(clamp(5, 15, 10)).toBe(10);
});

// Min and max reversed
test('test clamp(10, 8, 5)', () => {
    expect(clamp(10, 8, 5)).toBe(8);
});

test('test clamp(10, 2, 5)', () => {
    expect(clamp(10, 2, 5)).toBe(5);
});

test('test clamp(10, 15, 5)', () => {
    expect(clamp(10, 15, 5)).toBe(10);
});

// Mixed null and undefined for min/max
test('test clamp(null, 7, 10)', () => {
    expect(clamp(null, 7, 10)).toBe(7);
});

test('test clamp(undefined, 7, 10)', () => {
    expect(clamp(undefined, 7, 10)).toBe(7);
});

test('test clamp(5, 7, null)', () => {
    expect(clamp(5, 7, null)).toBe(7);
});

test('test clamp(5, 7, undefined)', () => {
    expect(clamp(5, 7, undefined)).toBe(7);
});

// Min and max reversed with null/undefined
test('test clamp(null, 5, 10)', () => {
    expect(clamp(null, 5, 10)).toBe(5);
});

test('test clamp(null, 15, 10)', () => {
    expect(clamp(null, 15, 10)).toBe(10);
});

test('test clamp(10, 5, null)', () => {
    expect(clamp(10, 5, null)).toBe(10);
});

test('test clamp(10, 15, null)', () => {
    expect(clamp(10, 15, null)).toBe(15);
});

//#endregion Tests for common cases


//#region Tests for negative values

// Value within negative range
test('test clamp(-10, -8, -5)', () => {
    expect(clamp(-10, -8, -5)).toBe(-8);
});

test('test clamp(-10, -5, -5)', () => {
    expect(clamp(-10, -5, -5)).toBe(-5);
});

// Value outside negative range
test('test clamp(-10, -15, -5)', () => {
    expect(clamp(-10, -15, -5)).toBe(-10);
});

test('test clamp(-10, 0, -5)', () => {
    expect(clamp(-10, 0, -5)).toBe(-5);
});

// Min and max reversed with negatives
test('test clamp(-5, -8, -10)', () => {
    expect(clamp(-5, -8, -10)).toBe(-8);
});

test('test clamp(-5, -2, -10)', () => {
    expect(clamp(-5, -2, -10)).toBe(-5);
});

// Mixed negative and positive values
test('test clamp(-10, -5, 10)', () => {
    expect(clamp(-10, -5, 10)).toBe(-5);
});

test('test clamp(-10, 5, 10)', () => {
    expect(clamp(-10, 5, 10)).toBe(5);
});

test('test clamp(-10, -15, 10)', () => {
    expect(clamp(-10, -15, 10)).toBe(-10);
});

test('test clamp(-10, 15, 10)', () => {
    expect(clamp(-10, 15, 10)).toBe(10);
});

// Min or max are null/undefined with negative values
test('test clamp(null, -5, 10)', () => {
    expect(clamp(null, -5, 10)).toBe(-5);
});

test('test clamp(undefined, -5, 10)', () => {
    expect(clamp(undefined, -5, 10)).toBe(-5);
});

test('test clamp(-10, -5, null)', () => {
    expect(clamp(-10, -5, null)).toBe(-5);
});

test('test clamp(-10, -5, undefined)', () => {
    expect(clamp(-10, -5, undefined)).toBe(-5);
});

//#endregion Tests for negative values
