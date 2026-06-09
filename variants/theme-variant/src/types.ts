// Reusable-ui configs:
import {
    type DefaultRootColors,
}                           from '@reusable-ui/color-config'    // A flexible and themeable color management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.



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
 * Accepts an optional `theme`, defaulting to a default when not provided.
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
     * 
     * Defaults to `'inherit'` (inherits from parent context).
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
     * Specifies the default theme when no `theme` prop is explicitly provided:
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
     * 
     * Defaults to `'inherit'` (inherits from parent context).
     */
    defaultTheme   ?: TTheme | 'inherit'
    
    /**
     * Specifies the fallback theme when no effective theme value can be resolved:
     * - `'primary'`   : core branding or primary site identity
     * - `'secondary'` : muted accent or complementary variant
     * - `'success'`   : positive actions and confirmations
     * - `'info'`      : neutral messages or informative context
     * - `'warning'`   : cautionary states and potential issues
     * - `'danger'`    : destructive actions or error indicators
     * - `'light'`     : suitable for overlaying dark backgrounds (e.g. over images)
     * - `'dark'`      : suitable for overlaying light backgrounds
     * - Or any custom theme token defined by the design system
     * 
     * This fallback applies when `theme` prop is set to `'inherit'` but no context is available.
     * 
     * Defaults to `'primary'` (core branding or primary site identity).
     */
    fallbackTheme  ?: TTheme
}

/**
 * Represents the final resolved theme of the component, along with its associated CSS class name.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 */
export interface ThemeVariant<TTheme extends string = BasicTheme> {
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
