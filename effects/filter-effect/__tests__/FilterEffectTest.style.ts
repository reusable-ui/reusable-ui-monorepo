import { style } from '@cssfn/core'
import { composeFilterEffect } from '../dist/index.js'
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

// Test style for FilterEffect
// Demonstrates how `activeFactor` drives transition effects
// with simplified static colors for easier testing.
export default function filterEffectTestStyle() {
    return style({
        backgroundColor: 'lightblue',
        color: 'darkblue',
        borderColor: 'darkblue',
        
        // Apply filter-based effects driven by a test factor:
        filter : composeFilterEffect('var(--activeFactor)', {
            enablesReverseIntent : false,
            activeOpacity        : activeTargetOpacity,
            activeInvert         : activeTargetInvert,
            activeSepia          : activeTargetSepia,
            activeBrightness     : activeTargetBrightness,
            activeContrast       : activeTargetContrast,
            activeSaturate       : activeTargetSaturate,
            activeHueRotate      : `${activeTargetHueRotate}deg`,
            activeBlur           : `${activeTargetBlur}px`,
            activeDropShadow     : {
                offsetX          : `${activeTargetDropShadow.offsetX}px`,
                offsetY          : `${activeTargetDropShadow.offsetY}px`,
                blur             : `${activeTargetDropShadow.blur}px`,
                color            : activeTargetDropShadow.color,
            },
        }),
    });
}
