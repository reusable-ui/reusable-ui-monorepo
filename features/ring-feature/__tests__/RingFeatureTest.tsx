import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasisVariantProps, useEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useRingFeatureTestStyles } from './RingFeatureTest.loader.js'

export interface RingFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasisVariantProps,
        OutlineVariantProps,
        MildVariantProps
{
}
export const RingFeatureTest = (props: RingFeatureTestProps) => {
    const styles = useRingFeatureTestStyles();
    
    const { themeClassname    } = useThemeVariant(props);
    const { emphasisClassname } = useEmphasisVariant(props);
    const { outlineClassname  } = useOutlineVariant(props);
    const { mildClassname     } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="ring-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasisClassname} ${outlineClassname} ${mildClassname}`}
            >
                Ring Feature Test
            </div>
        </div>
    );
};
