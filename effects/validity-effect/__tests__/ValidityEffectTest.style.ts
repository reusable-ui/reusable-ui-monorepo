import { style } from '@cssfn/core'
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant} from '@reusable-ui/mild-variant'
import { usesBackgroundFeature } from '@reusable-ui/background-feature'
import { usesValidityEffect } from '../dist/index.js'

// Test style for ValidityEffect
// Demonstrates how `validityFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function validityEffectTestStyle() {
    // Variants:
    const {
        themeVariantRule,
    } = usesThemeVariant();
    const {
        outlineVariantRule,
    } = usesOutlineVariant();
    const {
        mildVariantRule,
    } = usesMildVariant();
    
    // Features:
    const {
        backgroundFeatureRule,
        backgroundFeatureVars : { backgColor },
    } = usesBackgroundFeature();
    
    // Effects:
    const {
        validityEffectRule,
    } = usesValidityEffect({
        validTheme   : 'success',
        invalidTheme : 'danger',
    });
    
    return style({
        // Variants:
        ...themeVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Features:
        ...backgroundFeatureRule(),
        
        // Effects:
        ...validityEffectRule(),
        
        // Apply composed variables:
        backgroundColor: backgColor,
    });
}
