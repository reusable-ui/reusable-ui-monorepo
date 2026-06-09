// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                  // Writes css in javascript.



/*
Example of color schema of 'primary' theme:
|------------------|-----------------------------------|------------------------------------|-----------------------------------------|
| Shades           | Regular Style                     | Mild Style                         | Outlined Style                          |
|------------------|-----------------------------------|------------------------------------|-----------------------------------------|
| Background       | primaryBase // base strong color  | primaryMild // comfort background  | (transparent, no color needed)          |
| Foreground       | primaryFlip // max-contrast color | primaryText // readable foreground | primaryFace // edge-contrast foreground |
| Decoration (icon)| primaryFlip // max-contrast color | primaryFace // fair-contrast icon  | primaryFace // edge-contrast icon       |
| Border           | primaryBold // strong separator   | primaryThin // fair separator      | primaryEdge // edge separator           |
| Ring             | primarySoft // attention color    | (same as regular)                  | (same as regular)                       |
|------------------|-----------------------------------|------------------------------------|-----------------------------------------|

Possible color variants (regular | mild | outlined):
Background = primaryBase | primaryMild | <none>
Foreground = primaryFlip | primaryText | primaryFace
Decoration = primaryFlip | primaryFace | primaryFace
Border     = primaryBold | primaryThin | primaryEdge
Ring       = primarySoft | primarySoft | primarySoft
*/



/**
 * A list of theme-related CSS variables used across all styling modes like **regular**, **mild**, and **outlined**.
 * 
 * These variables represent the full spectrum of color shades for the currently active theme,
 * making them ideal for coloring backgrounds, text, borders, icons, and other visual elements
 * in harmony with the theme.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ThemeVariantVars {
    //#region 🎨 Regular Style
    /**
     * Themed background color for regular style.
     */
    backgRegular           : unknown
    
    /**
     * Themed foreground color for regular style.
     */
    foregRegular           : unknown
    
    /**
     * Themed decoration color for regular style.
     */
    decorRegular           : unknown
    
    /**
     * Themed border color for regular style.
     */
    borderRegular          : unknown
    
    /**
     * Themed ring color for regular style.
     */
    ringRegular            : unknown
    //#endregion 🎨 Regular Style
    
    
    
    //#region 🌸 Mild Style (overrides regular style) 
    /**
     * Themed background color for mild variant.
     */
    backgMild              : unknown
    
    /**
     * Themed foreground color for mild variant.
     */
    foregMild              : unknown
    
    /**
     * Themed decoration color for mild variant.
     */
    decorMild              : unknown
    
    /**
     * Themed border color for mild variant.
     */
    borderMild             : unknown
    //#endregion 🌸 Mild Style (overrides regular style) 
    
    
    
    //#region 🧊 Outlined Style (overrides regular style) 
    /**
     * Themed foreground color for outlined variant.
     */
    foregOutlined          : unknown
    
    /**
     * Themed decoration color for outlined variant.
     */
    decorOutlined          : unknown
    
    /**
     * Themed border color for outlined variant.
     */
    borderOutlined         : unknown
    //#endregion 🧊 Outlined Style (overrides regular style) 
    
    
    
    //#region ⚠️ Theme Overrides (e.g. error, success, warning) 
    // 🎨 Regular Style:
    
    /**
     * Background color override for regular style.
     */
    backgRegularOverride   : unknown
    
    /**
     * Foreground color override for regular style.
     */
    foregRegularOverride   : unknown
    
    /**
     * Decoration color override for regular style.
     */
    decorRegularOverride   : unknown
    
    /**
     * Border color override for regular style.
     */
    borderRegularOverride  : unknown
    
    /**
     * Ring color override for regular style.
     */
    ringRegularOverride    : unknown
    
    
    
    // 🌸 Mild Style:
    
    /**
     * Background color override for mild variant.
     */
    backgMildOverride      : unknown
    
    /**
     * Foreground color override for mild variant.
     */
    foregMildOverride      : unknown
    
    /**
     * Decoration color override for mild variant.
     */
    decorMildOverride      : unknown
    
    /**
     * Border color override for mild variant.
     */
    borderMildOverride     : unknown
    
    
    
    // 🧊 Outlined Style:
    
    /**
     * Foreground color override for outlined variant.
     */
    foregOutlinedOverride  : unknown
    
    /**
     * Decoration color override for outlined variant.
     */
    decorOutlinedOverride  : unknown
    
    /**
     * Border color override for outlined variant.
     */
    borderOutlinedOverride : unknown
    //#endregion ⚠️ Theme Overrides (e.g. error, success, warning) 
}



/**
 * Provides a CSS API for enabling theme-aware color shades.
 */
export interface CssThemeVariant {
    /**
     * Generates CSS rules that switch color shades based on the currently active theme.
     * 
     * Automatically maps color shades (e.g. background, foreground, decoration, border) to the appropriate color variables from `@reusable-ui/color-config`,
     * depending on the currently active theme.
     * Supports multiple styling modes like **regular**, **mild**, and **outlined**.
     * 
     * These rules are scoped per theme via the `ifTheme()` for switching color shades.
     */
    themeVariantRule : Lazy<CssRule>
    
    /**
     * Exposes theme-related CSS variables for coloring components.
     * 
     * Includes:
     * - Color variables containing the full spectrum of color shades for the currently active theme
     * - Override variables for conditionally applying theme overrides (e.g. error, success, warning)
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    themeVariantVars : CssVars<ThemeVariantVars>
}
