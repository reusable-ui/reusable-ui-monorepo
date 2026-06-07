import { style } from '@cssfn/core'
import { usingFilterFeature } from '@reusable-ui/filter-feature';
import { usingTransformFeature } from '@reusable-ui/transform-feature';
import { usingExciteEffect } from '../dist/index.js'
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
    activeTargetScale,
} from './effect-intents.js'

// Test style for ExciteEffect
// Demonstrates how `exciteFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function exciteEffectTestStyle() {
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usingFilterFeature();
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usingTransformFeature();
    
    // Effects:
    const {
        exciteEffectRule,
    } = usingExciteEffect({
        enablesReverseIntent : false,
        opacity              : activeTargetOpacity,
        invert               : activeTargetInvert,
        sepia                : activeTargetSepia,
        brightness           : activeTargetBrightness,
        contrast             : activeTargetContrast,
        saturate             : activeTargetSaturate,
        hueRotate            : `${activeTargetHueRotate}deg`,
        blur                 : `${activeTargetBlur}px`,
        dropShadow           : {
            offsetX          : `${activeTargetDropShadow.offsetX}px`,
            offsetY          : `${activeTargetDropShadow.offsetY}px`,
            blur             : `${activeTargetDropShadow.blur}px`,
            color            : activeTargetDropShadow.color,
        },
        scale                : activeTargetScale,
    });
    
    return style({
        backgroundColor: 'lightblue',
        color: 'darkblue',
        borderColor: 'darkblue',
        
        // Features:
        ...filterFeatureRule(),
        ...transformFeatureRule(),
        
        // Effects:
        ...exciteEffectRule(),
        
        // Apply composed variables:
        filter,
        transform,
    });
}
