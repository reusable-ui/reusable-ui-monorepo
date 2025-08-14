import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizeVariantProps, useEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBorderFeatureTestStyles } from './BorderFeatureTest.loader.js'

export interface BorderFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizeVariantProps,
        OutlineVariantProps,
        MildVariantProps
{
}
export const BorderFeatureTest = (props: BorderFeatureTestProps) => {
    const styles = useBorderFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizeVariant(props);
    const { outlinedClassname   } = useOutlineVariant(props);
    const { mildClassname       } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="border-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizedClassname} ${outlinedClassname} ${mildClassname}`}
            >
                Border Feature Test
            </div>
        </div>
    );
};
