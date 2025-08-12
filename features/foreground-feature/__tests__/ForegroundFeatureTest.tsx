import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizeVariantProps, useEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useForegroundFeatureTestStyles } from './ForegroundFeatureTest.loader.js'

export interface ForegroundFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizeVariantProps,
        OutlineVariantProps,
        MildVariantProps
{
}
export const ForegroundFeatureTest = (props: ForegroundFeatureTestProps) => {
    const styles = useForegroundFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizeVariant(props);
    const { outlinedClassname   } = useOutlineVariant(props);
    const { mildClassname       } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="foreground-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizedClassname} ${outlinedClassname} ${mildClassname}`}
            >
                Foreground Feature Test
            </div>
        </div>
    );
};
