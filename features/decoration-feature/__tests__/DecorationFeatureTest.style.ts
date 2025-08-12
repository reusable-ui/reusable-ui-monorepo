import { style } from '@cssfn/core'

import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesDecorationFeature } from '../dist/index.js'

export default function decorationFeatureTestStyle() {
    const { themeVariantRule     } = usesThemeVariant();
    const { emphasizeVariantRule } = usesEmphasizeVariant();
    const { outlineVariantRule   } = usesOutlineVariant();
    const { mildVariantRule      } = usesMildVariant();
    const { decorationFeatureRule, decorationFeatureVars } = usesDecorationFeature();
    return style({
        ...themeVariantRule(),
        ...emphasizeVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...decorationFeatureRule(),
        color: decorationFeatureVars.decorColor,
    });
}
