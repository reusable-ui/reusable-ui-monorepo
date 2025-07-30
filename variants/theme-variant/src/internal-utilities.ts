// Types:
import {
    type BasicTheme,
}                           from './types.js'



/**
 * Maps each theme to its corresponding CSS class name.
 */
const themeClassnameMap : Record<BasicTheme | (string & {}), `t-${BasicTheme | (string & {})}`> = {
    'primary'   : 't-primary',
    'secondary' : 't-secondary',
    'success'   : 't-success',
    'info'      : 't-info',
    'warning'   : 't-warning',
    'danger'    : 't-danger',
    'light'     : 't-light',
    'dark'      : 't-dark',
};

/**
 * Resolves and caches the CSS class name for the given theme.
 * 
 * - Returns the cached class name if available.
 * - If not cached, computes `t-${theme}`, stores it, and returns the result.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {TTheme} theme - The theme token to resolve, e.g. `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`, or custom value.
 * @returns {`t-${TTheme}`} A CSS class name in the format `t-${theme}`.
 */
export const getThemeClassname = <TTheme extends string = BasicTheme>(theme: TTheme): `t-${TTheme}` => {
    // Return cached class name if available:
    const cachedClassname = themeClassnameMap[theme];
    if (cachedClassname !== undefined) return cachedClassname as `t-${TTheme}`;
    
    
    
    // Compute the new value:
    const computedClassname : `t-${TTheme}` = `t-${theme}`;
    
    
    
    // Store the new value:
    themeClassnameMap[theme] = computedClassname;
    
    
    
    // Return the computed value:
    return computedClassname;
};
