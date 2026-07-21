// Types:
import {
    type BasicTheme,
}                           from './types.js'



/**
 * Resolves the CSS classname for the given theme.
 * 
 * @template TTheme Commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param theme The theme token to resolve, e.g. `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`, or a custom value.
 * @returns A CSS classname reflecting the theme.
 */
export const resolveThemeClassname = <TTheme extends string = BasicTheme>(theme: TTheme): `t-${TTheme}` => {
    return `t-${theme}`;
};
