'use client' // The exported `useThemeVariant()` hook is client side only.

// Reusable-ui variants:
import {
    // Types:
    type InheritableVariantDefinition,
    
    
    
    // Hooks:
    useResolvedInheritableVariant,
}                           from '@reusable-ui/effective-variant'   // Reusable resolvers for deriving effective variant from props, with optional behaviors like context inheriting and inverting.

// Types:
import {
    type BasicTheme,
    type ThemeVariantProps,
    type ThemeVariantOptions,
    type ThemeVariant,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeTheme,
    defaultFallbackTheme,
}                           from './internal-defaults.js'

// Utilities:
import {
    getThemeClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    ThemeVariantContext,
}                           from './internal-contexts.js'



/** The inheritable variant definition for theme variant management. */
const inheritableVariantDefinition : InheritableVariantDefinition<string, 'inherit'> = {
    // Defaults:
    defaultVariant          : defaultDeclarativeTheme,
    
    // Inheritances:
    inheritableVariantToken : 'inherit',
    variantContext          : ThemeVariantContext,
    
    // Fallbacks:
    fallbackVariant         : defaultFallbackTheme,
};

/**
 * Resolves the current theme variant.
 * 
 * Resolution priority:
 * - `'inherit'` : uses the theme value from context.
 * - Otherwise   : uses the explicitly provided theme value as-is.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param props - The component props that may include a `theme` value.
 * @param options - An optional configuration specifying a default theme when no `theme` prop is explicitly provided.
 * @returns The resolved theme value.
 */
export const useResolvedTheme = <TTheme extends string = BasicTheme>(props: ThemeVariantProps<TTheme>, options?: ThemeVariantOptions<TTheme>): TTheme => {
    // Extract options:
    const {
        defaultTheme  : defaultVariant,
        fallbackTheme : fallbackVariant,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        theme : variant,
    } = props;
    
    
    
    // Resolve effective theme variant:
    return useResolvedInheritableVariant<TTheme, 'inherit'>(
        // Props:
        { variant },
        
        // Options:
        { defaultVariant, fallbackVariant },
        
        // Definition:
        inheritableVariantDefinition as unknown as InheritableVariantDefinition<TTheme, 'inherit'>,
    );
};



/**
 * Resolves the theme value along with its associated CSS class name,
 * based on component props, optional default configuration, and parent context.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @param {ThemeVariantProps<TTheme>} props - The component props that may include a `theme` value.
 * @param {ThemeVariantOptions<TTheme>} options - An optional configuration specifying a default theme when no `theme` prop is explicitly provided.
 * @returns {ThemeVariant<TTheme>} - The resolved theme value along with its associated CSS class name.
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
export const useThemeVariant = <TTheme extends string = BasicTheme>(props: ThemeVariantProps<TTheme>, options?: ThemeVariantOptions<TTheme>): ThemeVariant<TTheme> => {
    // Resolve effective theme value:
    const effectiveTheme = useResolvedTheme<TTheme>(props, options);
    
    
    
    // Return resolved theme attributes:
    return {
        theme          : effectiveTheme,
        themeClassname : getThemeClassname<TTheme>(effectiveTheme),
    } satisfies ThemeVariant<TTheme>;
};
