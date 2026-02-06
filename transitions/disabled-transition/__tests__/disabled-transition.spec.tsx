import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { PNG } from 'pngjs'
import { variantKeys, variantNameLower, variantNameUpper, variantBaseColor } from './case-map.js'
import { applyFiltersSequential, expectColor } from './color-utilities.js'
import { type DisabledTransitionTestProps, DisabledTransitionTest } from './DisabledTransitionTest.js';



interface DisabledTransitionTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title         : string
    
    /**
     * Props to pass to the `<DisabledTransitionTest>` component.
     */
    props         : DisabledTransitionTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of background color.
     */
    expectedColor : string
}



const testCases: DisabledTransitionTestCase[] = [
    //#region Enabled and factor=0 → should match original base colors
    ...(['unset', 0] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                 : `${variantNameUpper[variant]} variant, factor=${factor} → expect base ${variantNameLower[variant]} color (${mode} mode)`,
                props                 : {
                    disableFactorCond : factor,
                    outlined          : variant === 'outlined',
                    mild              : variant === 'mild',
                    mode,
                },
                expectedColor         : variantBaseColor[variant],
            } satisfies DisabledTransitionTestCase))
        )
    ),
    //#endregion Enabled and factor=0 → should match original base colors
    
    
    
    //#region Active and factor=1 → should match fully filtered variant color for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                 : `${variantNameUpper[variant]} variant, factor=1 → expect fully filtered ${variantNameLower[variant]} color (${mode} mode)`,
            props                 : {
                disableFactorCond : 1,
                outlined          : variant === 'outlined',
                mild              : variant === 'mild',
                mode,
            },
            expectedColor         : applyFiltersSequential(variantBaseColor[variant], 1, {
                brightness        : 1,
                contrast          : 1,
                saturate          : 0.8,
                opacity           : 0.3,
                mode,
            }),
        } satisfies DisabledTransitionTestCase))
    ),
    //#endregion Active and factor=1 → should match fully filtered variant color for all variants
    
    
    
    //#region Partially active and factor=fractional → should match partially filtered variant color for all variants
    ...([0.25, 0.5, 0.75] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                 : `${variantNameUpper[variant]} variant, factor=${factor} → expect partially filtered ${variantNameLower[variant]} color (${mode} mode)`,
                props                 : {
                    disableFactorCond : factor,
                    outlined          : variant === 'outlined',
                    mild              : variant === 'mild',
                    mode,
                },
                expectedColor         : applyFiltersSequential(variantBaseColor[variant], factor, {
                    brightness        : 1,
                    contrast          : 1,
                    saturate          : 0.8,
                    opacity           : 0.3,
                    mode,
                }),
            } satisfies DisabledTransitionTestCase))
        )
    ),
    //#endregion Partially active and factor=fractional → should match partially filtered variant color for all variants
    
    
    
    //#region Extrapolated factors → should match extrapolated filtered variant color for all variants
    ...([-0.5, 1.5] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
            title                : `${variantNameUpper[variant]} variant, factor=${factor} → expect extrapolated ${variantNameLower[variant]} color (${mode} mode)`,
                props                 : {
                    disableFactorCond : factor,
                    outlined          : variant === 'outlined',
                    mild              : variant === 'mild',
                    mode,
                },
                expectedColor         : applyFiltersSequential(variantBaseColor[variant], factor, {
                    brightness        : 1,
                    contrast          : 1,
                    saturate          : 0.8,
                    opacity           : 0.3,
                    mode,
                }),
            } satisfies DisabledTransitionTestCase))
        )
    ),
    //#endregion Extrapolated factors → should match extrapolated filtered variant color for all variants
];


test.describe('usesDisabledTransition', () => {
    for (const { title, props, expectedColor } of testCases) {
        test(title, async ({ mount }) => {
            const component = await mount(<DisabledTransitionTest {...props} />);
            const box = component.getByTestId('disabled-transition-test')
            
            await expect(box).toContainText('Disabled Transition Test');
            
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
