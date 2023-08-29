// cssfn:
import {
    // cssfn general types:
    Optional,
    
    
    
    // cssfn css specific types:
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    atRule,
    alwaysRule,
    neverRule,
}                           from '@cssfn/core'          // writes css in javascript



//#region configs
export type BreakpointValue = number
const initialBreakpoints = {
    xs   : 0    as Optional<BreakpointValue>,
    sm   : 576  as Optional<BreakpointValue>,
    md   : 768  as Optional<BreakpointValue>,
    lg   : 992  as Optional<BreakpointValue>,
    xl   : 1200 as Optional<BreakpointValue>,
    xxl  : 1400 as Optional<BreakpointValue>,
    xxxl : 1600 as Optional<BreakpointValue>,
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
export const getBreakpointNextName          = (breakpointName: BreakpointName): BreakpointName|null => {
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
export const getBreakpointMinWidthInclusive = (breakpointName: BreakpointName): BreakpointValue|null => {
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
export const getBreakpointMaxWidthExclusive = (breakpointName: BreakpointName): BreakpointValue|null => {
    const width = getBreakpointMinWidthInclusive(breakpointName);
    if (width === null) return null; // nothing smaller than 0
    
    
    
    if ((width >= 0.02)) return (width - 0.02);
    return null; // nothing smaller than 0.02 (near zero)
};
//#endregion utilities



//#region rules
/**
 * Applies given `styles` if the screen width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName The name of the minimum breakpoint.
 * @param styles The style(s) to apply if the screen width meets the minimum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifScreenWidthAtLeast        = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth = getBreakpointMinWidthInclusive(breakpointName);
    if (minWidth === null) return alwaysRule(styles); // no minimum limit => always applied the `styles`
    
    
    
    return atRule(`@media (min-width: ${minWidth}px)`, styles);
};

/**
 * Applies given `styles` if the screen width is smaller than the specified `breakpointName`.
 * @param breakpointName The name of the maximum breakpoint.
 * @param styles The style(s) to apply if the screen width meets the maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifScreenWidthSmallerThan    = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const maxWidthBeforeCurrent = getBreakpointMaxWidthExclusive(breakpointName);
    if (maxWidthBeforeCurrent === null) return neverRule(); // nothing smaller than zero width limit => never apply the `styles`
    
    
    
    return atRule(`@media (max-width: ${maxWidthBeforeCurrent}px)`, styles);
};

/**
 * Applies given `styles` if the screen width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName The name of the minimum breakpoint.
 * @param upperBreakpointName The name of the maximum breakpoint.
 * @param styles The style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
export const ifScreenWidthBetween        = (lowerBreakpointName: BreakpointName, upperBreakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth             = getBreakpointMinWidthInclusive(lowerBreakpointName);
    
    const nextBp               = getBreakpointNextName(upperBreakpointName);
    const maxWidthBeforeNextBp = nextBp ? getBreakpointMaxWidthExclusive(nextBp) : null;
    if (maxWidthBeforeNextBp === null) return neverRule(); // nothing smaller than zero width limit => never apply the `styles`
    
    
    
    if (minWidth) {
        return atRule(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    }
    else {
        return atRule(`@media (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    } // if
};

/**
 * Applies given `styles` if the screen width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName The name of the desired breakpoint.
 * @param styles The style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifScreenWidthAt             = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth             = getBreakpointMinWidthInclusive(breakpointName);
    
    const nextBp               = getBreakpointNextName(breakpointName);
    const maxWidthBeforeNextBp = nextBp ? getBreakpointMaxWidthExclusive(nextBp) : null;
    if (maxWidthBeforeNextBp === null) return neverRule(); // nothing smaller than zero width limit => never apply the `styles`
    
    
    
    if (minWidth) {
        return atRule(`@media (min-width: ${minWidth}px) and (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    }
    else {
        return atRule(`@media (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    } // if
};




/**
 * Applies given `styles` if the container width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName The name of the minimum breakpoint.
 * @param styles The style(s) to apply if the container width meets the minimum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifContainerWidthAtLeast     = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth = getBreakpointMinWidthInclusive(breakpointName);
    if (minWidth === null) return alwaysRule(styles); // no minimum limit => always applied the `styles`
    
    
    
    return atRule(`@container (min-width: ${minWidth}px)`, styles);
};

/**
 * Applies given `styles` if the container width is smaller than the specified `breakpointName`.
 * @param breakpointName The name of the maximum breakpoint.
 * @param styles The style(s) to apply if the container width meets the maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifContainerWidthSmallerThan = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const maxWidthBeforeCurrent = getBreakpointMaxWidthExclusive(breakpointName);
    if (maxWidthBeforeCurrent === null) return neverRule(); // nothing smaller than zero width limit => never apply the `styles`
    
    
    
    return atRule(`@container (max-width: ${maxWidthBeforeCurrent}px)`, styles);
};

/**
 * Applies given `styles` if the container width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName The name of the minimum breakpoint.
 * @param upperBreakpointName The name of the maximum breakpoint.
 * @param styles The style(s) to apply if the container width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
export const ifContainerWidthBetween     = (lowerBreakpointName: BreakpointName, upperBreakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth             = getBreakpointMinWidthInclusive(lowerBreakpointName);
    
    const nextBp               = getBreakpointNextName(upperBreakpointName);
    const maxWidthBeforeNextBp = nextBp ? getBreakpointMaxWidthExclusive(nextBp) : null;
    if (maxWidthBeforeNextBp === null) return neverRule(); // nothing smaller than zero width limit => never apply the `styles`
    
    
    
    if (minWidth) {
        return atRule(`@container (min-width: ${minWidth}px) and (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    }
    else {
        return atRule(`@container (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    } // if
};

/**
 * Applies given `styles` if the container width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName The name of the desired breakpoint.
 * @param styles The style(s) to apply if the container width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export const ifContainerWidthAt          = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    const minWidth             = getBreakpointMinWidthInclusive(breakpointName);
    
    const nextBp               = getBreakpointNextName(breakpointName);
    const maxWidthBeforeNextBp = nextBp ? getBreakpointMaxWidthExclusive(nextBp) : null;
    if (maxWidthBeforeNextBp === null) return neverRule(); // nothing smaller than zero width limit => never apply the `styles`
    
    
    
    if (minWidth) {
        return atRule(`@container (min-width: ${minWidth}px) and (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    }
    else {
        return atRule(`@container (max-width: ${maxWidthBeforeNextBp}px)`, styles);
    } // if
};
//#endregion rules
