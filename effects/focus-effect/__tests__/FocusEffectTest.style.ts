import { style } from '@cssfn/core'
import { usingMildVariant} from '@reusable-ui/mild-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingBoxShadowFeature } from '@reusable-ui/box-shadow-feature'
import { usingBackgroundFeature } from '@reusable-ui/background-feature'
import { usingRingFeature } from '@reusable-ui/ring-feature'
import { ringColor } from './base-colors.js'
import { usingFocusEffect } from '../dist/index.js'

// Test style for FocusEffect
// Demonstrates how `focusFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function focusEffectTestStyle() {
    // Variants:
    const {
        mildVariantRule,
    } = usingMildVariant();
    const {
        outlinedVariantRule,
    } = usingOutlinedVariant();
    
    // Features:
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usingBoxShadowFeature();
    const {
        backgroundFeatureRule,
        backgroundFeatureVars : { backgColor },
    } = usingBackgroundFeature();
    const {
        ringFeatureRule,
    } = usingRingFeature({
        ringColor : ringColor, // Default unthemed ring color.
    });
    
    // Effects:
    const {
        focusEffectRule,
    } = usingFocusEffect({
        ringWidth : '4px',
    });
    
    return style({
        // Variants:
        ...mildVariantRule(),
        ...outlinedVariantRule(),
        
        // Features:
        ...boxShadowFeatureRule(),
        ...backgroundFeatureRule(),
        ...ringFeatureRule(),
        
        // Effects:
        ...focusEffectRule(),
        
        // Apply composed variables:
        boxShadow,
        backgroundColor: backgColor,
    });
}
