import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { FocusStateTest } from './FocusStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating focus state transitions.
 */
interface FocusStateAnimationTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title          : string
    
    /**
     * Initial focus state.
     * - `true`   : focused
     * - `false`  : blurred
     * - `'auto'` : automatic determine
     */
    focused        : boolean | 'auto'
    
    /**
     * Initial computed focus state.
     * - `true`      : focused
     * - `false`     : blurred
     * - `undefined` : use default behavior.
     */
    computedFocus ?: boolean
    
    /**
     * A sequence of updates applied to the focus state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value for focus state.
         * Set to `undefined` to skip updating this part.
         */
        focused              ?: boolean | 'auto'
        
        /**
         * New value computed focus state.
         * - `true`      : focused
         * - `false`     : blurred
         * - `undefined` : skip updating this part.
         */
        computedFocus        ?: boolean
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay                ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected presence of running focus animation after the delay.
         * - `true`      : there is a running focusing animation
         * - `false`     : there is a running blurring animation
         * - `0`         : there is no running focus animation
         * - `undefined` : nothing to expect
         */
        expectedRunningFocus ?: boolean | 0
        
        /**
         * The expected outline style of the focusable element.
         * - `string`    : expected outline style`
         * - `undefined` : nothing to expect
         */
        expectedOutline      ?: string
    }[]
}



const OUTLINE_FOCUSED = 'rgb(0, 0, 255) solid 2px'
const OUTLINE_BLURRED = 'rgb(0, 0, 0) solid 0px';



