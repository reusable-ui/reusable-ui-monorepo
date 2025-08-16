import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type BorderFeatureTestProps, BorderFeatureTest } from './BorderFeatureTest.js';
import { type CssBorderFeatureOptions } from '../dist/index.js'



interface BorderFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title             : string
    
    /**
     * Props to pass to the `<BorderFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props            ?: BorderFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of border distance.
     */
    expectedBorders  : Omit<CssBorderFeatureOptions,
        | 'borderStyle'
        | 'borderRadius'
        | 'borderStartStartRadius'
        | 'borderStartEndRadius'
        | 'borderEndStartRadius'
        | 'borderEndEndRadius'
        | 'borderColor'
    >
}



//#region 🎨 Expected style values
const REGULAR_BORDERS  = {
    borderInlineStartWidth : '1px',
    borderInlineEndWidth   : '1px',
    borderBlockStartWidth  : '1px',
    borderBlockEndWidth    : '1px',
    borderInlineBaseWidth  : '1px',
    borderBlockBaseWidth   : '1px',
};
const BARE_BORDERS     = {
    borderInlineStartWidth : '0px',
    borderInlineEndWidth   : '0px',
    borderBlockStartWidth  : '0px',
    borderBlockEndWidth    : '0px',
    borderInlineBaseWidth  : '1px',
    borderBlockBaseWidth   : '1px',
};
//#endregion 🎨 Expected style values



test.describe('usesBorderFeature', () => {
    for (const { title, props, expectedBorders } of [
        {
            title           : 'no variant => should render default borders',
            props           : {
                // no variant
            },
            expectedBorders : REGULAR_BORDERS,
        },
        {
            title           : 'bare variant => should render no borders',
            props           : {
                bare        : true,
            },
            expectedBorders : BARE_BORDERS,
        },
    ] satisfies BorderFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<BorderFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('border-feature-test')
            
            await expect(box).toContainText('Border Feature Test');
            
            // Check computed borders
            const borders = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    borderInlineStartWidth : computed.getPropertyValue('--bd-borderInlineStartWidth').trim(),
                    borderInlineEndWidth   : computed.getPropertyValue('--bd-borderInlineEndWidth').trim(),
                    borderBlockStartWidth  : computed.getPropertyValue('--bd-borderBlockStartWidth').trim(),
                    borderBlockEndWidth    : computed.getPropertyValue('--bd-borderBlockEndWidth').trim(),
                    borderInlineBaseWidth  : computed.getPropertyValue('--bd-borderInlineBaseWidth').trim(),
                    borderBlockBaseWidth   : computed.getPropertyValue('--bd-borderBlockBaseWidth').trim(),
                };
            });
            
            expect(borders).toEqual(expectedBorders);
        });
    } // for
});
