import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type BackgroundFeatureTestProps, BackgroundFeatureTest } from './BackgroundFeatureTest.js';



interface BackgroundFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title               : string
    
    /**
     * Props to pass to the `<BackgroundFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props              ?: BackgroundFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of background distance.
     */
    expectedBackground  : {
        backgColor  : RegExp
        backgLayers : RegExp
        backg       : RegExp | string
    }
}



//#region 🎨 Expected style values
const REGULAR_BORDERS  = {
    backgColor  : /^oklch\(.*/,
    backgLayers : /^none, none, oklch\(.*/,
    backg       : /^none, none, oklch\(.*/,
};
const BARE_BORDERS     = {
    ...REGULAR_BORDERS,
    backg       : 'none',
};
//#endregion 🎨 Expected style values



test.describe('usesBackgroundFeature', () => {
    for (const { title, props, expectedBackground } of [
        {
            title              : 'no variant => should render default backgrounds',
            props              : {
                // no variant
            },
            expectedBackground : REGULAR_BORDERS,
        },
        {
            title              : 'bare variant => should render no backgrounds',
            props              : {
                bare           : true,
            },
            expectedBackground : BARE_BORDERS,
        },
    ] satisfies BackgroundFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<BackgroundFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('background-feature-test')
            
            await expect(box).toContainText('Background Feature Test');
            
            // Check computed backgrounds
            const backgrounds = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    backgColor  : computed.getPropertyValue('--bg-backgColor').trim(),
                    backgLayers : computed.getPropertyValue('--bg-backgLayers').trim(),
                    backg       : computed.getPropertyValue('--bg-backg').trim(),
                };
            });
            
            expect(backgrounds.backgColor).toMatch(expectedBackground.backgColor);
            expect(backgrounds.backgLayers).toMatch(expectedBackground.backgLayers);
            expect(backgrounds.backg).toMatch(expectedBackground.backg);
        });
    } // for
});
