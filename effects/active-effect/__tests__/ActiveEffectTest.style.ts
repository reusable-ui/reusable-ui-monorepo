import { style } from '@cssfn/core'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingMildVariant} from '@reusable-ui/mild-variant'
import { usingFilterFeature } from '@reusable-ui/filter-feature';
import { usingBackgroundFeature } from '@reusable-ui/background-feature';
import { usingActiveEffect } from '../dist/index.js'
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
        outlinedVariantRule,
    } = usingOutlinedVariant();
    const {
        mildVariantRule,
    } = usingMildVariant();
    
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usingFilterFeature();
    const {
        backgroundFeatureRule,
        backgroundFeatureVars : { backgColor },
    } = usingBackgroundFeature();
    
    // Effects:
    const {
        activeEffectRule,
    } = usingActiveEffect({
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
        ...outlinedVariantRule(),
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
