import { style, switchOf } from '@cssfn/core'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesDisabledEffect } from '../dist/index.js'
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

// Test style for DisabledEffect
// Demonstrates how `disableFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function disabledEffectTestStyle() {
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    
    // Effects:
    const {
        disabledEffectRule,
        disabledEffectVars : { disabledCursor },
    } = usesDisabledEffect({
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
        cursor               : 'not-allowed',
    });
    
    return style({
        backgroundColor: 'lightblue',
        color: 'darkblue',
        borderColor: 'darkblue',
        
        // Features:
        ...filterFeatureRule(),
        
        // Effects:
        ...disabledEffectRule(),
        
        // Apply composed variables:
        filter,
        cursor : switchOf(disabledCursor, 'pointer'),
    });
}
