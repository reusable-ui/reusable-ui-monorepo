import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizeVariantProps, useEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBackgroundFeatureTestStyles } from './BackgroundFeatureTest.loader.js'

export interface BackgroundFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizeVariantProps,
        OutlineVariantProps,
        MildVariantProps
{
}
export const BackgroundFeatureTest = (props: BackgroundFeatureTestProps) => {
    const styles = useBackgroundFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizeVariant(props);
    const { outlinedClassname   } = useOutlineVariant(props);
    const { mildClassname       } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="background-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizedClassname} ${outlinedClassname} ${mildClassname}`}
            >
                Background Feature Test
            </div>
        </div>
    );
};
