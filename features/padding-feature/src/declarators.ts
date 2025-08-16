// Cssfn:
import {
    // Writes css in javascript:
    style,
    vars,
    
    
    
    // Strongly typed of css variables:
    cssVars,
    switchOf,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type PaddingFeatureVars,
    type CssPaddingFeatureOptions,
    type CssPaddingFeature,
}                           from './types.js'

// Reusable-ui configs:
import {
    spacerVars,
}                           from '@reusable-ui/spacers'         // A flexible spacer management system for web components, utilizing CSS custom properties to enable dynamic spacing, theming, and customization.

// Reusable-ui variants:
import {
    usesBareVariant,
}                           from '@reusable-ui/bare-variant'    // A utility for managing bare styling (frameless, minimal layout) consistently across React components.



/**
 * A strongly typed global mapping of padding-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [paddingFeatureVars] = cssVars<PaddingFeatureVars>({ prefix: 'pd', minify: false });

/**
 * Resolves the appropriate padding values based on active bare mode and framework-level overrides
 * and exposes ready-to-use CSS variables.
 * 
 * @param options - An optional configuration for customizing padding behavior.
 * @returns A CSS API for enabling manageable paddings in components.
 */
export const usesPaddingFeature = (options?: CssPaddingFeatureOptions): CssPaddingFeature => {
    // Extract options and assign defaults:
    const {
        padding            = spacerVars.default,
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
            const { bareVariantVars } = usesBareVariant();
            
            
            
            return style({
                // Conditional padding variables (may be poisoned):
                ...vars({
                    // 🧱 Bare Layout:
                    
                    /**
                     * Applies zero-length padding geometry when bare mode is active.
                     * Poisoned when bare mode is inactive.
                     * 
                     * Used to suppress directional paddings.
                     */
                    [paddingFeatureVars.paddingBareCond]: [[
                        bareVariantVars.isBare,
                        '0px', // Use `0px` to avoid `calc()` errors in downstream usage.
                    ]],
                }),
                
                
                
                // Final resolved padding variables (always valid):
                ...vars({
                    [paddingFeatureVars.paddingInlineStart] : switchOf(paddingFeatureVars.paddingBareCond, paddingInlineStart),
                    [paddingFeatureVars.paddingInlineEnd  ] : switchOf(paddingFeatureVars.paddingBareCond, paddingInlineEnd),
                    [paddingFeatureVars.paddingBlockStart ] : switchOf(paddingFeatureVars.paddingBareCond, paddingBlockStart),
                    [paddingFeatureVars.paddingBlockEnd   ] : switchOf(paddingFeatureVars.paddingBareCond, paddingBlockEnd),
                    
                    
                    
                    /**
                     * General-purpose horizontal padding used for layout separators or structural dividers.
                     * Not affected by bare mode.
                     */
                    [paddingFeatureVars.paddingInlineBase] : paddingInline,
                    
                    /**
                     * General-purpose vertical padding used for layout separators or structural dividers.
                     * Not affected by bare mode.
                     */
                    [paddingFeatureVars.paddingBlockBase ] : paddingBlock,
                }),
            });
        },
        
        paddingFeatureVars,
    } satisfies CssPaddingFeature;
};
