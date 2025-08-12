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
    type DecorationFeatureVars,
    type CssDecorationFeatureOptions,
    type CssDecorationFeature,
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
 * A strongly typed global mapping of decoration-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [decorationFeatureVars] = cssVars<DecorationFeatureVars>({ prefix: 'dc', minify: false });

/**
 * Resolves the appropriate decoration color based on the currently active variants
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing decoration behavior.
 * @returns A CSS API for enabling theme-aware decoration styling in components.
 */
export const usesDecorationFeature = (options?: CssDecorationFeatureOptions): CssDecorationFeature => {
    // Extract options and assign defaults:
    const {
        decorationColor : defaultDecorationColor = 'currentColor', // Ensures a concrete fallback to avoid invalid value.
    } = options ?? {};
    
    
    
    return {
        decorationFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars   } = usesThemeVariant();
            const { outlineVariantVars } = usesOutlineVariant();
            const { mildVariantVars    } = usesMildVariant();
            
            
            
            return style({
                // Conditional decoration variables (may be poisoned):
                ...vars({
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies outlined decoration color when outlined mode is active.
                     * Poisoned when outlined mode is inactive.
                     */
                    [decorationFeatureVars.decorOutlinedCond]: [[
                        outlineVariantVars.isOutlined, // If outlined mode is active.
                        switchOf(
                            themeVariantVars.decorOutlinedOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.decorOutlined,         // A themed decoration color for outlined variant.
                        ),
                    ]],
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) decoration color when mild mode is active.
                     * Poisoned when mild mode is inactive.
                     */
                    [decorationFeatureVars.decorMildCond]: [[
                        mildVariantVars.isMild,                 // If mild mode is active.
                        switchOf(
                            themeVariantVars.decorMildOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.decorMild,         // A themed decoration color for mild variant.
                        ),
                    ]],
                    
                    
                    
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular decoration color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [decorationFeatureVars.decorRegularCond]: switchOf(
                        themeVariantVars.decorOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.decor,         // A themed decoration color for regular variant.
                    ),
                }),
                
                
                
                // Final resolved decoration variables (always valid):
                ...vars({
                    /**
                     * Resolves the final decoration color based on variant priority:
                     * 1. Outlined theme override
                     * 2. Outlined theme color
                     * 3. Mild theme override
                     * 4. Mild theme color
                     * 5. Regular theme override
                     * 6. Regular theme color
                     * 7. Config fallback
                     */
                    [decorationFeatureVars.decorColor]: switchOf(
                        decorationFeatureVars.decorOutlinedCond, // 🧊 Outlined style (if active)
                        decorationFeatureVars.decorMildCond,     // 🌸 Mild style (if active)
                        decorationFeatureVars.decorRegularCond,  // 🎨 Regular style (if themed)
                        defaultDecorationColor,                  // 🛠️ Config fallback
                    ),
                }),
            });
        },
        
        decorationFeatureVars,
    } satisfies CssDecorationFeature;
};
