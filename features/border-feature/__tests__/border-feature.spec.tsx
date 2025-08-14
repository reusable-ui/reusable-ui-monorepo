import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type BorderFeatureTestProps, BorderFeatureTest } from './BorderFeatureTest.js';



interface BorderFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                 : string
    
    /**
     * Props to pass to the `<BorderFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props                ?: BorderFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of border color.
     */
    expectedBorderColor   : string
}



//#region 🎨 Expected style values
const REGULAR_BORDER_COLORS  = {
    primary   : 'oklch(0.232 0.0912 260)',
    secondary : 'oklch(0.224 0.0068 245)',
    success   : 'oklch(0.22 0.0492 157)',
    info      : 'oklch(0.308 0.0552 218)',
    warning   : 'oklch(0.336 0.0688 85)',
    danger    : 'oklch(0.236 0.0808 21)',
    light     : 'oklch(0.392 0.0008 248)',
    dark      : 'oklch(0.104 0.004 248)',
};
const OUTLINED_BORDER_COLORS = {
    primary   : 'oklch(0.551 0.2166 260)',
    secondary : 'oklch(0.532 0.01615 245)',
    success   : 'oklch(0.5225 0.11685 157)',
    info      : 'oklch(0.7315 0.1311 218)',
    warning   : 'oklch(0.798 0.1634 85)',
    danger    : 'oklch(0.5605 0.1919 21)',
    light     : 'oklch(0.931 0.0019 248)',
    dark      : 'oklch(0.247 0.0095 248)',
};
const MILD_BORDER_COLORS     = {
    primary   : 'oklch(0.29 0.114 260)',
    secondary : 'oklch(0.28 0.0085 245)',
    success   : 'oklch(0.275 0.0615 157)',
    info      : 'oklch(0.385 0.069 218)',
    warning   : 'oklch(0.42 0.086 85)',
    danger    : 'oklch(0.295 0.101 21)',
    light     : 'oklch(0.49 0.001 248)',
    dark      : 'oklch(0.13 0.005 248)',
};

const THEME_NAMES            = [
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



//#region Utilities
const parseOklch = (color: string): [number, number, number] | null => {
    const match = color.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
    if (!match) return null;
    return [
        parseFloat(match[1]), // lightness
        parseFloat(match[2]), // chroma
        parseFloat(match[3]), // hue
    ];
};

const MAX_DEVIATION = 0.001;

/**
 * Asserts that two oklch(...) color strings are equal within ±0.001 precision per channel.
 * Throws an error if any channel deviates beyond the threshold.
 */
export function expectColor(actualColor: string, expectedColor: string): void {
    if ((actualColor === 'rgba(0, 0, 0, 0)') && (expectedColor === 'rgba(0, 0, 0, 0)')) return;
    
    
    
    const actual   = parseOklch(actualColor);
    const expected = parseOklch(expectedColor);
    
    
    
    if (!actual || !expected) {
        throw new Error(
`Failed to parse oklch color:
Actual:   ${actualColor}
Expected: ${expectedColor}`
        );
    } // if
    
    
    
    for (let i = 0; i < 3; i++) {
        const deviation = Math.abs(actual[i] - expected[i]);
        if (deviation > MAX_DEVIATION) {
            throw new Error(
`Color mismatch on channel ${['lightness', 'chroma', 'hue'][i]}:
Expected: ${expected[i]}
Actual:   ${actual[i]}
Deviation: ${deviation} (max allowed: ${MAX_DEVIATION})`
);
        } // if
    } // for
}
//#endregion Utilities



test.describe('usesBorderFeature', () => {
    for (const { title, props, expectedBorderColor } of [
        ...THEME_NAMES.flatMap((themeName): BorderFeatureTestCase[] => [
            //#region No prop activated
            {
                title               : `[${themeName}] no variant => should render regular style`,
                props               : {
                    theme           : themeName,
                    
                    // no variant
                },
                expectedBorderColor : REGULAR_BORDER_COLORS[themeName],
            },
            //#endregion No prop activated
            
            
            
            //#region One prop activated
            {
                title               : `[${themeName}] emphasized => should render regular style, emphasized ignored`,
                props               : {
                    theme           : themeName,
                    
                    emphasized      : true,
                },
                expectedBorderColor : REGULAR_BORDER_COLORS[themeName],
            },
            {
                title               : `[${themeName}] outlined => should render outlined style`,
                props               : {
                    theme           : themeName,
                    
                    outlined        : true,
                },
                expectedBorderColor : OUTLINED_BORDER_COLORS[themeName],
            },
            {
                title               : `[${themeName}] mild => should render mild style`,
                props               : {
                    theme           : themeName,
                    
                    mild            : true,
                },
                expectedBorderColor : MILD_BORDER_COLORS[themeName],
            },
            //#endregion One prop activated
            
            
            
            //#region Two prop activated
            {
                title               : `[${themeName}] emphasized + outlined => should render outlined style, emphasized ignored`,
                props               : {
                    theme           : themeName,
                    
                    emphasized      : true,
                    outlined        : true,
                },
                expectedBorderColor : OUTLINED_BORDER_COLORS[themeName],
            },
            {
                title               : `[${themeName}] emphasized + mild => should render mild style, emphasized ignored`,
                props               : {
                    theme           : themeName,
                    
                    emphasized      : true,
                    mild            : true,
                },
                expectedBorderColor : MILD_BORDER_COLORS[themeName],
            },
            {
                title               : `[${themeName}] outlined + mild => should render outlined style, mild ignored`,
                props               : {
                    theme           : themeName,
                    
                    outlined        : true,
                    mild            : true,
                },
                expectedBorderColor : OUTLINED_BORDER_COLORS[themeName],
            },
            //#endregion Two prop activated
            
            
            
            //#region Three prop activated
            {
                title               : `[${themeName}] emphasized + outlined + mild => should render outlined style, mild and emphasized are ignored`,
                props               : {
                    theme           : themeName,
                    
                    emphasized      : true,
                    outlined        : true,
                    mild            : true,
                },
                expectedBorderColor : OUTLINED_BORDER_COLORS[themeName],
            },
            //#endregion Three prop activated
        ]),
    ] satisfies BorderFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<BorderFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('border-feature-test')
            
            await expect(box).toContainText('Border Feature Test');
            
            // Check computed styles
            const styles = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    borderColor  : computed.borderColor,
                };
            });
            
            expectColor(styles.borderColor, expectedBorderColor);
        });
    } // for
});
