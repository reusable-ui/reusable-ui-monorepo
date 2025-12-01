import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ValidityStateTest } from './ValidityStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating validity state transitions.
 */
interface ValidityStateAnimationTestCase {
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
     * - `'auto'` : automatic determine
     */
    validity          : boolean | null | 'auto'
    
    /**
     * Initial computed validity state.
     * - `true`      : valid
     * - `false`     : invalid
     * - `null`      : unvalidated
     * - `undefined` : use default behavior.
     */
    computedValidity ?: boolean | null
    
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
        validity                ?: boolean | null | 'auto'
        
        /**
         * New value for computed validity state.
         * - `true`      : valid
         * - `false`     : invalid
         * - `null`      : unvalidated
         * - `undefined` : skip updating this part.
         */
        computedValidity        ?: boolean | null
        
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
         * The expected presence of running validity animation after the delay.
         * - `true`      : there is a running validate animation
         * - `false`     : there is a running invalidate animation
         * - `null `     : there is a running unvalidate animation
         * - `0`         : there is no running validity animation
         * - `undefined` : nothing to expect
         */
        expectedRunningValidity ?: boolean | null | 0
        
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
export const COLOR_THRESHOLD = 5 / 100 * 255; // 5% of full range

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
    for (const { title, validity : initialValidity, computedValidity: initialComputedValidity, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title            : 'No running validity animation in all time for initially valid',
            validity         : true,
            computedValidity : undefined,
            updates          : [
                {
                    title                   : 'Initially no running animation',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 200,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'No running validity animation in all time for initially invalid',
            validity         : false,
            computedValidity : undefined,
            updates          : [
                {
                    title                   : 'Initially no running animation',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 200,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
        {
            title            : 'No running validity animation in all time for initially unvalidated',
            validity         : null,
            computedValidity : undefined,
            updates          : [
                {
                    title                   : 'Initially no running animation',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 200,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
            ],
        },
        {
            title            : 'Valid state after update (invalid => valid)',
            validity         : false,
            updates          : [
                {
                    title                   : 'Initially invalid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Set valid to true (immediate)',
                    validity                : true, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Wait for validating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'Valid state after update (unvalidated => valid)',
            validity         : null,
            updates          : [
                {
                    title                   : 'Initially unvalidated',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
                {
                    title                   : 'Set valid to true (immediate)',
                    validity                : true, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Wait for validating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'Invalid state after update (valid => invalid)',
            validity         : true,
            updates          : [
                {
                    title                   : 'Initially valid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Set valid to false (immediate)',
                    validity                : false, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Wait for invalidating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
        {
            title            : 'Invalid state after update (unvalidated => invalid)',
            validity         : null,
            updates          : [
                {
                    title                   : 'Initially valid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
                {
                    title                   : 'Set valid to false (immediate)',
                    validity                : false, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Wait for invalidating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
        {
            title            : 'Unvalidated state after update (valid => unvalidated)',
            validity         : true,
            updates          : [
                {
                    title                   : 'Initially valid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Set valid to null (immediate)',
                    validity                : null, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Wait for unvalidating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
            ],
        },
        {
            title            : 'Unvalidated state after update (invalid => unvalidated)',
            validity         : false,
            updates          : [
                {
                    title                   : 'Initially invalid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Set valid to null (immediate)',
                    validity                : null, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Wait for unvalidating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
            ],
        },
        {
            title            : 'Validate, invalidate, and re-validate quickly',
            validity         : false,
            updates          : [
                {
                    title                   : 'Initially invalid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Validate',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Invalidate before validation finishes',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedRunningValidity : true,  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before invalidating finishes',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedRunningValidity : true, // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningValidity : 0, // No running animation.
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'Validate, unvalidate, and re-validate quickly',
            validity         : false,
            updates          : [
                {
                    title                   : 'Initially invalid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Validate',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Unvalidate before validation finishes',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedRunningValidity : true,  // Still validating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-validate again before invalidating finishes',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedRunningValidity : true, // Still in original validation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final validation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningValidity : 0, // No running animation.
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'Invalidate, validate, and re-invalidate quickly',
            validity         : true,
            updates          : [
                {
                    title                   : 'Initially valid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Invalidate',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Validate before invalidation finishes',
                    validity                : true,
                    
                    delay                   : 200,
                    expectedRunningValidity : false,  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before validating finishes',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedRunningValidity : false, // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningValidity : 0, // No running animation.
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
        {
            title            : 'Invalidate, unvalidate, and re-invalidate quickly',
            validity         : true,
            updates          : [
                {
                    title                   : 'Initially valid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Invalidate',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Unvalidate before invalidation finishes',
                    validity                : null,
                    
                    delay                   : 200,
                    expectedRunningValidity : false,  // Still invalidating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-invalidate again before validating finishes',
                    validity                : false,
                    
                    delay                   : 200,
                    expectedRunningValidity : false, // Still in original invalidation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final invalidation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningValidity : 0, // No running animation.
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
        {
            title            : 'Repeated validation does not restart animation',
            validity         : false,
            updates          : [
                {
                    title                   : 'Initially invalid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
                {
                    title                   : 'Validate (first time)',
                    validity                : true,
                    delay                   : 200,
                    expectedRunningValidity : true,
                },
                {
                    title                   : 'Set valid to true again (no change)',
                    validity                : true,
                    delay                   : 200,
                    expectedRunningValidity : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
            ],
        },
        {
            title            : 'Repeated invalidation does not restart animation',
            validity         : true,
            updates          : [
                {
                    title                   : 'Initially valid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Invalidate (first time)',
                    validity                : false,
                    delay                   : 200,
                    expectedRunningValidity : false,
                },
                {
                    title                   : 'Set valid to false again (no change)',
                    validity                : false,
                    delay                   : 200,
                    expectedRunningValidity : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_INVALID,
                },
            ],
        },
        {
            title            : 'Repeated unvalidation does not restart animation',
            validity         : true,
            updates          : [
                {
                    title                   : 'Initially valid',
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_VALID,
                },
                {
                    title                   : 'Unvalidate (first time)',
                    validity                : null,
                    delay                   : 200,
                    expectedRunningValidity : null,
                },
                {
                    title                   : 'Set valid to null again (no change)',
                    validity                : null,
                    delay                   : 200,
                    expectedRunningValidity : null, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningValidity : 0,
                    expectedColor           : COLOR_UNVALIDATED,
                },
            ],
        },
    ] as ValidityStateAnimationTestCase[]) {
        test(title, async ({ mount, page }) => {
            // States:
            let currentValidity         : boolean | null | 'auto' | undefined = initialValidity;
            let currentComputedValidity : boolean | null          | undefined = initialComputedValidity;
            
            
            
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
            
            let lastNewValidity : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleValidityUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newValidity, event) => {
                lastNewValidity = newValidity;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <ValidityStateTest
                    validity={currentValidity}
                    computedValidity={currentComputedValidity}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onValidityUpdate={handleValidityUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('validity-state-test');
            await expect(box).toContainText('Validity State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, validity, computedValidity, delay, expectedRunningValidity, expectedColor} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (validity !== undefined) currentValidity = validity;
                if (computedValidity !== undefined) currentComputedValidity = computedValidity;
                
                
                
                // Re-render:
                await component.update(
                    <ValidityStateTest
                        validity={currentValidity}
                        computedValidity={currentComputedValidity}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onValidityUpdate={handleValidityUpdate}
                    />
                );
                
                
                
                // Validate events:
                if (computedValidity !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewValidity).toBe(computedValidity);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('validity-state-test');
                await expect(box).toContainText('Validity State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedRunningValidity!== undefined) {
                    if (computedValidity === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    console.log(`${(performance.now() / 1000).toFixed(2)} expect running validity: `, expectedRunningValidity);
                    
                    switch (expectedRunningValidity) {
                        case true:
                            expect(runningAnimations.has('boo-test-validating')).toBe(true);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(false);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-validating')).toBe(false);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(true);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(false);
                            break;
                        case null:
                            expect(runningAnimations.has('boo-test-validating')).toBe(false);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(false);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-validating')).toBe(false);
                            expect(runningAnimations.has('boo-test-invalidating')).toBe(false);
                            expect(runningAnimations.has('boo-test-unvalidating')).toBe(false);
                            break;
                    } // switch
                } // if
                
                // Verify the expected values:
                if (expectedColor !== undefined) {
                    const actualColor = await box.evaluate((el) => window.getComputedStyle(el).backgroundColor);
                    expectColor(actualColor, expectedColor);
                } // if
            } // for
        });
    } // for
});
