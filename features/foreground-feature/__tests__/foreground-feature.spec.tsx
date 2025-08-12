import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type ForegroundFeatureTestProps, ForegroundFeatureTest } from './ForegroundFeatureTest.js';



interface ForegroundFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                     : string
    
    /**
     * Props to pass to the `<ForegroundFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props                    ?: ForegroundFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of foreground color.
     */
    expectedForegroundColor   : string
}



//#region 🎨 Expected style values
const REGULAR_FOREG_COLORS  = {
    primary   : 'oklch(0.958 0.0228 260)',
    secondary : 'oklch(0.956 0.0017 245)',
    success   : 'oklch(0.955 0.0123 157)',
    info      : 'oklch(0.077 0.0138 218)',
    warning   : 'oklch(0.084 0.0172 85)',
    danger    : 'oklch(0.959 0.0202 21)',
    light     : 'oklch(0.098 0.0002 248)',
    dark      : 'oklch(0.926 0.001 248)',
};
const OUTLINED_FOREG_COLORS = {
    primary   : 'oklch(0.551 0.2166 260)',
    secondary : 'oklch(0.532 0.01615 245)',
    success   : 'oklch(0.5225 0.11685 157)',
    info      : 'oklch(0.7315 0.1311 218)',
    warning   : 'oklch(0.798 0.1634 85)',
    danger    : 'oklch(0.5605 0.1919 21)',
    light     : 'oklch(0.931 0.0019 248)',
    dark      : 'oklch(0.247 0.0095 248)',
};
const MILD_FOREG_COLORS     = {
    primary   : 'oklch(0.058 0.0228 260)',
    secondary : 'oklch(0.056 0.0017 245)',
    success   : 'oklch(0.055 0.0123 157)',
    info      : 'oklch(0.077 0.0138 218)',
    warning   : 'oklch(0.084 0.0172 85)',
    danger    : 'oklch(0.059 0.0202 21)',
    light     : 'oklch(0.098 0.0002 248)',
    dark      : 'oklch(0.026 0.001 248)',
};

const THEME_NAMES           = [
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



test.describe('usesForegroundFeature', () => {
    for (const { title, props, expectedForegroundColor } of [
        ...THEME_NAMES.flatMap((themeName): ForegroundFeatureTestCase[] => [
            //#region No prop activated
            {
                title                    : `[${themeName}] no variant => should render regular style`,
                props                    : {
                    theme                : themeName,
                    
                    // no variant
                },
                expectedForegroundColor  : REGULAR_FOREG_COLORS[themeName],
            },
            //#endregion No prop activated
            
            
            
            //#region One prop activated
            {
                title                    : `[${themeName}] emphasized => should render regular style, emphasized ignored`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                },
                expectedForegroundColor  : REGULAR_FOREG_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] outlined => should render outlined style`,
                props                    : {
                    theme                : themeName,
                    
                    outlined             : true,
                },
                expectedForegroundColor  : OUTLINED_FOREG_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] mild => should render mild style`,
                props                    : {
                    theme                : themeName,
                    
                    mild                 : true,
                },
                expectedForegroundColor  : MILD_FOREG_COLORS[themeName],
            },
            //#endregion One prop activated
            
            
            
            //#region Two prop activated
            {
                title                    : `[${themeName}] emphasized + outlined => should render outlined style, emphasized ignored`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                    outlined             : true,
                },
                expectedForegroundColor  : OUTLINED_FOREG_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] emphasized + mild => should render mild style, emphasized ignored`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                    mild                 : true,
                },
                expectedForegroundColor  : MILD_FOREG_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] outlined + mild => should render outlined style, mild ignored`,
                props                    : {
                    theme                : themeName,
                    
                    outlined             : true,
                    mild                 : true,
                },
                expectedForegroundColor  : OUTLINED_FOREG_COLORS[themeName],
            },
            //#endregion Two prop activated
            
            
            
            //#region Three prop activated
            {
                title                    : `[${themeName}] emphasized + outlined + mild => should render outlined style, mild and emphasized are ignored`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                    outlined             : true,
                    mild                 : true,
                },
                expectedForegroundColor  : OUTLINED_FOREG_COLORS[themeName],
            },
            //#endregion Three prop activated
        ]),
    ] satisfies ForegroundFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<ForegroundFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('foreground-feature-test')
            
            await expect(box).toContainText('Foreground Feature Test');
            
            // Check computed styles
            const styles = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    foregroundColor  : computed.color,
                };
            });
            
            expectColor(styles.foregroundColor, expectedForegroundColor);
        });
    } // for
});
