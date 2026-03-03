import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type DisabledEffectTestProps, DisabledEffectTest } from './DisabledEffectTest.js';
import chroma from 'chroma-js'
import {
    type ExpectedDropShadow,
} from './effect-types.js';
import {
    activeTargetOpacity,
    activeTargetInvert,
    activeTargetSepia,
    activeTargetBrightness,
    activeTargetContrast,
    activeTargetSaturate,
    activeTargetHueRotate,
    activeTargetBlur,
    activeTargetDropShadow,
} from './effect-intents.js'



interface DisabledEffectTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title            : string
    
    /**
     * Props to pass to the `<DisabledEffectTest>` component.
     */
    props            : DisabledEffectTestProps
    
    // Expected Outcomes:
    expectedFilters  : {
        /** 
         * Expected opacity value (e.g., `0.5` for 50%),
         * or `null` if no opacity effect is expected.
         */
        opacity      : number | null
        
        /**
         * Expected invert value (e.g., `0.2` for 20%),
         * or `null` if no invert effect is expected.
         */
        invert       : number | null
        
        /**
         * Expected sepia value (e.g., `0.3` for 30%),
         * or `null` if no sepia effect is expected.
         */
        sepia        : number | null
        
        /** 
         * Expected brightness value (e.g., `1.3` for 130%),
         * or `null` if no brightness effect is expected.
         */
        brightness   : number | null
        
        /** 
         * Expected contrast value (e.g., `1` for 100%),
         * or `null` if no contrast effect is expected.
         */
        contrast     : number | null
        
        /** 
         * Expected saturation value (e.g., `1.2` for 120%),
         * or `null` if no saturation effect is expected.
         */
        saturate     : number | null
        
        /**
         * Expected hue-rotate value in degrees (e.g., `30` for `30deg`),
         * or `null` if no hue-rotate effect is expected.
         */
        hueRotate    : number | null
        
        /**
         * Expected blur value in pixels (e.g., `5` for `5px`),
         * or `null` if no blur effect is expected.
         */
        blur         : number | null
        
        /**
         * Expected drop-shadow value (e.g., `{ offsetX: 5, offsetY: 5, blurRadius: 10, color: 'rgba(0,0,0,0.5)' }`),
         * or `null` if no drop-shadow effect is expected.
         */
        dropShadow   : ExpectedDropShadow | null
    },
    
    /**
     * Expected cursor on disabled (e.g., `'not-allowed'`),
     * or `'pointer'` if the cursor should remain unchanged (enabled state).
     */
    expectedCursor   : 'not-allowed' | 'pointer'
}



