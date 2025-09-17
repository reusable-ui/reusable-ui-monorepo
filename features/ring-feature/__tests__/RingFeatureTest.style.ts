import { style } from '@cssfn/core'

import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesRingFeature } from '../dist/index.js'

export default function ringFeatureTestStyle() {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { ringFeatureRule, ringFeatureVars } = usesRingFeature();
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...ringFeatureRule(),
        color: ringFeatureVars.ringColor,
    });
}
