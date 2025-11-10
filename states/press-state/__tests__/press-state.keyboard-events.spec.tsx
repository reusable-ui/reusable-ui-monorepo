import React, { type AnimationEventHandler, type MouseEvent, type MouseEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { PressStateTest } from './PressStateTest.js';



/**
 * Represents a single test scenario for validating controlled press state transitions.
 */
interface PressStateKeyboardEventTestCase {
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
     * A sequence of updates applied to the press state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value computed press state.
         * - string     : press the specified key.
         * - `null`     : release the previous key.
         * - `undefined` : skip updating this part.
         */
        setKey               ?: 'Space' | 'Enter' | string & {} | null
        
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
         * - 'pressed'   : should be pressed
         * - 'released'   : should be released
         * - `undefined` : nothing to expect
         */
        expectedPress        ?: 'pressed' | 'released'
        
        /**
         * The expected status of the press animation.
         * 
         * - `true`      : click event should be expected
         * - `false`     : click event should not be expected
         * - `undefined` : nothing to expect
         */
        expectedClickEvent  ?: boolean
    }[]
}



test.describe('usePressBehaviorState - diagnostic mode', () => {
    for (const { title, pressed : initialPressed, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should respond to change from released, then [Space] pressed, and back to released (clicked)',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedClickEvent   : false, // not yet clicked
                },
                {
                    title                : 'Press [Space] key',
                    setKey               : 'Space',
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'pressed',
                    expectedClickEvent   : false, // not yet clicked until key release
                },
                {
                    title                : 'Wait for a brief moment while still holding [Space] key',
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedClickEvent   : false, // not yet clicked until key release
                },
                {
                    title                : 'Release [Space] key',
                    setKey               : null,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : undefined, // the pressing animation may still be running even if we released the key
                    expectedClickEvent   : true, // clicked
                },
                {
                    title                : 'Fully released',
                    setKey               : null,
                    
                    delay                : 1200, // ensures the pressing animation is done
                    expectedPress        : 'released', // should be fully released
                    expectedClickEvent   : false, // no additional click
                },
            ],
        },
        {
            title         : 'Should respond to [Enter] key press and release (clicked)',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedClickEvent   : false, // not yet clicked
                },
                {
                    title                : 'Press [Enter] key',
                    setKey               : 'Enter',
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'released', // pressing [Enter] key does not press the component
                    expectedClickEvent   : true, // clicked
                },
                {
                    title                : 'Wait for a brief moment while still holding [Enter] key',
                    
                    delay                : 200,
                    expectedPress        : 'released', // no pressing animation for [Enter] key
                    expectedClickEvent   : false, // no additional click
                },
                {
                    title                : 'Release [Enter] key',
                    setKey               : null,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'released', // no pressing animation for [Enter] key
                    expectedClickEvent   : false, // no additional click
                },
                {
                    title                : 'Fully released',
                    setKey               : null,
                    
                    delay                : 1200, // ensures the pressing animation is done
                    expectedPress        : 'released', // no pressing animation for [Enter] key
                    expectedClickEvent   : false, // no additional click
                },
            ],
        },
        {
            title         : 'Should not respond to [a] key press and release (not clicked)',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedClickEvent   : false, // never clicked
                },
                {
                    title                : 'Press [a] key',
                    setKey               : 'a',
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'released', // no pressing animation for [a] key
                    expectedClickEvent   : false, // never clicked
                },
                {
                    title                : 'Wait for a brief moment while still holding [a] key',
                    
                    delay                : 200,
                    expectedPress        : 'released', // no pressing animation for [a] key
                    expectedClickEvent   : false, // never clicked
                },
                {
                    title                : 'Release [a] key',
                    setKey               : null,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'released', // no pressing animation for [a] key
                    expectedClickEvent   : false, // never clicked
                },
                {
                    title                : 'Fully released',
                    setKey               : null,
                    
                    delay                : 1200, // ensures the pressing animation is done
                    expectedPress        : 'released', // no pressing animation for [a] key
                    expectedClickEvent   : false, // no additional click
                },
            ],
        },
    ] as PressStateKeyboardEventTestCase[]) {
        test(title, async ({ mount, page }) => {
            // Stores currently press animation names:
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
            
            let lastClickEvent : MouseEvent<HTMLDivElement, globalThis.MouseEvent> | undefined = undefined;
            const handleClick : MouseEventHandler<HTMLDivElement> = (event) => {
                console.log('CLICKED');
                lastClickEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <PressStateTest
                    implementsPressHandlers={true}
                    pressed={initialPressed}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onClick={handleClick}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('press-state-test');
            await expect(box).toContainText('Press State Test');
            
            
            
            // Apply update scenarios:
            let lastKeyPressed : string | undefined = undefined;
            for (const { title, setKey, delay, expectedPress, expectedClickEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                lastClickEvent = undefined;
                
                
                
                // Update the press state:
                if (setKey !== undefined) {
                    // Simulate user interaction to change the press state:
                    if (setKey) {
                        lastKeyPressed = setKey; // remember the last pressed key
                        await box.focus(); // focus the box to receive keyboard events
                        await page.keyboard.down(setKey); // simulate press
                    }
                    else {
                        if (lastKeyPressed !== undefined) await page.keyboard.up(lastKeyPressed); // simulate release of previous key
                        lastKeyPressed = undefined; // clear the last pressed key
                    } // if
                } // if
                
                
                
                // Validate events:
                if (setKey !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box2 = component.getByTestId('press-state-test');
                await expect(box2).toContainText('Press State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedPress !== undefined) {
                    expect(box2).toHaveAttribute('data-state', expectedPress);
                } // if
                
                if (expectedClickEvent!== undefined) {
                    if (setKey === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    
                    switch (expectedClickEvent) {
                        case true:
                            expect(lastClickEvent).not.toBeUndefined();
                            break;
                        case false:
                            expect(lastClickEvent).toBeUndefined();
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
