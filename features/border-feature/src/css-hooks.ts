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
    type CssBorderFeatureOptions,
    type CssBorderFeature,
}                           from './css-types.js'

// CSS Variables:
import {
    borderFeatureVars,
}                           from './css-internal-variables.js'

// Reusable-ui configs:
import {
    borderConfigVars,
}                           from '@reusable-ui/border-config'       // A flexible and themeable border management system for web components, utilizing CSS custom properties to enable dynamic styling and easy customization.
import {
    radiusConfigVars,
}                           from '@reusable-ui/radius-config'       // A flexible rounding system for UI components, utilizing CSS custom properties to enable dynamic styling and easy customization.

// Reusable-ui variants:
import {
    usingThemeVariant,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.
import {
    usingMildVariant,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.
import {
    usingOutlinedVariant,
}                           from '@reusable-ui/outlined-variant'    // A utility for managing visual outline consistently across React components.
import {
    usingStrippedVariant,
}                           from '@reusable-ui/stripped-variant'    // A utility for managing stripped styling (frameless, minimal layout) consistently across React components.



/**
 * Resolves the appropriate border color and geometry based on the currently active variants
 * and exposes ready-to-use CSS variables.
 * 
 * @param options An optional configuration for customizing border behavior.
 * @returns A CSS API for enabling theme-aware border styling in components.
 */
export const usingBorderFeature = (options?: CssBorderFeatureOptions): CssBorderFeature => {
    // Extract options and assign defaults:
    const {
        borderStyle                      = borderConfigVars.style,
        
        
        
        borderWidth                      = borderConfigVars.defaultWidth,
        borderInlineWidth                = borderWidth,
        borderBlockWidth                 = borderWidth,
        borderInlineStartWidth           = borderInlineWidth,
        borderInlineEndWidth             = borderInlineWidth,
        borderBlockStartWidth            = borderBlockWidth,
        borderBlockEndWidth              = borderBlockWidth,
        
        
        
        borderRadius                     = radiusConfigVars.default,
        borderStartStartRadius           = borderRadius,
        borderStartEndRadius             = borderRadius,
        borderEndStartRadius             = borderRadius,
        borderEndEndRadius               = borderRadius,
        
        
        
        borderColor : defaultBorderColor = borderConfigVars.color, // Ensures a concrete fallback to avoid invalid value.
    } = options ?? {};
    
    
    
    return {
        borderFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars    } = usingThemeVariant();
            const { mildVariantVars     } = usingMildVariant();
            const { outlinedVariantVars } = usingOutlinedVariant();
            const { strippedVariantVars } = usingStrippedVariant();
            
            
            
            return style({
                // Conditional border variables (may be poisoned):
                ...vars({
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular border color from the theme.
                     * Poisoned when theme styling is not implemented.
                     */
                    [borderFeatureVars.regularBorderCond]: switchOf(
                        themeVariantVars.regularBorderOverride, // ⚠️ Theme override (if active).
                        themeVariantVars.regularBorder,         // A themed border color for regular variant.
                    ),
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) border color when mild variant is active.
                     * Poisoned when mild variant is inactive.
                     */
                    [borderFeatureVars.mildBorderCond]: [[
                        mildVariantVars.isMild,                  // If mild variant is active.
                        switchOf(
                            themeVariantVars.mildBorderOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.mildBorder,         // A themed border color for mild variant.
                        ),
                    ]],
                    
                    
                    
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies outlined border color when outlined variant is active.
                     * Poisoned when outlined variant is inactive.
                     */
                    [borderFeatureVars.outlinedBorderCond]: [[
                        outlinedVariantVars.isOutlined,              // If outlined variant is active.
                        switchOf(
                            themeVariantVars.outlinedBorderOverride, // ⚠️ Theme override (if active).
                            themeVariantVars.outlinedBorder,         // A themed border color for outlined variant.
                        ),
                    ]],
                    
                    
                    
                    // 🧱 Stripped Layout:
                    
                    /**
                     * Applies zero-length border geometry when stripped variant is active.
                     * Poisoned when stripped variant is inactive.
                     * 
                     * Used to suppress directional border widths and radii.
                     */
                    [borderFeatureVars.borderStrippedCond]: [[
                        strippedVariantVars.isStripped,
                        '0px', // Use `0px` to avoid `calc()` errors in downstream usage.
                    ]],
                }),
                
                
                
                // Final resolved border variables (always valid):
                ...vars({
                    [borderFeatureVars.borderStyle           ] : borderStyle,
                    
                    /**
                     * 🧩 Border widths and radii resolution precedence
                     * 
                     * The final border widths and radii are resolved in a strict order:
                     * 
                     * 1. Layout overrides (e.g. Group, stacked-layout)
                     *    - Containers may collapse or merge borders/radii to maintain
                     *      composite shapes (rounded corners, separators).
                     *    - These overrides must win first, otherwise the container's
                     *      layout integrity breaks.
                     * 
                     * 2. Stripped variant
                     *    - When active, forces zero-length geometry (`0px`) to remove
                     *      framing for standalone presentation.
                     *    - Applied only if no container override is present.
                     * 
                     * 3. Base configuration
                     *    - The default border widths/radii defined by config.
                     * 
                     * 📌 Rationale:
                     * - Stripped is a component-level contract: "no framing."
                     * - Group/stacked is a container-level contract: "I control framing
                     *   for all children to preserve the composite layout."
                     * - By prioritizing layout overrides first, we ensure that stripped
                     *   components inside a Group still respect the Group's geometry,
                     *   while standalone stripped components collapse borders entirely.
                     */
                    
                    /**
                     * Resolves final border widths based on this priority:
                     * 1. Layout override (e.g. Group/stacked-layout)
                     * 2. Stripped variant → forces `0px` geometry
                     * 3. Config fallback
                     */
                    [borderFeatureVars.borderInlineStartWidth] : switchOf(
                        borderFeatureVars.borderInlineStartWidthOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderInlineStartWidth,
                    ),
                    [borderFeatureVars.borderInlineEndWidth  ] : switchOf(
                        borderFeatureVars.borderInlineEndWidthOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderInlineEndWidth,
                    ),
                    [borderFeatureVars.borderBlockStartWidth ] : switchOf(
                        borderFeatureVars.borderBlockStartWidthOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderBlockStartWidth,
                    ),
                    [borderFeatureVars.borderBlockEndWidth   ] : switchOf(
                        borderFeatureVars.borderBlockEndWidthOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderBlockEndWidth,
                    ),
                    
                    /**
                     * Resolves final border radii based on this priority:
                     * 1. Layout override (e.g. Group/stacked-layout)
                     * 2. Stripped variant → forces `0px` geometry
                     * 3. Config fallback
                     */
                    [borderFeatureVars.borderStartStartRadius] : switchOf(
                        borderFeatureVars.borderStartStartRadiusOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderStartStartRadius,
                    ),
                    [borderFeatureVars.borderStartEndRadius  ] : switchOf(
                        borderFeatureVars.borderStartEndRadiusOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderStartEndRadius,
                    ),
                    [borderFeatureVars.borderEndStartRadius  ] : switchOf(
                        borderFeatureVars.borderEndStartRadiusOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderEndStartRadius,
                    ),
                    [borderFeatureVars.borderEndEndRadius    ] : switchOf(
                        borderFeatureVars.borderEndEndRadiusOverride,
                        borderFeatureVars.borderStrippedCond,
                        borderEndEndRadius,
                    ),
                    
                    
                    
                    /**
                     * Resolves a variant-aware border color based on variant priority:
                     * 1. Outlined variant
                     * 2. Mild variant
                     * 3. Regular variant
                     * 4. Config fallback
                     */
                    [borderFeatureVars.borderVariantColor]: switchOf(
                        borderFeatureVars.outlinedBorderCond, // 🧊 Outlined variant (if active).
                        borderFeatureVars.mildBorderCond,     // 🌸 Mild variant (if active).
                        borderFeatureVars.regularBorderCond,  // 🎨 Regular variant (if themed).
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
                     * General-purpose inline border width used for layout separators or structural dividers.
                     * Not affected by stripped variant.
                     */
                    [borderFeatureVars.borderInlineBaseWidth] : borderInlineWidth,
                    
                    /**
                     * General-purpose block border width used for layout separators or structural dividers.
                     * Not affected by stripped variant.
                     */
                    [borderFeatureVars.borderBlockBaseWidth ] : borderBlockWidth,
                }),
            });
        },
        
        borderFeatureVars,
    } satisfies CssBorderFeature;
};
