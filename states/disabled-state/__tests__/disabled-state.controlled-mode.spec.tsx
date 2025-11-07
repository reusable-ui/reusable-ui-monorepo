import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DisabledStateTest } from './DisabledStateTest.js';
import { DisabledStateWithContextTest } from './DisabledStateWithContextTest.js'
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled enabled/disabled state transitions.
 */
interface DisabledStateControlledTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title           : string
    
    /**
     * The parent disabled state to use for the test.
     * Set to `undefined` for no parent disabled context.
     */
    parentDisabled ?: boolean
    
    /**
     * Initial enabled/disabled state.
     * - `true`: disabled
     * - `false`: enabled
     * - `undefined`: default to enabled
     */
    disabled       ?: boolean
    
    /**
     * A sequence of updates applied to the enabled/disabled state, including expected outcomes.
     */
    updates         : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for parent disabled state.
         * Set to `undefined` to skip updating this part.
         */
        parentDisabled          ?: boolean
        
        /**
         * New value for disabled state.
         * Set to `undefined` to skip updating this part.
         */
        disabled                ?: boolean
        
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
         * The expected disabled state.
         * - 'enabled': should be enabled
         * - 'disabled': should be disabled
         * - `undefined`: nothing to expect
         */
        expectedDisabled        ?: 'enabled' | 'disabled'
        
        /**
         * The expected presence of running enable/disable animation after the delay.
         * - `true`      : there is a running disable animation
         * - `false`     : there is a running enable animation
         * - `null`      : there is no running enable/disable animation
         * - `undefined` : nothing to expect
         */
        expectedRunningDisabled ?: boolean | null
    }[]
}



