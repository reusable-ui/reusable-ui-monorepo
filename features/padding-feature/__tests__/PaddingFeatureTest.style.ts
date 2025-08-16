import { style } from '@cssfn/core'

import { usesBareVariant } from '@reusable-ui/bare-variant'
import { usesPaddingFeature } from '../dist/index.js'

export default function paddingFeatureTestStyle() {
    const { bareVariantRule } = usesBareVariant();
    const {
        paddingFeatureRule,
        paddingFeatureVars: {
            paddingInlineStart,
            paddingInlineEnd,
            paddingBlockStart,
            paddingBlockEnd,
        }
    } = usesPaddingFeature();
    return style({
        ...bareVariantRule(),
        ...paddingFeatureRule(),
        paddingInlineStart,
        paddingInlineEnd,
        paddingBlockStart,
        paddingBlockEnd,
    });
}
