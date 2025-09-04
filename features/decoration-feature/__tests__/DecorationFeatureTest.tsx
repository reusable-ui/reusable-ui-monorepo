import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizeVariantProps, useEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useDecorationFeatureTestStyles } from './DecorationFeatureTest.loader.js'

export interface DecorationFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizeVariantProps,
        OutlineVariantProps,
        MildVariantProps
{
}
export const DecorationFeatureTest = (props: DecorationFeatureTestProps) => {
    const styles = useDecorationFeatureTestStyles();
    
    const { themeClassname     } = useThemeVariant(props);
    const { emphasizeClassname } = useEmphasizeVariant(props);
    const { outlineClassname   } = useOutlineVariant(props);
    const { mildClassname      } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="decoration-feature-test"
                className={`${styles.main} ${themeClassname} ${emphasizeClassname} ${outlineClassname} ${mildClassname}`}
            >
                Decoration Feature Test
            </div>
        </div>
    );
};
