import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizedVariantProps, useEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { type OutlinedVariantProps, useOutlinedVariant } from '@reusable-ui/outlined-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useDecorationFeatureTestStyles } from './DecorationFeatureTest.loader.js'

export interface DecorationFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizedVariantProps,
        OutlinedVariantProps,
        MildVariantProps
{
}
export const DecorationFeatureTest = (props: DecorationFeatureTestProps) => {
    const styles = useDecorationFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizedVariant(props);
    const { outlinedClassname   } = useOutlinedVariant(props);
    const { mildClassname       } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="decoration-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizedClassname} ${outlinedClassname} ${mildClassname}`}
            >
                Decoration Feature Test
            </div>
        </div>
    );
};
