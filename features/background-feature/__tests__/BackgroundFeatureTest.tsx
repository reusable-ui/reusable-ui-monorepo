import React from 'react'
import { type ThemeVariantProps, useThemeVariant } from '@reusable-ui/theme-variant'
import { type EmphasizeVariantProps, useEmphasizeVariant } from '@reusable-ui/emphasize-variant'
import { type OutlineVariantProps, useOutlineVariant } from '@reusable-ui/outline-variant'
import { type MildVariantProps, useMildVariant } from '@reusable-ui/mild-variant'
import { type BareVariantProps, useBareVariant } from '@reusable-ui/bare-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBackgroundFeatureTestStyles } from './BackgroundFeatureTest.loader.js'

export interface BackgroundFeatureTestProps
    extends
        ThemeVariantProps,
        EmphasizeVariantProps,
        OutlineVariantProps,
        MildVariantProps,
        BareVariantProps
{
    backgCustom ?: keyof ReturnType<typeof useBackgroundFeatureTestStyles>
}
export const BackgroundFeatureTest = (props: BackgroundFeatureTestProps) => {
    const {
        backgCustom = 'backgroundNoCustomStyle',
    } = props;
    
    const styles = useBackgroundFeatureTestStyles();
    
    const { themeClassname     } = useThemeVariant(props);
    const { emphasizeClassname } = useEmphasizeVariant(props);
    const { outlineClassname   } = useOutlineVariant(props);
    const { mildClassname      } = useMildVariant(props);
    const { bareClassname      } = useBareVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="background-feature-test"
                className={`${styles[backgCustom]} ${themeClassname} ${emphasizeClassname} ${outlineClassname} ${mildClassname} ${bareClassname}`}
            >
                Background Feature Test
            </div>
        </div>
    );
};
