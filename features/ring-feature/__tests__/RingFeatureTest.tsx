import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizeVariantProps, useEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useRingFeatureTestStyles } from './RingFeatureTest.loader.js'

export interface RingFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizeVariantProps,
        OutlineVariantProps,
        MildVariantProps
{
}
export const RingFeatureTest = (props: RingFeatureTestProps) => {
    const styles = useRingFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizeVariant(props);
    const { outlinedClassname   } = useOutlineVariant(props);
    const { mildClassname       } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="ring-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizedClassname} ${outlinedClassname} ${mildClassname}`}
            >
                Ring Feature Test
            </div>
        </div>
    );
};