const testCases: DisabledEffectTestCase[] = [
    // Inactive → no effects
    {
        title            : 'factor=unset → expect no effects',
        props            : {
            activeFactor : 'unset',
            isDisabled   : false,
        },
        expectedFilters  : {
            opacity      : null,
            invert       : null,
            sepia        : null,
            brightness   : null,
            contrast     : null,
            saturate     : null,
            hueRotate    : null,
            blur         : null,
            dropShadow   : null,
        },
        expectedCursor   : 'pointer',
    } satisfies DisabledEffectTestCase,
    
    // factor=0 → baseline neutral (or configured if reverse intent)
    {
        title            : 'factor=0 → expect baseline neutral effects',
        props            : {
            activeFactor : 0,
            isDisabled   : true, // The factor is 0 but going to be 1 when disabled, so we set `isDisabled` to `true` to trigger the effect application logic.
        },
        expectedFilters  : {
            opacity      : 1,
            invert       : 0,
            sepia        : 0,
            brightness   : 1,
            contrast     : 1,
            saturate     : 1,
            hueRotate    : 0,
            blur         : 0,
            dropShadow   : {
                offsetX  : 0,
                offsetY  : 0,
                blur     : 0,
                color    : 'transparent',
            },
        },
        expectedCursor   : 'not-allowed',
    } satisfies DisabledEffectTestCase,
    
    // factor=1 → fully configured (or baseline neutral if reverse intent)
    {
        title            : 'factor=1 → expect fully configured effects',
        props            : {
            activeFactor : 1,
            isDisabled   : true,
        },
        expectedFilters  : {
            opacity      : activeTargetOpacity,
            invert       : activeTargetInvert,
            sepia        : activeTargetSepia,
            brightness   : activeTargetBrightness,
            contrast     : activeTargetContrast,
            saturate     : activeTargetSaturate,
            hueRotate    : activeTargetHueRotate,
            blur         : activeTargetBlur,
            dropShadow   : activeTargetDropShadow,
        },
        expectedCursor   : 'not-allowed',
    } satisfies DisabledEffectTestCase,
    
    // factor=fractional → partial interpolation
    ...([0.25, 0.5, 0.75] as const).flatMap((factor) => ({
            title            : `factor=${factor} → expect partial effects`,
            props            : {
                activeFactor : factor,
                isDisabled   : true,
            },
            expectedFilters  : {
                opacity      : 1 - (1 - activeTargetOpacity   ) * factor,
                invert       :          activeTargetInvert      * factor,
                sepia        :          activeTargetSepia       * factor,
                brightness   : 1 - (1 - activeTargetBrightness) * factor,
                contrast     : 1 - (1 - activeTargetContrast  ) * factor,
                saturate     : 1 - (1 - activeTargetSaturate  ) * factor,
                hueRotate    :          activeTargetHueRotate   * factor,
                blur         :          activeTargetBlur        * factor,
                dropShadow   : {
                    offsetX  : activeTargetDropShadow.offsetX * factor,
                    offsetY  : activeTargetDropShadow.offsetY * factor,
                    blur     : activeTargetDropShadow.blur    * factor,
                    color    : chroma(activeTargetDropShadow.color).alpha(factor).css(),
                },
            },
            expectedCursor   : 'not-allowed',
        } satisfies DisabledEffectTestCase
    )),
    
    // factor beyond range → extrapolated but clamped/limited
    ...([-0.5, 1.5] as const).flatMap((factor) => ({
            title            : `factor=${factor} → expect extrapolated effects`,
            props            : {
                activeFactor : factor,
                isDisabled   : true,
            },
            expectedFilters  : {
                opacity      : Math.min(1, Math.max(0, 1 - (1 - activeTargetOpacity   ) * factor)),
                invert       : Math.min(1, Math.max(0,          activeTargetInvert      * factor)),
                sepia        : Math.min(1, Math.max(0,          activeTargetSepia       * factor)),
                brightness   :             Math.max(0, 1 - (1 - activeTargetBrightness) * factor),
                contrast     :             Math.max(0, 1 - (1 - activeTargetContrast  ) * factor),
                saturate     :             Math.max(0, 1 - (1 - activeTargetSaturate  ) * factor),
                hueRotate    :                                  activeTargetHueRotate   * factor,
                blur         :             Math.max(0,          activeTargetBlur        * factor),
                dropShadow   : {
                    offsetX  : activeTargetDropShadow.offsetX * factor,
                    offsetY  : activeTargetDropShadow.offsetY * factor,
                    blur     : Math.max(0, activeTargetDropShadow.blur  * factor),
                    color    : chroma(activeTargetDropShadow.color).alpha(factor).css(),
                },
            },
            expectedCursor   : 'not-allowed',
        } satisfies DisabledEffectTestCase
    )),
];



/**
 * Utility to convert camelCase JavaScript style property names to kebab-case for CSS access.
 * E.g., "hueRotate" → "hue-rotate"
 * This is needed if we want to map our expected filter properties (defined in camelCase) to the actual CSS filter function names (in kebab-case).
 */
const toKebabCase = (input: string): string => input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();



