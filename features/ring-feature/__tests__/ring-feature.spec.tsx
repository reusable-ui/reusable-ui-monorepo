import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type RingFeatureTestProps, RingFeatureTest } from './RingFeatureTest.js';



interface RingFeatureTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                     : string
    
    /**
     * Props to pass to the `<RingFeatureTest>` component.
     * Set to `undefined` for no props.
     */
    props                    ?: RingFeatureTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of ring color.
     */
    expectedRingColor   : string
}



//#region 🎨 Expected style values
const REGULAR_RING_COLORS  = {
    primary   : 'oklch(0.58 0.228 260 / 0.5)',
    secondary : 'oklch(0.56 0.017 245 / 0.5)',
    success   : 'oklch(0.55 0.123 157 / 0.5)',
    info      : 'oklch(0.77 0.138 218 / 0.5)',
    warning   : 'oklch(0.84 0.172 85 / 0.5)',
    danger    : 'oklch(0.59 0.202 21 / 0.5)',
    light     : 'oklch(0.98 0.002 248 / 0.5)',
    dark      : 'oklch(0.26 0.01 248 / 0.5)',
};
const OUTLINED_RING_COLORS = REGULAR_RING_COLORS;
const MILD_RING_COLORS     = REGULAR_RING_COLORS;

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
const parseOklch = (color: string): [number, number, number, number | undefined] | null => {
    const match = color.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/);
    if (!match) return null;
    return [
        parseFloat(match[1]), // lightness
        parseFloat(match[2]), // chroma
        parseFloat(match[3]), // hue
        parseFloat(match[4] ?? undefined), // optional alpha
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
    
    
    
    for (let i = 0; i < 4; i++) {
        const deviation = Math.abs((actual[i] ?? 1) - (expected[i] ?? 1));
        if (deviation > MAX_DEVIATION) {
            throw new Error(
`Color mismatch on channel ${['lightness', 'chroma', 'hue', 'alpha'][i]}:
Expected:  ${expected[i]}
Actual:    ${actual[i]}
Deviation: ${deviation} (max allowed: ${MAX_DEVIATION})`
);
        } // if
    } // for
}
//#endregion Utilities



test.describe('usesRingFeature', () => {
    for (const { title, props, expectedRingColor } of [
        ...THEME_NAMES.flatMap((themeName): RingFeatureTestCase[] => [
            //#region No prop activated
            {
                title                    : `[${themeName}] no variant => should render regular style`,
                props                    : {
                    theme                : themeName,
                    
                    // no variant
                },
                expectedRingColor  : REGULAR_RING_COLORS[themeName],
            },
            //#endregion No prop activated
            
            
            
            //#region One prop activated
            {
                title                    : `[${themeName}] emphasized => should render regular style, emphasized ignored`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                },
                expectedRingColor  : REGULAR_RING_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] outlined => should render outlined style`,
                props                    : {
                    theme                : themeName,
                    
                    outlined             : true,
                },
                expectedRingColor  : OUTLINED_RING_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] mild => should render mild style`,
                props                    : {
                    theme                : themeName,
                    
                    mild                 : true,
                },
                expectedRingColor  : MILD_RING_COLORS[themeName],
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
                expectedRingColor  : OUTLINED_RING_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] emphasized + mild => should render mild style, emphasized ignored`,
                props                    : {
                    theme                : themeName,
                    
                    emphasized           : true,
                    mild                 : true,
                },
                expectedRingColor  : MILD_RING_COLORS[themeName],
            },
            {
                title                    : `[${themeName}] outlined + mild => should render outlined style, mild ignored`,
                props                    : {
                    theme                : themeName,
                    
                    outlined             : true,
                    mild                 : true,
                },
                expectedRingColor  : OUTLINED_RING_COLORS[themeName],
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
                expectedRingColor  : OUTLINED_RING_COLORS[themeName],
            },
            //#endregion Three prop activated
        ]),
    ] satisfies RingFeatureTestCase[]) {
        test(title, async ({ mount }) => {
            const component = await mount(<RingFeatureTest {...(props ?? {})} />);
            const box = component.getByTestId('ring-feature-test')
            
            await expect(box).toContainText('Ring Feature Test');
            
            // Check computed styles
            const styles = await box.evaluate(async (element) => {
                // Wait for a brief moment to ensure the styling has fully applied:
                await new Promise<void>((resolve) => {
                    setTimeout(resolve, 500);
                });
                
                // Peek the style:
                const computed = getComputedStyle(element);
                return {
                    ringColor  : computed.color,
                };
            });
            
            expectColor(styles.ringColor, expectedRingColor);
        });
    } // for
});
