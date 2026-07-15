import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizedVariantProps, useEmphasizedVariant } from '@reusable-ui/emphasized-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { type OutlinedVariantProps, useOutlinedVariant } from '@reusable-ui/outlined-variant'
import { type StrippedVariantProps, useStrippedVariant } from '@reusable-ui/stripped-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBackgroundFeatureTestStyles } from './BackgroundFeatureTest.loader.js'

export interface BackgroundFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizedVariantProps,
        MildVariantProps,
        OutlinedVariantProps,
        StrippedVariantProps
{
    backgCustom ?: keyof ReturnType<typeof useBackgroundFeatureTestStyles>
}
export const BackgroundFeatureTest = (props: BackgroundFeatureTestProps) => {
    const {
        backgCustom = 'backgroundNoCustomStyle',
    } = props;
    
    const styles = useBackgroundFeatureTestStyles();
    
    const { themeClassname      } = useThemeVariant(props);
    const { emphasizedClassname } = useEmphasizedVariant(props);
    const { mildClassname       } = useMildVariant(props);
    const { outlinedClassname   } = useOutlinedVariant(props);
    const { strippedClassname   } = useStrippedVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="background-feature-test"
                className={`${styles[backgCustom]} ${themeClassname} ${emphasizedClassname} ${mildClassname} ${outlinedClassname} ${strippedClassname}`}
            >
                Background Feature Test
            </div>
        </div>
    );
};
