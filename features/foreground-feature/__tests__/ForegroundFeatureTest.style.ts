import { style } from '@cssfn/core'

import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesForegroundFeature } from '../dist/index.js'

export default function foregroundFeatureTestStyle() {
    const { themeVariantRule     } = usesThemeVariant();
    const { emphasizeVariantRule } = usesEmphasizeVariant();
    const { outlineVariantRule   } = usesOutlineVariant();
    const { mildVariantRule      } = usesMildVariant();
    const { foregroundFeatureRule, foregroundFeatureVars } = usesForegroundFeature();
    return style({
        ...themeVariantRule(),
        ...emphasizeVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...foregroundFeatureRule(),
        color: foregroundFeatureVars.foregColor,
    });
}
