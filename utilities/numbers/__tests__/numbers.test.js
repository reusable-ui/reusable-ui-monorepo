import {
    parseNumber,
} from '../dist/numbers.js'



test('test parseNumber(undefined)', () => {
    expect(
        parseNumber(undefined)
    )
    .toBe(null);
});
test('test parseNumber(null)', () => {
    expect(
        parseNumber(null)
    )
    .toBe(null);
});



test('test parseNumber(number)', () => {
    expect(
        parseNumber(123)
    )
    .toBe(123);
});
test('test parseNumber(number)', () => {
    expect(
        parseNumber(-123)
    )
    .toBe(-123);
});
test('test parseNumber(number)', () => {
    expect(
        parseNumber(0)
    )
    .toBe(0);
});
test('test parseNumber(number)', () => {
    expect(
        parseNumber(NaN)
    )
    .toBe(null);
});



test('test parseNumber(string)', () => {
    expect(
        parseNumber('')
    )
    .toBe(null);
});
test('test parseNumber(string)', () => {
    expect(
        parseNumber('123')
    )
    .toBe(123);
});
test('test parseNumber(string)', () => {
    expect(
        parseNumber('-123')
    )
    .toBe(-123);
});
test('test parseNumber(string)', () => {
    expect(
        parseNumber('0')
    )
    .toBe(0);
});
test('test parseNumber(string)', () => {
    expect(
        parseNumber('meh')
    )
    .toBe(null);
});



test('test parseNumber([])', () => {
    expect(
        parseNumber([''])
    )
    .toBe(null);
});
test('test parseNumber([string])', () => {
    expect(
        parseNumber(['123'])
    )
    .toBe(123);
});
test('test parseNumber([string])', () => {
    expect(
        parseNumber(['-123'])
    )
    .toBe(-123);
});
test('test parseNumber([string])', () => {
    expect(
        parseNumber(['0'])
    )
    .toBe(0);
});
test('test parseNumber([string])', () => {
    expect(
        parseNumber(['meh'])
    )
    .toBe(null);
});
