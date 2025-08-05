// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui configs:
import {
    type DefaultRootColors,
}                           from '@reusable-ui/colors'  // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.



/**
 * Represents the basic contextual themes of the component.
 * 
 * Common presets:
 * - `'primary'`   : core branding or primary site identity
 * - `'secondary'` : muted accent or complementary variant
 * - `'success'`   : positive actions and confirmations
 * - `'info'`      : neutral messages or informative context
 * - `'warning'`   : cautionary states and potential issues
 * - `'danger'`    : destructive actions or error indicators
 * - `'light'`     : suitable for overlaying dark backgrounds (e.g. over images)
 * - `'dark'`      : suitable for overlaying light backgrounds
 */
export type BasicTheme = keyof DefaultRootColors



/**
 * Props for specifying the theme of the component.
 * 
 * Accepts an optional `theme`, falling back to a default when not provided.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 */
export interface ThemeVariantProps<TTheme extends string = BasicTheme> {
    /**
     * Specifies the desired theme of the component:
     * - `'primary'`   : core branding or primary site identity
     * - `'secondary'` : muted accent or complementary variant
     * - `'success'`   : positive actions and confirmations
     * - `'info'`      : neutral messages or informative context
     * - `'warning'`   : cautionary states and potential issues
     * - `'danger'`    : destructive actions or error indicators
     * - `'light'`     : suitable for overlaying dark backgrounds (e.g. over images)
     * - `'dark'`      : suitable for overlaying light backgrounds
     * - `'inherit'`   : inherits theme from a parent context
     * - Or any custom theme token defined by the design system
     */
    theme          ?: TTheme | 'inherit'
}

/**
 * Optional configuration options for specifying the default theme.
 * 
 * Applied when the component does not explicitly provide the `theme` prop.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 */
export interface ThemeVariantOptions<TTheme extends string = BasicTheme> {
    /**
     * The default theme to apply when no `theme` prop is explicitly provided.
     */
    defaultTheme   ?: TTheme
}

/**
 * Represents the final resolved theme of the component, along with its associated CSS class name.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 */
export interface ResolvedThemeVariant<TTheme extends string = BasicTheme> {
    /**
     * The resolved theme value.
     * 
     * Possible values:
     * - `'primary'`   : core branding or primary site identity
     * - `'secondary'` : muted accent or complementary variant
     * - `'success'`   : positive actions and confirmations
     * - `'info'`      : neutral messages or informative context
     * - `'warning'`   : cautionary states and potential issues
     * - `'danger'`    : destructive actions or error indicators
     * - `'light'`     : suitable for overlaying dark backgrounds (e.g. over images)
     * - `'dark'`      : suitable for overlaying light backgrounds
     * - Or any custom theme token defined by the design system
     */
    theme           : TTheme
    
    /**
     * A CSS class name reflecting the resolved theme.
     * 
     * Possible values:
     * - `'t-primary'`
     * - `'t-secondary'`
     * - `'t-success'`
     * - `'t-info'`
     * - `'t-warning'`
     * - `'t-danger'`
     * - `'t-light'`
     * - `'t-dark'`
     * - Or any custom theme class name in the format `t-${theme}`
     */
    themeClassname  : `t-${TTheme}`
}



/*
Example of color schema of 'primary' theme:
|------------------|-----------------------------------|------------------------------------|-----------------------------------------|
| Role             | Regular Style                     | Mild Style                         | Outlined Style                          |
|------------------|-----------------------------------|------------------------------------|-----------------------------------------|
| Background       | primaryBase // base strong color  | primaryMild // comfort background  | (transparent, no color needed)          |
| Foreground       | primaryFlip // max-contrast color | primaryText // readable foreground | primaryFace // edge-contrast foreground |
| Decoration (icon)| primaryFlip // max-contrast color | primaryFace // fair-contrast icon  | primaryFace // edge-contrast icon       |
| Border           | primaryBold // strong separator   | primaryThin // fair separator      | primaryEdge // edge separator           |
| Effect (ring)    | primarySoft // attention color    | (same as regular)                  | (same as regular)                       |
|------------------|-----------------------------------|------------------------------------|-----------------------------------------|

Possible color variants (regular | mild | outlined):
Background = primaryBase | primaryMild | <none>
Foreground = primaryFlip | primaryText | primaryFace
Decoration = primaryFlip | primaryFace | primaryFace
Border     = primaryBold | primaryThin | primaryEdge
Effect     = primarySoft | primarySoft | primarySoft
*/



/**
 * List of theme-related CSS variables for all styling modes.
 * These keys are used for jsdoc mapping; values are ignored.
 */
export interface ThemeVariantVars {
    //#region 🎨 Regular Style
    /**
     * Themed background color for regular style.
     */
    backg                  : unknown
    
    /**
     * Themed foreground color for regular style.
     */
    foreg                  : unknown
    
    /**
     * Themed decoration color for regular style.
     */
    decor                  : unknown
    
    /**
     * Themed border color for regular style.
     */
    border                 : unknown
    
    /**
     * Themed effect color for regular style.
     */
    effect                 : unknown
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
     * Background color override.
     */
    backgOverride          : unknown
    
    /**
     * Foreground color override.
     */
    foregOverride          : unknown
    
    /**
     * Decoration color override.
     */
    decorOverride          : unknown
    
    /**
     * Border color override.
     */
    borderOverride         : unknown
    
    /**
     * Effect color override.
     */
    effectOverride         : unknown
    
    
    
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
 * Defines a CSS API for applying theme-based variant logic.
 */
export interface CssThemeVariant {
    /**
     * Generates theme-specific CSS rules based on the active theme.
     * 
     * Automatically maps theme roles (e.g. background, foreground, decoration, border) to the appropriate color variables from `@reusable-ui/colors`,
     * depending on the active theme variant. Supports multiple styling modes like **regular**, **mild**, and **outlined**.
     * 
     * These rules are scoped per theme via the `ifTheme()` selector.
     */
    themeVariantRule : Lazy<CssRule>
    
    /**
     * Exposes theme-related CSS variables for styling components.
     * 
     * Includes:
     * - Dynamic variables resolved from the current theme (e.g. `--t-backg`, `--t-foreg`)
     * - Override variables for contextual states (e.g. error, success, warning)
     * 
     * These variables are strongly typed and automatically mapped to
     * the corresponding theme color roles.
     */
    themeVariantVars : CssVars<ThemeVariantVars>
}
