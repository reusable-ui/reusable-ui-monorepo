import React from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useTransformFeatureTestStyles } from './TransformFeatureTest.loader.js'

export interface TransformFeatureTestProps {
    transformCustom ?: keyof ReturnType<typeof useTransformFeatureTestStyles>
    transform1      ?: boolean
    transform2      ?: boolean
    transform3      ?: boolean
}
export const TransformFeatureTest = (props: TransformFeatureTestProps) => {
    const {
        transformCustom = 'transformNoCustomStyle',
        transform1 = false,
        transform2 = false,
        transform3 = false,
    } = props;
    
    const styles = useTransformFeatureTestStyles();
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="transform-feature-test"
                className={`${styles[transformCustom]} ${transform1 ? 'transform1' : ''} ${transform2 ? 'transform2' : ''} ${transform3 ? 'transform3' : ''}`}
            >
                Transform Feature Test
            </div>
        </div>
    );
};
