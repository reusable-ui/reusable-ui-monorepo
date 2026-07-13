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
    getThemes,
    colorConfigVars,
}                           from '@reusable-ui/color-config'    // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.

// Types:
import {
    type BasicTheme,
}                           from './types.js'
import {
    type CssThemeVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    themeVariantVars,
}                           from './css-internal-variables.js'

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
export const usingThemeVariant = (): CssThemeVariant => {
    return {
        themeVariantRule : () => style(
            variants(
                // Get registered theme names:
                getThemes()
                
                // Iterate over all registered theme names:
                .map((theme) =>
                    // Create a scoped rule for the current theme (e.g. `.t-primary`):
                    ifTheme(theme,
                        // Within the scope, define theme-specific variables:
                        vars({
                            // 🎨 Regular Style:
                            [themeVariantVars.regularBackg  ] : colorConfigVars[`${theme}Base`], // base strong color
                            [themeVariantVars.regularForeg  ] : colorConfigVars[`${theme}Flip`], // max-contrast color
                            [themeVariantVars.regularDecor  ] : colorConfigVars[`${theme}Flip`], // max-contrast color
                            [themeVariantVars.regularBorder ] : colorConfigVars[`${theme}Bold`], // strong separator
                            [themeVariantVars.regularRing   ] : colorConfigVars[`${theme}Soft`], // attention color
                            
                            
                            
                            // 🌸 Mild Style:
                            [themeVariantVars.mildBackg     ] : colorConfigVars[`${theme}Mild`], // comfort background
                            [themeVariantVars.mildForeg     ] : colorConfigVars[`${theme}Text`], // readable foreground
                            [themeVariantVars.mildDecor     ] : colorConfigVars[`${theme}Face`], // fair-contrast icon
                            [themeVariantVars.mildBorder    ] : colorConfigVars[`${theme}Thin`], // fair separator
                            
                            
                            
                            // 🧊 Outlined Style:
                            [themeVariantVars.outlinedForeg ] : colorConfigVars[`${theme}Face`], // edge-contrast foreground
                            [themeVariantVars.outlinedDecor ] : colorConfigVars[`${theme}Face`], // edge-contrast icon
                            [themeVariantVars.outlinedBorder] : colorConfigVars[`${theme}Edge`], // edge separator
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
export const usingThemeOverride = <TTheme extends string = BasicTheme>(theme: TTheme | null): CssRule => { /* eslint css-hooks/enforce-hook-conventions: 'off' */
    return style(
        vars({
            // 🎨 Regular Style:
            [themeVariantVars.regularBackgOverride  ] : theme ? colorConfigVars[`${theme}Base`] : 'unset', // base strong color
            [themeVariantVars.regularForegOverride  ] : theme ? colorConfigVars[`${theme}Flip`] : 'unset', // max-contrast color
            [themeVariantVars.regularDecorOverride  ] : theme ? colorConfigVars[`${theme}Flip`] : 'unset', // max-contrast color
            [themeVariantVars.regularBorderOverride ] : theme ? colorConfigVars[`${theme}Bold`] : 'unset', // strong separator
            [themeVariantVars.regularRingOverride   ] : theme ? colorConfigVars[`${theme}Soft`] : 'unset', // attention color
            
            
            
            // 🌸 Mild Style:
            [themeVariantVars.mildBackgOverride     ] : theme ? colorConfigVars[`${theme}Mild`] : 'unset', // comfort background
            [themeVariantVars.mildForegOverride     ] : theme ? colorConfigVars[`${theme}Text`] : 'unset', // readable foreground
            [themeVariantVars.mildDecorOverride     ] : theme ? colorConfigVars[`${theme}Face`] : 'unset', // fair-contrast icon
            [themeVariantVars.mildBorderOverride    ] : theme ? colorConfigVars[`${theme}Thin`] : 'unset', // fair separator
            
            
            
            // 🧊 Outlined Style:
            [themeVariantVars.outlinedForegOverride ] : theme ? colorConfigVars[`${theme}Face`] : 'unset', // edge-contrast fore
            [themeVariantVars.outlinedDecorOverride ] : theme ? colorConfigVars[`${theme}Face`] : 'unset', // edge-contrast icon
            [themeVariantVars.outlinedBorderOverride] : theme ? colorConfigVars[`${theme}Edge`] : 'unset', // edge separator
        })
    );
};
