import {
    type CssCustomSimpleRef,
} from '@cssfn/core'
import {
    animationRegistry,
} from '../dist/index'
import { test, expect } from '@playwright/experimental-ct-react';



// Tests:

/**
 * Represents a single test scenario for validating animation registry states.
 */
interface AnimationRegistryTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * A sequence of updates applied to the animation registry, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title              : string
        
        /**
         * An animation variable with an optional stacking priority for registration.
         */
        newAnimation       : { animationVariable: CssCustomSimpleRef, priority?: number }
        
        // Expected Outcomes:
        
        /**
         * Expected the list of registered animation variables.
         */
        expectedAnimations : CssCustomSimpleRef[]
    }[]
}



test.describe('animationRegistry', () => {
    for (const { title, updates } of [
        {
            title   : 'Single animation registration',
            updates : [
                {
                    title              : 'Register fade-in animation',
                    newAnimation       : { animationVariable: 'var(--fade-in)' },
                    expectedAnimations : [
                        'var(--fade-in)',
                    ],
                },
            ],
        },
        {
            title   : 'Multiple animations with default priority',
            updates : [
                {
                    title              : 'Register fade-in',
                    newAnimation       : { animationVariable: 'var(--fade-in)' },
                    expectedAnimations : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up',
                    newAnimation       : { animationVariable: 'var(--slide-up)' },
                    expectedAnimations : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
            ],
        },
        {
            title   : 'Priority stacking overrides default order',
            updates : [
                {
                    title              : 'Register fade-in with priority 1',
                    newAnimation       : { animationVariable: 'var(--fade-in)', priority: 1 },
                    expectedAnimations : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up with priority 2',
                    newAnimation       : { animationVariable: 'var(--slide-up)', priority: 2 },
                    expectedAnimations : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
                {
                    title              : 'Register zoom-in with priority 0',
                    newAnimation       : { animationVariable: 'var(--zoom-in)', priority: 0 },
                    expectedAnimations : [
                        'var(--zoom-in)',
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
            ],
        },
        {
            title   : 'Duplicate registration should not duplicate entry',
            updates : [
                {
                    title              : 'Register fade-in',
                    newAnimation       : { animationVariable: 'var(--fade-in)' },
                    expectedAnimations : ['var(--fade-in)'],
                },
                {
                    title              : 'Register fade-in again',
                    newAnimation       : { animationVariable: 'var(--fade-in)' },
                    expectedAnimations : [
                        'var(--fade-in)', // No duplication
                    ],
                },
            ],
        },
        {
            title   : 'Re-register with higher priority should reorder',
            updates : [
                {
                    title              : 'Register fade-in with priority 1',
                    newAnimation       : { animationVariable: 'var(--fade-in)', priority: 1 },
                    expectedAnimations : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up with priority 0',
                    newAnimation       : { animationVariable: 'var(--slide-up)', priority: 0 },
                    expectedAnimations : [
                        'var(--slide-up)',
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Re-register slide-up with priority 2',
                    newAnimation       : { animationVariable: 'var(--slide-up)', priority: 2 },
                    expectedAnimations : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
            ],
        },
        {
            title   : 'Same priority preserves insertion order',
            updates : [
                {
                    title              : 'Register fade-in with priority 1',
                    newAnimation       : { animationVariable: 'var(--fade-in)', priority: 1 },
                    expectedAnimations : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up with priority 1',
                    newAnimation       : { animationVariable: 'var(--slide-up)', priority: 1 },
                    expectedAnimations : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
            ],
        },
    ] as AnimationRegistryTestCase[]) {
        test(title, async () => {
            // Cleanup:
            if (animationRegistry.animations.length) {
                for (const variable of animationRegistry.animations) {
                    // Re-register and immediately unregister:
                    animationRegistry.registerAnimation(variable)();
                } // for
            } // if
            
            
            
            // Sanity check:
            expect(animationRegistry.animations).toEqual([]);
            
            
            
            // Apply update scenarios:
            for (const {
                // Test Inputs:
                title : updateTitle,
                
                newAnimation : { animationVariable, priority },
                
                // Expected Outcomes:
                expectedAnimations,
            } of updates) {
                // Apply the update:
                animationRegistry.registerAnimation(animationVariable, priority);
                
                
                
                // Verify the expected values:
                console.log(`[subtest] ${updateTitle}`);
                expect(animationRegistry.animations).toEqual(expectedAnimations);
            } // for
        });
    } // for
});
