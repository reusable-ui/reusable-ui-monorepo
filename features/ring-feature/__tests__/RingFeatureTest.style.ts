import { style } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingRingFeature } from '../dist/index.js'

export default function ringFeatureTestStyle() {
    const { themeVariantRule      } = usingThemeVariant();
    const { emphasizedVariantRule } = usingEmphasizedVariant();
    const { mildVariantRule       } = usingMildVariant();
    const { outlinedVariantRule   } = usingOutlinedVariant();
    const { ringFeatureRule, ringFeatureVars } = usingRingFeature();
    return style({
        ...themeVariantRule(),
        ...emphasizedVariantRule(),
        ...mildVariantRule(),
        ...outlinedVariantRule(),
        ...ringFeatureRule(),
        color: ringFeatureVars.ringColor,
    });
}
