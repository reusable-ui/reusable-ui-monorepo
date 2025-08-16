import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type PaddingFeatureTestProps, PaddingFeatureTest } from './PaddingFeatureTest.js';
import { type CssPaddingFeatureOptions } from '../dist/index.js'



interface PaddingFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title             : string
    
    /**
     * Props to pass to the `<PaddingFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props            ?: PaddingFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of padding distance.
     */
    expectedPaddings  : Omit<CssPaddingFeatureOptions, 'padding'>
}



//#region 🎨 Expected style values
const REGULAR_PADDINGS  = {
    paddingInlineStart : '1rem',
    paddingInlineEnd   : '1rem',
    paddingBlockStart  : '1rem',
    paddingBlockEnd    : '1rem',
    paddingInlineBase  : '1rem',
    paddingBlockBase   : '1rem',
};
const BARE_PADDINGS     = {
    paddingInlineStart : '0px',
    paddingInlineEnd   : '0px',
    paddingBlockStart  : '0px',
    paddingBlockEnd    : '0px',
    paddingInlineBase  : '1rem',
    paddingBlockBase   : '1rem',
};
//#endregion 🎨 Expected style values



test.describe('usesPaddingFeature', () => {
    for (const { title, props, expectedPaddings } of [
        {
            title            : 'no variant => should render default paddings',
            props            : {
                // no variant
            },
            expectedPaddings : REGULAR_PADDINGS,
        },
        {
            title            : 'bare variant => should render no paddings',
            props            : {
                bare         : true,
            },
            expectedPaddings : BARE_PADDINGS,
        },
    ] satisfies PaddingFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<PaddingFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('padding-feature-test')
            
            await expect(box).toContainText('Padding Feature Test');
            
            // Check computed paddings
            const paddings = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    paddingInlineStart : computed.getPropertyValue('--pd-paddingInlineStart').trim(),
                    paddingInlineEnd   : computed.getPropertyValue('--pd-paddingInlineEnd').trim(),
                    paddingBlockStart  : computed.getPropertyValue('--pd-paddingBlockStart').trim(),
                    paddingBlockEnd    : computed.getPropertyValue('--pd-paddingBlockEnd').trim(),
                    paddingInlineBase  : computed.getPropertyValue('--pd-paddingInlineBase').trim(),
                    paddingBlockBase   : computed.getPropertyValue('--pd-paddingBlockBase').trim(),
                };
            });
            
            expect(paddings).toEqual(expectedPaddings);
        });
    } // for
});
