import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DisabledStateTest } from './DisabledStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { DisabledPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of enabled/disabled state transitions.
 */
interface DisabledStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title     : string
    
    /**
     * Initial enabled/disabled state.
     * - `true`: disabled
     * - `false`: enabled
     * - `undefined`: default to enabled
     */
    disabled ?: boolean
    
    /**
     * A sequence of updates applied to the enabled/disabled state, including expected outcomes.
     */
    updates   : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title          : string
        
        /**
         * New value for disabled state.
         * Set to `undefined` to skip updating this part.
         */
        disabled      ?: boolean
        
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
         * The expected disabled state.
         * - `'disabled'`  : onDisablingEnd event has been invoked
         * - `'disabling'` : onDisablingStart event has been invoked
         * - `'enabling'`  : onEnablingStart event has been invoked
         * - `'enabled'`   : onEnablingEnd event has been invoked
         * - `null`         : no event has been invoked
         * - `undefined`    : nothing to expect
         */
        expectedEvent ?: DisabledPhase | null
    }[]
}



test.describe('useDisabledStatePhaseEvents', () => {
    for (const { title, disabled : initialDisabled, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title    : 'Should be respond to change from disabled to enabled',
            disabled : true,
            updates  : [
                {
                    title         : 'Change to enabled',
                    disabled      : false,
                    
                    delay         : 0,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay         : 200,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'enabled',
                },
            ],
        },
        {
            title    : 'Should be respond to change from enabled to disabled',
            disabled : false,
            updates  : [
                {
                    title         : 'Change to disabled',
                    disabled      : true,
                    
                    delay         : 0,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still disabled',
                    
                    delay         : 200,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still disabled',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be stopped and the disablement is still disabled',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'disabled',
                },
            ],
        },
        {
            title    : 'Should be respond to change from disabled to enabled then disabled',
            disabled : true,
            updates  : [
                {
                    title         : 'Change to enabled',
                    disabled      : false,
                    
                    delay         : 0,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay         : 200,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'enabled',
                },
                {
                    title         : 'Change to disabled',
                    disabled      : true,
                    
                    delay         : 0,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still disabled',
                    
                    delay         : 200,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still disabled',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be stopped and the disablement is still disabled',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'disabled',
                },
            ],
        },
        {
            title    : 'Should be respond to change from enabled to disabled then enabled',
            disabled : false,
            updates  : [
                {
                    title         : 'Change to disabled',
                    disabled      : true,
                    
                    delay         : 0,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still disabled',
                    
                    delay         : 200,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still disabled',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'The enabling animation should be stopped and the disablement is still disabled',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'disabled',
                },
                {
                    title         : 'Change to enabled',
                    disabled      : false,
                    
                    delay         : 0,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay         : 200,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'enabled',
                },
            ],
        },
        {
            title    : 'Should be respond to enable, disable, and re-enable quickly',
            disabled : true,
            updates  : [
                {
                    title         : 'Enable',
                    disabled      : false,
                    
                    delay         : 200,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'Disable before disablement finishes',
                    disabled      : true,
                    
                    delay         : 200,
                    expectedEvent : 'enabling', // Still enabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-enable again before disable finishes',
                    disabled      : false,
                    
                    delay         : 200,
                    expectedEvent : 'enabling', // Still in original disablement sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final disablement to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'enabled',
                },
            ],
        },
        {
            title    : 'Should be respond to disable, enable, and re-disable quickly',
            disabled : false,
            updates  : [
                {
                    title         : 'Disable',
                    disabled      : true,
                    
                    delay         : 200,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'Enable before disablement finishes',
                    disabled      : false,
                    
                    delay         : 200,
                    expectedEvent : 'disabling', // Still disabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-disable again before enable finishes',
                    disabled      : true,
                    
                    delay         : 200,
                    expectedEvent : 'disabling', // Still in original disablement sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final disablement to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'disabled',
                },
            ],
        },
        {
            title    : 'Should be respond to enable and quickly switch to disable',
            disabled : true,
            updates  : [
                {
                    title         : 'Enable',
                    disabled      : false,
                    
                    delay         : 200,
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'Disable before disablement finishes',
                    disabled      : true,
                    
                    delay         : 200,
                    expectedEvent : 'enabling', // Still enabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still enabling',
                    
                    delay         : 200,
                    expectedEvent : 'enabling', // Still in original disablement sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final disablement to complete and switching to disabled',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'Still disabling',
                    
                    delay         : 200,
                    expectedEvent : 'disabling', // Still in switching disablement sequence.
                },
                {
                    title         : 'Wait for final disablement to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'disabled',
                },
            ],
        },
        {
            title    : 'Should be respond to disable and quickly switch to enable',
            disabled : false,
            updates  : [
                {
                    title         : 'Disable',
                    disabled      : true,
                    
                    delay         : 200,
                    expectedEvent : 'disabling',
                },
                {
                    title         : 'Enable before disablement finishes',
                    disabled      : false,
                    
                    delay         : 200,
                    expectedEvent : 'disabling', // Still disabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still disabling',
                    
                    delay         : 200,
                    expectedEvent : 'disabling', // Still in original disablement sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final disablement to complete and switching to enabled',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'enabling',
                },
                {
                    title         : 'Still enabling',
                    
                    delay         : 200,
                    expectedEvent : 'enabling', // Still in original disablement sequence.
                },
                {
                    title         : 'Wait for final disablement to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'enabled',
                },
            ],
        },
    ] as DisabledStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentDisabled : boolean | undefined = initialDisabled;
            
            
            
            // Handlers:
            let lastEvent : unknown | undefined = undefined;
            const handleDisabledUpdate : ValueChangeEventHandler<boolean, unknown> = (newDisabled, event) => {
                lastEvent = event;
            };
            
            let lastDisabledPhase : DisabledPhase | null = null;
            const handleEnablingStart : ValueChangeEventHandler<DisabledPhase, unknown> = (disabledPhase) => {
                expect(disabledPhase).toBe('enabling');
                lastDisabledPhase = disabledPhase;
            };
            const handleEnablingEnd : ValueChangeEventHandler<DisabledPhase, unknown> = (disabledPhase) => {
                expect(disabledPhase).toBe('enabled');
                lastDisabledPhase = disabledPhase;
            };
            const handleDisablingStart : ValueChangeEventHandler<DisabledPhase, unknown> = (disabledPhase) => {
                expect(disabledPhase).toBe('disabling');
                lastDisabledPhase = disabledPhase;
            };
            const handleDisablingEnd : ValueChangeEventHandler<DisabledPhase, unknown> = (disabledPhase) => {
                expect(disabledPhase).toBe('disabled');
                lastDisabledPhase = disabledPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <DisabledStateTest
                    disabled={currentDisabled}
                    
                    onDisabledUpdate={handleDisabledUpdate}
                    
                    onEnablingStart={handleEnablingStart}
                    onEnablingEnd={handleEnablingEnd}
                    onDisablingStart={handleDisablingStart}
                    onDisablingEnd={handleDisablingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('disabled-state-test');
            await expect(box).toContainText('Disabled State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, disabled, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (disabled !== undefined) currentDisabled = disabled;
                
                
                
                // Reset the last received values:
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    <DisabledStateTest
                        disabled={currentDisabled}
                        
                        onDisabledUpdate={handleDisabledUpdate}
                        
                        onEnablingStart={handleEnablingStart}
                        onEnablingEnd={handleEnablingEnd}
                        onDisablingStart={handleDisablingStart}
                        onDisablingEnd={handleDisablingEnd}
                    />
                );
                
                
                
                // Validate events:
                if (disabled !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    if (expectedEvent !== undefined) {
                        expect(lastDisabledPhase).toBe(expectedEvent);
                    } // if
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('disabled-state-test');
                await expect(box).toContainText('Disabled State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastDisabledPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
