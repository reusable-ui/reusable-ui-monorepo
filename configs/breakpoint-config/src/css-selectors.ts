// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    
    
    
    // Writes css in javascript:
    atRule,
    alwaysRule,
    neverRule,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type BreakpointName,
}                           from './types.js'

// Utilities:
import {
    getNextBreakpoint,
    getBreakpointStartWidth,
}                           from './utilities.js'



// Screen conditionals:

/**
 * Applies the given `styles` if the screen width is greater than or equal to the specified `breakpointName`.
 *
 * - **Applies the styles unconditionally if there is no defined minimum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `breakpointName` is not found in the breakpoint list**.
 *
 * @param breakpointName The name of the breakpoint defining the minimum width condition.
 * @param styles The styles to apply when the screen width meets the minimum condition.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoint list.
 */
export const ifScreenWidthAtLeast        = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    // Retrieve the starting width from the specified `breakpointName`:
    const minWidth = getBreakpointStartWidth(breakpointName);
    if (!minWidth) return alwaysRule(styles); // No minimum limit → Always apply the styles.
    
    
    
    return atRule(`@media (width >= ${minWidth satisfies `${number}px`})`, styles);
};

/**
 * Applies the given `styles` if the screen width is smaller than the specified `breakpointName`.
 *
 * - **The styles are never applied if there is no defined maximum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `breakpointName` is not found in the breakpoint list**.
 *
 * @param breakpointName The name of the breakpoint defining the maximum width condition.
 * @param styles The styles to apply when the screen width is below the maximum condition.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoint list.
 */
export const ifScreenWidthSmallerThan    = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    // Retrieve the starting width from the specified `breakpointName`:
    const maxWidth = getBreakpointStartWidth(breakpointName);
    if (!maxWidth) return neverRule(); // No maximum limit → Never apply the styles.
    
    
    
    return atRule(`@media (width < ${maxWidth satisfies `${number}px`})`, styles);
};

/**
 * Applies the given `styles` if the screen width falls within the range of `lowerBreakpointName` and `upperBreakpointName`.
 *
 * - **Applies the styles unconditionally if there is no defined minimum and maximum limit** (i.e., when `lowerBreakpointName` and `upperBreakpointName` represent the smallest breakpoint).
 * - **The styles are never applied if there is no defined maximum limit** (i.e., when `upperBreakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `lowerBreakpointName` or `upperBreakpointName` are not found in the breakpoint list**.
 *
 * @param lowerBreakpointName The name of the breakpoint defining the lower boundary.
 * @param upperBreakpointName The name of the breakpoint defining the upper boundary.
 * @param styles The styles to apply when the screen width falls within the range.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `lowerBreakpointName` or `upperBreakpointName` are not found in the breakpoint list.
 */
export const ifScreenWidthBetween        = (lowerBreakpointName: BreakpointName, upperBreakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    // Retrieve the starting width from the specified `lowerBreakpointName`:
    const minWidth = getBreakpointStartWidth(lowerBreakpointName);
    
    
    
    // Determine the ending width from the specified `upperBreakpointName`:
    const nextBreakpointName = getNextBreakpoint(upperBreakpointName);
    const maxWidth           = (
        nextBreakpointName
        
        // A larger breakpoint exists:
        ? getBreakpointStartWidth(nextBreakpointName)
        
        // No larger breakpoint (the `upperBreakpointName` is the largest):
        : undefined
    );
    if (maxWidth === null) return neverRule(); // No maximum limit → Never apply the styles.
    
    
    
    // Apply styles based on screen width conditions:
    if (!minWidth) {     // No minimum limit     → No minimum constraint.
        if (!maxWidth) { // No larger breakpoint → No maximum constraint.
            return alwaysRule(styles);
        }
        else {
            return atRule(`@media (width < ${maxWidth satisfies `${number}px`})`, styles);
        } // if
    }
    else {
        if (!maxWidth) { // No larger breakpoint → No maximum constraint.
            return atRule(`@media (width >= ${minWidth satisfies `${number}px`})`, styles);
        }
        else {
            return atRule(`@media (width >= ${minWidth satisfies `${number}px`}) and (width < ${maxWidth satisfies `${number}px`})`, styles);
        } // if
    } // if
};

/**
 * Applies the given `styles` if the screen width is within the specified `breakpointName`.
 *
 * - **Applies the styles unconditionally if there is no defined minimum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **The styles are never applied if there is no defined maximum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `breakpointName` is not found in the breakpoint list**.
 *
 * @param breakpointName The name of the breakpoint defining the width condition.
 * @param styles The styles to apply when the screen width is within the condition.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoint list.
 */
export const ifScreenWidthAt             = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    return ifScreenWidthBetween(breakpointName, breakpointName, styles);
};



