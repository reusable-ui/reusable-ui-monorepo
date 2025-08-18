import React from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useAnimationFeatureTestStyles } from './AnimationFeatureTest.loader.js'

export interface AnimationFeatureTestProps {
    animCustom ?: keyof ReturnType<typeof useAnimationFeatureTestStyles>
    anim1      ?: boolean
    anim2      ?: boolean
    anim3      ?: boolean
}
export const AnimationFeatureTest = (props: AnimationFeatureTestProps) => {
    const {
        animCustom = 'animNoCustomStyle',
        anim1 = false,
        anim2 = false,
        anim3 = false,
    } = props;
    
    const styles = useAnimationFeatureTestStyles();
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="animation-feature-test"
                className={`${styles[animCustom]} ${anim1 ? 'anim1' : ''} ${anim2 ? 'anim2' : ''} ${anim3 ? 'anim3' : ''}`}
            >
                Animation Feature Test
            </div>
        </div>
    );
};
