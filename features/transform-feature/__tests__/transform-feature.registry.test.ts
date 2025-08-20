import {
    type CssCustomSimpleRef,
} from '@cssfn/core'
import {
    transformRegistry,
} from '../dist/index'
import { test, expect } from '@playwright/experimental-ct-react';



// Tests:

/**
 * Represents a single test scenario for validating transform registry states.
 */
interface TransformRegistryTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * A sequence of updates applied to the transform registry, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title              : string
        
        /**
         * An transform variable with an optional stacking priority for registration.
         */
        newTransform       : { transformVariable: CssCustomSimpleRef, priority?: number }
        
        // Expected Outcomes:
        
        /**
         * Expected the list of registered transform variables.
         */
        expectedTransforms : CssCustomSimpleRef[]
    }[]
}



test.describe('transformRegistry', () => {
    for (const { title, updates } of [
        {
            title   : 'Single transform registration',
            updates : [
                {
                    title              : 'Register fade-in transform',
                    newTransform       : { transformVariable: 'var(--fade-in)' },
                    expectedTransforms : [
                        'var(--fade-in)',
                    ],
                },
            ],
        },
        {
            title   : 'Multiple transforms with default priority',
            updates : [
                {
                    title              : 'Register fade-in',
                    newTransform       : { transformVariable: 'var(--fade-in)' },
                    expectedTransforms : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up',
                    newTransform       : { transformVariable: 'var(--slide-up)' },
                    expectedTransforms : [
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
                    newTransform       : { transformVariable: 'var(--fade-in)', priority: 1 },
                    expectedTransforms : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up with priority 2',
                    newTransform       : { transformVariable: 'var(--slide-up)', priority: 2 },
                    expectedTransforms : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
                {
                    title              : 'Register zoom-in with priority 0',
                    newTransform       : { transformVariable: 'var(--zoom-in)', priority: 0 },
                    expectedTransforms : [
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
                    newTransform       : { transformVariable: 'var(--fade-in)' },
                    expectedTransforms : ['var(--fade-in)'],
                },
                {
                    title              : 'Register fade-in again',
                    newTransform       : { transformVariable: 'var(--fade-in)' },
                    expectedTransforms : [
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
                    newTransform       : { transformVariable: 'var(--fade-in)', priority: 1 },
                    expectedTransforms : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up with priority 0',
                    newTransform       : { transformVariable: 'var(--slide-up)', priority: 0 },
                    expectedTransforms : [
                        'var(--slide-up)',
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Re-register slide-up with priority 2',
                    newTransform       : { transformVariable: 'var(--slide-up)', priority: 2 },
                    expectedTransforms : [
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
                    newTransform       : { transformVariable: 'var(--fade-in)', priority: 1 },
                    expectedTransforms : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title              : 'Register slide-up with priority 1',
                    newTransform       : { transformVariable: 'var(--slide-up)', priority: 1 },
                    expectedTransforms : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
            ],
        },
    ] as TransformRegistryTestCase[]) {
        test(title, async () => {
            // Cleanup:
            if (transformRegistry.transforms.length) {
                for (const variable of transformRegistry.transforms) {
                    // Re-register and immediately unregister:
                    transformRegistry.registerTransform(variable)();
                } // for
            } // if
            
            
            
            // Sanity check:
            expect(transformRegistry.transforms).toEqual([]);
            
            
            
            // Apply update scenarios:
            for (const {
                // Test Inputs:
                title : updateTitle,
                
                newTransform : { transformVariable, priority },
                
                // Expected Outcomes:
                expectedTransforms,
            } of updates) {
                // Apply the update:
                transformRegistry.registerTransform(transformVariable, priority);
                
                
                
                // Verify the expected values:
                console.log(`[subtest] ${updateTitle}`);
                expect(transformRegistry.transforms).toEqual(expectedTransforms);
            } // for
        });
    } // for
});
