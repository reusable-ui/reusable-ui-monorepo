'use client' // The exported `useThemeVariant()` hook is client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type BasicTheme,
    type ThemeVariantProps,
    type ThemeVariantOptions,
    type ResolvedThemeVariant,
}                           from './types.js'

// Defaults:
import {
    systemDefaultTheme,
}                           from './internal-defaults.js'

// Utilities:
import {
    getThemeClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    ThemeVariantContext,
}                           from './contexts.js'



/**
 * Resolves the effective theme value based on props and context.
 * 
 * - `'inherit'` retrieves the theme from context.
 * - Otherwise, returns the provided theme value as-is.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {Required<ThemeVariantProps<TTheme>>['theme']} theme - The pre-resolved theme value derived from props.
 * @returns {TTheme} - The resolved theme value.
 */
const useEffectiveThemeVariant = <TTheme extends string = BasicTheme>(theme: Required<ThemeVariantProps<TTheme>>['theme']): TTheme => {
    // If the theme is 'inherit', use the context value:
    if (theme === 'inherit') return use(ThemeVariantContext) as TTheme;
    
    
    
    // Otherwise, return the already resolved effective theme:
    return theme;
};

/**
 * Resolves the theme value along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
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
        theme = options?.defaultTheme ?? (systemDefaultTheme as TTheme),
    } = props;
    
    
    
    // Resolve the effective theme value:
    const effectiveTheme = useEffectiveThemeVariant<TTheme>(theme);
    
    
    
    // Return resolved theme attributes:
    return {
        theme          : effectiveTheme,
        themeClassname : getThemeClassname<TTheme>(effectiveTheme),
    } satisfies ResolvedThemeVariant<TTheme>;
};
