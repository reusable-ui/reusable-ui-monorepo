// Cssfn:
import {
    // Writes css in javascript:
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
    switchOf,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type RingFeatureVars,
    type CssRingFeatureOptions,
    type CssRingFeature,
}                           from './types.js'

// Reusable-ui variants:
import {
    usesThemeVariant,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.



/**
 * A strongly typed global mapping of ring-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [ringFeatureVars] = cssVars<RingFeatureVars>({ prefix: 'rg', minify: false });

/**
 * Resolves the appropriate ring color based on the currently active theme variant
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing ring behavior.
 * @returns A CSS API for enabling theme-aware ring styling in components.
 */
export const usesRingFeature = (options?: CssRingFeatureOptions): CssRingFeature => {
    // Extract options and assign defaults:
    const {
        ringColor : defaultRingColor = 'currentColor', // Ensures a concrete fallback to avoid invalid value.
    } = options ?? {};
    
    
    
    return {
        ringFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars } = usesThemeVariant();
            
            
            
            return style({
                // Conditional ring variables (may be poisoned):
                ...vars({
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular ring color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [ringFeatureVars.ringRegularCond]: switchOf(
                        themeVariantVars.ringRegularOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.ringRegular,         // A themed ring color for regular variant.
                    ),
                }),
                
                
                
                // Final resolved ring variables (always valid):
                ...vars({
                    /**
                     * Resolves the final ring color based on variant priority:
                     * 1. Regular theme override
                     * 2. Regular theme color
                     * 3. Config fallback
                     */
                    [ringFeatureVars.ringColor]: switchOf(
                        ringFeatureVars.ringRegularCond, // 🎨 Regular style (if themed)
                        defaultRingColor,                // 🛠️ Config fallback
                    ),
                }),
            });
        },
        
        ringFeatureVars,
    } satisfies CssRingFeature;
};
