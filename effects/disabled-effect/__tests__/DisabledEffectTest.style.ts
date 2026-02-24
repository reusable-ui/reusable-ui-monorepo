import { style, switchOf } from '@cssfn/core'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant} from '@reusable-ui/mild-variant'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesBackgroundFeature } from '@reusable-ui/background-feature';
import { usesDisabledEffect } from '../dist/index.js'

// Test style for DisabledEffect
// Demonstrates how `disableFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function disabledEffectTestStyle() {
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
        disabledEffectRule,
        disabledEffectVars : { disabledCursor },
    } = usesDisabledEffect({
        disabledOpacity  : 0.3,
        disabledSaturate : 0.8,
        disabledCursor   : 'not-allowed',
    });
    
    return style({
        // Variants:
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Features:
        ...filterFeatureRule(),
        ...backgroundFeatureRule(),
        
        // Effects:
        ...disabledEffectRule(),
        
        // Apply composed variables:
        filter,
        backgroundColor: backgColor,
        cursor : switchOf(disabledCursor, 'pointer'),
    });
}
