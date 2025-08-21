import React from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useBoxShadowFeatureTestStyles } from './BoxShadowFeatureTest.loader.js'

export interface BoxShadowFeatureTestProps {
    boxShadowCustom ?: keyof ReturnType<typeof useBoxShadowFeatureTestStyles>
    boxShadow1      ?: boolean
    boxShadow2      ?: boolean
    boxShadow3      ?: boolean
}
export const BoxShadowFeatureTest = (props: BoxShadowFeatureTestProps) => {
    const {
        boxShadowCustom = 'boxShadowNoCustomStyle',
        boxShadow1 = false,
        boxShadow2 = false,
        boxShadow3 = false,
    } = props;
    
    const styles = useBoxShadowFeatureTestStyles();
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="box-shadow-feature-test"
                className={`${styles[boxShadowCustom]} ${boxShadow1 ? 'boxShadow1' : ''} ${boxShadow2 ? 'boxShadow2' : ''} ${boxShadow3 ? 'boxShadow3' : ''}`}
            >
                Box Shadow Feature Test
            </div>
        </div>
    );
};
