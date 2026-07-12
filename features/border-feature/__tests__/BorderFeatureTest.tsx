import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizedVariantProps, useEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { type OutlinedVariantProps, useOutlinedVariant } from '@reusable-ui/outlined-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { type StrippedVariantProps, useStrippedVariant } from '@reusable-ui/stripped-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBorderFeatureTestStyles } from './BorderFeatureTest.loader.js'

export interface BorderFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizedVariantProps,
        OutlinedVariantProps,
        MildVariantProps,
        StrippedVariantProps
{
}
export const BorderFeatureTest = (props: BorderFeatureTestProps) => {
    const styles = useBorderFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizedVariant(props);
    const { outlinedClassname   } = useOutlinedVariant(props);
    const { mildClassname       } = useMildVariant(props);
    const { strippedClassname   } = useStrippedVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="border-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizedClassname} ${outlinedClassname} ${mildClassname} ${strippedClassname}`}
            >
                Border Feature Test
            </div>
        </div>
    );
};
