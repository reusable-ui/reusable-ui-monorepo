import { style, switchOf } from '@cssfn/core'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesHoverEffect } from '../dist/index.js'
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

// Test style for HoverEffect
// Demonstrates how `hoverFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function hoverEffectReversedTestStyle() {
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    
    // Effects:
    const {
        hoverEffectRule,
        hoverEffectVars : { hoverTextDecoration },
    } = usesHoverEffect({
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
        textDecoration       : 'none',
    });
    
    return style({
        backgroundColor: 'lightblue',
        color: 'darkblue',
        borderColor: 'darkblue',
        
        // Features:
        ...filterFeatureRule(),
        
        // Effects:
        ...hoverEffectRule(),
        
        // Apply composed variables:
        filter,
        textDecoration : switchOf(hoverTextDecoration, 'underline'),
    });
}
