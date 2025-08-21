import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type BoxShadowFeatureTestProps, BoxShadowFeatureTest } from './BoxShadowFeatureTest.js';



interface BoxShadowFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title               : string
    
    /**
     * Props to pass to the `<BoxShadowFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props              ?: BoxShadowFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected box shadow names, separated by comma.
     */
    expectedBoxShadows  : string
}



test.describe('usesBoxShadowFeature', () => {
    for (const { title, props, expectedBoxShadows } of [
        {
            title               : 'no box shadow',
            props               : {
                boxShadowCustom : 'boxShadowNoCustomStyle',
            },
            expectedBoxShadows  : 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 1 box shadow',
            props               : {
                boxShadowCustom : 'boxShadowNoCustomStyle',
                boxShadow1      : true,
            },
            expectedBoxShadows  : 'rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 2 box shadow',
            props               : {
                boxShadowCustom : 'boxShadowNoCustomStyle',
                boxShadow1      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        {
            title               : 'should render 3 box shadow',
            props               : {
                boxShadowCustom : 'boxShadowNoCustomStyle',
                boxShadow1      : true,
                boxShadow2      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(255, 0, 0) 5px 6px 7px 8px, rgb(0, 255, 0) 6px 7px 8px 9px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        
        {
            title               : 'with simple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSimpleCustomStyle',
            },
            expectedBoxShadows  : 'rgb(11, 11, 11) 11px 22px 33px 44px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 1 box shadow with simple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSimpleCustomStyle',
                boxShadow1      : true,
            },
            expectedBoxShadows  : 'rgb(11, 11, 11) 11px 22px 33px 44px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 2 box shadow with simple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSimpleCustomStyle',
                boxShadow1      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(11, 11, 11) 11px 22px 33px 44px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        {
            title               : 'should render 3 box shadow with simple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSimpleCustomStyle',
                boxShadow1      : true,
                boxShadow2      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(11, 11, 11) 11px 22px 33px 44px, rgb(255, 0, 0) 5px 6px 7px 8px, rgb(0, 255, 0) 6px 7px 8px 9px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        
        {
            title               : 'with single custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleCustomStyle',
            },
            expectedBoxShadows  : 'rgb(22, 22, 22) 22px 33px 44px 55px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 1 box shadow with single custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleCustomStyle',
                boxShadow1      : true,
            },
            expectedBoxShadows  : 'rgb(22, 22, 22) 22px 33px 44px 55px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 2 box shadow with single custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleCustomStyle',
                boxShadow1      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(22, 22, 22) 22px 33px 44px 55px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        {
            title               : 'should render 3 box shadow with single custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleCustomStyle',
                boxShadow1      : true,
                boxShadow2      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(22, 22, 22) 22px 33px 44px 55px, rgb(255, 0, 0) 5px 6px 7px 8px, rgb(0, 255, 0) 6px 7px 8px 9px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        
        {
            title               : 'with single !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleImportantCustomStyle',
            },
            expectedBoxShadows  : 'rgb(33, 33, 33) 33px 44px 55px 66px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 1 box shadow with single !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleImportantCustomStyle',
                boxShadow1      : true,
            },
            expectedBoxShadows  : 'rgb(33, 33, 33) 33px 44px 55px 66px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 2 box shadow with single !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleImportantCustomStyle',
                boxShadow1      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(33, 33, 33) 33px 44px 55px 66px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        {
            title               : 'should render 3 box shadow with single !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowSingleImportantCustomStyle',
                boxShadow1      : true,
                boxShadow2      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(33, 33, 33) 33px 44px 55px 66px, rgb(255, 0, 0) 5px 6px 7px 8px, rgb(0, 255, 0) 6px 7px 8px 9px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        
        {
            title               : 'with multiple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleCustomStyle',
            },
            expectedBoxShadows  : 'rgb(11, 22, 33) 11px 22px 33px 44px, rgb(22, 33, 44) 22px 33px 44px 55px, rgb(33, 44, 55) 33px 44px 55px 66px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 1 box shadow with multiple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleCustomStyle',
                boxShadow1      : true,
            },
            expectedBoxShadows  : 'rgb(11, 22, 33) 11px 22px 33px 44px, rgb(22, 33, 44) 22px 33px 44px 55px, rgb(33, 44, 55) 33px 44px 55px 66px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 2 box shadow with multiple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleCustomStyle',
                boxShadow1      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(11, 22, 33) 11px 22px 33px 44px, rgb(22, 33, 44) 22px 33px 44px 55px, rgb(33, 44, 55) 33px 44px 55px 66px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        {
            title               : 'should render 3 box shadow with multiple custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleCustomStyle',
                boxShadow1      : true,
                boxShadow2      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(11, 22, 33) 11px 22px 33px 44px, rgb(22, 33, 44) 22px 33px 44px 55px, rgb(33, 44, 55) 33px 44px 55px 66px, rgb(255, 0, 0) 5px 6px 7px 8px, rgb(0, 255, 0) 6px 7px 8px 9px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        
        {
            title               : 'with multiple !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleImportantCustomStyle',
            },
            expectedBoxShadows  : 'rgb(44, 55, 66) 44px 55px 66px 77px, rgb(55, 66, 77) 55px 66px 77px 88px, rgb(66, 77, 88) 66px 77px 88px 99px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 1 box shadow with multiple !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleImportantCustomStyle',
                boxShadow1      : true,
            },
            expectedBoxShadows  : 'rgb(44, 55, 66) 44px 55px 66px 77px, rgb(55, 66, 77) 55px 66px 77px 88px, rgb(66, 77, 88) 66px 77px 88px 99px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
        },
        {
            title               : 'should render 2 box shadow with multiple !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleImportantCustomStyle',
                boxShadow1      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(44, 55, 66) 44px 55px 66px 77px, rgb(55, 66, 77) 55px 66px 77px 88px, rgb(66, 77, 88) 66px 77px 88px 99px, rgb(255, 0, 0) 5px 6px 7px 8px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
        {
            title               : 'should render 3 box shadow with multiple !important custom box shadow',
            props               : {
                boxShadowCustom : 'boxShadowMultipleImportantCustomStyle',
                boxShadow1      : true,
                boxShadow2      : true,
                boxShadow3      : true,
            },
            expectedBoxShadows  : 'rgb(44, 55, 66) 44px 55px 66px 77px, rgb(55, 66, 77) 55px 66px 77px 88px, rgb(66, 77, 88) 66px 77px 88px 99px, rgb(255, 0, 0) 5px 6px 7px 8px, rgb(0, 255, 0) 6px 7px 8px 9px, rgb(0, 0, 255) 7px 8px 9px 1px',
        },
    ] satisfies BoxShadowFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<BoxShadowFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('box-shadow-feature-test')
            
            await expect(box).toContainText('Box Shadow Feature Test');
            
            // Check computed box shadows
            const boxShadows = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    boxShadow : computed.boxShadow,
                };
            });
            
            expect(boxShadows.boxShadow).toEqual(expectedBoxShadows);
        });
    } // for
});
