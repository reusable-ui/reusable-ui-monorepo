import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { PNG } from 'pngjs'
import { regularBaseColor } from './base-colors.js'
import { variantKeys, variantNameLower, variantNameUpper, variantBaseColor } from './case-map.js'
import { colorMix, applyFiltersSequential, expectColor } from './color-utilities.js'
import { type ActiveTransitionTestProps, ActiveTransitionTest } from './ActiveTransitionTest.js';



interface ActiveTransitionTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title         : string
    
    /**
     * Props to pass to the `<ActiveTransitionTest>` component.
     */
    props         : ActiveTransitionTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of background color.
     */
    expectedColor : string
}



const testCases: ActiveTransitionTestCase[] = [
    //#region Inactive and factor=0 → should match original base colors for all variants
    ...(['unset', 0] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                : `${variantNameUpper[variant]} variant, factor=${factor} → expect base ${variantNameLower[variant]} color (${mode} mode)`,
                props                : {
                    activeFactorCond : factor,
                    outlined         : variant === 'outlined',
                    mild             : variant === 'mild',
                    mode,
                },
                expectedColor        : variantBaseColor[variant],
            } satisfies ActiveTransitionTestCase))
        )
    ),
    //#endregion Inactive and factor=0 → should match original base colors for all variants
    
    
    
    //#region Active and factor=1 → should match fully filtered regular color for regular variant
    ...(['light', 'dark'] as const).map((mode) => ({
        title                : `Regular variant, factor=1 → expect fully filtered regular color (${mode} mode)`,
        props                : {
            activeFactorCond : 1,
            outlined         : false,
            mild             : false,
            mode,
        },
        expectedColor        : applyFiltersSequential(regularBaseColor, 1, {
            brightness       : 0.8,
            contrast         : 1,
            saturate         : 1,
            mode,
        }),
    } satisfies ActiveTransitionTestCase)),
    //#endregion Active and factor=1 → should match fully filtered regular color for regular variant
    
    
    
    //#region Active and factor=1 → should match pure regular color for outlined/mild variants
    ...(['outlined', 'mild'] as const).flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                : `${variantNameUpper[variant]} variant, factor=1 → expect pure regular color (${mode} mode)`,
            props                : {
                activeFactorCond : 1,
                outlined         : variant === 'outlined',
                mild             : variant === 'mild',
                mode,
            },
            expectedColor        : regularBaseColor,
        } satisfies ActiveTransitionTestCase))
    ),
    //#endregion Active and factor=1 → should match pure regular color for outlined/mild variants
    
    
    
    //#region Partially active and factor=fractional → should match partially filtered regular color for regular variant
    ...([0.25, 0.5, 0.75] as const).flatMap((midFactor) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                : `Regular variant, factor=${midFactor} → expect partially filtered regular color (${mode} mode)`,
            props                : {
                activeFactorCond : midFactor,
                outlined         : false,
                mild             : false,
                mode,
            },
            expectedColor        : applyFiltersSequential(regularBaseColor, midFactor, {
                brightness       : 0.8,
                contrast         : 1,
                saturate         : 1,
                mode,
            }),
        } satisfies ActiveTransitionTestCase))
    ),
    //#endregion Partially active and factor=fractional → should match partially filtered regular color for regular variant
    
    
    
    //#region Partially active and factor=fractional → should match halfway between variant and regular color for outlined/mild variants
    ...([0.25, 0.5, 0.75] as const).flatMap((midFactor) =>
        (['outlined', 'mild'] as const).flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                : `${variantNameUpper[variant]} variant, factor=${midFactor} → expect halfway between ${variantNameLower[variant]} and regular color (${mode} mode)`,
                props                : {
                    activeFactorCond : midFactor,
                    outlined         : variant === 'outlined',
                    mild             : variant === 'mild',
                    mode,
                },
                expectedColor        : colorMix(variantBaseColor[variant], regularBaseColor, midFactor),
            } satisfies ActiveTransitionTestCase))
        )
    ),
    //#endregion Partially active and factor=fractional → should match halfway between variant and regular color for outlined/mild variants
    
    
    
    //#region Extrapolated factors → should match extrapolated filtered regular color for regular variant
    ...([-0.25, 1.15] as const).flatMap((factor) =>
        (['light', 'dark'] as const).map((mode) => ({
        title                : `Regular variant, factor=${factor} → expect extrapolated regular color (${mode} mode)`,
            props                : {
                activeFactorCond : factor,
                outlined         : false,
                mild             : false,
                mode,
            },
            expectedColor        : applyFiltersSequential(regularBaseColor, factor, {
                brightness   : 0.8,
                contrast     : 1,
                saturate     : 1,
                mode,
            }),
        } satisfies ActiveTransitionTestCase))
    ),
    //#endregion Extrapolated factors → should match extrapolated filtered regular color for regular variant
    
    
    
    //#region Extrapolated factors → should match extrapolated filtered regular color for outlined/mild variants
    ...([-0.5, 1.5] as const).flatMap((factor) =>
        (['outlined', 'mild'] as const).flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
            title                : `${variantNameUpper[variant]} variant, factor=${factor} → expect extrapolated regular color (${mode} mode)`,
                props                : {
                    activeFactorCond : factor,
                    outlined         : variant === 'outlined',
                    mild             : variant === 'mild',
                    mode,
                },
                expectedColor        : applyFiltersSequential(
                    colorMix(variantBaseColor[variant], regularBaseColor, factor),
                    (
                        Math.max(0, factor - 1)
                        +
                        Math.min(0, factor)
                    ),
                    {
                        brightness   : 0.8,
                        contrast     : 1,
                        saturate     : 1,
                        mode,
                    }
                ),
            } satisfies ActiveTransitionTestCase))
        )
    ),
    //#endregion Extrapolated factors → should match extrapolated filtered regular color for outlined/mild variants
];


test.describe('usesActiveTransition', () => {
    for (const { title, props, expectedColor } of testCases) {
        test(title, async ({ mount }) => {
            const component = await mount(<ActiveTransitionTest {...props} />);
            const box = component.getByTestId('active-transition-test')
            
            await expect(box).toContainText('Active Transition Test');
            
            // Capture screenshot and analyze pixel color:
            const buffer = await box.screenshot({
                omitBackground: true, // ensure transparency is preserved
            });
            const png    = PNG.sync.read(buffer);
            
            // Compute center coordinates:
            const centerX = Math.floor(png.width / 2);
            const centerY = Math.floor(png.height / 2);
            
            // Get pixel index in RGBA array:
            const pixelIndex = (png.width * centerY + centerX) << 2;
            
            // Extract RGBA values:
            const red   = png.data[pixelIndex];
            const green = png.data[pixelIndex + 1];
            const blue  = png.data[pixelIndex + 2];
            const alpha = png.data[pixelIndex + 3];
            
            // Compare actual pixel color to expected color:
            expectColor(`rgba(${red}, ${green}, ${blue}, ${(alpha / 255).toFixed(3)})`, expectedColor);
        });
    } // for
});
