// Types:
import {
    type BasicTheme,
}                           from './types.js'

// Defaults:
import {
    defaultTheme,
}                           from './internal-defaults.js'

// Utilities:
import {
    getThemeClassname,
}                           from './internal-utilities.js'



/**
 * Props for controlling the theme of the component.
 * 
 * Accepts an optional `theme`, falling back to a default when not provided.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 */
export interface ThemeVariantProps<TTheme extends string = BasicTheme> {
    /**
     * Specifies the desired theme of the component:
     * - `'primary'`   — core branding or primary site identity
     * - `'secondary'` — muted accent or complementary variant
     * - `'success'`   — positive actions and confirmations
     * - `'info'`      — neutral messages or informative context
     * - `'warning'`   — cautionary states and potential issues
     * - `'danger'`    — destructive actions or error indicators
     * - `'light'`     — suitable for overlaying dark backgrounds (e.g. over images)
     * - `'dark'`      — suitable for overlaying light backgrounds
     * - Or any custom theme token defined by the design system
     */
    theme          ?: TTheme
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
 * Represents the final resolved theme for the component, along with its associated CSS class name.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 */
export interface ResolvedThemeVariant<TTheme extends string = BasicTheme> {
    /**
     * The resolved theme value.
     * 
     * Example values:
     * - `'primary'`   — core branding or primary site identity
     * - `'secondary'` — muted accent or complementary variant
     * - `'success'`   — positive actions and confirmations
     * - `'info'`      — neutral messages or informative context
     * - `'warning'`   — cautionary states and potential issues
     * - `'danger'`    — destructive actions or error indicators
     * - `'light'`     — suitable for overlaying dark backgrounds (e.g. over images)
     * - `'dark'`      — suitable for overlaying light backgrounds
     * - Or any custom theme token defined by the design system
     */
    theme           : TTheme
    
    /**
     * CSS class name corresponding to the resolved theme.
     * 
     * Example values:
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

/**
 * Resolves the theme value along with its associated CSS class name,
 * based on component props and optional default configuration.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {ThemeVariantProps} props - The component props that may include a `theme` value.
 * @param {ThemeVariantOptions} options - An optional configuration specifying a default theme when no `theme` prop is explicitly provided.
 * @returns {ResolvedThemeVariant} - The resolved theme value along with its associated CSS class name.
 * 
 * @example
 * ```ts
 * import React, { FC } from 'react';
 * import {
 *     useThemeVariant,
 *     ThemeVariantProps,
 * } from '@reusable-ui/theme-variant';
 * import styles from './ThemeableCard.module.css';
 * 
 * export interface ThemeableCardProps extends ThemeVariantProps {}
 * 
 * // A themeable card component that adapts based on the given theme.
 * // Supports `primary`, `secondary`, `danger`, etc.
 * export const ThemeableCard : FC<ThemeableCardProps> = (props) => {
 *     const {
 *         theme,
 *         themeClassname,
 *     } = useThemeVariant(props, {
 *         defaultTheme: 'primary', // fallback if not provided
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${themeClassname}`}
 *         >
 *             <strong>Resolved theme:</strong> {theme}
 *         </div>
 *     );
 * };
 * ```
 */
export const useThemeVariant = <TTheme extends string = BasicTheme>(props: ThemeVariantProps<TTheme>, options?: ThemeVariantOptions<TTheme>): ResolvedThemeVariant<TTheme> => {
    // Extract props and assign defaults:
    const {
        theme = options?.defaultTheme ?? (defaultTheme as TTheme),
    } = props;
    
    
    
    // Return resolved theme attributes:
    return {
        theme,
        themeClassname : getThemeClassname<TTheme>(theme),
    } satisfies ResolvedThemeVariant<TTheme>;
};
