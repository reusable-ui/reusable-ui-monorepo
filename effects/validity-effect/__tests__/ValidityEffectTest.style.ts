import { style } from '@cssfn/core'
import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingMildVariant} from '@reusable-ui/mild-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingBackgroundFeature } from '@reusable-ui/background-feature'
import { usingValidityEffect } from '../dist/index.js'

// Test style for ValidityEffect
// Demonstrates how `validityFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function validityEffectTestStyle() {
    // Variants:
    const {
        themeVariantRule,
    } = usingThemeVariant();
    const {
        mildVariantRule,
    } = usingMildVariant();
    const {
        outlinedVariantRule,
    } = usingOutlinedVariant();
    
    // Features:
    const {
        backgroundFeatureRule,
        backgroundFeatureVars : { backgColor },
    } = usingBackgroundFeature();
    
    // Effects:
    const {
        validityEffectRule,
    } = usingValidityEffect({
        validTheme   : 'success',
        invalidTheme : 'danger',
    });
    
    return style({
        // Variants:
        ...themeVariantRule(),
        ...mildVariantRule(),
        ...outlinedVariantRule(),
        
        // Features:
        ...backgroundFeatureRule(),
        
        // Effects:
        ...validityEffectRule(),
        
        // Apply composed variables:
        backgroundColor: backgColor,
    });
}
