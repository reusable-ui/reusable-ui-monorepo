import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { variantKeys, variantNameUpper } from './case-map.js'
import { ringColor } from './base-colors.js'
import { expectColor } from './color-utilities.js'
import { type FocusTransitionTestProps, FocusTransitionTest } from './FocusTransitionTest.js';



interface FocusTransitionTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title         : string
    
    /**
     * Props to pass to the `<FocusTransitionTest>` component.
     */
    props         : FocusTransitionTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected result of box shadow width, in pixels.
     * 
     * `null` to expect no box shadow.
     * `0` to expect invisible box shadow.
     */
    expectedBoxShadowWidth : number | null
    
    /**
     * The expected result of box shadow color.
     * 
     * `undefined` to skip color verification.
     */
    expectedBoxShadowColor : string | undefined
}



const testCases: FocusTransitionTestCase[] = [
    //#region Blurred → no box shadow for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                  : `${variantNameUpper[variant]} variant, factor=unset → expect no box shadow (${mode} mode)`,
            props                  : {
                focusFactorCond    : 'unset',
                outlined           : variant === 'outlined',
                mild               : variant === 'mild',
                mode,
            },
            expectedBoxShadowWidth : null,
            expectedBoxShadowColor : undefined,
        } satisfies FocusTransitionTestCase))
    ),
    //#endregion Blurred → no box shadow for all variants
    
    
    
    //#region Focused and factor=0 → invisible box shadow for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                  : `${variantNameUpper[variant]} variant, factor=0 → expect invisible focus ring (${mode} mode)`,
            props                  : {
                focusFactorCond    : 0,
                outlined           : variant === 'outlined',
                mild               : variant === 'mild',
                mode,
            },
            expectedBoxShadowWidth : 0,
            expectedBoxShadowColor : ringColor,
        } satisfies FocusTransitionTestCase))
    ),
    //#endregion Focused and factor=0 → invisible box shadow for all variants
    
    
    
    //#region Focused and factor=1 → fully expanded box shadow width for all variants
    ...variantKeys.flatMap((variant) =>
        (['light', 'dark'] as const).map((mode) => ({
            title                  : `${variantNameUpper[variant]} variant, factor=1 → expect full focus ring (${mode} mode)`,
            props                  : {
                focusFactorCond    : 1,
                outlined           : variant === 'outlined',
                mild               : variant === 'mild',
                mode,
            },
            expectedBoxShadowWidth : 1 * 4, // The configured focus ring width is 4px.
            expectedBoxShadowColor : ringColor,
        } satisfies FocusTransitionTestCase))
    ),
    //#endregion Focused and factor=1 → fully expanded box shadow width for all variants
    
    
    
    //#region Partially focused and factor=fractional → partially expanded box shadow width for all variants
    ...([0.25, 0.5, 0.75] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                  : `${variantNameUpper[variant]} variant, factor=${factor} → expect partial focus ring (${mode} mode)`,
                props                  : {
                    focusFactorCond    : factor,
                    outlined           : variant === 'outlined',
                    mild               : variant === 'mild',
                    mode,
                },
                expectedBoxShadowWidth : factor * 4, // The configured focus ring width is 4px.
                expectedBoxShadowColor : ringColor,
            } satisfies FocusTransitionTestCase))
        )
    ),
    //#endregion Partially focused and factor=fractional → partially expanded box shadow width for all variants
    
    
    
    //#region Extrapolated factors → overshoot or clamp expanded box shadow width for all variants
    ...([-0.5, 1.5] as const).flatMap((factor) =>
        variantKeys.flatMap((variant) =>
            (['light', 'dark'] as const).map((mode) => ({
                title                  : `${variantNameUpper[variant]} variant, factor=${factor} → expect ${factor < 0 ? 'clamped to zero' : 'overshoot'} focus ring (${mode} mode)`,
                props                  : {
                    focusFactorCond    : factor,
                    outlined           : variant === 'outlined',
                    mild               : variant === 'mild',
                    mode,
                },
                expectedBoxShadowWidth : Math.max(0, factor * 4), // The configured focus ring width is 4px.
                expectedBoxShadowColor : ringColor,
            } satisfies FocusTransitionTestCase))
        )
    ),
    //#endregion Extrapolated factors → overshoot or clamp expanded box shadow width for all variants
];


test.describe('usesFocusTransition', () => {
    for (const { title, props, expectedBoxShadowWidth, expectedBoxShadowColor } of testCases) {
        test(title, async ({ mount }) => {
            const component = await mount(<FocusTransitionTest {...props} />);
            const box = component.getByTestId('focus-transition-test')
            
            await expect(box).toContainText('Focus Transition Test');
            
            // Verify that the rendered box-shadow matches the expected focus ring width:
            if (expectedBoxShadowWidth === null) {
                // No ring expected → the box should have no box-shadow at all.
                await expect(box).toHaveCSS('box-shadow', 'none');
            }
            else {
                // A ring is expected → extract and compare its width.
                
                // Read the computed box-shadow style from the element.
                const boxShadow = await box.evaluate((el) => {
                    const style = window.getComputedStyle(el);
                    return style.boxShadow;
                });
                
                // Parse the box-shadow string to extract the spread radius.
                // Typical format: "oklch(0.5 0.3 265 / 0.5) 0px 0px 0px 4px"
                // Regex breakdown:
                // - (?<color>(?:rgba?|oklch)\([^)]+\)) → captures the color function (rgb, rgba, or oklch)
                // - 0px 0px 0px                        → matches offset-x, offset-y, and blur-radius (all zero here)
                // - (?<spread>[0-9.]+)px               → captures the numeric spread radius value
                const boxShadowWidthMatch = boxShadow.match(
                    /(?<color>(?:rgba?|oklch)\([^)]+\))\s+0px\s+0px\s+0px\s+(?<spread>[0-9.]+)px/
                );
                
                // Ensure the regex matched successfully.
                expect(boxShadowWidthMatch).not.toBeNull();
                
                // Convert the captured spread radius string into a number.
                const boxShadowWidth = parseFloat(boxShadowWidthMatch?.groups?.spread ?? 'NaN');
                
                // Compare the actual width to the expected width,
                // allowing a small tolerance (2 decimal places).
                expect(boxShadowWidth).toBeCloseTo(expectedBoxShadowWidth, 2);
            } // if
            
            // Verify that the rendered box-shadow color matches the expected focus ring color:
            if (expectedBoxShadowColor !== undefined) {
                // A color is expected → extract and compare it.
                const boxShadow = await box.evaluate((el) => {
                    const style = window.getComputedStyle(el);
                    return style.boxShadow;
                });
                
                // Parse the box-shadow string to extract the color.
                const boxShadowColorMatch = boxShadow.match(
                    /(?<color>(?:rgba?|oklch)\([^)]+\))\s+0px\s+0px\s+0px\s+[0-9.]+px/
                );
                // Ensure the regex matched successfully.
                expect(boxShadowColorMatch).not.toBeNull();
                const boxShadowColor = boxShadowColorMatch?.groups?.color ?? '';
                
                // Compare the actual color to the expected color:
                expectColor(boxShadowColor, expectedBoxShadowColor);
            } // if
        });
    } // for
});