test.describe('useFocusBehaviorState - animation', () => {
    for (const { title, focused : initialFocused, computedFocus: initialComputedFocus, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'No running focus animation in all time for initially focused',
            focused       : true,
            computedFocus : undefined,
            updates       : [
                {
                    title                : 'Initially no running animation',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 200,
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
            ],
        },
        {
            title         : 'No running focus animation in all time for initially blurred',
            focused       : false,
            computedFocus : undefined,
            updates       : [
                {
                    title                : 'Initially no running animation',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 200,
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
            ],
        },
        {
            title         : 'Focused state after update (blurred => focused)',
            focused       : false,
            updates       : [
                {
                    title                : 'Initially blurred',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
                {
                    title                : 'Set focused to true (immediate)',
                    focused              : true, // The animation duration is 1000 ms.
                    
                    delay                : 200, // Give a brief time to start the animation.
                    expectedRunningFocus : true,
                },
                {
                    title                : 'Still have running animation',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningFocus : true,
                },
                {
                    title                : 'Wait for focusing animation to finish',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
            ],
        },
        {
            title         : 'Blurred state after update (focused => blurred)',
            focused       : true,
            updates       : [
                {
                    title                : 'Initially focused',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
                {
                    title                : 'Set focused to false (immediate)',
                    focused              : false, // The animation duration is 1000 ms.
                    
                    delay                : 200, // Give a brief time to start the animation.
                    expectedRunningFocus : false,
                },
                {
                    title                : 'Still have running animation',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningFocus : false,
                },
                {
                    title                : 'Wait for blurring animation to finish',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
            ],
        },
        {
            title         : 'Focus, blur, and re-focus quickly',
            focused       : false,
            updates       : [
                {
                    title                : 'Initially blurred',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
                {
                    title                : 'Focus',
                    focused              : true,
                    
                    delay                : 200,
                    expectedRunningFocus : true,
                },
                {
                    title                : 'Blur before focusing finishes',
                    focused              : false,
                    
                    delay                : 200,
                    expectedRunningFocus : true,  // Still focusing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-focus again before blurring finishes',
                    focused              : true,
                    
                    delay                : 200,
                    expectedRunningFocus : true, // Still in original focusing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final focusing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedRunningFocus : 0, // No running animation.
                    expectedOutline      : OUTLINE_FOCUSED,
                },
            ],
        },
        {
            title         : 'Blur, focus, and re-blur quickly',
            focused       : true,
            updates       : [
                {
                    title                : 'Initially focused',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
                {
                    title                : 'Blur',
                    focused              : false,
                    
                    delay                : 200,
                    expectedRunningFocus : false,
                },
                {
                    title                : 'Focus before blurring finishes',
                    focused              : true,
                    
                    delay                : 200,
                    expectedRunningFocus : false,  // Still blurring (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-blur again before focusing finishes',
                    focused              : false,
                    
                    delay                : 200,
                    expectedRunningFocus : false, // Still in original blurring sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final blurring to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedRunningFocus : 0, // No running animation.
                    expectedOutline      : OUTLINE_BLURRED,
                },
            ],
        },
        {
            title         : 'Repeated focusing does not restart animation',
            focused       : false,
            updates       : [
                {
                    title                : 'Initially blurred',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
                {
                    title                : 'Focus (first time)',
                    focused              : true,
                    delay                : 200,
                    expectedRunningFocus : true,
                },
                {
                    title                : 'Set focused to true again (no change)',
                    focused              : true,
                    delay                : 200,
                    expectedRunningFocus : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                : 'Wait for final animation to finish',
                    delay                : 800, // Includes additional margin to guarantee completion.
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
            ],
        },
        {
            title         : 'Repeated blurring does not restart animation',
            focused       : true,
            updates       : [
                {
                    title                : 'Initially focused',
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_FOCUSED,
                },
                {
                    title                : 'Blur (first time)',
                    focused              : false,
                    delay                : 200,
                    expectedRunningFocus : false,
                },
                {
                    title                : 'Set focused to false again (no change)',
                    focused              : false,
                    delay                : 200,
                    expectedRunningFocus : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                : 'Wait for final animation to finish',
                    delay                : 800, // Includes additional margin to guarantee completion.
                    expectedRunningFocus : 0,
                    expectedOutline      : OUTLINE_BLURRED,
                },
            ],
        },
    ] as FocusStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentFocused         : boolean | 'auto' | undefined = initialFocused;
            let currentComputedFocus : boolean | null          | undefined = initialComputedFocus;
            
            
            
            // Stores currently focus animation names:
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
            
            let lastNewFocus : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleFocusUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newFocus, event) => {
                lastNewFocus = newFocus;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <FocusStateTest
                    focused={currentFocused}
                    computedFocus={currentComputedFocus}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onFocusUpdate={handleFocusUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('focus-state-test');
            await expect(box).toContainText('Focus State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, focused, computedFocus, delay, expectedRunningFocus, expectedOutline} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (focused !== undefined) currentFocused = focused;
                if (computedFocus !== undefined) currentComputedFocus = computedFocus;
                
                
                
                // Re-render:
                await component.update(
                    <FocusStateTest
                        focused={currentFocused}
                        computedFocus={currentComputedFocus}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onFocusUpdate={handleFocusUpdate}
                    />
                );
                
                
                
                // Validate events:
                if (computedFocus !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewFocus).toBe(computedFocus);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('focus-state-test');
                await expect(box).toContainText('Focus State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedRunningFocus!== undefined) {
                    if (computedFocus === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    console.log(`${(performance.now() / 1000).toFixed(2)} expect running focus-state: `, expectedRunningFocus);
                    
                    switch (expectedRunningFocus) {
                        case true:
                            expect(runningAnimations.has('boo-test-focusing')).toBe(true);
                            expect(runningAnimations.has('boo-test-blurring')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-focusing')).toBe(false);
                            expect(runningAnimations.has('boo-test-blurring')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-focusing')).toBe(false);
                            expect(runningAnimations.has('boo-test-blurring')).toBe(false);
                            break;
                    } // switch
                } // if
                
                if (expectedOutline !== undefined) {
                    const actualOutline = await box.evaluate((el) => window.getComputedStyle(el).outline);
                    expect(actualOutline).toBe((expectedOutline));
                } // if
            } // for
        });
    } // for
});
