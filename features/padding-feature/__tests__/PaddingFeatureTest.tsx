import React from 'react'
import { type BareVariantProps, useBareVariant } from '@reusable-ui/bare-variant'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usePaddingFeatureTestStyles } from './PaddingFeatureTest.loader.js'

export interface PaddingFeatureTestProps
    extends
        BareVariantProps
{
}
export const PaddingFeatureTest = (props: PaddingFeatureTestProps) => {
    const styles = usePaddingFeatureTestStyles();
    
    const { bareClassname       } = useBareVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="padding-feature-test"
                className={`${styles.main} ${bareClassname}`}
            >
                Padding Feature Test
            </div>
        </div>
    );
};
