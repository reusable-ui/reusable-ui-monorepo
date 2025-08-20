import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type TransformFeatureTestProps, TransformFeatureTest } from './TransformFeatureTest.js';



interface TransformFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title               : string
    
    /**
     * Props to pass to the `<TransformFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props              ?: TransformFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected transform names, separated by comma.
     */
    expectedTransforms  : string
}



test.describe('usesTransformFeature', () => {
    for (const { title, props, expectedTransforms } of [
        {
            title               : 'no transform',
            props               : {
                transformCustom : 'transformNoCustomStyle',
            },
            expectedTransforms  : 'translate(0) translate(0) translate(0)',
        },
        {
            title               : 'should render 1 transform',
            props               : {
                transformCustom : 'transformNoCustomStyle',
                transform1      : true,
            },
            expectedTransforms  : 'translate(111px) translate(0) translate(0)',
        },
        {
            title               : 'should render 2 transform',
            props               : {
                transformCustom : 'transformNoCustomStyle',
                transform1      : true,
                transform3      : true,
            },
            expectedTransforms  : 'translate(111px) translate(0) skew(333deg)',
        },
        {
            title               : 'should render 3 transform',
            props               : {
                transformCustom : 'transformNoCustomStyle',
                transform1      : true,
                transform2      : true,
                transform3      : true,
            },
            expectedTransforms  : 'translate(111px) rotate(222deg) skew(333deg)',
        },
        
        {
            title               : 'with simple custom transform',
            props               : {
                transformCustom : 'transformSimpleCustomStyle',
            },
            expectedTransforms  : 'scale(2, 0.5) translate(0) translate(0) translate(0)',
        },
        {
            title               : 'should render 1 transform with simple custom transform',
            props               : {
                transformCustom : 'transformSimpleCustomStyle',
                transform1      : true,
            },
            expectedTransforms  : 'scale(2, 0.5) translate(111px) translate(0) translate(0)',
        },
        {
            title               : 'should render 2 transform with simple custom transform',
            props               : {
                transformCustom : 'transformSimpleCustomStyle',
                transform1      : true,
                transform3      : true,
            },
            expectedTransforms  : 'scale(2, 0.5) translate(111px) translate(0) skew(333deg)',
        },
        {
            title               : 'should render 3 transform with simple custom transform',
            props               : {
                transformCustom : 'transformSimpleCustomStyle',
                transform1      : true,
                transform2      : true,
                transform3      : true,
            },
            expectedTransforms  : 'scale(2, 0.5) translate(111px) rotate(222deg) skew(333deg)',
        },
        
        {
            title               : 'with single custom transform',
            props               : {
                transformCustom : 'transformSingleCustomStyle',
            },
            expectedTransforms  : 'perspective(800px) translate(0) translate(0) translate(0)',
        },
        {
            title               : 'should render 1 transform with single custom transform',
            props               : {
                transformCustom : 'transformSingleCustomStyle',
                transform1      : true,
            },
            expectedTransforms  : 'perspective(800px) translate(111px) translate(0) translate(0)',
        },
        {
            title               : 'should render 2 transform with single custom transform',
            props               : {
                transformCustom : 'transformSingleCustomStyle',
                transform1      : true,
                transform3      : true,
            },
            expectedTransforms  : 'perspective(800px) translate(111px) translate(0) skew(333deg)',
        },
        {
            title               : 'should render 3 transform with single custom transform',
            props               : {
                transformCustom : 'transformSingleCustomStyle',
                transform1      : true,
                transform2      : true,
                transform3      : true,
            },
            expectedTransforms  : 'perspective(800px) translate(111px) rotate(222deg) skew(333deg)',
        },
        
        {
            title               : 'with single !important custom transform',
            props               : {
                transformCustom : 'transformSingleImportantCustomStyle',
            },
            expectedTransforms  : 'matrix(1.2, 0.2, -1, 0.9, 0, 20) translate(0) translate(0) translate(0)',
        },
        {
            title               : 'should render 1 transform with single !important custom transform',
            props               : {
                transformCustom : 'transformSingleImportantCustomStyle',
                transform1      : true,
            },
            expectedTransforms  : 'matrix(1.2, 0.2, -1, 0.9, 0, 20) translate(111px) translate(0) translate(0)',
        },
        {
            title               : 'should render 2 transform with single !important custom transform',
            props               : {
                transformCustom : 'transformSingleImportantCustomStyle',
                transform1      : true,
                transform3      : true,
            },
            expectedTransforms  : 'matrix(1.2, 0.2, -1, 0.9, 0, 20) translate(111px) translate(0) skew(333deg)',
        },
        {
            title               : 'should render 3 transform with single !important custom transform',
            props               : {
                transformCustom : 'transformSingleImportantCustomStyle',
                transform1      : true,
                transform2      : true,
                transform3      : true,
            },
            expectedTransforms  : 'matrix(1.2, 0.2, -1, 0.9, 0, 20) translate(111px) rotate(222deg) skew(333deg)',
        },
        
        {
            title               : 'with multiple custom transform',
            props               : {
                transformCustom : 'transformMultipleCustomStyle',
            },
            expectedTransforms  : 'rotate(0.11turn) rotate(0.22turn) rotate(0.33turn) translate(0) translate(0) translate(0)',
        },
        {
            title               : 'should render 1 transform with multiple custom transform',
            props               : {
                transformCustom : 'transformMultipleCustomStyle',
                transform1      : true,
            },
            expectedTransforms  : 'rotate(0.11turn) rotate(0.22turn) rotate(0.33turn) translate(111px) translate(0) translate(0)',
        },
        {
            title               : 'should render 2 transform with multiple custom transform',
            props               : {
                transformCustom : 'transformMultipleCustomStyle',
                transform1      : true,
                transform3      : true,
            },
            expectedTransforms  : 'rotate(0.11turn) rotate(0.22turn) rotate(0.33turn) translate(111px) translate(0) skew(333deg)',
        },
        {
            title               : 'should render 3 transform with multiple custom transform',
            props               : {
                transformCustom : 'transformMultipleCustomStyle',
                transform1      : true,
                transform2      : true,
                transform3      : true,
            },
            expectedTransforms  : 'rotate(0.11turn) rotate(0.22turn) rotate(0.33turn) translate(111px) rotate(222deg) skew(333deg)',
        },
        
        {
            title               : 'with multiple !important custom transform',
            props               : {
                transformCustom : 'transformMultipleImportantCustomStyle',
            },
            expectedTransforms  : 'skew(0.11turn) skew(0.22turn) skew(0.33turn) translate(0) translate(0) translate(0)',
        },
        {
            title               : 'should render 1 transform with multiple !important custom transform',
            props               : {
                transformCustom : 'transformMultipleImportantCustomStyle',
                transform1      : true,
            },
            expectedTransforms  : 'skew(0.11turn) skew(0.22turn) skew(0.33turn) translate(111px) translate(0) translate(0)',
        },
        {
            title               : 'should render 2 transform with multiple !important custom transform',
            props               : {
                transformCustom : 'transformMultipleImportantCustomStyle',
                transform1      : true,
                transform3      : true,
            },
            expectedTransforms  : 'skew(0.11turn) skew(0.22turn) skew(0.33turn) translate(111px) translate(0) skew(333deg)',
        },
        {
            title               : 'should render 3 transform with multiple !important custom transform',
            props               : {
                transformCustom : 'transformMultipleImportantCustomStyle',
                transform1      : true,
                transform2      : true,
                transform3      : true,
            },
            expectedTransforms  : 'skew(0.11turn) skew(0.22turn) skew(0.33turn) translate(111px) rotate(222deg) skew(333deg)',
        },
    ] satisfies TransformFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<TransformFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('transform-feature-test')
            
            await expect(box).toContainText('Transform Feature Test');
            
            // Check computed transforms
            const transforms = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    // transform : computed.transform,
                    transform : computed.getPropertyValue('--tm-transform').trim(),
                };
            });
            
            expect(transforms.transform).toEqual(expectedTransforms);
        });
    } // for
});
