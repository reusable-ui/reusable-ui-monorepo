import { style } from '@cssfn/core'
import { composeFilterEffect } from '../dist/index.js'
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

// Test style for FilterEffect
// Demonstrates how `activeFactor` drives transition effects
// with simplified static colors for easier testing.
export default function filterEffectReversedTestStyle() {
    return style({
        backgroundColor: 'lightblue',
        color: 'darkblue',
        borderColor: 'darkblue',
        
        // Apply filter-based effects driven by a test factor:
        filter : composeFilterEffect('var(--activeFactor)', {
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
        }),
    });
}
