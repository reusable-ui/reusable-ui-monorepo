// Types:
import {
    type BreakpointName,
}                           from './types.js'



/**
 * Extracts the group prefix from the given breakpoint name.
 * 
 * - Tokens follow the format `<group><Variant>` (e.g., `'breakpointMd'` -> `'breakpoint'`).
 * - Preserves multi-word group prefixes correctly (e.g., `'navbarTopMd'` -> `'navbarTop'`, `'articleHeroXl'`` -> `'articleHero'`).
 * 
 * @param breakpointName The name of the breakpoint token.
 * @returns The extracted group prefix string.
 */
export const getBreakpointGroup = (breakpointName: BreakpointName): string => {
    return breakpointName.replace(/[A-Z][a-z]*$/, '');
};
