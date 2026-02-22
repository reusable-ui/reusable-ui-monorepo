import { style, switchOf } from '@cssfn/core'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant} from '@reusable-ui/mild-variant'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesBackgroundFeature } from '@reusable-ui/background-feature';
import { usesHoverEffect } from '../dist/index.js'

// Test style for HoverEffect
// Demonstrates how `hoverFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function hoverEffectTestStyle() {
    // Variants:
    const {
        outlineVariantRule,
    } = usesOutlineVariant();
    const {
        mildVariantRule,
    } = usesMildVariant();
    
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    const {
        backgroundFeatureRule,
        backgroundFeatureVars : { backgColor },
    } = usesBackgroundFeature();
    
    // Effects:
    const {
        hoverEffectRule,
        hoverEffectVars : { hoverTextDecoration },
    } = usesHoverEffect({
        hoverOpacity        : 0.5,
        hoverBrightness     : 1.15,
        hoverContrast       : 1,
        hoverSaturate       : 1.2,
        hoverTextDecoration : 'underline',
    });
    
    return style({
        // Variants:
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Features:
        ...filterFeatureRule(),
        ...backgroundFeatureRule(),
        
        // Effects:
        ...hoverEffectRule(),
        
        // Apply composed variables:
        filter,
        backgroundColor: backgColor,
        textDecoration : switchOf(hoverTextDecoration, 'none'),
    });
}