// Container conditionals:

/**
 * Applies the given `styles` if the container width is greater than or equal to the specified `breakpointName`.
 *
 * - **Applies the styles unconditionally if there is no defined minimum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `breakpointName` is not found in the breakpoint list**.
 *
 * @param breakpointName The name of the breakpoint defining the minimum width condition.
 * @param styles The styles to apply when the container width meets the minimum condition.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoint list.
 */
export const ifContainerWidthAtLeast     = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    // Retrieve the starting width from the specified `breakpointName`:
    const minWidth = getBreakpointStartWidth(breakpointName);
    if (!minWidth) return alwaysRule(styles); // No minimum limit → Always apply the styles.
    
    
    
    return atRule(`@container (width >= ${minWidth satisfies `${number}px`})`, styles);
};

/**
 * Applies the given `styles` if the container width is smaller than the specified `breakpointName`.
 *
 * - **The styles are never applied if there is no defined maximum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `breakpointName` is not found in the breakpoint list**.
 *
 * @param breakpointName The name of the breakpoint defining the maximum width condition.
 * @param styles The styles to apply when the container width is below the maximum condition.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoint list.
 */
export const ifContainerWidthSmallerThan = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    // Retrieve the starting width from the specified `breakpointName`:
    const maxWidth = getBreakpointStartWidth(breakpointName);
    if (!maxWidth) return neverRule(); // No maximum limit → Never apply the styles.
    
    
    
    return atRule(`@container (width < ${maxWidth satisfies `${number}px`})`, styles);
};

/**
 * Applies the given `styles` if the container width falls within the range of `lowerBreakpointName` and `upperBreakpointName`.
 *
 * - **Applies the styles unconditionally if there is no defined minimum and maximum limit** (i.e., when `lowerBreakpointName` and `upperBreakpointName` represent the smallest breakpoint).
 * - **The styles are never applied if there is no defined maximum limit** (i.e., when `upperBreakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `lowerBreakpointName` or `upperBreakpointName` are not found in the breakpoint list**.
 *
 * @param lowerBreakpointName The name of the breakpoint defining the lower boundary.
 * @param upperBreakpointName The name of the breakpoint defining the upper boundary.
 * @param styles The styles to apply when the container width falls within the range.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `lowerBreakpointName` or `upperBreakpointName` are not found in the breakpoint list.
 */
export const ifContainerWidthBetween     = (lowerBreakpointName: BreakpointName, upperBreakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    // Retrieve the starting width from the specified `lowerBreakpointName`:
    const minWidth = getBreakpointStartWidth(lowerBreakpointName);
    
    
    
    // Determine the ending width from the specified `upperBreakpointName`:
    const nextBreakpointName = getNextBreakpoint(upperBreakpointName);
    const maxWidth           = (
        nextBreakpointName
        
        // A larger breakpoint exists:
        ? getBreakpointStartWidth(nextBreakpointName)
        
        // No larger breakpoint (the `upperBreakpointName` is the largest):
        : undefined
    );
    if (maxWidth === null) return neverRule(); // No maximum limit → Never apply the styles.
    
    
    
    // Apply styles based on container width conditions:
    if (!minWidth) {     // No minimum limit     → No minimum constraint.
        if (!maxWidth) { // No larger breakpoint → No maximum constraint.
            return alwaysRule(styles);
        }
        else {
            return atRule(`@container (width < ${maxWidth satisfies `${number}px`})`, styles);
        } // if
    }
    else {
        if (!maxWidth) { // No larger breakpoint → No maximum constraint.
            return atRule(`@container (width >= ${minWidth satisfies `${number}px`})`, styles);
        }
        else {
            return atRule(`@container (width >= ${minWidth satisfies `${number}px`}) and (width < ${maxWidth satisfies `${number}px`})`, styles);
        } // if
    } // if
};

/**
 * Applies the given `styles` if the container width is within the specified `breakpointName`.
 *
 * - **Applies the styles unconditionally if there is no defined minimum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **The styles are never applied if there is no defined maximum limit** (i.e., when `breakpointName` represents the smallest breakpoint).
 * - **Throws an error if the specified `breakpointName` is not found in the breakpoint list**.
 *
 * @param breakpointName The name of the breakpoint defining the width condition.
 * @param styles The styles to apply when the container width is within the condition.
 * @returns A `CssRule` that applies the specified `styles` based on the defined breakpoint condition.
 * @throws {TypeError} If `breakpointName` is not found in the breakpoint list.
 */
export const ifContainerWidthAt          = (breakpointName: BreakpointName, styles: CssStyleCollection): CssRule => {
    return ifContainerWidthBetween(breakpointName, breakpointName, styles);
};
