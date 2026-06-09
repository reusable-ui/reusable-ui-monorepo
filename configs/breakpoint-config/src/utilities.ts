// Types:
import {
    type CssBreakpoint,
}                           from './css-types.js'
import {
    type BreakpointName,
}                           from './types.js'

// Configs:
import {
    breakpointConfigExpressions,
}                           from './css-config.js'



/**
 * Retrieves the sorted breakpoints by numerical value.
 *
 * - **Filters out invalid entries** (`null` or `undefined` values).
 * - **Sorts breakpoints from smallest to largest** using `parseFloat()`.
 *
 * @returns Sorted array of breakpoints as `[BreakpointName, CssBreakpoint]` tuples.
 */
export const getSortedBreakpoints = (): [BreakpointName, CssBreakpoint][] => (
    Object.entries(breakpointConfigExpressions)
    .filter((breakpoint): breakpoint is [BreakpointName, CssBreakpoint] =>
        (breakpoint[1] !== null)      // Excludes null values
        &&
        (breakpoint[1] !== undefined) // Excludes undefined values
    )
    .sort(([, cssBreakpointA], [, cssBreakpointB]) => Number.parseFloat(cssBreakpointA) - Number.parseFloat(cssBreakpointB)) // Sorts in ascending order
);



/**
 * Retrieves the name of the next breakpoint after the specified `breakpointName`.
 *
 * - **Finds the next larger breakpoint** in the sorted breakpoints.
 * - **Returns `null` if no larger breakpoint exists** (i.e., the `breakpointName` is the largest).
 * - **Throws an error if the specified `breakpointName` is not found**.
 *
 * @param breakpointName The name of the current breakpoint.
 * @returns The name of the next breakpoint, or `null` if `breakpointName` is the largest.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoints list.
 */
export const getNextBreakpoint = (breakpointName: BreakpointName): BreakpointName | null => {
    // Retrieve the sorted breakpoints:
    const sortedBreakpoints = getSortedBreakpoints();
    
    
    
    // Locate the current breakpoint in the sorted list:
    const foundIndex = sortedBreakpoints.findIndex(([searchName]) => (searchName === breakpointName));
    if (foundIndex < 0) throw TypeError(`Breakpoint '${breakpointName}' not found in breakpoints.`); // Invalid breakpointName.
    
    
    
    // Move to the next breakpoint:
    const nextIndex = foundIndex + 1;
    if (nextIndex >= sortedBreakpoints.length) return null; // There is no breakpoint bigger than `breakpointName`.
    return sortedBreakpoints[nextIndex][0];
};



/**
 * Retrieves the starting width of the specified breakpoint.
 *
 * - **Returns the breakpoint width in pixels (`CssBreakpoint`)**.
 * - **Returns `null` if the breakpoint represents zero width (`'0px'`)**.
 * - **Throws an error if the specified `breakpointName` is not found**.
 *
 * @param breakpointName The name of the breakpoint for which to retrieve the starting width.
 * @returns The starting width of the specified `breakpointName`, or `null` if it represents zero width.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoint list.
 */
export const getBreakpointStartWidth = (breakpointName: BreakpointName): CssBreakpoint | null => {
    // Retrieve the starting width of the specified `breakpointName`:
    const startWidth = breakpointConfigExpressions[breakpointName] as CssBreakpoint | undefined;
    if (startWidth === undefined) throw TypeError(`Breakpoint '${breakpointName}' not found in breakpoints.`); // Invalid breakpointName.
    
    
    
    // Returns null if zero width:
    if (startWidth === '0px') return null;
    return startWidth;
};
