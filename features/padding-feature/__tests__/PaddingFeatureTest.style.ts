import { style } from '@cssfn/core'

import { usingBareVariant } from '@reusable-ui/bare-variant'
import { usingPaddingFeature } from '../dist/index.js'

export default function paddingFeatureTestStyle() {
    const { bareVariantRule } = usingBareVariant();
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
        ...bareVariantRule(),
        ...paddingFeatureRule(),
        paddingInlineStart,
        paddingInlineEnd,
        paddingBlockStart,
        paddingBlockEnd,
    });
}
