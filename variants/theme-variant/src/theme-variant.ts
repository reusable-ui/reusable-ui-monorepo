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
    semiDefaultTheme,
    finalDefaultTheme,
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
 * Resolution priority:
 * - `'inherit'` : uses the theme value from context, if available.
 * - Otherwise   : uses the explicitly provided theme value as-is.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {Required<ThemeVariantProps<TTheme>>['theme']} theme - The pre-resolved theme value from props.
 * @param {TTheme} defaultTheme - Fallback theme value when context is missing.
 * @returns {TTheme} - The resolved theme value.
 */
const useEffectiveThemeValue = <TTheme extends string = BasicTheme>(theme: Required<ThemeVariantProps<TTheme>>['theme'], defaultTheme: TTheme): TTheme => {
    switch (theme) {
        // If the theme is 'inherit', use the context value:
        case 'inherit' : {
            // Get the inherited theme from context:
            const inheritedTheme = use(ThemeVariantContext) as TTheme | undefined;
            
            
            
            // If context value exists, return it:
            if (inheritedTheme !== undefined) return inheritedTheme;
            
            
            
            // Otherwise, fallback to the default theme:
            return defaultTheme;
        }
        
        
        
        // The theme is explicitly defined, return it as-is:
        default        : return theme;
    } // switch
};

/**
 * Resolves the theme value along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {ThemeVariantProps<TTheme>} props - The component props that may include a `theme` value.
 * @param {ThemeVariantOptions<TTheme>} options - An optional configuration specifying a default theme when no `theme` prop is explicitly provided.
 * @returns {ResolvedThemeVariant<TTheme>} - The resolved theme value along with its associated CSS class name.
 * 
 * @example
 * ```tsx
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
    // Extract options and assign defaults:
    const {
        defaultTheme = finalDefaultTheme as TTheme,
    } = options ?? {};
    
    const {
        defaultTheme : intermediateDefaultTheme = semiDefaultTheme as TTheme | 'inherit',
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        theme        = intermediateDefaultTheme,
    } = props;
    
    
    
    // Resolve the effective theme value:
    const effectiveTheme = useEffectiveThemeValue<TTheme>(theme, defaultTheme);
    
    
    
    // Return resolved theme attributes:
    return {
        theme          : effectiveTheme,
        themeClassname : getThemeClassname<TTheme>(effectiveTheme),
    } satisfies ResolvedThemeVariant<TTheme>;
};
