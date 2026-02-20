import { style, switchOf } from '@cssfn/core'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant} from '@reusable-ui/mild-variant'
import { usesFilterFeature } from '@reusable-ui/filter-feature';
import { usesBackgroundFeature } from '@reusable-ui/background-feature';
import { usesHoverTransition } from '../dist/index.js'

// Test style for HoverTransition
// Demonstrates how `hoverFactorCond` drives transition effects
// with simplified static colors for easier testing.
export default function hoverTransitionTestStyle() {
    // Variants:
    const {
        outlineVariantRule,
    } = usesOutlineVariant();
    const {
        mildVariantRule,
    } = usesMildVariant();
    
    // Features:
    const {
        filterFeatureRule,
        filterFeatureVars: { filter },
    } = usesFilterFeature();
    const {
        backgroundFeatureRule,
        backgroundFeatureVars : { backgColor },
    } = usesBackgroundFeature();
    
    // Transitions:
    const {
        hoverTransitionRule,
        hoverTransitionVars : { hoverTextDecoration },
    } = usesHoverTransition({
        hoverOpacity        : 0.5,
        hoverBrightness     : 1.15,
        hoverContrast       : 1,
        hoverSaturate       : 1.2,
        hoverTextDecoration : 'underline',
    });
    
    return style({
        // Variants:
        ...outlineVariantRule(),
        ...mildVariantRule(),
        
        // Features:
        ...filterFeatureRule(),
        ...backgroundFeatureRule(),
        
        // Transitions:
        ...hoverTransitionRule(),
        
        // Apply composed variables:
        filter,
        backgroundColor: backgColor,
        textDecoration : switchOf(hoverTextDecoration, 'none'),
    });
}
