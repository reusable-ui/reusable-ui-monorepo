import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasisVariantProps, useEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { type OutlinedVariantProps, useOutlinedVariant } from '@reusable-ui/outlined-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useForegroundFeatureTestStyles } from './ForegroundFeatureTest.loader.js'

export interface ForegroundFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasisVariantProps,
        OutlinedVariantProps,
        MildVariantProps
{
}
export const ForegroundFeatureTest = (props: ForegroundFeatureTestProps) => {
    const styles = useForegroundFeatureTestStyles();
    
    const { themeClassname    } = useThemeVariant(props);
    const { emphasisClassname } = useEmphasisVariant(props);
    const { outlinedClassname } = useOutlinedVariant(props);
    const { mildClassname     } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="foreground-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasisClassname} ${outlinedClassname} ${mildClassname}`}
            >
                Foreground Feature Test
            </div>
        </div>
    );
};
