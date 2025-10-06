import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ReadOnlyStateTest } from './ReadOnlyStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { ReadOnlyPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of editable/read-only state transitions.
 */
interface ReadOnlyStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title     : string
    
    /**
     * Initial editable/read-only state.
     * - `true`: read-only
     * - `false`: editable
     * - `undefined`: default to editable
     */
    readOnly ?: boolean
    
    /**
     * A sequence of updates applied to the editable/read-only state, including expected outcomes.
     */
    updates   : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title          : string
        
        /**
         * New value for read-only state.
         * Set to `undefined` to skip updating this part.
         */
        readOnly      ?: boolean
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay         ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected read-only state.
         * - `'readonly'` : onFreezingEnd event has been invoked
         * - `'freezing'` : onFreezingStart event has been invoked
         * - `'thawing'`  : onThawingStart event has been invoked
         * - `'editable'` : onThawingEnd event has been invoked
         * - `null`       : no event has been invoked
         * - `undefined`  : nothing to expect
         */
        expectedEvent ?: ReadOnlyPhase | null
    }[]
}



test.describe('useReadOnlyStatePhaseEvents', () => {
    for (const { title, readOnly : initialReadOnly, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title    : 'Should be respond to change from read-only to editable',
            readOnly : true,
            updates  : [
                {
                    title         : 'Change to editable',
                    readOnly      : false,
                    
                    delay         : 0,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay         : 200,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'editable',
                },
            ],
        },
        {
            title    : 'Should be respond to change from editable to read-only',
            readOnly : false,
            updates  : [
                {
                    title         : 'Change to read-only',
                    readOnly      : true,
                    
                    delay         : 0,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still read-only',
                    
                    delay         : 200,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still read-only',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be stopped and the read-only-ness is still read-only',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'readonly',
                },
            ],
        },
        {
            title    : 'Should be respond to change from read-only to editable then read-only',
            readOnly : true,
            updates  : [
                {
                    title         : 'Change to editable',
                    readOnly      : false,
                    
                    delay         : 0,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay         : 200,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'editable',
                },
                {
                    title         : 'Change to read-only',
                    readOnly      : true,
                    
                    delay         : 0,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still read-only',
                    
                    delay         : 200,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still read-only',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be stopped and the read-only-ness is still read-only',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'readonly',
                },
            ],
        },
        {
            title    : 'Should be respond to change from editable to read-only then editable',
            readOnly : false,
            updates  : [
                {
                    title         : 'Change to read-only',
                    readOnly      : true,
                    
                    delay         : 0,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still read-only',
                    
                    delay         : 200,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still read-only',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'The editable animation should be stopped and the read-only-ness is still read-only',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'readonly',
                },
                {
                    title         : 'Change to editable',
                    readOnly      : false,
                    
                    delay         : 0,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay         : 200,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'editable',
                },
            ],
        },
        {
            title    : 'Should be respond to editable, read-only, and re-editable quickly',
            readOnly : true,
            updates  : [
                {
                    title         : 'Editable',
                    readOnly      : false,
                    
                    delay         : 200,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'Read-only before read-only-ness finishes',
                    readOnly      : true,
                    
                    delay         : 200,
                    expectedEvent : 'thawing', // Still thawing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-editable again before read-only finishes',
                    readOnly      : false,
                    
                    delay         : 200,
                    expectedEvent : 'thawing', // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final read-only-ness to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'editable',
                },
            ],
        },
        {
            title    : 'Should be respond to read-only, editable, and re-read-only quickly',
            readOnly : false,
            updates  : [
                {
                    title         : 'Read-only',
                    readOnly      : true,
                    
                    delay         : 200,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'Editable before read-only-ness finishes',
                    readOnly      : false,
                    
                    delay         : 200,
                    expectedEvent : 'freezing', // Still freezing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-read-only again before editable finishes',
                    readOnly      : true,
                    
                    delay         : 200,
                    expectedEvent : 'freezing', // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final read-only-ness to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'readonly',
                },
            ],
        },
        {
            title    : 'Should be respond to editable and quickly switch to read-only',
            readOnly : true,
            updates  : [
                {
                    title         : 'Editable',
                    readOnly      : false,
                    
                    delay         : 200,
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'Read-only before read-only-ness finishes',
                    readOnly      : true,
                    
                    delay         : 200,
                    expectedEvent : 'thawing', // Still thawing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still thawing',
                    
                    delay         : 200,
                    expectedEvent : 'thawing', // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final read-only-ness to complete and switching to read-only',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'Still freezing',
                    
                    delay         : 200,
                    expectedEvent : 'freezing', // Still in switching read-only-ness sequence.
                },
                {
                    title         : 'Wait for final read-only-ness to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'readonly',
                },
            ],
        },
        {
            title    : 'Should be respond to read-only and quickly switch to editable',
            readOnly : false,
            updates  : [
                {
                    title         : 'Read-only',
                    readOnly      : true,
                    
                    delay         : 200,
                    expectedEvent : 'freezing',
                },
                {
                    title         : 'Editable before read-only-ness finishes',
                    readOnly      : false,
                    
                    delay         : 200,
                    expectedEvent : 'freezing', // Still freezing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still freezing',
                    
                    delay         : 200,
                    expectedEvent : 'freezing', // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final read-only-ness to complete and switching to editable',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'thawing',
                },
                {
                    title         : 'Still thawing',
                    
                    delay         : 200,
                    expectedEvent : 'thawing', // Still in original read-only-ness sequence.
                },
                {
                    title         : 'Wait for final read-only-ness to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'editable',
                },
            ],
        },
    ] as ReadOnlyStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentReadOnly : boolean | undefined = initialReadOnly;
            
            
            
            // Handlers:
            let lastEvent : unknown | undefined = undefined;
            const handleReadOnlyUpdate : ValueChangeEventHandler<boolean, unknown> = (newReadOnly, event) => {
                lastEvent = event;
            };
            
            let lastReadOnlyPhase : ReadOnlyPhase | null = null;
            const handleThawingStart : ValueChangeEventHandler<ReadOnlyPhase, unknown> = (readOnlyPhase) => {
                expect(readOnlyPhase).toBe('thawing');
                lastReadOnlyPhase = readOnlyPhase;
            };
            const handleThawingEnd : ValueChangeEventHandler<ReadOnlyPhase, unknown> = (readOnlyPhase) => {
                expect(readOnlyPhase).toBe('editable');
                lastReadOnlyPhase = readOnlyPhase;
            };
            const handleFreezingStart : ValueChangeEventHandler<ReadOnlyPhase, unknown> = (readOnlyPhase) => {
                expect(readOnlyPhase).toBe('freezing');
                lastReadOnlyPhase = readOnlyPhase;
            };
            const handleFreezingEnd : ValueChangeEventHandler<ReadOnlyPhase, unknown> = (readOnlyPhase) => {
                expect(readOnlyPhase).toBe('readonly');
                lastReadOnlyPhase = readOnlyPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <ReadOnlyStateTest
                    readOnly={currentReadOnly}
                    
                    onReadOnlyUpdate={handleReadOnlyUpdate}
                    
                    onThawingStart={handleThawingStart}
                    onThawingEnd={handleThawingEnd}
                    onFreezingStart={handleFreezingStart}
                    onFreezingEnd={handleFreezingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('read-only-state-test');
            await expect(box).toContainText('ReadOnly State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, readOnly, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (readOnly !== undefined) currentReadOnly = readOnly;
                
                
                
                // Reset the last received values:
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    <ReadOnlyStateTest
                        readOnly={currentReadOnly}
                        
                        onReadOnlyUpdate={handleReadOnlyUpdate}
                        
                        onThawingStart={handleThawingStart}
                        onThawingEnd={handleThawingEnd}
                        onFreezingStart={handleFreezingStart}
                        onFreezingEnd={handleFreezingEnd}
                    />
                );
                
                
                
                // Validate events:
                if (readOnly !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    if (expectedEvent !== undefined) {
                        expect(lastReadOnlyPhase).toBe(expectedEvent);
                    } // if
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('read-only-state-test');
                await expect(box).toContainText('ReadOnly State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastReadOnlyPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
