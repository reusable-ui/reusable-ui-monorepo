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
    type BorderFeatureVars,
    type CssBorderFeatureOptions,
    type CssBorderFeature,
}                           from './types.js'

// Reusable-ui configs:
import {
    borderVars,
    borderRadiusVars,
}                           from '@reusable-ui/borders'             // A flexible and themeable border management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.

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
import {
    usesBareVariant,
}                           from '@reusable-ui/bare-variant'        // A utility for managing bare styling (frameless, minimal layout) consistently across React components.



/**
 * A strongly typed global mapping of border-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [borderFeatureVars] = cssVars<BorderFeatureVars>({ prefix: 'bd', minify: false });

/**
 * Resolves the appropriate border color and geometry based on the currently active variants
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing border behavior.
 * @returns A CSS API for enabling theme-aware border styling in components.
 */
export const usesBorderFeature = (options?: CssBorderFeatureOptions): CssBorderFeature => {
    // Extract options and assign defaults:
    const {
        borderStyle                      = borderVars.style,
        
        
        
        borderWidth                      = borderVars.defaultWidth,
        borderInlineStartWidth           = borderWidth,
        borderInlineEndWidth             = borderWidth,
        borderBlockStartWidth            = borderWidth,
        borderBlockEndWidth              = borderWidth,
        
        
        
        borderRadius                     = borderRadiusVars.default,
        borderStartStartRadius           = borderRadius,
        borderStartEndRadius             = borderRadius,
        borderEndStartRadius             = borderRadius,
        borderEndEndRadius               = borderRadius,
        
        
        
        borderColor : defaultBorderColor = borderVars.color, // Ensures a concrete fallback to avoid invalid value.
    } = options ?? {};
    
    
    
    return {
        borderFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars   } = usesThemeVariant();
            const { outlineVariantVars } = usesOutlineVariant();
            const { mildVariantVars    } = usesMildVariant();
            const { bareVariantVars    } = usesBareVariant();
            
            
            
            return style({
                // Conditional border variables (may be poisoned):
                ...vars({
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies outlined border color when outlined mode is active.
                     * Poisoned when outlined mode is inactive.
                     */
                    [borderFeatureVars.borderOutlinedCond]: [[
                        outlineVariantVars.isOutlined,               // If outlined mode is active.
                        switchOf(
                            themeVariantVars.borderOutlinedOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.borderOutlined,         // A themed border color for outlined variant.
                        ),
                    ]],
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) border color when mild mode is active.
                     * Poisoned when mild mode is inactive.
                     */
                    [borderFeatureVars.borderMildCond]: [[
                        mildVariantVars.isMild,                  // If mild mode is active.
                        switchOf(
                            themeVariantVars.borderMildOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.borderMild,         // A themed border color for mild variant.
                        ),
                    ]],
                    
                    
                    
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular border color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [borderFeatureVars.borderRegularCond]: switchOf(
                        themeVariantVars.borderOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.border,         // A themed border color for regular variant.
                    ),
                    
                    
                    
                    // 🧱 Bare Layout:
                    
                    /**
                     * Applies zero-length border geometry when bare mode is active.
                     * Poisoned when bare mode is inactive.
                     * 
                     * Used to suppress directional border widths and radii.
                     */
                    [borderFeatureVars.borderBareCond]: [[
                        bareVariantVars.isBare,
                        '0px', // Use `0px` to avoid `calc()` errors in downstream usage.
                    ]],
                }),
                
                
                
                // Final resolved border variables (always valid):
                ...vars({
                    [borderFeatureVars.borderStyle           ] : borderStyle,
                    
                    [borderFeatureVars.borderInlineStartWidth] : switchOf(borderFeatureVars.borderBareCond, borderInlineStartWidth),
                    [borderFeatureVars.borderInlineEndWidth  ] : switchOf(borderFeatureVars.borderBareCond, borderInlineEndWidth),
                    [borderFeatureVars.borderBlockStartWidth ] : switchOf(borderFeatureVars.borderBareCond, borderBlockStartWidth),
                    [borderFeatureVars.borderBlockEndWidth   ] : switchOf(borderFeatureVars.borderBareCond, borderBlockEndWidth),
                    
                    [borderFeatureVars.borderStartStartRadius] : switchOf(borderFeatureVars.borderBareCond, borderStartStartRadius),
                    [borderFeatureVars.borderStartEndRadius  ] : switchOf(borderFeatureVars.borderBareCond, borderStartEndRadius),
                    [borderFeatureVars.borderEndStartRadius  ] : switchOf(borderFeatureVars.borderBareCond, borderEndStartRadius),
                    [borderFeatureVars.borderEndEndRadius    ] : switchOf(borderFeatureVars.borderBareCond, borderEndEndRadius),
                    
                    
                    
                    /**
                     * Resolves the final border color based on variant priority:
                     * 1. Outlined theme override
                     * 2. Outlined theme color
                     * 3. Mild theme override
                     * 4. Mild theme color
                     * 5. Regular theme override
                     * 6. Regular theme color
                     * 7. Config fallback
                     */
                    [borderFeatureVars.borderColor]: switchOf(
                        borderFeatureVars.borderOutlinedCond, // 🧊 Outlined style (if active)
                        borderFeatureVars.borderMildCond,     // 🌸 Mild style (if active)
                        borderFeatureVars.borderRegularCond,  // 🎨 Regular style (if themed)
                        defaultBorderColor,                   // 🛠️ Config fallback
                    ),
                    
                    
                    
                    /**
                     * General-purpose border width used for layout separators or structural dividers.
                     * Not affected by bare mode.
                     */
                    [borderFeatureVars.borderBaseWidth]: borderWidth,
                }),
            });
        },
        
        borderFeatureVars,
    } satisfies CssBorderFeature;
};
