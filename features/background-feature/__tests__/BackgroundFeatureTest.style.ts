import { style } from '@cssfn/core'

import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesBackgroundFeature } from '../dist/index.js'

export default function backgroundFeatureTestStyle() {
    const { themeVariantRule     } = usesThemeVariant();
    const { emphasizeVariantRule } = usesEmphasizeVariant();
    const { outlineVariantRule   } = usesOutlineVariant();
    const { mildVariantRule      } = usesMildVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']]
    });
    return style({
        ...themeVariantRule(),
        ...emphasizeVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
}
