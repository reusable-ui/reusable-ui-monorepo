import { style } from '@cssfn/core'

import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesDecorationFeature } from '../dist/index.js'

export default function decorationFeatureTestStyle() {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { decorationFeatureRule, decorationFeatureVars } = usesDecorationFeature();
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...decorationFeatureRule(),
        color: decorationFeatureVars.decorColor,
    });
}
