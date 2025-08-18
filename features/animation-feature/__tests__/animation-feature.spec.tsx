import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type AnimationFeatureTestProps, AnimationFeatureTest } from './AnimationFeatureTest.js';



interface AnimationFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title               : string
    
    /**
     * Props to pass to the `<AnimationFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props              ?: AnimationFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected animation names, separated by comma.
     */
    expectedAnimations  : string
}



test.describe('usesAnimationFeature', () => {
    for (const { title, props, expectedAnimations } of [
        {
            title              : 'no animation',
            props              : {
                animCustom     : 'animNoCustomStyle',
            },
            expectedAnimations : 'none, none, none',
        },
        {
            title              : 'should render 1 animation',
            props              : {
                animCustom     : 'animNoCustomStyle',
                anim1          : true,
            },
            expectedAnimations : 'anim1, none, none',
        },
        {
            title              : 'should render 2 animation',
            props              : {
                animCustom     : 'animNoCustomStyle',
                anim1          : true,
                anim3          : true,
            },
            expectedAnimations : 'anim1, none, anim3',
        },
        {
            title              : 'should render 3 animation',
            props              : {
                animCustom     : 'animNoCustomStyle',
                anim1          : true,
                anim2          : true,
                anim3          : true,
            },
            expectedAnimations : 'anim1, anim2, anim3',
        },
        
        {
            title              : 'with simple custom animation',
            props              : {
                animCustom     : 'animSimpleCustomStyle',
            },
            expectedAnimations : 'simple, none, none, none',
        },
        {
            title              : 'should render 1 animation with simple custom animation',
            props              : {
                animCustom     : 'animSimpleCustomStyle',
                anim1          : true,
            },
            expectedAnimations : 'simple, anim1, none, none',
        },
        {
            title              : 'should render 2 animation with simple custom animation',
            props              : {
                animCustom     : 'animSimpleCustomStyle',
                anim1          : true,
                anim3          : true,
            },
            expectedAnimations : 'simple, anim1, none, anim3',
        },
        {
            title              : 'should render 3 animation with simple custom animation',
            props              : {
                animCustom     : 'animSimpleCustomStyle',
                anim1          : true,
                anim2          : true,
                anim3          : true,
            },
            expectedAnimations : 'simple, anim1, anim2, anim3',
        },
        
        {
            title              : 'with single custom animation',
            props              : {
                animCustom     : 'animSingleCustomStyle',
            },
            expectedAnimations : 'single, none, none, none',
        },
        {
            title              : 'should render 1 animation with single custom animation',
            props              : {
                animCustom     : 'animSingleCustomStyle',
                anim1          : true,
            },
            expectedAnimations : 'single, anim1, none, none',
        },
        {
            title              : 'should render 2 animation with single custom animation',
            props              : {
                animCustom     : 'animSingleCustomStyle',
                anim1          : true,
                anim3          : true,
            },
            expectedAnimations : 'single, anim1, none, anim3',
        },
        {
            title              : 'should render 3 animation with single custom animation',
            props              : {
                animCustom     : 'animSingleCustomStyle',
                anim1          : true,
                anim2          : true,
                anim3          : true,
            },
            expectedAnimations : 'single, anim1, anim2, anim3',
        },
        
        {
            title              : 'with single !important custom animation',
            props              : {
                animCustom     : 'animSingleImportantCustomStyle',
            },
            expectedAnimations : 'singleImp, none, none, none',
        },
        {
            title              : 'should render 1 animation with single !important custom animation',
            props              : {
                animCustom     : 'animSingleImportantCustomStyle',
                anim1          : true,
            },
            expectedAnimations : 'singleImp, anim1, none, none',
        },
        {
            title              : 'should render 2 animation with single !important custom animation',
            props              : {
                animCustom     : 'animSingleImportantCustomStyle',
                anim1          : true,
                anim3          : true,
            },
            expectedAnimations : 'singleImp, anim1, none, anim3',
        },
        {
            title              : 'should render 3 animation with single !important custom animation',
            props              : {
                animCustom     : 'animSingleImportantCustomStyle',
                anim1          : true,
                anim2          : true,
                anim3          : true,
            },
            expectedAnimations : 'singleImp, anim1, anim2, anim3',
        },
        
        {
            title              : 'with multiple custom animation',
            props              : {
                animCustom     : 'animMultipleCustomStyle',
            },
            expectedAnimations : 'multi1, multi2, multi3, none, none, none',
        },
        {
            title              : 'should render 1 animation with multiple custom animation',
            props              : {
                animCustom     : 'animMultipleCustomStyle',
                anim1          : true,
            },
            expectedAnimations : 'multi1, multi2, multi3, anim1, none, none',
        },
        {
            title              : 'should render 2 animation with multiple custom animation',
            props              : {
                animCustom     : 'animMultipleCustomStyle',
                anim1          : true,
                anim3          : true,
            },
            expectedAnimations : 'multi1, multi2, multi3, anim1, none, anim3',
        },
        {
            title              : 'should render 3 animation with multiple custom animation',
            props              : {
                animCustom     : 'animMultipleCustomStyle',
                anim1          : true,
                anim2          : true,
                anim3          : true,
            },
            expectedAnimations : 'multi1, multi2, multi3, anim1, anim2, anim3',
        },
        
        {
            title              : 'with multiple !important custom animation',
            props              : {
                animCustom     : 'animMultipleImportantCustomStyle',
            },
            expectedAnimations : 'multi1Imp, multi2Imp, multi3Imp, none, none, none',
        },
        {
            title              : 'should render 1 animation with multiple !important custom animation',
            props              : {
                animCustom     : 'animMultipleImportantCustomStyle',
                anim1          : true,
            },
            expectedAnimations : 'multi1Imp, multi2Imp, multi3Imp, anim1, none, none',
        },
        {
            title              : 'should render 2 animation with multiple !important custom animation',
            props              : {
                animCustom     : 'animMultipleImportantCustomStyle',
                anim1          : true,
                anim3          : true,
            },
            expectedAnimations : 'multi1Imp, multi2Imp, multi3Imp, anim1, none, anim3',
        },
        {
            title              : 'should render 3 animation with multiple !important custom animation',
            props              : {
                animCustom     : 'animMultipleImportantCustomStyle',
                anim1          : true,
                anim2          : true,
                anim3          : true,
            },
            expectedAnimations : 'multi1Imp, multi2Imp, multi3Imp, anim1, anim2, anim3',
        },
    ] satisfies AnimationFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<AnimationFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('animation-feature-test')
            
            await expect(box).toContainText('Animation Feature Test');
            
            // Check computed animations
            const animations = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    animation : computed.animationName,
                };
            });
            
            expect(animations.animation).toEqual(expectedAnimations);
        });
    } // for
});
