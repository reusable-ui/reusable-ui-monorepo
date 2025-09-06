import React, { type AnimationEventHandler, MouseEvent as ReactMouseEvent } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ActiveStateTest } from './ActiveStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled active/inactive state transitions.
 */
interface ActiveStateControlledTestCase {
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
        title                    : string
        
        /**
         * New value for active state.
         * Set to `undefined` to skip updating this part.
         */
        active                  ?: boolean
        
        /**
         * Command a new value for active state.
         * - `'activate'` command to activate this part.
         * - `'deactivate'` command to deactivate this part.
         * - `undefined`: to skip updating this part.
         */
        action                  ?: 'activate' | 'deactivate'
        
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
         * The expected active state.
         * - 'active': should be active
         * - 'inactive': should be inactive
         * - `undefined`: nothing to expect
         */
        expectedActive          ?: 'active' | 'inactive'
        
        /**
         * The expected presence of running activate/deactivate animation after the delay.
         * - `true`      : there is a running activate animation
         * - `false`     : there is a running deactivate animation
         * - `null`      : there is no running activate/deactivate animation
         * - `undefined` : nothing to expect
         */
        expectedRunningActivate ?: boolean | null
    }[]
}



test.describe('useActiveState - controlled mode', () => {
    for (const { title, active : initialActive, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title   : 'Should be defaults to inactive',
            active  : undefined,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be controlled to inactive',
            active  : false,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be controlled to active',
            active  : true,
            updates : [
                {
                    title                   : 'Should be active and no animation',
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be changed from inactive to active',
            active  : false,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to active',
                    active                  : true,
                    
                    expectedActive          : 'active',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still active',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be changed from active to inactive',
            active  : true,
            updates : [
                {
                    title                   : 'Should be active and no animation',
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to inactive',
                    active                  : false,
                    
                    expectedActive          : 'inactive',
                },
                {
                    title                   : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The deactivating animation should be stopped and the activation is still inactive',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be changed from inactive to active then inactive',
            active  : false,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to active',
                    active                  : true,
                    
                    expectedActive          : 'active',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still active',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to inactive',
                    active                  : false,
                    
                    expectedActive          : 'inactive',
                },
                {
                    title                   : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The deactivating animation should be stopped and the activation is still inactive',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be changed from active to inactive then active',
            active  : true,
            updates : [
                {
                    title                   : 'Should be active and no animation',
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to inactive',
                    active                  : false,
                    
                    expectedActive          : 'inactive',
                },
                {
                    title                   : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The deactivating animation should be running and the activation is still inactive',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The deactivating animation should be stopped and the activation is still inactive',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to active',
                    active                  : true,
                    
                    expectedActive          : 'active',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still active',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Activate, deactivate, and re-activate quickly',
            active  : false,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Activate',
                    active                  : true,
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'Deactivate before activation finishes',
                    active                  : false,
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : true,  // Still activating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-activate again before deactivate finishes',
                    active                  : true,
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true, // Still in original activation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final activation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedActive          : 'active',
                    expectedRunningActivate : null, // No running animation.
                },
            ],
        },
        {
            title   : 'Deactivate, activate, and re-deactivate quickly',
            active  : true,
            updates : [
                {
                    title                   : 'Should be active and no animation',
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Deactivate',
                    active                  : false,
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'Activate before deactivation finishes',
                    active                  : true,
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : false,  // Still deactivating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-deactivate again before activate finishes',
                    active                  : false,
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false, // Still in original deactivation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final deactivation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null, // No running animation.
                },
            ],
        },
        
        
        
        {
            title   : 'Should be respond to change from inactive to active',
            active  : false,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to active',
                    action                  : 'activate',
                    
                    delay                   : 0, // wait for async process
                    expectedActive          : 'active',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still active',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be respond to change from active to inactive',
            active  : true,
            updates : [
                {
                    title                   : 'Should be active and no animation',
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to inactive',
                    action                  : 'deactivate',
                    
                    delay                   : 0, // wait for async process
                    expectedActive          : 'inactive',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still inactive',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still inactive',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still inactive',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be respond to change from inactive to active then inactive',
            active  : false,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to active',
                    action                  : 'activate',
                    
                    delay                   : 0, // wait for async process
                    expectedActive          : 'active',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still active',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to inactive',
                    action                  : 'deactivate',
                    
                    delay                   : 0, // wait for async process
                    expectedActive          : 'inactive',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still inactive',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still inactive',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still inactive',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be respond to change from active to inactive then active',
            active  : true,
            updates : [
                {
                    title                   : 'Should be active and no animation',
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to inactive',
                    action                  : 'deactivate',
                    
                    delay                   : 0, // wait for async process
                    expectedActive          : 'inactive',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still inactive',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still inactive',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still inactive',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Change to active',
                    action                  : 'activate',
                    
                    delay                   : 0, // wait for async process
                    expectedActive          : 'active',
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be running and the activation is still active',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'The activating animation should be stopped and the activation is still active',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
            ],
        },
        {
            title   : 'Should be respond to activate, deactivate, and re-activate quickly',
            active  : false,
            updates : [
                {
                    title                   : 'Should be inactive and no animation',
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Activate',
                    action                  : 'activate',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'Deactivate before activation finishes',
                    action                  : 'deactivate',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : true,  // Still activating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-activate again before deactivate finishes',
                    action                  : 'activate',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : true, // Still in original activation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final activation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedActive          : 'active',
                    expectedRunningActivate : null, // No running animation.
                },
            ],
        },
        {
            title   : 'Should be respond to deactivate, activate, and re-deactivate quickly',
            active  : true,
            updates : [
                {
                    title                   : 'Should be active and no animation',
                    expectedActive          : 'active',
                    expectedRunningActivate : null,
                },
                {
                    title                   : 'Deactivate',
                    action                  : 'deactivate',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'Activate before deactivation finishes',
                    action                  : 'activate',
                    
                    delay                   : 200,
                    expectedActive          : 'active',
                    expectedRunningActivate : false,  // Still deactivating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-deactivate again before activate finishes',
                    action                  : 'deactivate',
                    
                    delay                   : 200,
                    expectedActive          : 'inactive',
                    expectedRunningActivate : false, // Still in original deactivation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final deactivation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedActive          : 'inactive',
                    expectedRunningActivate : null, // No running animation.
                },
            ],
        },
    ] as ActiveStateControlledTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentActive : boolean | undefined = initialActive;
            
            
            
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
            
            let lastNewActive : boolean | undefined = undefined;
            let lastEvent     : ReactMouseEvent<HTMLButtonElement, MouseEvent> | undefined = undefined;
            const handleActiveChange : ValueChangeEventHandler<boolean, ReactMouseEvent<HTMLButtonElement, MouseEvent>> = (newActive, event) => {
                lastNewActive = newActive;
                lastEvent = event;
                
                // Simulate state changed:
                currentActive = newActive;
                
                // Simulate re-render after state changed:
                component.update(
                    <ActiveStateTest
                        active={currentActive}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onActiveChange={handleActiveChange}
                    />
                );
            };
            
            
            
            // First render:
            const component = await mount(
                <ActiveStateTest
                    active={currentActive}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onActiveChange={handleActiveChange}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('active-state-test');
            await expect(box).toContainText('Active State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, active, action, delay, expectedActive, expectedRunningActivate} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (active !== undefined) currentActive = active;
                
                
                
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
                
                
                
                // Re-render:
                await component.update(
                    <ActiveStateTest
                        active={currentActive}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onActiveChange={handleActiveChange}
                    />
                );
                
                
                
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
                if (expectedActive !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedActive);
                } // if
                
                if (expectedRunningActivate!== undefined) {
                    switch (expectedRunningActivate) {
                        case true:
                            expect(runningAnimations.has('boo-test-activate')).toBe(true);
                            expect(runningAnimations.has('boo-test-deactivate')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-activate')).toBe(false);
                            expect(runningAnimations.has('boo-test-deactivate')).toBe(true);
                            break;
                        case null:
                            expect(runningAnimations.has('boo-test-activate')).toBe(false);
                            expect(runningAnimations.has('boo-test-deactivate')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
