import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasisVariantProps, useEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { type StrippedVariantProps, useStrippedVariant } from '@reusable-ui/stripped-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBackgroundFeatureTestStyles } from './BackgroundFeatureTest.loader.js'

export interface BackgroundFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasisVariantProps,
        OutlineVariantProps,
        MildVariantProps,
        StrippedVariantProps
{
    backgCustom ?: keyof ReturnType<typeof useBackgroundFeatureTestStyles>
}
export const BackgroundFeatureTest = (props: BackgroundFeatureTestProps) => {
    const {
        backgCustom = 'backgroundNoCustomStyle',
    } = props;
    
    const styles = useBackgroundFeatureTestStyles();
    
    const { themeClassname    } = useThemeVariant(props);
    const { emphasisClassname } = useEmphasisVariant(props);
    const { outlineClassname  } = useOutlineVariant(props);
    const { mildClassname     } = useMildVariant(props);
    const { strippedClassname } = useStrippedVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="background-feature-test"
                className={`${styles[backgCustom]} ${themeClassname} ${emphasisClassname} ${outlineClassname} ${mildClassname} ${strippedClassname}`}
            >
                Background Feature Test
            </div>
        </div>
    );
};
