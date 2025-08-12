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
    type ForegroundFeatureVars,
    type CssForegroundFeatureOptions,
    type CssForegroundFeature,
}                           from './types.js'

// Reusable-ui variants:
import {
    usesThemeVariant,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.
import {
    usesOutlineVariant,
}                           from '@reusable-ui/outline-variant'     // A utility for managing visual outline consistently across React components.
import {
    usesMildVariant,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.



/**
 * A strongly typed global mapping of foreground-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [foregroundFeatureVars] = cssVars<ForegroundFeatureVars>({ prefix: 'fg', minify: false });

/**
 * Resolves the appropriate foreground color based on the currently active variants
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing foreground behavior.
 * @returns A CSS API for enabling theme-aware foreground styling in components.
 */
export const usesForegroundFeature = (options?: CssForegroundFeatureOptions): CssForegroundFeature => {
    // Extract options and assign defaults:
    const {
        color           = 'currentColor', // Ensures a concrete fallback to avoid invalid value.
        foregroundColor : defaultForegroundColor = color, // Prefer `foregroundColor`, fallback to `color`.
    } = options ?? {};
    
    
    
    return {
        foregroundFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars   } = usesThemeVariant();
            const { outlineVariantVars } = usesOutlineVariant();
            const { mildVariantVars    } = usesMildVariant();
            
            
            
            return style({
                // Conditional foreground variables (may be poisoned):
                ...vars({
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies outlined foreground color when outlined mode is active.
                     * Poisoned if outlined mode is inactive.
                     */
                    [foregroundFeatureVars.foregOutlinedCond]: [[
                        outlineVariantVars.isOutlined, // If outlined mode is active.
                        switchOf(
                            themeVariantVars.foregOutlinedOverride, // ⚠️ Theme Override (if active).
                            themeVariantVars.foregOutlined,         // A themed foreground color for outlined variant.
                        ),
                    ]],
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) foreground color when mild mode is active.
                     * Poisoned if mild mode is inactive.
                     */
                    [foregroundFeatureVars.foregMildCond]: [[
                        mildVariantVars.isMild,                 // If mild mode is active.
                        switchOf(
                            themeVariantVars.foregMildOverride, // ⚠️ Theme Override (if active).
                            themeVariantVars.foregMild,         // A themed foreground color for mild variant.
                        ),
                    ]],
                    
                    
                    
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular foreground color from the theme.
                     * Poisoned if theme styling is not implemented.
                     */
                    [foregroundFeatureVars.foregRegularCond]: switchOf(
                        themeVariantVars.foregOverride, // ⚠️ Theme Override (if active).
                        themeVariantVars.foreg,         // A themed foreground color for regular variant.
                    ),
                }),
                
                
                
                // Final resolved foreground variables (always valid):
                ...vars({
                    /**
                     * Resolves the final foreground color based on variant priority:
                     * 1. Outlined theme override
                     * 2. Outlined theme color
                     * 3. Mild theme override
                     * 4. Mild theme color
                     * 5. Regular theme override
                     * 6. Regular theme color
                     * 7. Config fallback
                     */
                    [foregroundFeatureVars.foregColor]: switchOf(
                        foregroundFeatureVars.foregOutlinedCond, // 🧊 Outlined Style (if active)
                        foregroundFeatureVars.foregMildCond,     // 🌸 Mild Style (if active)
                        foregroundFeatureVars.foregRegularCond,  // 🎨 Regular Style (if themed)
                        defaultForegroundColor,                  // 🛠️ Config fallback
                    ),
                }),
            });
        },
        
        foregroundFeatureVars,
    } satisfies CssForegroundFeature;
};
