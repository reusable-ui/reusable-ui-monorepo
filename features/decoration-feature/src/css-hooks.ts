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
    type CssDecorationFeatureOptions,
    type CssDecorationFeature,
}                           from './css-types.js'

// CSS Variables:
import {
    decorationFeatureVars,
}                           from './css-internal-variables.js'

// Reusable-ui variants:
import {
    usingThemeVariant,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.
import {
    usingOutlinedVariant,
}                           from '@reusable-ui/outlined-variant'    // A utility for managing visual outline consistently across React components.
import {
    usingMildVariant,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.



/**
 * Resolves the appropriate decoration color based on the currently active variants
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing decoration behavior.
 * @returns A CSS API for enabling theme-aware decoration styling in components.
 */
export const usingDecorationFeature = (options?: CssDecorationFeatureOptions): CssDecorationFeature => {
    // Extract options and assign defaults:
    const {
        decorationColor : defaultDecorationColor = 'currentColor', // Ensures a concrete fallback to avoid invalid value.
    } = options ?? {};
    
    
    
    return {
        decorationFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars    } = usingThemeVariant();
            const { outlinedVariantVars } = usingOutlinedVariant();
            const { mildVariantVars     } = usingMildVariant();
            
            
            
            return style({
                // Conditional decoration variables (may be poisoned):
                ...vars({
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular decoration color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [decorationFeatureVars.regularDecorCond]: switchOf(
                        themeVariantVars.regularDecorOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.regularDecor,         // A themed decoration color for regular variant.
                    ),
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) decoration color when mild variant is active.
                     * Poisoned when mild variant is inactive.
                     */
                    [decorationFeatureVars.mildDecorCond]: [[
                        mildVariantVars.isMild,                 // If mild variant is active.
                        switchOf(
                            themeVariantVars.mildDecorOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.mildDecor,         // A themed decoration color for mild variant.
                        ),
                    ]],
                    
                    
                    
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies outlined decoration color when outlined variant is active.
                     * Poisoned when outlined variant is inactive.
                     */
                    [decorationFeatureVars.outlinedDecorCond]: [[
                        outlinedVariantVars.isOutlined,             // If outlined variant is active.
                        switchOf(
                            themeVariantVars.outlinedDecorOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.outlinedDecor,         // A themed decoration color for outlined variant.
                        ),
                    ]],
                }),
                
                
                
                // Final resolved decoration variables (always valid):
                ...vars({
                    /**
                     * Resolves a variant-aware decoration color based on variant priority:
                     * 1. Outlined variant
                     * 2. Mild variant
                     * 3. Regular variant
                     * 4. Config fallback
                     */
                    [decorationFeatureVars.decorVariantColor]: switchOf(
                        decorationFeatureVars.outlinedDecorCond, // 🧊 Outlined variant (if active).
                        decorationFeatureVars.mildDecorCond,     // 🌸 Mild variant (if active).
                        decorationFeatureVars.regularDecorCond,  // 🎨 Regular variant (if themed).
                        defaultDecorationColor,                  // 🛠️ Config fallback.
                    ),
                    
                    /**
                     * Resolves a final decoration color:
                     * 1. User override color
                     * 2. Variant-aware color
                     */
                    [decorationFeatureVars.decorColor]: switchOf(
                        decorationFeatureVars.decorColorOverride, // ⚠️ User override (if active).
                        decorationFeatureVars.decorVariantColor,  // 🧩 Variant-aware fallback.
                    ),
                }),
            });
        },
        
        decorationFeatureVars,
    } satisfies CssDecorationFeature;
};
