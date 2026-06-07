import { style } from '@cssfn/core'
import { usingFilterFeature } from '@reusable-ui/filter-feature';
import { usingPressEffect } from '../dist/index.js'
import {
    inactiveTargetOpacity,
    inactiveTargetInvert,
    inactiveTargetSepia,
    inactiveTargetBrightness,
    inactiveTargetContrast,
    inactiveTargetSaturate,
    inactiveTargetHueRotate,
    inactiveTargetBlur,
    inactiveTargetDropShadow
} from './effect-intents.js'

// Test style for PressEffect
// Demonstrates how `pressFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function pressEffectReversedTestStyle() {
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usingFilterFeature();
    
    // Effects:
    const {
        pressEffectRule,
    } = usingPressEffect({
        enablesReverseIntent : true,
        opacity              : inactiveTargetOpacity,
        invert               : inactiveTargetInvert,
        sepia                : inactiveTargetSepia,
        brightness           : inactiveTargetBrightness,
        contrast             : inactiveTargetContrast,
        saturate             : inactiveTargetSaturate,
        hueRotate            : `${inactiveTargetHueRotate}deg`,
        blur                 : `${inactiveTargetBlur}px`,
        dropShadow           : {
            offsetX          : `${inactiveTargetDropShadow.offsetX}px`,
            offsetY          : `${inactiveTargetDropShadow.offsetY}px`,
            blur             : `${inactiveTargetDropShadow.blur}px`,
            color            : inactiveTargetDropShadow.color,
        },
    });
    
    return style({
        backgroundColor: 'lightblue',
        color: 'darkblue',
        borderColor: 'darkblue',
        
        // Features:
        ...filterFeatureRule(),
        
        // Effects:
        ...pressEffectRule(),
        
        // Apply composed variables:
        filter,
    });
}
