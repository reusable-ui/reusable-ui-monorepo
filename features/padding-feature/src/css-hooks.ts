// Cssfn:
import {
    // Writes css in javascript:
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    switchOf,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssPaddingFeatureOptions,
    type CssPaddingFeature,
}                           from './css-types.js'

// CSS Variables:
import {
    paddingFeatureVars,
}                           from './css-internal-variables.js'

// Reusable-ui configs:
import {
    spacerConfigVars,
}                           from '@reusable-ui/spacer-config'       // A flexible spacer management system for web components, utilizing CSS custom properties to enable dynamic spacing, theming, and customization.

// Reusable-ui variants:
import {
    usingStrippedVariant,
}                           from '@reusable-ui/stripped-variant'    // A utility for managing stripped styling (frameless, minimal layout) consistently across React components.



/**
 * Resolves the appropriate padding values based on active stripped mode and framework-level overrides
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing padding behavior.
 * @returns A CSS API for enabling manageable paddings in components.
 */
export const usingPaddingFeature = (options?: CssPaddingFeatureOptions): CssPaddingFeature => {
    // Extract options and assign defaults:
    const {
        padding            = spacerConfigVars.default,
        paddingInline      = padding,
        paddingBlock       = padding,
        paddingInlineStart = paddingInline,
        paddingInlineEnd   = paddingInline,
        paddingBlockStart  = paddingBlock,
        paddingBlockEnd    = paddingBlock,
    } = options ?? {};
    
    
    
    return {
        paddingFeatureRule : () => {
            // Peer variant dependencies (may be poisoned if not implemented):
            const { strippedVariantVars } = usingStrippedVariant();
            
            
            
            return style({
                // Conditional padding variables (may be poisoned):
                ...vars({
                    // 🧱 Stripped Layout:
                    
                    /**
                     * Applies zero-length padding geometry when stripped mode is active.
                     * Poisoned when stripped mode is inactive.
                     * 
                     * Used to suppress directional paddings.
                     */
                    [paddingFeatureVars.paddingStrippedCond]: [[
                        strippedVariantVars.isStripped,
                        '0px', // Use `0px` to avoid `calc()` errors in downstream usage.
                    ]],
                }),
                
                
                
                // Final resolved padding variables (always valid):
                ...vars({
                    [paddingFeatureVars.paddingInlineStart] : switchOf(paddingFeatureVars.paddingStrippedCond, paddingInlineStart),
                    [paddingFeatureVars.paddingInlineEnd  ] : switchOf(paddingFeatureVars.paddingStrippedCond, paddingInlineEnd),
                    [paddingFeatureVars.paddingBlockStart ] : switchOf(paddingFeatureVars.paddingStrippedCond, paddingBlockStart),
                    [paddingFeatureVars.paddingBlockEnd   ] : switchOf(paddingFeatureVars.paddingStrippedCond, paddingBlockEnd),
                    
                    
                    
                    /**
                     * General-purpose horizontal padding used for layout separators or structural dividers.
                     * Not affected by stripped mode.
                     */
                    [paddingFeatureVars.paddingInlineBase] : paddingInline,
                    
                    /**
                     * General-purpose vertical padding used for layout separators or structural dividers.
                     * Not affected by stripped mode.
                     */
                    [paddingFeatureVars.paddingBlockBase ] : paddingBlock,
                }),
            });
        },
        
        paddingFeatureVars,
    } satisfies CssPaddingFeature;
};
