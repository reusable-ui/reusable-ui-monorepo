import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ValidityStateInFormTest } from './ValidityStateInFormTest.js';



/**
 * Represents a single test scenario for validating validity state transitions.
 */
interface ValidityStateTransitionTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title             : string
    
    /**
     * Initial validity state.
     * - `true`   : valid
     * - `false`  : invalid
     * - `null`   : unvalidated
     */
    validity          : boolean | null
    
    /**
     * A sequence of updates applied to the validity state, including expected outcomes.
     */
    updates           : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for validity state.
         * Set to `undefined` to skip updating this part.
         */
        validity                ?: boolean | null
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay                   ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected color in `rgb(r, g, b)` of the invalidable element.
         * - `string`    : expected color in `rgb(r, g, b)`
         * - `undefined` : nothing to expect
         */
        expectedColor           ?: string
    }[]
}



const COLOR_VALID       = 'color(srgb 0 1 0)';
const COLOR_INVALID     = 'color(srgb 1 0 0)';
const COLOR_UNVALIDATED = 'color(srgb 0 0 1)';



/**
 * Global threshold for channel deviation (0–255).
 */
export const COLOR_THRESHOLD = 50 / 100 * 255; // 50% of full range

/**
 * Parses a color string into [r, g, b] values in the 0–255 range,
 * ignoring the alpha channel.
 * 
 * Supported formats:
 * - `rgb(255, 0, 0)`
 * - `rgba(255, 0, 0, 0.8)`
 * - `color(srgb 0 0.333333 0.666667)`
 * - `color(srgb 0 0.333333 0.666667 / 0.75)`
 * - `color(srgb-linear 0 0.333333 0.666667)`
 * - `color(srgb-linear 0 0.333333 0.666667 / 0.75)`
 */
const parseColor = (color: string): [number, number, number] => {
    // Match rgb/rgba
    let match = color.match(
        /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)$/
    );
    if (match) {
        return [Number(match[1]), Number(match[2]), Number(match[3])];
    }
    
    // Match color(srgb …) or color(srgb-linear …)
    match = color.match(
        /^color\((srgb|srgb-linear)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\)$/
    );
    if (match) {
        const [, space, r, g, b] = match;
        const rn = Number(r);
        const gn = Number(g);
        const bn = Number(b);
        
        if (space === "srgb") {
            // srgb values are normalized 0–1
            return [
                Math.round(rn * 255),
                Math.round(gn * 255),
                Math.round(bn * 255),
            ];
        } else {
            // srgb-linear values are also normalized 0–1,
            // but in linear-light space. For simplicity we map directly.
            // If you need gamma correction, apply pow(val, 1/2.2) before scaling.
            return [
                Math.round(rn * 255),
                Math.round(gn * 255),
                Math.round(bn * 255),
            ];
        }
    }
    
    throw new Error(`Invalid color format: ${color}`);
};

/**
 * Compares two colors with a configurable threshold.
 * Throws an error if the colors differ beyond the threshold.
 * 
 * @param actual - The actual color string (e.g. 'color(srgb 0 0.333 0.666)')
 * @param expected - The expected color string (e.g. 'rgb(85, 85, 170)')
 */
export const expectColor = (
    actual: string,
    expected: string,
    threshold: number = COLOR_THRESHOLD
): void => {
    const [r1, g1, b1] = parseColor(actual);
    const [r2, g2, b2] = parseColor(expected);
    
    const delta = Math.max(
        Math.abs(r1 - r2),
        Math.abs(g1 - g2),
        Math.abs(b1 - b2)
    );
    
    if (delta > threshold) {
        throw new Error(
            `Color mismatch: expected approx ${expected}, but got ${actual} (Δ=${delta} > ${threshold})`
        );
    }
    else {
        console.info(`Color match: expected approx ${expected}, got ${actual} (Δ=${delta} ≤ ${threshold})`);
    }
};



