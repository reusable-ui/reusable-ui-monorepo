// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Writes css in javascript:
    variants,
    style,
    vars,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Reusable-ui configs:
import {
    getThemeNames,
    colorConfigVars,
}                           from '@reusable-ui/color-config'    // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.

// Types:
import {
    type BasicTheme,
    type CssThemeVariant,
}                           from './types.js'

// CSS Variables:
import {
    themeVariantVars,
}                           from './css-variables.js'

// CSS Selectors:
import {
    ifTheme,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that switch color shades based on the currently active theme,
 * and exposes theme-related CSS variables for coloring components.
 * 
 * Automatically maps color shades (e.g. background, foreground, decoration, border) to the appropriate color variables from `@reusable-ui/color-config`,
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
                            [themeVariantVars.backgRegular  ] : colorConfigVars[`${themeName}Base`], // base strong color
                            [themeVariantVars.foregRegular  ] : colorConfigVars[`${themeName}Flip`], // max-contrast color
                            [themeVariantVars.decorRegular  ] : colorConfigVars[`${themeName}Flip`], // max-contrast color
                            [themeVariantVars.borderRegular ] : colorConfigVars[`${themeName}Bold`], // strong separator
                            [themeVariantVars.ringRegular   ] : colorConfigVars[`${themeName}Soft`], // attention color
                            
                            
                            
                            // 🌸 Mild Style:
                            [themeVariantVars.backgMild     ] : colorConfigVars[`${themeName}Mild`], // comfort background
                            [themeVariantVars.foregMild     ] : colorConfigVars[`${themeName}Text`], // readable foreground
                            [themeVariantVars.decorMild     ] : colorConfigVars[`${themeName}Face`], // fair-contrast icon
                            [themeVariantVars.borderMild    ] : colorConfigVars[`${themeName}Thin`], // fair separator
                            
                            
                            
                            // 🧊 Outlined Style:
                            [themeVariantVars.foregOutlined ] : colorConfigVars[`${themeName}Face`], // edge-contrast foreground
                            [themeVariantVars.decorOutlined ] : colorConfigVars[`${themeName}Face`], // edge-contrast icon
                            [themeVariantVars.borderOutlined] : colorConfigVars[`${themeName}Edge`], // edge separator
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
export const usesThemeOverride = <TTheme extends string = BasicTheme>(theme: TTheme | null): CssRule => { /* eslint css-hooks/enforce-hook-conventions: 'off' */
    return style(
        vars({
            // 🎨 Regular Style:
            [themeVariantVars.backgRegularOverride  ] : theme ? colorConfigVars[`${theme}Base`] : 'unset', // base strong color
            [themeVariantVars.foregRegularOverride  ] : theme ? colorConfigVars[`${theme}Flip`] : 'unset', // max-contrast color
            [themeVariantVars.decorRegularOverride  ] : theme ? colorConfigVars[`${theme}Flip`] : 'unset', // max-contrast color
            [themeVariantVars.borderRegularOverride ] : theme ? colorConfigVars[`${theme}Bold`] : 'unset', // strong separator
            [themeVariantVars.ringRegularOverride   ] : theme ? colorConfigVars[`${theme}Soft`] : 'unset', // attention color
            
            
            
            // 🌸 Mild Style:
            [themeVariantVars.backgMildOverride     ] : theme ? colorConfigVars[`${theme}Mild`] : 'unset', // comfort background
            [themeVariantVars.foregMildOverride     ] : theme ? colorConfigVars[`${theme}Text`] : 'unset', // readable foreground
            [themeVariantVars.decorMildOverride     ] : theme ? colorConfigVars[`${theme}Face`] : 'unset', // fair-contrast icon
            [themeVariantVars.borderMildOverride    ] : theme ? colorConfigVars[`${theme}Thin`] : 'unset', // fair separator
            
            
            
            // 🧊 Outlined Style:
            [themeVariantVars.foregOutlinedOverride ] : theme ? colorConfigVars[`${theme}Face`] : 'unset', // edge-contrast fore
            [themeVariantVars.decorOutlinedOverride ] : theme ? colorConfigVars[`${theme}Face`] : 'unset', // edge-contrast icon
            [themeVariantVars.borderOutlinedOverride] : theme ? colorConfigVars[`${theme}Edge`] : 'unset', // edge separator
        })
    );
};
