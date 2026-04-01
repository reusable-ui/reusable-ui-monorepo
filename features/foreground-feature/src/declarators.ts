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
    type CssForegroundFeatureOptions,
    type CssForegroundFeature,
}                           from './types.js'

// CSS Variables:
import {
    foregroundFeatureVars,
}                           from './css-variables.js'

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
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular foreground color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [foregroundFeatureVars.foregRegularCond]: switchOf(
                        themeVariantVars.foregRegularOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.foregRegular,         // A themed foreground color for regular variant.
                    ),
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) foreground color when mild variant is active.
                     * Poisoned when mild variant is inactive.
                     */
                    [foregroundFeatureVars.foregMildCond]: [[
                        mildVariantVars.isMild,                 // If mild variant is active.
                        switchOf(
                            themeVariantVars.foregMildOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.foregMild,         // A themed foreground color for mild variant.
                        ),
                    ]],
                    
                    
                    
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies outlined foreground color when outlined variant is active.
                     * Poisoned when outlined variant is inactive.
                     */
                    [foregroundFeatureVars.foregOutlinedCond]: [[
                        outlineVariantVars.isOutlined,              // If outlined variant is active.
                        switchOf(
                            themeVariantVars.foregOutlinedOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.foregOutlined,         // A themed foreground color for outlined variant.
                        ),
                    ]],
                }),
                
                
                
                // Final resolved foreground variables (always valid):
                ...vars({
                    /**
                     * Resolves a variant-aware foreground color based on variant priority:
                     * 1. Outlined variant
                     * 2. Mild variant
                     * 3. Regular variant
                     * 4. Config fallback
                     */
                    [foregroundFeatureVars.foregVariantColor]: switchOf(
                        foregroundFeatureVars.foregOutlinedCond, // 🧊 Outlined variant (if active).
                        foregroundFeatureVars.foregMildCond,     // 🌸 Mild variant (if active).
                        foregroundFeatureVars.foregRegularCond,  // 🎨 Regular variant (if themed).
                        defaultForegroundColor,                  // 🛠️ Config fallback.
                    ),
                    
                    /**
                     * Resolves a final foreground color:
                     * 1. User override color
                     * 2. Variant-aware color
                     */
                    [foregroundFeatureVars.foregColor]: switchOf(
                        foregroundFeatureVars.foregColorOverride, // ⚠️ User override (if active).
                        foregroundFeatureVars.foregVariantColor,  // 🧩 Variant-aware fallback.
                    ),
                }),
            });
        },
        
        foregroundFeatureVars,
    } satisfies CssForegroundFeature;
};
