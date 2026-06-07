import { style } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usingOutlineVariant } from '@reusable-ui/outline-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingRingFeature } from '../dist/index.js'

export default function ringFeatureTestStyle() {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlineVariantRule  } = usingOutlineVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { ringFeatureRule, ringFeatureVars } = usingRingFeature();
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...ringFeatureRule(),
        color: ringFeatureVars.ringColor,
    });
}
