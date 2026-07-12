import { style } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingDecorationFeature } from '../dist/index.js'

export default function decorationFeatureTestStyle() {
    const { themeVariantRule      } = usingThemeVariant();
    const { emphasizedVariantRule } = usingEmphasizedVariant();
    const { outlinedVariantRule   } = usingOutlinedVariant();
    const { mildVariantRule       } = usingMildVariant();
    const { decorationFeatureRule, decorationFeatureVars } = usingDecorationFeature();
    return style({
        ...themeVariantRule(),
        ...emphasizedVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...decorationFeatureRule(),
        color: decorationFeatureVars.decorColor,
    });
}
