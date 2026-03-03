import { style, switchOf } from '@cssfn/core'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesHoverEffect } from '../dist/index.js'
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

// Test style for HoverEffect
// Demonstrates how `hoverFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function hoverEffectTestStyle() {
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
        textDecoration       : 'underline',
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
        textDecoration : switchOf(hoverTextDecoration, 'none'),
    });
}
