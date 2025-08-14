// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    variants,
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui configs:
import {
    getThemeNames,
    colorVars,
}                           from '@reusable-ui/colors'  // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.

// Types:
import {
    type BasicTheme,
    type ThemeVariantVars,
    type CssThemeVariant,
}                           from './types.js'



/**
 * Generates a CSS selector targeting elements with a given `theme`.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {TTheme} theme - The theme token to match, e.g. `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`, or custom value.
 * @returns {CssSelectorCollection} - A `CssSelectorCollection` string for use in conditional styling rules.
 */
export const themeSelector = <TTheme extends string = BasicTheme>(theme: TTheme): CssSelectorCollection => `.t-${theme}`;



/**
 * Applies the given `styles` to elements matching the specified `theme`.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {TTheme} theme - The theme token to match, e.g. `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`, or custom value.
 * @param styles The styles applied to elements matching the specified `theme`.
 * @returns A `CssRule` that applies the given `styles` for the specified `theme`.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'grid',
 *     padding: '1rem',
 *     color: 'currentColor',
 *     ...ifTheme('success', {
 *         backgroundColor: 'lightgreen',
 *         color: 'darkgreen',
 *     }),
 *     ...ifTheme('danger', {
 *         backgroundColor: 'pink',
 *         color: 'darkred',
 *     }),
 * });
 * ```
 */
export const ifTheme = <TTheme extends string = BasicTheme>(theme: TTheme, styles: CssStyleCollection): CssRule => rule(themeSelector(theme), styles);



/**
 * A strongly typed global mapping of theme-related CSS variables for coloring components.
 * 
 * Prefixed with `--t-` to ensure scoped and consistent naming.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [themeVariantVars] = cssVars<ThemeVariantVars>({ prefix: 't', minify: false });

/**
 * Generates CSS rules that switch color shades based on the currently active theme,
 * and exposes theme-related CSS variables for coloring components.
 * 
 * Automatically maps color shades (e.g. background, foreground, decoration, border) to the appropriate color variables from `@reusable-ui/colors`,
 * depending on the currently active theme.
 * Supports multiple styling modes like **regular**, **mild**, and **outlined**.
 * 
 * @returns A CSS API for enabling theme-aware color shades.
 */
export const usesThemeVariant = (): CssThemeVariant => {
    return {
        themeVariantRule : () => style(
            variants(
                // Get registered theme names:
                getThemeNames()
                
                // Iterate over all registered theme names:
                .map((themeName) =>
                    // Create a scoped rule for the current theme (e.g. `.t-primary`):
                    ifTheme(themeName,
                        // Within the scope, define theme-specific variables:
                        vars({
                            // 🎨 Regular Style:
                            [themeVariantVars.backg         ] : colorVars[`${themeName}Base`], // base strong color
                            [themeVariantVars.foreg         ] : colorVars[`${themeName}Flip`], // max-contrast color
                            [themeVariantVars.decor         ] : colorVars[`${themeName}Flip`], // max-contrast color
                            [themeVariantVars.border        ] : colorVars[`${themeName}Bold`], // strong separator
                            [themeVariantVars.ring          ] : colorVars[`${themeName}Soft`], // attention color
                            
                            
                            
                            // 🌸 Mild Style:
                            [themeVariantVars.backgMild     ] : colorVars[`${themeName}Mild`], // comfort background
                            [themeVariantVars.foregMild     ] : colorVars[`${themeName}Text`], // readable foreground
                            [themeVariantVars.decorMild     ] : colorVars[`${themeName}Face`], // fair-contrast icon
                            [themeVariantVars.borderMild    ] : colorVars[`${themeName}Thin`], // fair separator
                            
                            
                            
                            // 🧊 Outlined Style:
                            [themeVariantVars.foregOutlined ] : colorVars[`${themeName}Face`], // edge-contrast foreground
                            [themeVariantVars.decorOutlined ] : colorVars[`${themeName}Face`], // edge-contrast icon
                            [themeVariantVars.borderOutlined] : colorVars[`${themeName}Edge`], // edge separator
                        })
                    )
                )
            ),
        ),
        
        themeVariantVars,
    } satisfies CssThemeVariant;
};

/**
 * Overrides the current theme by injecting theme-specific CSS variables.
 * 
 * Useful for conditional states such as **error**, **success**, **warning**, etc.  
 * The returned `CssRule` should be scoped within a conditional selector (e.g. `:invalid`, `.error`, `.success`) to avoid applying the override unconditionally.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param theme The theme name to override with, or `null` to reset the override.
 * @returns A CSS rule containing theme-specific CSS variables.
 */
export const usesThemeOverride = <TTheme extends string = BasicTheme>(theme: TTheme | null): CssRule => {
    return style(
        vars({
            // 🎨 Regular Style:
            [themeVariantVars.backgOverride         ] : theme ? colorVars[`${theme}Base`] : 'unset', // base strong color
            [themeVariantVars.foregOverride         ] : theme ? colorVars[`${theme}Flip`] : 'unset', // max-contrast color
            [themeVariantVars.decorOverride         ] : theme ? colorVars[`${theme}Flip`] : 'unset', // max-contrast color
            [themeVariantVars.borderOverride        ] : theme ? colorVars[`${theme}Bold`] : 'unset', // strong separator
            [themeVariantVars.ringOverride          ] : theme ? colorVars[`${theme}Soft`] : 'unset', // attention color
            
            
            
            // 🌸 Mild Style:
            [themeVariantVars.backgMildOverride     ] : theme ? colorVars[`${theme}Mild`] : 'unset', // comfort background
            [themeVariantVars.foregMildOverride     ] : theme ? colorVars[`${theme}Text`] : 'unset', // readable foreground
            [themeVariantVars.decorMildOverride     ] : theme ? colorVars[`${theme}Face`] : 'unset', // fair-contrast icon
            [themeVariantVars.borderMildOverride    ] : theme ? colorVars[`${theme}Thin`] : 'unset', // fair separator
            
            
            
            // 🧊 Outlined Style:
            [themeVariantVars.foregOutlinedOverride ] : theme ? colorVars[`${theme}Face`] : 'unset', // edge-contrast fore
            [themeVariantVars.decorOutlinedOverride ] : theme ? colorVars[`${theme}Face`] : 'unset', // edge-contrast icon
            [themeVariantVars.borderOutlinedOverride] : theme ? colorVars[`${theme}Edge`] : 'unset', // edge separator
        })
    );
};
