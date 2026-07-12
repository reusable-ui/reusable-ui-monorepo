import { style, scope } from '@cssfn/core'

import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { usingEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usingOutlinedVariant } from '@reusable-ui/outlined-variant'
import { usingMildVariant } from '@reusable-ui/mild-variant'
import { usingStrippedVariant } from '@reusable-ui/stripped-variant'
import { usingBackgroundFeature } from '../dist/index.js'

const backgroundNoCustomStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlinedVariantRule } = usingOutlinedVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { strippedVariantRule } = usingStrippedVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']]
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...strippedVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundSimpleCustomStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlinedVariantRule } = usingOutlinedVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { strippedVariantRule } = usingStrippedVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : 'linear-gradient(0deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1)) border-box',
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...strippedVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundSingleCustomStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlinedVariantRule } = usingOutlinedVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { strippedVariantRule } = usingStrippedVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : ['linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)) content-box'],
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...strippedVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundSingleImportantCustomStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlinedVariantRule } = usingOutlinedVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { strippedVariantRule } = usingStrippedVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : ['linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)) content-box', '!important'],
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...strippedVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundMultipleCustomStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlinedVariantRule } = usingOutlinedVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { strippedVariantRule } = usingStrippedVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : [
            ['linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1))', 'content-box'],
            ['linear-gradient(0deg, rgba(255, 0, 255, 0.1), rgba(255, 0, 255, 0.1))', 'border-box'],
        ],
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...strippedVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundMultipleImportantCustomStyle = () => {
    const { themeVariantRule    } = usingThemeVariant();
    const { emphasisVariantRule } = usingEmphasisVariant();
    const { outlinedVariantRule } = usingOutlinedVariant();
    const { mildVariantRule     } = usingMildVariant();
    const { strippedVariantRule } = usingStrippedVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usingBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : [
            ['linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1))', 'content-box'],
            ['linear-gradient(0deg, rgba(255, 0, 255, 0.1), rgba(255, 0, 255, 0.1))', 'border-box'],
            '!important',
        ],
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlinedVariantRule(),
        ...mildVariantRule(),
        ...strippedVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

export default [
    scope('backgroundNoCustomStyle', backgroundNoCustomStyle),
    scope('backgroundSimpleCustomStyle', backgroundSimpleCustomStyle),
    scope('backgroundSingleCustomStyle', backgroundSingleCustomStyle),
    scope('backgroundSingleImportantCustomStyle', backgroundSingleImportantCustomStyle),
    scope('backgroundMultipleCustomStyle', backgroundMultipleCustomStyle),
    scope('backgroundMultipleImportantCustomStyle', backgroundMultipleImportantCustomStyle),
];
