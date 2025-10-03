import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ReadOnlyStateTest } from './ReadOnlyStateTest.js';
import { ReadOnlyStateWithContextTest } from './ReadOnlyStateWithContextTest.js'
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled editable/read-only state transitions.
 */
interface ReadOnlyStateControlledTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title           : string
    
    /**
     * The parent read-only state to use for the test.
     * Set to `undefined` for no parent read-only context.
     */
    parentReadOnly ?: boolean
    
    /**
     * Initial editable/read-only state.
     * - `true`: read-only
     * - `false`: editable
     * - `undefined`: default to editable
     */
    readOnly       ?: boolean
    
    /**
     * A sequence of updates applied to the editable/read-only state, including expected outcomes.
     */
    updates         : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for parent read-only state.
         * Set to `undefined` to skip updating this part.
         */
        parentReadOnly          ?: boolean
        
        /**
         * New value for read-only state.
         * Set to `undefined` to skip updating this part.
         */
        readOnly                ?: boolean
        
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
         * The expected read-only state.
         * - 'editable': should be editable
         * - 'readonly': should be read-only
         * - `undefined`: nothing to expect
         */
        expectedReadOnly        ?: 'editable' | 'readonly'
        
        /**
         * The expected presence of running editable/read-only animation after the delay.
         * - `true`      : there is a running thawing animation
         * - `false`     : there is a running freezing animation
         * - `null`      : there is no running editable/read-only animation
         * - `undefined` : nothing to expect
         */
        expectedRunningReadOnly ?: boolean | null
    }[]
}



