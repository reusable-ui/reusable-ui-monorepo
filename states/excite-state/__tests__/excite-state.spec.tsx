import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ExciteStateParentTest } from './ExciteStateParentTest.js';



/**
 * Represents a single test scenario for validating excite state transitions.
 */
interface ExciteStateTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * A sequence of updates applied to the excite state, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                  : string
        
        /**
         * New value for excited state.
         * Set to `undefined` to skip updating this part.
         */
        excited               ?: boolean
        
        /**
         * Determines whether to response the `onExcitedChange` and update the underlying state.
         * Defaults to previous `responseExcitedChange` and initially to `true`.
         */
        responseExcitedChange ?: boolean
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay                 ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected presence of running excite animation after the delay.
         * - `true`      : there is a running excite animation
         * - `false`     : there is no running excite animation
         * - `undefined` : nothing to expect
         */
        expectedExcited       ?: boolean
    }[]
}



test.describe('usesExciteState', () => {
    for (const { title, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected start time and -200 ms before the expected end time.
        */
        {
            title   : 'No running excite animation in all time',
            updates : [
                {
                    title                 : 'Initially no running animation',
                    expectedExcited       : false,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 100,
                    expectedExcited       : false,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 1000,
                    expectedExcited       : false,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 1000,
                    expectedExcited       : false,
                },
            ],
        },
        {
            title   : 'Runs excite animation once',
            updates : [
                {
                    title                 : 'Initially has running animation',
                    excited               : true, // The animation duration is 1000 ms.
                    responseExcitedChange : true,
                    
                    delay                 : 200, // Give a brief time to start the animation.
                    expectedExcited       : true,
                },
                {
                    title                 : 'Still have running animation',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedExcited       : true,
                },
                {
                    title                 : 'The animation should have stopped',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedExcited       : false,
                },
            ],
        },
        {
            title   : 'Runs excite animation in loop until manually stopped',
            updates : [
                {
                    title                 : 'Initially has running animation',
                    excited               : true, // The animation duration is 1000 ms.
                    responseExcitedChange : false, // refuses to stop the animation
                    
                    delay                 : 100, // Give a brief time to start the animation.
                    expectedExcited       : true,
                },
                {
                    title                 : 'Still have running animation',
                    
                    delay                 : 500, // 100 + 500 = 600 ms, the animation should still running.
                    expectedExcited       : true,
                },
                {
                    title                 : 'The animation should have restarted',
                    
                    delay                 : 600,  // 100 + 500 + 600 = 1200 ms, the animation should have restarted 200 ms ago.
                    expectedExcited       : true,
                },
                {
                    title                 : 'May still have running 2nd animation',
                    
                    delay                 : 600, // 100 + 500 + 600 + 600 = 1800 ms, the animation should still running.
                    expectedExcited       : undefined, // The animation may/may not run.
                },
                {
                    title                 : 'The animation should have restarted',
                    
                    delay                 : 600, // 100 + 500 + 600 + 600 + 600 = 2400 ms, the animation should have restarted 400 ms ago.
                    expectedExcited       : true,
                },
                {
                    title                 : 'Manually to stop the animation',
                    excited               : false, // Instruct to stop the running animation.
                    responseExcitedChange : true, // accepts to stop the animation
                    
                    delay                 : 100, // Give a brief time to see the effect.
                    expectedExcited       : undefined, // The animation may/may not run.
                },
                {
                    title                 : 'The animation should have stopped',
                    
                    delay                 : 1200,  // 100 + 500 + 600 + 600 + 600 + 100 + 1200 = 2400 ms, the animation should have stopped 700 ms ago.
                    expectedExcited       : false,
                },
            ],
        },
    ] as ExciteStateTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentExcited : boolean | undefined = undefined;
            let currentResponseExcitedChange : boolean | undefined = undefined;
            
            
            
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
            
            
            
            // First render:
            const component = await mount(
                <ExciteStateParentTest
                    excited={currentExcited}
                    responseExcitedChange={currentResponseExcitedChange}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('excite-state-test');
            await expect(box).toContainText('Excite State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, excited, responseExcitedChange, delay, expectedExcited } of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (excited !== undefined) currentExcited = excited;
                if (responseExcitedChange !== undefined) currentResponseExcitedChange = responseExcitedChange;
                
                
                
                // Re-render:
                await component.update(
                    <ExciteStateParentTest
                        excited={currentExcited}
                        responseExcitedChange={currentResponseExcitedChange}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('excite-state-test');
                await expect(box).toContainText('Excite State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedExcited !== undefined) {
                    expect(runningAnimations.has('boo-test-excite')).toBe(expectedExcited);
                } // if
            } // for
        });
    } // for
});
