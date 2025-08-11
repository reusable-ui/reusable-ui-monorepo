import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type BackgroundFeatureTestProps, BackgroundFeatureTest } from './BackgroundFeatureTest.js';



interface BackgroundFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                     : string
    
    /**
     * Props to pass to the `<BackgroundFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props                    ?: BackgroundFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of background color.
     */
    expectedBackgroundColor   : string
    
    /**
     * The expected result of background image.
     */
    expectedBackgroundImage   : string
    
    /**
     * The expected result of background origin.
     */
    expectedBackgroundOrigin  : string
}



//#region 🎨 Expected style values
const REGULAR_BACKG_COLORS = {
    primary   : 'oklch(0.551 0.2166 260)',
    secondary : 'oklch(0.532 0.01615 245)',
    success   : 'oklch(0.5225 0.11685 157)',
    info      : 'oklch(0.7315 0.1311 218)',
    warning   : 'oklch(0.798 0.1634 85)',
    danger    : 'oklch(0.5605 0.1919 21)',
    light     : 'oklch(0.931 0.0019 248)',
    dark      : 'oklch(0.247 0.0095 248)',
};
const OUTLINED_BACKG_COLOR = 'rgba(0, 0, 0, 0)';
const MILD_BACKG_COLORS    = {
    primary   : 'oklch(0.874 0.0684 260)',
    secondary : 'oklch(0.868 0.0051 245)',
    success   : 'oklch(0.865 0.0369 157)',
    info      : 'oklch(0.931 0.0414 218)',
    warning   : 'oklch(0.952 0.0516 85)',
    danger    : 'oklch(0.877 0.0606 21)',
    light     : 'oklch(0.994 0.0006 248)',
    dark      : 'oklch(0.778 0.003 248)',
};

const NO_BACKG_GRADIENT    = 'none, none, none';
const NO_BACKG_ORIGIN      = 'padding-box, padding-box, padding-box';

const HAS_BACKG_GRADIENT   = 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2)), none, none';
const HAS_BACKG_ORIGIN     = 'border-box, padding-box, padding-box';

const THEME_NAMES          = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
] as const;
//#endregion 🎨 Expected style values



test.describe('usesBackgroundFeature', () => {
    for (const { title, props, expectedBackgroundColor, expectedBackgroundImage, expectedBackgroundOrigin } of [
        ...THEME_NAMES.flatMap((themeName): BackgroundFeatureTestCase[] => [
            //#region No prop activated
            {
                title                    : `[${themeName}] no variant => should render regular style`,
                props                    : {
                    theme                : themeName,
                    
                    // no variant
                },
                expectedBackgroundColor  : REGULAR_BACKG_COLORS[themeName],
                expectedBackgroundImage  : NO_BACKG_GRADIENT,
                expectedBackgroundOrigin : NO_BACKG_ORIGIN,
            },
            //#endregion No prop activated
            
            
            
            //#region One prop activated
            {
                title                    : `[${themeName}] emphasized => should render emphasized style`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                },
                expectedBackgroundColor  : REGULAR_BACKG_COLORS[themeName],
                expectedBackgroundImage  : HAS_BACKG_GRADIENT,
                expectedBackgroundOrigin : HAS_BACKG_ORIGIN,
            },
            {
                title                    : `[${themeName}] outlined => should render outlined style`,
                props                    : {
                    theme                : themeName,
                    
                    outlined             : true,
                },
                expectedBackgroundColor  : OUTLINED_BACKG_COLOR,
                expectedBackgroundImage  : NO_BACKG_GRADIENT,
                expectedBackgroundOrigin : NO_BACKG_ORIGIN,
            },
            {
                title                    : `[${themeName}] mild => should render mild style`,
                props                    : {
                    theme                : themeName,
                    
                    mild                 : true,
                },
                expectedBackgroundColor  : MILD_BACKG_COLORS[themeName],
                expectedBackgroundImage  : NO_BACKG_GRADIENT,
                expectedBackgroundOrigin : NO_BACKG_ORIGIN,
            },
            //#endregion One prop activated
            
            
            
            //#region Two prop activated
            {
                title                    : `[${themeName}] emphasized + outlined => should render emphasized + outlined style`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                    outlined             : true,
                },
                expectedBackgroundColor  : OUTLINED_BACKG_COLOR,
                expectedBackgroundImage  : HAS_BACKG_GRADIENT,
                expectedBackgroundOrigin : HAS_BACKG_ORIGIN,
            },
            {
                title                    : `[${themeName}] emphasized + mild => should render emphasized + mild style`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                    mild                 : true,
                },
                expectedBackgroundColor  : MILD_BACKG_COLORS[themeName],
                expectedBackgroundImage  : HAS_BACKG_GRADIENT,
                expectedBackgroundOrigin : HAS_BACKG_ORIGIN,
            },
            {
                title                    : `[${themeName}] outlined + mild => should render outlined style, mild ignored`,
                props                    : {
                    theme                : themeName,
                    
                    outlined             : true,
                    mild                 : true,
                },
                expectedBackgroundColor  : OUTLINED_BACKG_COLOR,
                expectedBackgroundImage  : NO_BACKG_GRADIENT,
                expectedBackgroundOrigin : NO_BACKG_ORIGIN,
            },
            //#endregion Two prop activated
            
            
            
            //#region Three prop activated
            {
                title                    : `[${themeName}] emphasized + outlined + mild => should render emphasized + outlined style, mild ignored`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                    outlined             : true,
                    mild                 : true,
                },
                expectedBackgroundColor  : OUTLINED_BACKG_COLOR,
                expectedBackgroundImage  : HAS_BACKG_GRADIENT,
                expectedBackgroundOrigin : HAS_BACKG_ORIGIN,
            },
            //#endregion Three prop activated
        ]),
    ] satisfies BackgroundFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<BackgroundFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('background-feature-test')
            
            await expect(box).toContainText('Background Feature Test');
            
            // Check computed styles
            const styles = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    backgroundColor  : computed.backgroundColor,
                    backgroundImage  : computed.backgroundImage,
                    backgroundOrigin : computed.backgroundOrigin,
                };
            });
            
            expect(styles).toEqual({
                backgroundColor  : expectedBackgroundColor,
                backgroundImage  : expectedBackgroundImage,
                backgroundOrigin : expectedBackgroundOrigin,
            });
        });
    } // for
});
