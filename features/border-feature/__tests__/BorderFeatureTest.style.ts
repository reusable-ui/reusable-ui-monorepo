import { style } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingStrippedVariant } from '@reusable-ui/stripped-variant'
import { usingBorderFeature } from '../dist/index.js'

export default function borderFeatureTestStyle() {
    const { themeVariantRule      } = usingThemeVariant();
    const { emphasizedVariantRule } = usingEmphasizedVariant();
    const { mildVariantRule       } = usingMildVariant();
    const { outlinedVariantRule   } = usingOutlinedVariant();
    const { strippedVariantRule   } = usingStrippedVariant();
    const { borderFeatureRule, borderFeatureVars } = usingBorderFeature();
    return style({
        ...themeVariantRule(),
        ...emphasizedVariantRule(),
        ...mildVariantRule(),
        ...outlinedVariantRule(),
        ...strippedVariantRule(),
        ...borderFeatureRule(),
        borderColor: borderFeatureVars.borderColor,
        borderStyle: 'solid',
        borderWidth: '8px',
    });
}
