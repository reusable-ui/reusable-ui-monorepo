import { style } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingForegroundFeature } from '../dist/index.js'

export default function foregroundFeatureTestStyle() {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlinedVariantRule } = usingOutlinedVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { foregroundFeatureRule, foregroundFeatureVars } = usingForegroundFeature();
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...foregroundFeatureRule(),
        color: foregroundFeatureVars.foregColor,
    });
}
