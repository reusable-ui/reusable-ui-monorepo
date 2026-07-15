import { style } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingForegroundFeature } from '../dist/index.js'

export default function foregroundFeatureTestStyle() {
    const { themeVariantRule      } = usingThemeVariant();
    const { emphasizedVariantRule } = usingEmphasizedVariant();
    const { mildVariantRule       } = usingMildVariant();
    const { outlinedVariantRule   } = usingOutlinedVariant();
    const { foregroundFeatureRule, foregroundFeatureVars } = usingForegroundFeature();
    return style({
        ...themeVariantRule(),
        ...emphasizedVariantRule(),
        ...mildVariantRule(),
        ...outlinedVariantRule(),
        ...foregroundFeatureRule(),
        color: foregroundFeatureVars.foregColor,
    });
}
