import React, { MouseEvent as ReactMouseEvent } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ActiveStateTest } from './ActiveStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { ActivePhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of active/inactive state transitions.
 */
interface ActiveStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * Initial active/inactive state.
     * - `true`: active
     * - `false`: inactive
     */
    active  : boolean
    
    /**
     * A sequence of updates applied to the active/inactive state, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title          : string
        
        /**
         * Command a new value for active state.
         * - `'activate'` command to activate this part.
         * - `'deactivate'` command to deactivate this part.
         * - `undefined`: to skip updating this part.
         */
        action        ?: 'activate' | 'deactivate'
        
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
         * The expected active state.
         * - `'inactive'`     : onDeactivatingEnd event has been invoked
         * - `'deactivating'` : onDeactivatingStart event has been invoked
         * - `'activating'`   : onActivatingStart event has been invoked
         * - `'active'`       : onActivatingEnd event has been invoked
         * - `null`           : no event has been invoked
         * - `undefined`      : nothing to expect
         */
        expectedEvent ?: ActivePhase | null
    }[]
}



test.describe('useActiveStatePhaseEvents', () => {
    for (const { title, active : initialActive, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title   : 'Should be respond to change from inactive to active',
            active  : false,
            updates : [
                {
                    title         : 'Change to active',
                    action        : 'activate',
                    
                    delay         : 0,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be running and the activation is still active',
                    
                    delay         : 200,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be running and the activation is still active',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be stopped and the activation is still active',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'active',
                },
            ],
        },
        {
            title   : 'Should be respond to change from active to inactive',
            active  : true,
            updates : [
                {
                    title         : 'Change to inactive',
                    action        : 'deactivate',
                    
                    delay         : 0,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be stopped and the activation is still inactive',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'inactive',
                },
            ],
        },
        {
            title   : 'Should be respond to change from inactive to active then inactive',
            active  : false,
            updates : [
                {
                    title         : 'Change to active',
                    action        : 'activate',
                    
                    delay         : 0,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be running and the activation is still active',
                    
                    delay         : 200,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be running and the activation is still active',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be stopped and the activation is still active',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'active',
                },
                {
                    title         : 'Change to inactive',
                    action        : 'deactivate',
                    
                    delay         : 0,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be stopped and the activation is still inactive',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'inactive',
                },
            ],
        },
        {
            title   : 'Should be respond to change from active to inactive then active',
            active  : true,
            updates : [
                {
                    title         : 'Change to inactive',
                    action        : 'deactivate',
                    
                    delay         : 0,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'The deactivating animation should be stopped and the activation is still inactive',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'inactive',
                },
                {
                    title         : 'Change to active',
                    action        : 'activate',
                    
                    delay         : 0,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be running and the activation is still active',
                    
                    delay         : 200,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be running and the activation is still active',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'activating',
                },
                {
                    title         : 'The activating animation should be stopped and the activation is still active',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'active',
                },
            ],
        },
        {
            title   : 'Should be respond to activate, deactivate, and re-activate quickly',
            active  : false,
            updates : [
                {
                    title         : 'Activate',
                    action        : 'activate',
                    
                    delay         : 200,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'Deactivate before activation finishes',
                    action        : 'deactivate',
                    
                    delay         : 200,
                    expectedEvent : 'activating', // Still activating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-activate again before deactivate finishes',
                    action        : 'activate',
                    
                    delay         : 200,
                    expectedEvent : 'activating', // Still in original activation sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final activation to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'active',
                },
            ],
        },
        {
            title   : 'Should be respond to deactivate, activate, and re-deactivate quickly',
            active  : true,
            updates : [
                {
                    title         : 'Deactivate',
                    action        : 'deactivate',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'Activate before deactivation finishes',
                    action        : 'activate',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating', // Still deactivating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-deactivate again before activate finishes',
                    action        : 'deactivate',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating', // Still in original deactivation sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final deactivation to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'inactive',
                },
            ],
        },
        {
            title   : 'Should be respond to activate and quickly switch to deactivate',
            active  : false,
            updates : [
                {
                    title         : 'Activate',
                    action        : 'activate',
                    
                    delay         : 200,
                    expectedEvent : 'activating',
                },
                {
                    title         : 'Deactivate before activation finishes',
                    action        : 'deactivate',
                    
                    delay         : 200,
                    expectedEvent : 'activating', // Still activating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still activating',
                    
                    delay         : 200,
                    expectedEvent : 'activating', // Still in original activation sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final activation to complete and switching to deactivating',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'Still deactivating',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating', // Still in switching deactivation sequence.
                },
                {
                    title         : 'Wait for final deactivation to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'inactive',
                },
            ],
        },
        {
            title   : 'Should be respond to deactivate and quickly switch to activate',
            active  : true,
            updates : [
                {
                    title         : 'Deactivate',
                    action        : 'deactivate',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating',
                },
                {
                    title         : 'Activate before deactivation finishes',
                    action        : 'activate',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating', // Still deactivating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still deactivating',
                    
                    delay         : 200,
                    expectedEvent : 'deactivating', // Still in original deactivation sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final deactivation to complete and switching to activating',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'activating',
                },
                {
                    title         : 'Still activating',
                    
                    delay         : 200,
                    expectedEvent : 'activating', // Still in original activation sequence.
                },
                {
                    title         : 'Wait for final activation to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'active',
                },
            ],
        },
    ] as ActiveStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // Handlers:
            let lastNewActive : boolean | undefined = undefined;
            let lastEvent     : ReactMouseEvent<HTMLButtonElement, MouseEvent> | undefined = undefined;
            const handleActiveChange : ValueChangeEventHandler<boolean, ReactMouseEvent<HTMLButtonElement, MouseEvent>> = (newActive, event) => {
                lastNewActive = newActive;
                lastEvent = event;
            };
            
            let lastActivePhase : ActivePhase | null = null;
            const handleActivatingStart : ValueChangeEventHandler<ActivePhase, unknown> = (activePhase) => {
                expect(activePhase).toBe('activating');
                lastActivePhase = activePhase;
            };
            const handleActivatingEnd : ValueChangeEventHandler<ActivePhase, unknown> = (activePhase) => {
                expect(activePhase).toBe('active');
                lastActivePhase = activePhase;
            };
            const handleDeactivatingStart : ValueChangeEventHandler<ActivePhase, unknown> = (activePhase) => {
                expect(activePhase).toBe('deactivating');
                lastActivePhase = activePhase;
            };
            const handleDeactivatingEnd : ValueChangeEventHandler<ActivePhase, unknown> = (activePhase) => {
                expect(activePhase).toBe('inactive');
                lastActivePhase = activePhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <ActiveStateTest
                    defaultActive={initialActive}
                    
                    onActiveChange={handleActiveChange}
                    
                    onActivatingStart={handleActivatingStart}
                    onActivatingEnd={handleActivatingEnd}
                    onDeactivatingStart={handleDeactivatingStart}
                    onDeactivatingEnd={handleDeactivatingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('active-state-test');
            await expect(box).toContainText('Active State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, action, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (action !== undefined) {
                    // Reset the last received values:
                    lastNewActive = undefined;
                    lastEvent = undefined;
                    
                    // Simulate user interaction to change the state:
                    if (action === 'activate') {
                        await component.getByTestId('activate-btn').click();
                    }
                    else if (action === 'deactivate') {
                        await component.getByTestId('deactivate-btn').click();
                    } // if
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewActive).toBe(action === 'activate');
                    expect((lastEvent as any)?.type).toBe('click');
                    expect((lastEvent as any)?.nativeEvent.isTrusted).toBe(true);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('active-state-test');
                await expect(box).toContainText('Active State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastActivePhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
