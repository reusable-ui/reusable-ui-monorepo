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
        borderInlineWidth                = borderWidth,
        borderBlockWidth                 = borderWidth,
        borderInlineStartWidth           = borderInlineWidth,
        borderInlineEndWidth             = borderInlineWidth,
        borderBlockStartWidth            = borderBlockWidth,
        borderBlockEndWidth              = borderBlockWidth,
        
        
        
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
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular border color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [borderFeatureVars.borderRegularCond]: switchOf(
                        themeVariantVars.borderRegularOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.borderRegular,         // A themed border color for regular variant.
                    ),
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) border color when mild variant is active.
                     * Poisoned when mild variant is inactive.
                     */
                    [borderFeatureVars.borderMildCond]: [[
                        mildVariantVars.isMild,                  // If mild variant is active.
                        switchOf(
                            themeVariantVars.borderMildOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.borderMild,         // A themed border color for mild variant.
                        ),
                    ]],
                    
                    
                    
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies outlined border color when outlined variant is active.
                     * Poisoned when outlined variant is inactive.
                     */
                    [borderFeatureVars.borderOutlinedCond]: [[
                        outlineVariantVars.isOutlined,               // If outlined variant is active.
                        switchOf(
                            themeVariantVars.borderOutlinedOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.borderOutlined,         // A themed border color for outlined variant.
                        ),
                    ]],
                    
                    
                    
                    // 🧱 Bare Layout:
                    
                    /**
                     * Applies zero-length border geometry when bare variant is active.
                     * Poisoned when bare variant is inactive.
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
                     * Resolves a variant-aware border color based on variant priority:
                     * 1. Outlined variant
                     * 2. Mild variant
                     * 3. Regular variant
                     * 4. Config fallback
                     */
                    [borderFeatureVars.borderVariantColor]: switchOf(
                        borderFeatureVars.borderOutlinedCond, // 🧊 Outlined variant (if active).
                        borderFeatureVars.borderMildCond,     // 🌸 Mild variant (if active).
                        borderFeatureVars.borderRegularCond,  // 🎨 Regular variant (if themed).
                        defaultBorderColor,                   // 🛠️ Config fallback.
                    ),
                    
                    /**
                     * Resolves a final border color:
                     * 1. User override color
                     * 2. Variant-aware color
                     */
                    [borderFeatureVars.borderColor]: switchOf(
                        borderFeatureVars.borderColorOverride, // ⚠️ User override (if active).
                        borderFeatureVars.borderVariantColor,  // 🧩 Variant-aware fallback.
                    ),
                    
                    
                    
                    /**
                     * General-purpose horizontal border width used for layout separators or structural dividers.
                     * Not affected by bare variant.
                     */
                    [borderFeatureVars.borderInlineBaseWidth] : borderInlineWidth,
                    
                    /**
                     * General-purpose vertical border width used for layout separators or structural dividers.
                     * Not affected by bare variant.
                     */
                    [borderFeatureVars.borderBlockBaseWidth ] : borderBlockWidth,
                }),
            });
        },
        
        borderFeatureVars,
    } satisfies CssBorderFeature;
};
