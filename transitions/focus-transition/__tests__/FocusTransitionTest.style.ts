import { style } from '@cssfn/core'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant} from '@reusable-ui/mild-variant'
import { usesBoxShadowFeature } from '@reusable-ui/box-shadow-feature'
import { usesBackgroundFeature } from '@reusable-ui/background-feature'
import { usesRingFeature } from '@reusable-ui/ring-feature'
import { ringColor } from './base-colors.js'
import { usesFocusTransition } from '../dist/index.js'

// Test style for FocusTransition
// Demonstrates how `focusFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function focusTransitionTestStyle() {
    // Variants:
    const {
        outlineVariantRule,
    } = usesOutlineVariant();
    const {
        mildVariantRule,
    } = usesMildVariant();
    
    // Features:
    const {
        boxShadowFeatureRule,
        boxShadowFeatureVars: { boxShadow },
    } = usesBoxShadowFeature();
    const {
        backgroundFeatureRule,
        backgroundFeatureVars : { backgColor },
    } = usesBackgroundFeature();
    const {
        ringFeatureRule,
    } = usesRingFeature({
        ringColor : ringColor, // Default unthemed ring color.
    });
    
    // Transitions:
    const {
        focusTransitionRule,
    } = usesFocusTransition({
        focusRingWidth : '4px',
    });
    
    return style({
        // Variants:
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Features:
        ...boxShadowFeatureRule(),
        ...backgroundFeatureRule(),
        ...ringFeatureRule(),
        
        // Transitions:
        ...focusTransitionRule(),
        
        // Apply composed variables:
        boxShadow,
        backgroundColor: backgColor,
    });
}
