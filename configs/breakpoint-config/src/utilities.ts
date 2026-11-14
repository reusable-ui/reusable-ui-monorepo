// Types:
import {
    type CssBreakpoint,
}                           from './css-types.js'
import {
    type BreakpointName,
}                           from './types.js'

// Configs:
import {
    breakpointConfigVarDefs,
}                           from './css-config.js'

// Utilities:
import {
    getBreakpointGroup,
}                           from './internal-utilities.js'



/**
 * Retrieves the sorted breakpoints by numerical value, optionally filtered by group prefix.
 * 
 * - **Filters out invalid entries** (`null` or `undefined` values).
 * - **Filters by group prefix** if provided (e.g., `'breakpoint'`, `'article'`).
 * - **Sorts primarily by group name alphabetically (when unfiltered), and secondarily by numerical value from smallest to largest**.
 * 
 * @param groupPrefix Optional group prefix to filter breakpoints (e.g., `'breakpoint'`).
 * @returns Sorted array of filtered breakpoints as `[BreakpointName, CssBreakpoint][]` tuples.
 */
export const getSortedBreakpoints = (groupPrefix?: string): [BreakpointName, CssBreakpoint][] => (
    // Retrieves all breakpoints as tuples from the `breakpointConfigVarDefs` object:
    Object.entries(breakpointConfigVarDefs)
    
    // Filters out invalid entries and optionally filters by group prefix:
    .filter((breakpoint): breakpoint is [BreakpointName, CssBreakpoint] => {
        // Destructures the breakpoint tuple for convenience:
        const [name, value] = breakpoint as [BreakpointName, CssBreakpoint];
        
        
        
        // Excludes null or undefined values (automatically narrows type):
        if (value === null || value === undefined) return false;
        
        
        
        // If a groupPrefix is specified, ensure the token belongs to that group:
        if (groupPrefix !== undefined) {
            // Extracts the group prefix from the breakpoint name and compares it to the expected groupPrefix:
            if (getBreakpointGroup(name) !== groupPrefix) return false;
        } // if
        
        
        
        // All conditions passed, the breakpoint is valid:
        return true;
    })
    
    // Sorts the filtered breakpoints:
    .sort(([nameA, cssBreakpointA], [nameB, cssBreakpointB]) => {
        // Primary sort: group name alphabetically (only needed when returning mixed groups):
        if (groupPrefix === undefined) {
            // Extracts group prefixes for comparison:
            const groupPrefixA = getBreakpointGroup(nameA);
            const groupPrefixB = getBreakpointGroup(nameB);
            
            // If they differ, sort alphabetically by group prefix:
            const groupCompare = groupPrefixA.localeCompare(groupPrefixB);
            if (groupCompare !== 0) return groupCompare;
        } // if
        
        
        
        // Secondary sort: numerical value in ascending order:
        return Number.parseFloat(cssBreakpointA) - Number.parseFloat(cssBreakpointB);
    })
);



/**
 * Retrieves the name of the next breakpoint after the specified `breakpointName` within its respective group.
 * 
 * - **Extracts the group prefix** from the `breakpointName` (e.g., `'breakpointMd'` -> `'breakpoint'`).
 * - **Finds the next larger breakpoint** strictly within the same group from the sorted breakpoints.
 * - **Returns `null` if no larger breakpoint exists** in that group (i.e., the `breakpointName` is the largest in its category).
 * - **Throws an error if the specified `breakpointName` is not found**.
 * 
 * @param breakpointName The name of the current breakpoint.
 * @returns The name of the next breakpoint in the same group, or `null` if it is the largest.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoints list.
 */
export const getNextBreakpoint = (breakpointName: BreakpointName): BreakpointName | null => {
    // Extract the group prefix from the specified `breakpointName`:
    const groupPrefix = getBreakpointGroup(breakpointName);
    
    
    
    // Retrieve the sorted breakpoints scoped to the specific group:
    const sortedBreakpoints = getSortedBreakpoints(groupPrefix);
    
    
    
    // Locate the current breakpoint in the sorted group list:
    const foundIndex = sortedBreakpoints.findIndex(([searchName]) => (searchName === breakpointName));
    if (foundIndex < 0) throw TypeError(`Breakpoint '${breakpointName}' not found in breakpoints.`); // Invalid breakpointName.
    
    
    
    // Move to the next breakpoint within the same group:
    const nextIndex = foundIndex + 1;
    if (nextIndex >= sortedBreakpoints.length) return null; // There is no breakpoint bigger than `breakpointName` in this group.
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
    const startWidth = breakpointConfigVarDefs[breakpointName] as CssBreakpoint | undefined;
    if (startWidth === undefined) throw TypeError(`Breakpoint '${breakpointName}' not found in breakpoints.`); // Invalid breakpointName.
    
    
    
    // Returns null if zero width:
    if (startWidth === '0px') return null;
    return startWidth;
};
