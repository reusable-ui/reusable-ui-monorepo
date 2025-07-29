'use client' // The exported `<ThemeVariantProvider>` component is client side only.

// React:
import {
    // React:
    default as React,
    
    
    
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type BasicTheme,
    type ResolvedThemeVariant,
}                           from './types.js'

// Contexts:
import {
    ThemeVariantContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<ThemeVariantProvider>`.
 * 
 * Requires a `theme` prop to set the context value,
 * along with children to receive the propagated theme value.
 */
export interface ThemeVariantProviderProps<TTheme extends string = BasicTheme>
    extends
        // Bases:
        PropsWithChildren<Pick<ResolvedThemeVariant<TTheme>, 'theme'>>
{
}

/**
 * Provides a theme value to descendant components,
 * enables descendant components to inherit the value.
 * 
 * @template {string} [TTheme=BasicTheme] — commonly `'primary'`, `'secondary'`, `'success'`, `'info'`, `'warning'`, `'danger'`, `'light'`, `'dark'`
 * 
 * @example
 * ```ts
 * import React, { ReactNode, FC } from 'react';
 * import {
 *     ThemeVariantProps,
 *     ThemeVariantProvider,
 *     useThemeVariant,
 * } from '@reusable-ui/theme-variant';
 * 
 * export interface ParentComponentProps extends ThemeVariantProps {
 *     children ?: ReactNode
 * }
 * 
 * // A component that share theme with child components.
 * export const ParentComponent: FC<ParentComponentProps> = (props) => {
 *     // Resolve theme value from props:
 *     const { theme } = useThemeVariant(props, {
 *         defaultTheme: 'primary', // fallback if not provided
 *     });
 *     
 *     // Propagate theme value to descendants:
 *     return (
 *         <ThemeVariantProvider theme={theme}>
 *             {props.children}
 *         </ThemeVariantProvider>
 *     );
 * };
 * ```
 */
const ThemeVariantProvider = <TTheme extends string = BasicTheme>(props: ThemeVariantProviderProps<TTheme>): ReactElement | null => {
    // Extract props:
    const {
        theme,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <ThemeVariantContext value={theme}>
            {children}
        </ThemeVariantContext>
    );
};

export {
    ThemeVariantProvider,            // Named export for readability.
    ThemeVariantProvider as default, // Default export to support React.lazy.
}
