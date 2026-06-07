import { style } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usingOutlineVariant } from '@reusable-ui/outline-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingBareVariant } from '@reusable-ui/bare-variant'
import { usingBorderFeature } from '../dist/index.js'

export default function borderFeatureTestStyle() {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlineVariantRule  } = usingOutlineVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { bareVariantRule     } = usingBareVariant();
    const { borderFeatureRule, borderFeatureVars } = usingBorderFeature();
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        ...borderFeatureRule(),
        borderColor: borderFeatureVars.borderColor,
        borderStyle: 'solid',
        borderWidth: '8px',
    });
}
