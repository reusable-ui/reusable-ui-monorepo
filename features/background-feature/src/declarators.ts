// Cssfn:
import {
    // Cssfn css specific types:
    type CssCustomValue,
    
    
    
    // Writes css in javascript:
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
    switchOf,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type BackgroundFeatureVars,
    type CssBackgroundFeatureOptions,
    type CssBackgroundFeature,
}                           from './types.js'

// Reusable-ui variants:
import {
    usesThemeVariant,
}                           from '@reusable-ui/theme-variant'       // A utility for managing themes consistently across React components.
import {
    usesEmphasizeVariant,
}                           from '@reusable-ui/emphasize-variant'   // A utility for managing visual emphasis consistently across React components.
import {
    usesOutlineVariant,
}                           from '@reusable-ui/outline-variant'     // A utility for managing visual outline consistently across React components.
import {
    usesMildVariant,
}                           from '@reusable-ui/mild-variant'        // A utility for managing mild styling (reading friendly) consistently across React components.



/**
 * A strongly typed global mapping of background-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [backgroundFeatureVars] = cssVars<BackgroundFeatureVars>({ prefix: 'bg', minify: false });

/**
 * Resolves the appropriate background color based on the current active variants
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing background behavior.
 * @returns A CSS API for enabling theme-aware background feature styling in components.
 */
export const usesBackgroundFeature = (options?: CssBackgroundFeatureOptions): CssBackgroundFeature => {
    // Extract options and assign defaults:
    const {
        backgroundColor     : defaultBackgroundColor    = 'transparent', // Ensures a concrete fallback to avoid invalid value.
        backgroundEmphasize : emphasizedBackgroundImage = '',
        background          : customBackground,
    } = options ?? {};
    
    
    
    return {
        backgroundFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { themeVariantVars     } = usesThemeVariant();
            const { emphasizeVariantVars } = usesEmphasizeVariant();
            const { outlineVariantVars   } = usesOutlineVariant();
            const { mildVariantVars      } = usesMildVariant();
            
            
            
            return style({
                // Intermediate conditional variables:
                ...vars({
                    // 🚨 Emphasized Style:
                    
                    /**
                     * Applies gradient background image when emphasized mode is active.
                     * Poisoned if emphasized mode is inactive.
                     */
                    [backgroundFeatureVars.backgEmphasizedCond]: (
                        Array.isArray(emphasizedBackgroundImage)
                        
                        ? [[
                            emphasizeVariantVars.isEmphasized, // If emphasized mode is active.
                            ...emphasizedBackgroundImage[0],
                        ]] as CssCustomValue
                        
                        : [[
                            emphasizeVariantVars.isEmphasized, // If emphasized mode is active.
                            emphasizedBackgroundImage,
                        ]]
                    ),
                    
                    
                    
                    // 🖼️ Custom Background:
                    
                    /**
                     * Applies custom background when configured.
                     * Poisoned if no custom background is provided.
                     */
                    [backgroundFeatureVars.backgCond]: customBackground,
                    
                    
                    
                    // 🧊 Outlined Style:
                    
                    /**
                     * Applies transparent background color when outlined mode is active.
                     * Poisoned if outlined mode is inactive.
                     */
                    [backgroundFeatureVars.backgOutlinedCond]: [[
                        outlineVariantVars.isOutlined, // If outlined mode is active.
                        'transparent',                 // A transparent background color for outlined variant. 
                    ]],
                    
                    
                    
                    // 🌸 Mild Style:
                    
                    /**
                     * Applies mild (reading-friendly) background color when mild mode is active.
                     * Poisoned if mild mode is inactive.
                     */
                    [backgroundFeatureVars.backgMildCond]: [[
                        mildVariantVars.isMild,                 // If mild mode is active.
                        switchOf(
                            themeVariantVars.backgMildOverride, // ⚠️ Theme Override (if active).
                            themeVariantVars.backgMild,         // A themed background color for mild variant. 
                        ),
                    ]],
                    
                    
                    
                    // 🎨 Regular Style:
                    
                    /**
                     * Applies regular background color from the theme.
                     * Poisoned if theme styling is not implemented.
                     */
                    [backgroundFeatureVars.backgRegularCond]: switchOf(
                        themeVariantVars.backgOverride, // ⚠️ Theme Override (if active).
                        themeVariantVars.backg,         // A themed background color for regular variant. 
                    ),
                }),
                
                
                
                // Final resolved background variables:
                ...vars({
                    /**
                     * Resolves the final background color based on variant priority:
                     * 1. Outlined transparent
                     * 2. Mild theme override
                     * 3. Mild theme color
                     * 4. Regular theme override
                     * 5. Regular theme color
                     * 6. Config fallback
                     */
                    [backgroundFeatureVars.backgColor]: switchOf(
                        backgroundFeatureVars.backgOutlinedCond, // 🧊 Outlined Style (if active)
                        backgroundFeatureVars.backgMildCond,     // 🌸 Mild Style (if active)
                        backgroundFeatureVars.backgRegularCond,  // 🎨 Regular Style (if themed)
                        defaultBackgroundColor,                  // 🛠️ Config fallback
                    ),
                    
                    /**
                     * Composite background layers:
                     * - Top    : emphasized gradient
                     * - Middle : custom background
                     * - Bottom : resolved background color
                     */
                    [backgroundFeatureVars.backg]: [
                        // Top: emphasized gradient:
                        switchOf(
                            backgroundFeatureVars.backgEmphasizedCond,
                            'none',
                        ),
                        
                        // Middle: custom background:
                        switchOf(
                            backgroundFeatureVars.backgCond,
                            'none',
                        ),
                        
                        // Bottom: resolved background color:
                        backgroundFeatureVars.backgColor,
                    ],
                }),
            });
        },
        
        backgroundFeatureVars,
    } satisfies CssBackgroundFeature;
};