test.describe('useDisabledBehaviorState - controlled mode', () => {
    for (const { title, parentDisabled: initialParentDisabled, disabled : initialDisabled, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title          : 'Should be defaults to enabled',
            disabled       : undefined,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be controlled to enabled',
            disabled       : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be controlled to disabled',
            disabled       : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be changed from enabled to disabled',
            disabled       : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to disabled',
                    disabled                : true,
                    
                    expectedDisabled        : 'disabled',
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be stopped and the disablement is still disabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be changed from disabled to enabled',
            disabled       : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to enabled',
                    disabled                : false,
                    
                    expectedDisabled        : 'enabled',
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be changed from disabled to enabled then disabled',
            disabled       : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to enabled',
                    disabled                : false,
                    
                    expectedDisabled        : 'enabled',
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to disabled',
                    disabled                : true,
                    
                    expectedDisabled        : 'disabled',
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be stopped and the disablement is still disabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be changed from enabled to disabled then enabled',
            disabled       : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to disabled',
                    disabled                : true,
                    
                    expectedDisabled        : 'disabled',
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be stopped and the disablement is still disabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to enabled',
                    disabled                : false,
                    
                    expectedDisabled        : 'enabled',
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Enable, disable, and re-enable quickly',
            disabled       : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Enable',
                    disabled                : false,
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'Disable before disablement finishes',
                    disabled                : true,
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled', // Still enabled because the enabling animation is not finished yet.
                    expectedRunningDisabled : false,  // Still enabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-enable again before disable finishes',
                    disabled                : false,
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false, // Still in original disablement sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final disablement to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null, // No running animation.
                },
            ],
        },
        {
            title          : 'Disable, enable, and re-disable quickly',
            disabled       : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Disable',
                    disabled                : true,
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'Enable before disablement finishes',
                    disabled                : false,
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled', // Still disabled because the disabling animation is not finished yet.
                    expectedRunningDisabled : true,  // Still disabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-disable again before enable finishes',
                    disabled                : true,
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true, // Still in original disablement sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final disablement to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null, // No running animation.
                },
            ],
        },
        
        
        
        {
            title          : 'Should be contextual enabled',
            parentDisabled : false,
            disabled       : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be contextual disabled',
            parentDisabled : true,
            disabled       : false,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be explicitly disabled regradless context is enabled',
            parentDisabled : false,
            disabled       : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be explicitly disabled regradless context is disabled',
            parentDisabled : true,
            disabled       : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from enabled to disabled',
            parentDisabled : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to disabled',
                    parentDisabled          : true,
                    
                    expectedDisabled        : 'disabled',
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be stopped and the disablement is still disabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from disabled to enabled',
            parentDisabled : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to enabled',
                    parentDisabled          : false,
                    
                    expectedDisabled        : 'enabled',
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from disabled to enabled then disabled',
            parentDisabled : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to enabled',
                    parentDisabled          : false,
                    
                    expectedDisabled        : 'enabled',
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to disabled',
                    parentDisabled          : true,
                    
                    expectedDisabled        : 'disabled',
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be stopped and the disablement is still disabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Should be contextual changed from enabled to disabled then enabled',
            parentDisabled : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to disabled',
                    parentDisabled          : true,
                    
                    expectedDisabled        : 'disabled',
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be running and the disablement is still disabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'The disabling animation should be stopped and the disablement is still disabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Change to enabled',
                    parentDisabled          : false,
                    
                    expectedDisabled        : 'enabled',
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be running and the disablement is still enabled',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'The enabling animation should be stopped and the disablement is still enabled',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
            ],
        },
        {
            title          : 'Contextual enable, disable, and re-enable quickly',
            parentDisabled : true,
            updates        : [
                {
                    title                   : 'Should be disabled and no animation',
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Enable',
                    parentDisabled          : false,
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'Disable before disablement finishes',
                    parentDisabled          : true,
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled', // Still enabled because the enabling animation is not finished yet.
                    expectedRunningDisabled : false,  // Still enabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-enable again before disable finishes',
                    parentDisabled          : false,
                    
                    delay                   : 200,
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : false, // Still in original disablement sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final disablement to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null, // No running animation.
                },
            ],
        },
        {
            title          : 'Contextual disable, enable, and re-disable quickly',
            parentDisabled : false,
            updates        : [
                {
                    title                   : 'Should be enabled and no animation',
                    expectedDisabled        : 'enabled',
                    expectedRunningDisabled : null,
                },
                {
                    title                   : 'Disable',
                    parentDisabled          : true,
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'Enable before disablement finishes',
                    parentDisabled          : false,
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled', // Still disabled because the disabling animation is not finished yet.
                    expectedRunningDisabled : true,  // Still disabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-disable again before enable finishes',
                    parentDisabled          : true,
                    
                    delay                   : 200,
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : true, // Still in original disablement sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final disablement to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedDisabled        : 'disabled',
                    expectedRunningDisabled : null, // No running animation.
                },
            ],
        },
    ] as DisabledStateControlledTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentParentDisabled : boolean | undefined = initialParentDisabled;
            let currentDisabled : boolean | undefined = initialDisabled;
            
            
            
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
            
            let lastNewDisabled : boolean | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleDisabledUpdate : ValueChangeEventHandler<boolean, unknown> = (newDisabled, event) => {
                lastNewDisabled = newDisabled;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                (currentParentDisabled === undefined)
                ? <DisabledStateTest
                    disabled={currentDisabled}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onDisabledUpdate={handleDisabledUpdate}
                />
                : <DisabledStateWithContextTest
                    parentDisabled={currentParentDisabled}
                    disabled={currentDisabled}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onDisabledUpdate={handleDisabledUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('disabled-state-test');
            await expect(box).toContainText('Disabled State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, parentDisabled, disabled, delay, expectedDisabled, expectedRunningDisabled} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (parentDisabled !== undefined) currentParentDisabled = parentDisabled;
                if (disabled !== undefined) currentDisabled = disabled;
                
                
                
                // Reset the last received values:
                lastNewDisabled = undefined;
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    (currentParentDisabled === undefined)
                    ? <DisabledStateTest
                        disabled={currentDisabled}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onDisabledUpdate={handleDisabledUpdate}
                    />
                    : <DisabledStateWithContextTest
                        parentDisabled={currentParentDisabled}
                        disabled={currentDisabled}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onDisabledUpdate={handleDisabledUpdate}
                    />
                );
                
                
                
                // Validate events:
                if ((disabled !== undefined) || (parentDisabled !== undefined)) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewDisabled).toBe((disabled ?? false) || (parentDisabled ?? false));
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
                if (expectedDisabled !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedDisabled);
                } // if
                
                if (expectedRunningDisabled!== undefined) {
                    switch (expectedRunningDisabled) {
                        case true: // expectedRunningDisabled = true (disabling)
                            expect(runningAnimations.has('boo-test-enabling')).toBe(false);
                            expect(runningAnimations.has('boo-test-disabling')).toBe(true); // disabling
                            break;
                        case false: // expectedRunningDisabled = false (enabling)
                            expect(runningAnimations.has('boo-test-enabling')).toBe(true); // enabling
                            expect(runningAnimations.has('boo-test-disabling')).toBe(false);
                            break;
                        case null: // expectedRunningDisabled = null (idle)
                            expect(runningAnimations.has('boo-test-enabling')).toBe(false);
                            expect(runningAnimations.has('boo-test-disabling')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
