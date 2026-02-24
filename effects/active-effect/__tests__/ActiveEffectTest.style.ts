import { style } from '@cssfn/core'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant} from '@reusable-ui/mild-variant'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesBackgroundFeature } from '@reusable-ui/background-feature';
import { usesActiveEffect } from '../dist/index.js'

// Test style for ActiveEffect
// Demonstrates how `activeFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function activeEffectTestStyle() {
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
        activeEffectRule,
    } = usesActiveEffect({
        activeBrightness : 0.8,
        activeContrast   : 1,
        activeSaturate   : 1,
    });
    
    return style({
        // Variants:
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Features:
        ...filterFeatureRule(),
        ...backgroundFeatureRule(),
        
        // Effects:
        ...activeEffectRule(),
        
        // Apply composed variables:
        filter,
        backgroundColor: backgColor,
    });
}
