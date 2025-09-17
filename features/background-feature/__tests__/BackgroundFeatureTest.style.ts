import { style, scope } from '@cssfn/core'

import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { usesEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { usesOutlineVariant } from '@reusable-ui/outline-variant'
import { usesMildVariant } from '@reusable-ui/mild-variant'
import { usesBareVariant } from '@reusable-ui/bare-variant'
import { usesBackgroundFeature } from '../dist/index.js'

const backgroundNoCustomStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']]
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundSimpleCustomStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : 'linear-gradient(0deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1)) border-box',
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundSingleCustomStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : ['linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)) content-box'],
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundSingleImportantCustomStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : ['linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)) content-box', '!important'],
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundMultipleCustomStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
        backgroundEmphasize : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        background          : [
            ['linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1))', 'content-box'],
            ['linear-gradient(0deg, rgba(255, 0, 255, 0.1), rgba(255, 0, 255, 0.1))', 'border-box'],
        ],
    });
    return style({
        ...themeVariantRule(),
        ...emphasisVariantRule(),
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
        ...backgroundFeatureRule(),
        background: backgroundFeatureVars.backg,
    });
};

const backgroundMultipleImportantCustomStyle = () => {
    const { themeVariantRule    } = usesThemeVariant();
    const { emphasisVariantRule } = usesEmphasisVariant();
    const { outlineVariantRule  } = usesOutlineVariant();
    const { mildVariantRule     } = usesMildVariant();
    const { bareVariantRule     } = usesBareVariant();
    const { backgroundFeatureRule, backgroundFeatureVars } = usesBackgroundFeature({
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
        ...outlineVariantRule(),
        ...mildVariantRule(),
        ...bareVariantRule(),
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