test.describe('usesDisabledEffect', () => {
    for (const { title, props, expectedFilters, expectedCursor } of testCases) {
        test(title, async ({ mount }) => {
            const component = await mount(<DisabledEffectTest {...props} />);
            const box = component.getByTestId('disabled-effect-test');
            
            // Verify the component renders correctly:
            await expect(box).toContainText('Disabled Effect Test');
            
            // Allow time for stylesheets to fully apply:
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            // Extract computed filter string from the element:
            const computedFilter = await box.evaluate((el) => getComputedStyle(el).filter);
            
            // Split into individual filter functions (e.g., "brightness(1.1)", "hue-rotate(30deg)", "drop-shadow(oklch(0 0 none / 0) 0px 0px 0px)"):
            // - Match filter functions with nested parentheses inside arguments
            const filterFunctions = computedFilter.match(/([a-z-]+\((?:[^()]|\([^()]*\))*\))/gi) || [];
            
            // Convert into a dictionary { opacity: "0.5", brightness: "1.1", hue-rotate: "30deg", drop-shadow: "oklch(0 0 none / 0) 0px 0px 0px" }:
            const filterMap: Record<string, string> = {};
            for (const fn of filterFunctions) {
                // Match "name(...)" with nested parentheses inside
                const match = fn.match(/^([a-z-]+)\((.*)\)$/i);
                if (!match) continue;
                
                const [, name, value] = match;
                filterMap[name] = value.trim();
            }
            
            // Validate each expected filter:
            for (const [filterName, expectedValue] of Object.entries(expectedFilters)) {
                const kebabName = toKebabCase(filterName);
                
                if (expectedValue === null) {
                    // Expect the filter not to be present:
                    expect(filterMap[kebabName]).toBeUndefined();
                }
                else if (filterName === 'dropShadow') {
                    const args = filterMap['drop-shadow'];
                    // Example: "oklch(0 0 none / 0.25) 1.25px 2.5px 2px"
                    
                    // Match: color (could be a function or keyword), then three pixel values
                    const colorMatch = args.match(/^(.*?)\s(-?\d+(?:\.\d+)?px)\s(-?\d+(?:\.\d+)?px)\s(-?\d+(?:\.\d+)?px)$/);
                    
                    const [, color, offsetX, offsetY, blur] = colorMatch!;
                    const actualDropShadow: ExpectedDropShadow = {
                        offsetX: parseFloat(offsetX),
                        offsetY: parseFloat(offsetY),
                        blur: parseFloat(blur),
                        color: color.trim(),
                    };
                    
                    // Allow up to 1px difference for Safari rounding:
                    expect(Math.abs(actualDropShadow.offsetX - (expectedValue as ExpectedDropShadow).offsetX)).toBeLessThan(1);
                    expect(Math.abs(actualDropShadow.offsetY - (expectedValue as ExpectedDropShadow).offsetY)).toBeLessThan(1);
                    
                    // Blur radius usually isn't rounded, so keep normal tolerance:
                    expect(actualDropShadow.blur).toBeCloseTo((expectedValue as ExpectedDropShadow).blur, 1);
                    
                    // For color comparison, use chroma.js to compute perceptual difference (ΔE) between actual and expected colors:
                    const actualColor = chroma(actualDropShadow.color);
                    const expectedColor = chroma((expectedValue as ExpectedDropShadow).color);
                    const deltaE = chroma.deltaE(actualColor, expectedColor);
                    expect(deltaE).toBeLessThan(2); // Allow perceptual difference within a reasonable threshold
                    expect(actualColor.alpha()).toBeCloseTo(expectedColor.alpha(), 0.01); // Also compare alpha values closely
                }
                else if (filterName === 'hueRotate') {
                    // hue-rotate values are in degrees
                    const actual = filterMap['hue-rotate'];
                    expect(actual).toBeDefined();
                    expect(parseFloat(actual)).toBeCloseTo(expectedValue as number, 1);
                }
                else if (filterName === 'blur') {
                    // blur values are in pixels
                    const actual = filterMap['blur'];
                    expect(actual).toBeDefined();
                    expect(parseFloat(actual)).toBeCloseTo(expectedValue as number, 1);
                }
                else {
                    // Numeric filters (opacity, invert, sepia, brightness, contrast, saturate)
                    const actual = filterMap[kebabName];
                    expect(actual).toBeDefined();
                    expect(parseFloat(actual)).toBeCloseTo(expectedValue as number, 3);
                } // if
            } //for
            
            // Validate text decoration:
            const computedCursor = await box.evaluate((el) => getComputedStyle(el).cursor);
            expect(computedCursor).toBe(expectedCursor);
        });
    }
});
