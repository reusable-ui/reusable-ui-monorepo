import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import {
    variantKeys,
    variantNameUpper,
    
    variantBaseColor,
    variantValidBaseColor,
    variantInvalidBaseColor,
} from './case-map.js'
import { expectColor } from './color-utilities.js'
import { type ValidityEffectTestProps, ValidityEffectTest } from './ValidityEffectTest.js';
import chroma from 'chroma-js'



interface ValidityEffectTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title                   : string
    
    /**
     * Props to pass to the `<ValidityEffectTest>` component.
     */
    props                   : ValidityEffectTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of background color.
     * 
     * `undefined` to skip color verification.
     */
    expectedBackgroundColor : string | undefined
}



const testCases: ValidityEffectTestCase[] = [
    // Unvalidated → expect no switching to validity colors for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                   : `${variantNameUpper[variant]} variant, factor=unset → expect no switching to validity colors (${mode} mode)`,
            props                   : {
                validityFactorCond  : 'unset',
                outlined            : variant === 'outlined',
                mild                : variant === 'mild',
                mode,
            },
            expectedBackgroundColor : variantBaseColor[variant],
        } satisfies ValidityEffectTestCase))
    ),
    
    
    
    // Valid with factor=0 → expect no switching to validity colors for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                   : `${variantNameUpper[variant]} variant, factor=0 → expect no switching to validity colors (${mode} mode)`,
            props                   : {
                validityFactorCond  : 0,
                outlined            : variant === 'outlined',
                mild                : variant === 'mild',
                mode,
            },
            expectedBackgroundColor : variantBaseColor[variant],
        } satisfies ValidityEffectTestCase))
    ),
    
    
    
    // Valid with factor=1 → expect fully switching to valid colors for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                   : `${variantNameUpper[variant]} variant, factor=1 → expect fully switching to valid colors (${mode} mode)`,
            props                   : {
                validityFactorCond  : +1,
                outlined            : variant === 'outlined',
                mild                : variant === 'mild',
                mode,
            },
            expectedBackgroundColor : variantValidBaseColor[variant],
        } satisfies ValidityEffectTestCase))
    ),
    
    
    
    // Invalid with factor=1 → expect fully switching to invalid colors for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                   : `${variantNameUpper[variant]} variant, factor=1 → expect fully switching to invalid colors (${mode} mode)`,
            props                   : {
                validityFactorCond  : -1,
                outlined            : variant === 'outlined',
                mild                : variant === 'mild',
                mode,
            },
            expectedBackgroundColor : variantInvalidBaseColor[variant],
        } satisfies ValidityEffectTestCase))
    ),
    
    
    
    // Partially valid with factor=fractional → expect partially switching to valid colors for all variants
    ...([+0.25, +0.5, +0.75] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                   : `${variantNameUpper[variant]} variant, factor=${factor} → expect partially switching to valid colors (${mode} mode)`,
                props                   : {
                    validityFactorCond  : factor,
                    outlined            : variant === 'outlined',
                    mild                : variant === 'mild',
                    mode,
                },
                
                // Use browser's color-mix() to calculate the expected color:
                expectedBackgroundColor : `color-mix(in oklch, ${variantBaseColor[variant]} ${(1 - factor) * 100}%, ${variantValidBaseColor[variant]} ${factor * 100}%)`,
                
                // // Use our colorRatioMix utility to calculate the expected color:
                // expectedBackgroundColor : colorRatioMix(
                //     variantBaseColor[variant],
                //     variantValidBaseColor[variant],
                //     factor
                // ),
            } satisfies ValidityEffectTestCase))
        )
    ),
    
    
    
    // Partially invalid with factor=fractional → expect partially switching to invalid colors for all variants
    ...([-0.25, -0.5, -0.75] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                   : `${variantNameUpper[variant]} variant, factor=${factor} → expect partially switching to invalid colors (${mode} mode)`,
                props                   : {
                    validityFactorCond  : factor,
                    outlined            : variant === 'outlined',
                    mild                : variant === 'mild',
                    mode,
                },
                
                // Use browser's color-mix() to calculate the expected color:
                expectedBackgroundColor : `color-mix(in oklch, ${variantBaseColor[variant]} ${(1 - (factor * -1)) * 100}%, ${variantInvalidBaseColor[variant]} ${(factor * -1) * 100}%)`,
                
                // // Use our colorRatioMix utility to calculate the expected color:
                // expectedBackgroundColor : colorRatioMix(
                //     variantBaseColor[variant],
                //     variantValidBaseColor[variant],
                //     factor * -1
                // ),
            } satisfies ValidityEffectTestCase))
        )
    ),
    
    
    
    // Extrapolated factors → expect clamped switching to invalid colors for all variants
    ...([-2, -1.5, +1.5, +2] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                   : `${variantNameUpper[variant]} variant, factor=${factor} → expect clamped switching to invalid colors (${mode} mode)`,
                props                   : {
                    validityFactorCond  : factor,
                    outlined            : variant === 'outlined',
                    mild                : variant === 'mild',
                    mode,
                },
                expectedBackgroundColor : (factor > 1) ? variantValidBaseColor[variant] : variantInvalidBaseColor[variant],
            } satisfies ValidityEffectTestCase))
        )
    ),
];



test.describe('usesValidityEffect', () => {
    for (const { title, props, expectedBackgroundColor } of testCases) {
        test(title, async ({ mount }) => {
            const red = chroma('oklch(0.627966 0.257704 29.2346)');
            const green = chroma('oklch(0.519749 0.176837 142.489)');
            const mix = chroma.mix('red', 'green', 1, 'oklch');
            const component = await mount(<ValidityEffectTest {...props} />);
            const box = component.getByTestId('validity-effect-test')
            
            // Verify the component renders correctly:
            await expect(box).toContainText('Validity Effect Test');
            
            // Allow time for stylesheets to fully apply:
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            // Verify that the rendered background color matches the expected color:
            if (expectedBackgroundColor !== undefined) {
                // A color is expected → extract and compare it.
                const backgroundColor = await box.evaluate((el) => {
                    const style = window.getComputedStyle(el);
                    return style.backgroundColor;
                });
                
                const resolvedExpectedBackgroundColor = (
                    !expectedBackgroundColor.startsWith('color-mix(')
                    
                    // If the expected color is not a color-mix() expression, use it directly:
                    ? expectedBackgroundColor
                    
                    // Use the browser's color parser to resolve the expected color, especially for color-mix() results:
                    : await box.evaluate((el, expectedBackgroundColor) => {
                        el.style.color = expectedBackgroundColor;
                        const style = window.getComputedStyle(el);
                        return style.color;
                    }, expectedBackgroundColor)
                );
                
                // Compare the actual color to the expected color:
                expectColor(backgroundColor, resolvedExpectedBackgroundColor);
            } // if
        });
    } // for
});
