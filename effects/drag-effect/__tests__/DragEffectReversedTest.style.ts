import { style } from '@cssfn/core'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesTransformFeature } from '@reusable-ui/transform-feature';
import { usesDragEffect } from '../dist/index.js'
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

// Test style for DragEffect
// Demonstrates how `dragFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function dragEffectReversedTestStyle() {
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    const {
        transformFeatureRule,
        transformFeatureVars: { transform },
    } = usesTransformFeature();
    
    // Effects:
    const {
        dragEffectRule,
    } = usesDragEffect({
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
        ...transformFeatureRule(),
        
        // Effects:
        ...dragEffectRule(),
        
        // Apply composed variables:
        filter,
        transform,
    });
}
