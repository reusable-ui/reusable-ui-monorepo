import { style } from '@cssfn/core'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant} from '@reusable-ui/mild-variant'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesBackgroundFeature } from '@reusable-ui/background-feature';
import { usesActiveEffect } from '../dist/index.js'
import {
    activeTargetOpacity,
    activeTargetInvert,
    activeTargetSepia,
    activeTargetBrightness,
    activeTargetContrast,
    activeTargetSaturate,
    activeTargetHueRotate,
    activeTargetBlur,
    activeTargetDropShadow,
} from './effect-intents.js'

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
        opacity     : activeTargetOpacity,
        invert      : activeTargetInvert,
        sepia       : activeTargetSepia,
        brightness  : activeTargetBrightness,
        contrast    : activeTargetContrast,
        saturate    : activeTargetSaturate,
        hueRotate   : `${activeTargetHueRotate}deg`,
        blur        : `${activeTargetBlur}px`,
        dropShadow  : {
            offsetX : `${activeTargetDropShadow.offsetX}px`,
            offsetY : `${activeTargetDropShadow.offsetY}px`,
            blur    : `${activeTargetDropShadow.blur}px`,
            color   : activeTargetDropShadow.color,
        },
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
