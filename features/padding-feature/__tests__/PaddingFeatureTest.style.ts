import { style } from '@cssfn/core'

import { usingStrippedVariant } from '@reusable-ui/stripped-variant'
import { usingPaddingFeature } from '../dist/index.js'

export default function paddingFeatureTestStyle() {
    const { strippedVariantRule } = usingStrippedVariant();
    const {
        paddingFeatureRule,
        paddingFeatureVars: {
            paddingInlineStart,
            paddingInlineEnd,
            paddingBlockStart,
            paddingBlockEnd,
        }
    } = usingPaddingFeature();
    return style({
        ...strippedVariantRule(),
        ...paddingFeatureRule(),
        paddingInlineStart,
        paddingInlineEnd,
        paddingBlockStart,
        paddingBlockEnd,
    });
}
