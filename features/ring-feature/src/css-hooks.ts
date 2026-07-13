// Cssfn:
import {
    // Writes css in javascript:
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    switchOf,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssRingFeatureOptions,
    type CssRingFeature,
}                           from './css-types.js'

// CSS Variables:
import {
    ringFeatureVars,
}                           from './css-internal-variables.js'

// Reusable-ui variants:
import {
    usingThemeVariant,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.



/**
 * Resolves the appropriate ring color based on the currently active theme variant
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing ring behavior.
 * @returns A CSS API for enabling theme-aware ring styling in components.
 */
export const usingRingFeature = (options?: CssRingFeatureOptions): CssRingFeature => {
    // Extract options and assign defaults:
    const {
        ringColor : defaultRingColor = 'currentColor', // Ensures a concrete fallback to avoid invalid value.
    } = options ?? {};
    
    
    
    return {
        ringFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars } = usingThemeVariant();
            
            
            
            return style({
                // Conditional ring variables (may be poisoned):
                ...vars({
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular ring color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [ringFeatureVars.regularRingCond]: switchOf(
                        themeVariantVars.regularRingOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.regularRing,         // A themed ring color for regular variant.
                    ),
                }),
                
                
                
                // Final resolved ring variables (always valid):
                ...vars({
                    /**
                     * Resolves a variant-aware ring color based on variant priority:
                     * 1. Regular variant
                     * 2. Config fallback
                     */
                    [ringFeatureVars.ringVariantColor]: switchOf(
                        ringFeatureVars.regularRingCond, // 🎨 Regular variant (if themed).
                        defaultRingColor,                // 🛠️ Config fallback.
                    ),
                    
                    /**
                     * Resolves a final ring color:
                     * 1. User override color
                     * 2. Variant-aware color
                     */
                    [ringFeatureVars.ringColor]: switchOf(
                        ringFeatureVars.ringColorOverride, // ⚠️ User override (if active).
                        ringFeatureVars.ringVariantColor,  // 🧩 Variant-aware fallback.
                    ),
                }),
            });
        },
        
        ringFeatureVars,
    } satisfies CssRingFeature;
};
