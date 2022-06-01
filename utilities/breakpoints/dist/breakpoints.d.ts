import type { Optional } from '@cssfn/types';
import type { CssRule, CssStyleCollection } from '@cssfn/css-types';
export declare type BreakpointValue = number;
declare const initialBreakpoints: {
    xs: Optional<number>;
    sm: Optional<number>;
    md: Optional<number>;
    lg: Optional<number>;
    xl: Optional<number>;
    xxl: Optional<number>;
};
export declare type Breakpoints = typeof initialBreakpoints & {
    [name: string & {}]: Optional<BreakpointValue>;
};
declare const breakpoints: Breakpoints;
export { breakpoints, breakpoints as default, };
export declare type BreakpointName = keyof Breakpoints;
/**
 * Gets the name of the next specified `breakpointName`.
 * @param breakpointName The name of the current breakpoint.
 * @returns The name of the next breakpoint, -or- `null` for the next biggest breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const next: (breakpointName: BreakpointName) => BreakpointName | null;
/**
 * Gets the minimum breakpoint width of the specified `breakpointName`.
 * @param breakpointName The name of the breakpoint to get the minimum width.
 * @returns The minimum breakpoint width of the specified `breakpointName`, -or- `null` for the zero width breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const min: (breakpointName: BreakpointName) => BreakpointValue | null;
/**
 * Gets the maximum breakpoint width _before_ reaching the specified `breakpointName`.
 * @param breakpointName The name of the breakpoint to get the maximum width.
 * @returns The maximum breakpoint width _before_ reaching the specified `breakpointName`, -or- `null` for the zero width breakpoint.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const maxBefore: (breakpointName: BreakpointName) => BreakpointValue | null;
/**
 * Applies given `styles` if the screen width is equal to / bigger than the specified `breakpointName`.
 * @param breakpointName The name of the minimum breakpoint.
 * @param styles The style(s) to apply if the screen width meets the minimum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const ifScreenWidthAtLeast: (breakpointName: BreakpointName, styles: CssStyleCollection) => CssRule;
/**
 * Applies given `styles` if the screen width is smaller than the specified `breakpointName`.
 * @param breakpointName The name of the maximum breakpoint.
 * @param styles The style(s) to apply if the screen width meets the maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const ifScreenWidthSmallerThan: (breakpointName: BreakpointName, styles: CssStyleCollection) => CssRule;
/**
 * Applies given `styles` if the screen width is between the specified `lowerBreakpointName` and `upperBreakpointName`.
 * @param lowerBreakpointName The name of the minimum breakpoint.
 * @param upperBreakpointName The name of the maximum breakpoint.
 * @param styles The style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `lowerBreakpointName` or `upperBreakpointName` are not found in breakpoints.
 */
export declare const ifScreenWidthBetween: (lowerBreakpointName: BreakpointName, upperBreakpointName: BreakpointName, styles: CssStyleCollection) => CssRule;
/**
 * Applies given `styles` if the screen width is between the specified `breakpointName` and the next breakpoint.
 * @param breakpointName The name of the desired breakpoint.
 * @param styles The style(s) to apply if the screen width meets the minimum & maximum breakpoint width.
 * @returns A `Rule` object represents the conditional breakpoint rule.
 * @throws The specified `breakpointName` is not found in breakpoints.
 */
export declare const ifScreenWidthAt: (breakpointName: BreakpointName, styles: CssStyleCollection) => CssRule;
