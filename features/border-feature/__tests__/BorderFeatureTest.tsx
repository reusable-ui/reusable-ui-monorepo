import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasisVariantProps, useEmphasisVariant } from '@reusable-ui/emphasis-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { type BareVariantProps, useBareVariant } from '@reusable-ui/bare-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBorderFeatureTestStyles } from './BorderFeatureTest.loader.js'

export interface BorderFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasisVariantProps,
        OutlineVariantProps,
        MildVariantProps,
        BareVariantProps
{
}
export const BorderFeatureTest = (props: BorderFeatureTestProps) => {
    const styles = useBorderFeatureTestStyles();
    
    const { themeClassname    } = useThemeVariant(props);
    const { emphasisClassname } = useEmphasisVariant(props);
    const { outlineClassname  } = useOutlineVariant(props);
    const { mildClassname     } = useMildVariant(props);
    const { bareClassname     } = useBareVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="border-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasisClassname} ${outlineClassname} ${mildClassname} ${bareClassname}`}
            >
                Border Feature Test
            </div>
        </div>
    );
};
