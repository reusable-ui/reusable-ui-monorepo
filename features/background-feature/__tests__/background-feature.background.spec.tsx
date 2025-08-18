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
        backgImage  : string
    }
}



test.describe('usesBackgroundFeature', () => {
    for (const { title, props, expectedBackground } of [
        {
            title              : 'no variant => should render default backgrounds',
            props              : {
                backgCustom    : 'backgroundNoCustomStyle',
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, none, oklch\(.*/,
                backg       : /^none, none, oklch\(.*/,
                backgImage  : 'none, none, none',
            },
        },
        {
            title              : 'bare variant => should render no backgrounds',
            props              : {
                backgCustom    : 'backgroundNoCustomStyle',
                bare           : true,
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, none, oklch\(.*/,
                backg       : 'none',
                backgImage  : 'none',
            },
        },
        
        {
            title              : 'with simple custom background layer => should render default backgrounds',
            props              : {
                backgCustom    : 'backgroundSimpleCustomStyle',
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 0, 0, 0\.1\), rgba\(255, 0, 0, 0\.1\)\) border-box, oklch\(.*/,
                backg       : /^none, linear-gradient\(0deg, rgba\(255, 0, 0, 0\.1\), rgba\(255, 0, 0, 0\.1\)\) border-box, oklch\(.*/,
                backgImage  : 'none, linear-gradient(0deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1)), none',
            },
        },
        {
            title              : 'bare variant with simple custom background layer => should render no backgrounds',
            props              : {
                backgCustom    : 'backgroundSimpleCustomStyle',
                bare           : true,
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 0, 0, 0\.1\), rgba\(255, 0, 0, 0\.1\)\) border-box, oklch\(.*/,
                backg       : 'none',
                backgImage  : 'none',
            },
        },
        
        {
            title              : 'with single custom background layer => should render default backgrounds',
            props              : {
                backgCustom    : 'backgroundSingleCustomStyle',
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, oklch\(.*/,
                backg       : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, oklch\(.*/,
                backgImage  : 'none, linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)), none',
            },
        },
        {
            title              : 'bare variant with single custom background layer => should render no backgrounds',
            props              : {
                backgCustom    : 'backgroundSingleCustomStyle',
                bare           : true,
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, oklch\(.*/,
                backg       : 'none',
                backgImage  : 'none',
            },
        },
        
        {
            title              : 'with single !important custom background layer => should render default backgrounds',
            props              : {
                backgCustom    : 'backgroundSingleImportantCustomStyle',
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, oklch\(.*/,
                backg       : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, oklch\(.*/,
                backgImage  : 'none, linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)), none',
            },
        },
        {
            title              : 'bare variant with single !important custom background layer => should render no backgrounds',
            props              : {
                backgCustom    : 'backgroundSingleImportantCustomStyle',
                bare           : true,
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, oklch\(.*/,
                backg       : 'none',
                backgImage  : 'none',
            },
        },
        
        {
            title              : 'with multiple custom background layer => should render default backgrounds',
            props              : {
                backgCustom    : 'backgroundMultipleCustomStyle',
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, linear-gradient\(0deg, rgba\(255, 0, 255, 0\.1\), rgba\(255, 0, 255, 0\.1\)\) border-box, oklch\(.*/,
                backg       : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, linear-gradient\(0deg, rgba\(255, 0, 255, 0\.1\), rgba\(255, 0, 255, 0\.1\)\) border-box, oklch\(.*/,
                backgImage  : 'none, linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)), linear-gradient(0deg, rgba(255, 0, 255, 0.1), rgba(255, 0, 255, 0.1)), none',
            },
        },
        {
            title              : 'bare variant with multiple custom background layer => should render no backgrounds',
            props              : {
                backgCustom    : 'backgroundMultipleCustomStyle',
                bare           : true,
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, linear-gradient\(0deg, rgba\(255, 0, 255, 0\.1\), rgba\(255, 0, 255, 0\.1\)\) border-box, oklch\(.*/,
                backg       : 'none',
                backgImage  : 'none',
            },
        },
        
        {
            title              : 'with multiple !important custom background layer => should render default backgrounds',
            props              : {
                backgCustom    : 'backgroundMultipleImportantCustomStyle',
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, linear-gradient\(0deg, rgba\(255, 0, 255, 0\.1\), rgba\(255, 0, 255, 0\.1\)\) border-box, oklch\(.*/,
                backg       : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, linear-gradient\(0deg, rgba\(255, 0, 255, 0\.1\), rgba\(255, 0, 255, 0\.1\)\) border-box, oklch\(.*/,
                backgImage  : 'none, linear-gradient(0deg, rgba(255, 255, 0, 0.1), rgba(255, 255, 0, 0.1)), linear-gradient(0deg, rgba(255, 0, 255, 0.1), rgba(255, 0, 255, 0.1)), none',
            },
        },
        {
            title              : 'bare variant with multiple !important custom background layer => should render no backgrounds',
            props              : {
                backgCustom    : 'backgroundMultipleImportantCustomStyle',
                bare           : true,
            },
            expectedBackground : {
                backgColor  : /^oklch\(.*/,
                backgLayers : /^none, linear-gradient\(0deg, rgba\(255, 255, 0, 0\.1\), rgba\(255, 255, 0, 0\.1\)\) content-box, linear-gradient\(0deg, rgba\(255, 0, 255, 0\.1\), rgba\(255, 0, 255, 0\.1\)\) border-box, oklch\(.*/,
                backg       : 'none',
                backgImage  : 'none',
            },
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
                    backgLayers : computed.getPropertyValue('--bg-backgLayers').trim().replaceAll(/\s+,\s+/g, ', '),
                    backg       : computed.getPropertyValue('--bg-backg').trim().replaceAll(/\s+,\s+/g, ', '),
                    backgImage  : computed.backgroundImage,
                };
            });
            
            expect(backgrounds.backgColor).toMatch(expectedBackground.backgColor);
            expect(backgrounds.backgLayers).toMatch(expectedBackground.backgLayers);
            expect(backgrounds.backg).toMatch(expectedBackground.backg);
            expect(backgrounds.backgImage).toMatch(expectedBackground.backgImage);
        });
    } // for
});
