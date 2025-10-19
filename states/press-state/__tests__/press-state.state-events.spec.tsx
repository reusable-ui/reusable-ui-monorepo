import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { PressStateTest } from './PressStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { PressPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of press state transitions.
 */
interface PressStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title          : string
    
    /**
     * Initial press state.
     * - `true`   : pressed
     * - `false`  : released
     * - `'auto'` : automatic determine
     */
    pressed        : boolean | 'auto'
    
    /**
     * Initial computed press state.
     * - `true`      : pressed
     * - `false`     : released
     * - `undefined` : use default behavior.
     */
    computedPress ?: boolean
    
    /**
     * A sequence of updates applied to the press state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value for press state.
         * Set to `undefined` to skip updating this part.
         */
        pressed              ?: boolean | 'auto'
        
        /**
         * New value computed press state.
         * - `true`      : pressed
         * - `false`     : released
         * - `undefined` : skip updating this part.
         */
        computedPress        ?: boolean
        
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
         * The expected press state.
         * - `'pressing'` : onPressingStart event has been invoked
         * - `'pressed'`  : onPressingEnd event has been invoked
         * - `'releasing'` : onReleasingStart event has been invoked
         * - `'released'`  : onReleasingEnd event has been invoked
         * - `null`       : no event has been invoked
         * - `undefined`  : nothing to expect
         */
        expectedEvent        ?: PressPhase | null
    }[]
}



test.describe('usePressStatePhaseEvents', () => {
    for (const { title, pressed : initialPressed, computedPress: initialComputedPress, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be respond to change from released to pressed',
            pressed       : 'auto',
            computedPress : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to pressed',
                    computedPress        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 200,
                    expectedEvent        : 'pressing',
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'pressing',
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still pressed',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'pressed',
                },
            ],
        },
        {
            title         : 'Should be respond to change from pressed to released',
            pressed       : 'auto',
            computedPress : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to released',
                    computedPress        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 200,
                    expectedEvent        : 'releasing',
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'releasing',
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still released',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'released',
                },
            ],
        },
        {
            title         : 'Should be respond to change from released to pressed then released',
            pressed       : 'auto',
            computedPress : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to pressed',
                    computedPress        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 200,
                    expectedEvent        : 'pressing',
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'pressing',
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still pressed',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'pressed',
                },
                {
                    title                : 'Change to released',
                    computedPress        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 200,
                    expectedEvent        : 'releasing',
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'releasing',
                },
                {
                    title                : 'The releasing animation should be stopped and the press-state is still released',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'released',
                },
            ],
        },
        {
            title         : 'Should be respond to change from pressed to released then pressed',
            pressed       : 'auto',
            computedPress : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to released',
                    computedPress        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 200,
                    expectedEvent        : 'releasing',
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'releasing',
                },
                {
                    title                : 'The releasing animation should be stopped and the press-state is still released',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'released',
                },
                {
                    title                : 'Change to pressed',
                    computedPress        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 200,
                    expectedEvent        : 'pressing',
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'pressing',
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still pressed',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'pressed',
                },
            ],
        },
        {
            title         : 'Should be respond to press, release, and re-press quickly',
            pressed       : 'auto',
            computedPress : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Press',
                    computedPress        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'pressing',
                },
                {
                    title                : 'Release before pressing finishes',
                    computedPress        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'pressing',  // Still pressing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-press again before releasing finishes',
                    computedPress        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'pressing', // Still in original pressing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final pressing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'pressed', // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to release, press, and re-release quickly',
            pressed       : 'auto',
            computedPress : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Release',
                    computedPress        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'releasing',
                },
                {
                    title                : 'Press before releasing finishes',
                    computedPress        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'releasing',  // Still releasing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-release again before pressing finishes',
                    computedPress        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'releasing', // Still in original releasing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final releasing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'released', // No running animation.
                },
            ],
        },
    ] as PressStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentPressed         : boolean | 'auto' | undefined = initialPressed;
            let currentComputedPress : boolean | null          | undefined = initialComputedPress;
            
            
            
            // Handlers:
            let lastNewPress : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handlePressUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newPress, event) => {
                lastNewPress = newPress;
                lastEvent = event;
            };
            
            let lastPressPhase : PressPhase | null = null;
            const handlePressingStart : ValueChangeEventHandler<PressPhase, unknown> = (pressPhase) => {
                expect(pressPhase).toBe('pressing');
                lastPressPhase = pressPhase;
            };
            const handlePressingEnd : ValueChangeEventHandler<PressPhase, unknown> = (pressPhase) => {
                expect(pressPhase).toBe('pressed');
                lastPressPhase = pressPhase;
            };
            const handleReleasingStart : ValueChangeEventHandler<PressPhase, unknown> = (pressPhase) => {
                expect(pressPhase).toBe('releasing');
                lastPressPhase = pressPhase;
            };
            const handleReleasingEnd : ValueChangeEventHandler<PressPhase, unknown> = (pressPhase) => {
                expect(pressPhase).toBe('released');
                lastPressPhase = pressPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <PressStateTest
                    pressed={currentPressed}
                    computedPress={currentComputedPress}
                    
                    onPressUpdate={handlePressUpdate}
                    
                    onPressingStart={handlePressingStart}
                    onPressingEnd={handlePressingEnd}
                    onReleasingStart={handleReleasingStart}
                    onReleasingEnd={handleReleasingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('press-state-test');
            await expect(box).toContainText('Press State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, pressed, computedPress, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (pressed !== undefined) currentPressed = pressed;
                if (computedPress !== undefined) currentComputedPress = computedPress;
                
                
                
                // Reset the last received values:
                lastNewPress = undefined;
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    <PressStateTest
                        pressed={currentPressed}
                        computedPress={currentComputedPress}
                        
                        onPressUpdate={handlePressUpdate}
                        
                        onPressingStart={handlePressingStart}
                        onPressingEnd={handlePressingEnd}
                        onReleasingStart={handleReleasingStart}
                        onReleasingEnd={handleReleasingEnd}
                    />
                );
                
                
                
                // Validate events:
                if (computedPress !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewPress).toBe(computedPress);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('press-state-test');
                await expect(box).toContainText('Press State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastPressPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
