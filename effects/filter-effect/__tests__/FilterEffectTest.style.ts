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
        }),
    });
}