test.describe('useValidityBehaviorState - animation', () => {
    for (const { title, validity : initialValidity, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title            : 'Transition: valid → invalid',
            validity         : true,
            updates          : [
                {
                    title                   : 'Ensure the stylesheet is applied',
                    delay                   : 200, // Wait for a brief moment until the DOM is fully ready
                },
                {
                    title                   : 'Expect initial color to be valid (green)',
                    validity                : false,
                    delay                   : 100, // Wait for animation to near the beginning
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Expect color to be invalid (red) near the animation end',
                    delay                   : 800, // Wait for animation to near the end
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
        {
            title            : 'Transition: valid → unvalidated',
            validity         : true,
            updates          : [
                {
                    title                   : 'Ensure the stylesheet is applied',
                    delay                   : 200, // Wait for a brief moment until the DOM is fully ready
                },
                {
                    title                   : 'Expect initial color to be valid (green)',
                    validity                : null,
                    delay                   : 100, // Wait for animation to near the beginning
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Expect color to be unvalidated (blue) near the animation end',
                    delay                   : 800, // Wait for animation to near the end
                    expectedColor           : COLOR_UNVALIDATED,
                },
            ],
        },
        {
            title            : 'Transition: invalid → valid',
            validity         : false,
            updates          : [
                {
                    title                   : 'Ensure the stylesheet is applied',
                    delay                   : 200, // Wait for a brief moment until the DOM is fully ready
                },
                {
                    title                   : 'Expect initial color to be invalid (red)',
                    validity                : true,
                    delay                   : 100, // Wait for animation to near the beginning
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Expect color to be valid (green) near the animation end',
                    delay                   : 800, // Wait for animation to near the end
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'Transition: invalid → unvalidated',
            validity         : false,
            updates          : [
                {
                    title                   : 'Ensure the stylesheet is applied',
                    delay                   : 200, // Wait for a brief moment until the DOM is fully ready
                },
                {
                    title                   : 'Expect initial color to be invalid (red)',
                    validity                : null,
                    delay                   : 100, // Wait for animation to near the beginning
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Expect color to be unvalidated (blue) near the animation end',
                    delay                   : 800, // Wait for animation to near the end
                    expectedColor           : COLOR_UNVALIDATED,
                },
            ],
        },
        {
            title            : 'Transition: unvalidated → valid',
            validity         : null,
            updates          : [
                {
                    title                   : 'Ensure the stylesheet is applied',
                    delay                   : 200, // Wait for a brief moment until the DOM is fully ready
                },
                {
                    title                   : 'Expect initial color to be unvalidated (blue)',
                    validity                : true,
                    delay                   : 100, // Wait for animation to near the beginning
                    expectedColor           : COLOR_UNVALIDATED,
                },
                {
                    title                   : 'Expect color to be valid (green) near the animation end',
                    delay                   : 800, // Wait for animation to near the end
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'Transition: unvalidated → invalid',
            validity         : null,
            updates          : [
                {
                    title                   : 'Ensure the stylesheet is applied',
                    delay                   : 200, // Wait for a brief moment until the DOM is fully ready
                },
                {
                    title                   : 'Expect initial color to be unvalidated (blue)',
                    validity                : false,
                    delay                   : 100, // Wait for animation to near the beginning
                    expectedColor           : COLOR_UNVALIDATED,
                },
                {
                    title                   : 'Expect color to be invalid (red) near the animation end',
                    delay                   : 800, // Wait for animation to near the end
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
    ] as ValidityStateTransitionTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentValidity         : boolean | null | 'auto' | undefined = initialValidity;
            
            
            
            // Stores currently validity animation names:
            const runningAnimations = new Set<string>();
            
            
            
            // Handlers:
            const handleAnimationStart : AnimationEventHandler<HTMLDivElement> = (event): void => {
                console.log(`${(performance.now() / 1000).toFixed(2)} animation started: `, event.animationName);
                runningAnimations.add(event.animationName);
            };
            const handleAnimationEnd   : AnimationEventHandler<HTMLDivElement> = (event): void => {
                console.log(`${(performance.now() / 1000).toFixed(2)} animation ended: `, event.animationName);
                runningAnimations.delete(event.animationName);
            };
            
            
            
            // First render:
            const component = await mount(
                <ValidityStateInFormTest
                    validity={currentValidity}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('validity-state-test');
            await expect(box).toContainText('Validity State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, validity, delay, expectedColor} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (validity !== undefined) currentValidity = validity;
                
                
                
                // Re-render:
                await component.update(
                    <ValidityStateInFormTest
                        validity={currentValidity}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('validity-state-test');
                await expect(box).toContainText('Validity State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // const actualFactor = await box.evaluate((el) => window.getComputedStyle(el).getPropertyValue('--va-validityFactor'));
                // console.info(`--va-validityFactor = ${actualFactor}`);
                
                // Verify the expected values:
                if (expectedColor !== undefined) {
                    const actualColor = await box.evaluate((el) => window.getComputedStyle(el).backgroundColor);
                    expectColor(actualColor, expectedColor);
                } // if
            } // for
        });
    } // for
});
