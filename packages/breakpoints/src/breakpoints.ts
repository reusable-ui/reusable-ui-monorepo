// cssfn:
import type {
    // types:
    Optional,
}                           from '@cssfn/types'
import type {
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // rules:
    rule,
    noRule,
}                           from '@cssfn/cssfn'         // writes css in javascript



//#region configs
export type BreakpointValue = number
const initialBreakpoints = {
    xs  : 0    as Optional<BreakpointValue>,
    sm  : 576  as Optional<BreakpointValue>,
    md  : 768  as Optional<BreakpointValue>,
    lg  : 992  as Optional<BreakpointValue>,
    xl  : 1200 as Optional<BreakpointValue>,
    xxl : 1400 as Optional<BreakpointValue>,
};

export type Breakpoints = typeof initialBreakpoints & { [name: string & {}] : Optional<BreakpointValue> }
const breakpoints : Breakpoints = initialBreakpoints;
export {
    breakpoints,
    breakpoints as default,
};

export type BreakpointName = keyof Breakpoints
//#endregion configs



//#region utilities
const getSortedBreakpoints = () => (
    Object.entries(breakpoints)
    .filter((breakpoint): breakpoint is [BreakpointName, number] =>
        !!breakpoint[0] // not an empty string
        &&
        (typeof(breakpoint[1]) === 'number') // is a number
    )
    .sort((a, b) => a[1] - b[1]) // sort from smallest value to biggest one
);



/**
 * Gets the name of the next specified `breakpointName`.
 * @param breakpointName The name of the current breakpoint.
 * @returns The name of the next breakpoint, -or- `null` for the next biggest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const next = (breakpointName: BreakpointName): BreakpointName|null => {
    const sortedBreakpoints = getSortedBreakpoints();
    let foundIndex = sortedBreakpoints.findIndex(([searchName]) => (searchName === breakpointName));
    if (foundIndex < 0) throw TypeError(`Breakpoint '${breakpointName}' is not found in breakpoints.`); // invalid key
    
    
    
    foundIndex++; // move to the next
    if (foundIndex >= sortedBreakpoints.length) return null; // there is no breakpoint bigger than `breakpointName`
    return sortedBreakpoints[foundIndex][0];
};

/**
 * Gets the minimum breakpoint width of the specified `breakpointName`.
 * @param breakpointName The name of the breakpoint to get the minimum width.
 * @returns The minimum breakpoint width of the specified `breakpointName`, -or- `null` for the zero width breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const min = (breakpointName: BreakpointName): BreakpointValue|null => {
    const value = getSortedBreakpoints().find(([searchName]) => (searchName === breakpointName))?.[1];
    if (value === undefined) throw TypeError(`Breakpoint '${breakpointName}' is not found in breakpoints.`); // invalid key
    
    
    
    if (value === 0) return null;
    return value;
};

/**
 * Gets the maximum breakpoint width _before_ reaching the specified `breakpointName`.
 * @param breakpointName The name of the breakpoint to get the maximum width.
 * @returns The maximum breakpoint width _before_ reaching the specified `breakpointName`, -or- `null` for the zero width breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const maxBefore = (breakpointName: BreakpointName): BreakpointValue|null => {
    const value = min(breakpointName);
    if (value === null) return null; // nothing smaller than 0
    
    
    
    if ((value >= 0.02)) return (value - 0.02);
    return null; // nothing smaller than 0.02
};
//#endregion utilities



//#region rules
/**
 * Applies given `styles` if the screen width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName the name of the minimum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifScreenWidthAtLeast     = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth = min(breakpointName);
    return rule((minWidth ? `@media (min-width: ${minWidth}px)` : null), styles);
};

/**
 * Applies given `styles` if the screen width is smaller than the specified `breakpointName`.
 * @param breakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifScreenWidthSmallerThan = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const maxWidth = maxBefore(breakpointName);
    return rule((maxWidth ? `@media (max-width: ${maxWidth}px)` : null), styles);
};

/**
 * Applies given `styles` if the screen width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName the name of the minimum breakpoint.
 * @param upperBreakpointName the name of the maximum breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
export const ifScreenWidthBetween     = (lowerBreakpointName: BreakpointName, upperBreakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth = min(lowerBreakpointName);
    const maxWidth = maxBefore(upperBreakpointName);
    if (minWidth && maxWidth) {
        return rule(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`, styles);
    }
    else if (minWidth) {
        return rule(`@media (min-width: ${minWidth}px)`, styles);
    }
    else if (maxWidth) {
        return rule(`@media (max-width: ${maxWidth}px)`, styles);
    }
    else {
        return noRule(styles);
    } // if
};

/**
 * Applies given `styles` if the screen width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName the name of the desired breakpoint.
 * @param styles the style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the media rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifScreenWidth            = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth = min(breakpointName);
    const nextBp   = next(breakpointName);
    const maxWidth = nextBp ? maxBefore(nextBp) : null;
    if (minWidth && maxWidth) {
        return rule(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`, styles);
    }
    else if (minWidth) {
        return rule(`@media (min-width: ${minWidth}px)`, styles);
    }
    else if (maxWidth) {
        return rule(`@media (max-width: ${maxWidth}px)`, styles);
    }
    else {
        return noRule(styles);
    } // if
};
//#endregion rules
