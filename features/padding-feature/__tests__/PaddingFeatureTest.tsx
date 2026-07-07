import React from 'react'
import { type StrippedVariantProps, useStrippedVariant } from '@reusable-ui/stripped-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usePaddingFeatureTestStyles } from './PaddingFeatureTest.loader.js'

export interface PaddingFeatureTestProps
    extends
        StrippedVariantProps
{
}
export const PaddingFeatureTest = (props: PaddingFeatureTestProps) => {
    const styles = usePaddingFeatureTestStyles();
    
    const { strippedClassname } = useStrippedVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="padding-feature-test"
                className={`${styles.main} ${strippedClassname}`}
            >
                Padding Feature Test
            </div>
        </div>
    );
};
