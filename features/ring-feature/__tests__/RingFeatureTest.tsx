import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizedVariantProps, useEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { type OutlinedVariantProps, useOutlinedVariant } from '@reusable-ui/outlined-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useRingFeatureTestStyles } from './RingFeatureTest.loader.js'

export interface RingFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizedVariantProps,
        MildVariantProps,
        OutlinedVariantProps
{
}
export const RingFeatureTest = (props: RingFeatureTestProps) => {
    const styles = useRingFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizedVariant(props);
    const { mildClassname       } = useMildVariant(props);
    const { outlinedClassname   } = useOutlinedVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="ring-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizedClassname} ${mildClassname} ${outlinedClassname}`}
            >
                Ring Feature Test
            </div>
        </div>
    );
};