test.describe('useReadOnlyBehaviorState - controlled mode', () => {
    for (const { title, parentReadOnly: initialParentReadOnly, readOnly : initialReadOnly, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title          : 'Should be defaults to editable',
            readOnly       : undefined,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be controlled to editable',
            readOnly       : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be controlled to read-only',
            readOnly       : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be changed from editable to read-only',
            readOnly       : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to read-only',
                    readOnly                : true,
                    
                    expectedReadOnly        : 'readonly',
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be stopped and the read-only-ness is still read-only',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be changed from read-only to editable',
            readOnly       : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to editable',
                    readOnly                : false,
                    
                    expectedReadOnly        : 'editable',
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be changed from read-only to editable then read-only',
            readOnly       : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to editable',
                    readOnly                : false,
                    
                    expectedReadOnly        : 'editable',
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to read-only',
                    readOnly                : true,
                    
                    expectedReadOnly        : 'readonly',
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be stopped and the read-only-ness is still read-only',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be changed from editable to read-only then editable',
            readOnly       : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to read-only',
                    readOnly                : true,
                    
                    expectedReadOnly        : 'readonly',
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be stopped and the read-only-ness is still read-only',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to editable',
                    readOnly                : false,
                    
                    expectedReadOnly        : 'editable',
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Editable, read-only, and re-editable quickly',
            readOnly       : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Editable',
                    readOnly                : false,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'Read-only before read-only-ness finishes',
                    readOnly                : true,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : false,  // Still thawing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-editable again before read-only finishes',
                    readOnly                : false,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false, // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final read-only-ness to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null, // No running animation.
                },
            ],
        },
        {
            title          : 'Read-only, editable, and re-read-only quickly',
            readOnly       : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Read-only',
                    readOnly                : true,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'Editable before read-only-ness finishes',
                    readOnly                : false,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : true,  // Still freezing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-read-only again before editable finishes',
                    readOnly                : true,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true, // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final read-only-ness to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null, // No running animation.
                },
            ],
        },
        
        
        
        {
            title          : 'Should be contextual editable',
            parentReadOnly : false,
            readOnly       : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be contextual read-only',
            parentReadOnly : true,
            readOnly       : false,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be explicitly read-only regradless context is editable',
            parentReadOnly : false,
            readOnly       : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be explicitly read-only regradless context is read-only',
            parentReadOnly : true,
            readOnly       : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from editable to read-only',
            parentReadOnly : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to read-only',
                    parentReadOnly          : true,
                    
                    expectedReadOnly        : 'readonly',
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be stopped and the read-only-ness is still read-only',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from read-only to editable',
            parentReadOnly : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to editable',
                    parentReadOnly          : false,
                    
                    expectedReadOnly        : 'editable',
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from read-only to editable then read-only',
            parentReadOnly : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to editable',
                    parentReadOnly          : false,
                    
                    expectedReadOnly        : 'editable',
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to read-only',
                    parentReadOnly          : true,
                    
                    expectedReadOnly        : 'readonly',
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be stopped and the read-only-ness is still read-only',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from editable to read-only then editable',
            parentReadOnly : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to read-only',
                    parentReadOnly          : true,
                    
                    expectedReadOnly        : 'readonly',
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be running and the read-only-ness is still read-only',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'The read-only animation should be stopped and the read-only-ness is still read-only',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Change to editable',
                    parentReadOnly          : false,
                    
                    expectedReadOnly        : 'editable',
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be running and the read-only-ness is still editable',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'The editable animation should be stopped and the read-only-ness is still editable',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
            ],
        },
        {
            title          : 'Contextual editable, read-only, and re-editable quickly',
            parentReadOnly : true,
            updates        : [
                {
                    title                   : 'Should be read-only and no animation',
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Editable',
                    parentReadOnly          : false,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'Read-only before read-only-ness finishes',
                    parentReadOnly          : true,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : false,  // Still thawing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-editable again before read-only finishes',
                    parentReadOnly          : false,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : false, // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final read-only-ness to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null, // No running animation.
                },
            ],
        },
        {
            title          : 'Contextual read-only, editable, and re-read-only quickly',
            parentReadOnly : false,
            updates        : [
                {
                    title                   : 'Should be editable and no animation',
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : null,
                },
                {
                    title                   : 'Read-only',
                    parentReadOnly          : true,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'Editable before read-only-ness finishes',
                    parentReadOnly          : false,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'editable',
                    expectedRunningReadOnly : true,  // Still freezing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-read-only again before editable finishes',
                    parentReadOnly          : true,
                    
                    delay                   : 200,
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : true, // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final read-only-ness to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedReadOnly        : 'readonly',
                    expectedRunningReadOnly : null, // No running animation.
                },
            ],
        },
    ] as ReadOnlyStateControlledTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentParentReadOnly : boolean | undefined = initialParentReadOnly;
            let currentReadOnly : boolean | undefined = initialReadOnly;
            
            
            
            // Stores currently active animation names:
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
            
            let lastNewReadOnly : boolean | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleReadOnlyUpdate : ValueChangeEventHandler<boolean, unknown> = (newReadOnly, event) => {
                lastNewReadOnly = newReadOnly;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                (currentParentReadOnly === undefined)
                ? <ReadOnlyStateTest
                    readOnly={currentReadOnly}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onReadOnlyUpdate={handleReadOnlyUpdate}
                />
                : <ReadOnlyStateWithContextTest
                    parentReadOnly={currentParentReadOnly}
                    readOnly={currentReadOnly}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onReadOnlyUpdate={handleReadOnlyUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('read-only-state-test');
            await expect(box).toContainText('ReadOnly State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, parentReadOnly, readOnly, delay, expectedReadOnly, expectedRunningReadOnly} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (parentReadOnly !== undefined) currentParentReadOnly = parentReadOnly;
                if (readOnly !== undefined) currentReadOnly = readOnly;
                
                
                
                // Reset the last received values:
                lastNewReadOnly = undefined;
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    (currentParentReadOnly === undefined)
                    ? <ReadOnlyStateTest
                        readOnly={currentReadOnly}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onReadOnlyUpdate={handleReadOnlyUpdate}
                    />
                    : <ReadOnlyStateWithContextTest
                        parentReadOnly={currentParentReadOnly}
                        readOnly={currentReadOnly}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onReadOnlyUpdate={handleReadOnlyUpdate}
                    />
                );
                
                
                
                // Validate events:
                if ((readOnly !== undefined) || (parentReadOnly !== undefined)) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    if (expectedReadOnly !== undefined) {
                        switch (expectedReadOnly) {
                            case 'editable':
                                expect(lastNewReadOnly).toBe(false); // lastNewReadOnly = false (editable)
                                break;
                            case 'readonly':
                                expect(lastNewReadOnly).toBe(true);  // lastNewReadOnly = true (read-only)
                                break;
                            default:
                                throw new Error('unexpected case');
                        } // switch
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
                if (expectedReadOnly !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedReadOnly);
                } // if
                
                if (expectedRunningReadOnly!== undefined) {
                    switch (expectedRunningReadOnly) {
                        case true: // expectedRunningReadOnly = true (freezing)
                            expect(runningAnimations.has('boo-test-thaw')).toBe(false);
                            expect(runningAnimations.has('boo-test-freeze')).toBe(true); // freezing
                            break;
                        case false: // expectedRunningReadOnly = false (thawing)
                            expect(runningAnimations.has('boo-test-thaw')).toBe(true); // thawing
                            expect(runningAnimations.has('boo-test-freeze')).toBe(false);
                            break;
                        case null: // expectedRunningReadOnly = null (idle)
                            expect(runningAnimations.has('boo-test-thaw')).toBe(false);
                            expect(runningAnimations.has('boo-test-freeze')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
