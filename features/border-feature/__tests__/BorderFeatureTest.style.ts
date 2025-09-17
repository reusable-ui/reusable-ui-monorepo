import { style } from '@cssfn/core'

import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesBareVariant } from '@reusable-ui/bare-variant'
import { usesBorderFeature } from '../dist/index.js'

export default function borderFeatureTestStyle() {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    const { borderFeatureRule, borderFeatureVars } = usesBorderFeature();
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
