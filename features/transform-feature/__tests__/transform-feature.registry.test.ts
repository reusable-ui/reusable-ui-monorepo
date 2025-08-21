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
                    title              : 'Register opacity-appear transform',
                    newTransform       : { transformVariable: 'var(--opacity-appear)' },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                    ],
                },
            ],
        },
        {
            title   : 'Multiple transforms with default priority',
            updates : [
                {
                    title              : 'Register opacity-appear',
                    newTransform       : { transformVariable: 'var(--opacity-appear)' },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                    ],
                },
                {
                    title              : 'Register translate-up',
                    newTransform       : { transformVariable: 'var(--translate-up)' },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                        'var(--translate-up)',
                    ],
                },
            ],
        },
        {
            title   : 'Priority stacking overrides default order',
            updates : [
                {
                    title              : 'Register opacity-appear with priority 1',
                    newTransform       : { transformVariable: 'var(--opacity-appear)', priority: 1 },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                    ],
                },
                {
                    title              : 'Register translate-up with priority 2',
                    newTransform       : { transformVariable: 'var(--translate-up)', priority: 2 },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                        'var(--translate-up)',
                    ],
                },
                {
                    title              : 'Register scale-up with priority 0',
                    newTransform       : { transformVariable: 'var(--scale-up)', priority: 0 },
                    expectedTransforms : [
                        'var(--scale-up)',
                        'var(--opacity-appear)',
                        'var(--translate-up)',
                    ],
                },
            ],
        },
        {
            title   : 'Duplicate registration should not duplicate entry',
            updates : [
                {
                    title              : 'Register opacity-appear',
                    newTransform       : { transformVariable: 'var(--opacity-appear)' },
                    expectedTransforms : ['var(--opacity-appear)'],
                },
                {
                    title              : 'Register opacity-appear again',
                    newTransform       : { transformVariable: 'var(--opacity-appear)' },
                    expectedTransforms : [
                        'var(--opacity-appear)', // No duplication
                    ],
                },
            ],
        },
        {
            title   : 'Re-register with higher priority should reorder',
            updates : [
                {
                    title              : 'Register opacity-appear with priority 1',
                    newTransform       : { transformVariable: 'var(--opacity-appear)', priority: 1 },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                    ],
                },
                {
                    title              : 'Register translate-up with priority 0',
                    newTransform       : { transformVariable: 'var(--translate-up)', priority: 0 },
                    expectedTransforms : [
                        'var(--translate-up)',
                        'var(--opacity-appear)',
                    ],
                },
                {
                    title              : 'Re-register translate-up with priority 2',
                    newTransform       : { transformVariable: 'var(--translate-up)', priority: 2 },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                        'var(--translate-up)',
                    ],
                },
            ],
        },
        {
            title   : 'Same priority preserves insertion order',
            updates : [
                {
                    title              : 'Register opacity-appear with priority 1',
                    newTransform       : { transformVariable: 'var(--opacity-appear)', priority: 1 },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                    ],
                },
                {
                    title              : 'Register translate-up with priority 1',
                    newTransform       : { transformVariable: 'var(--translate-up)', priority: 1 },
                    expectedTransforms : [
                        'var(--opacity-appear)',
                        'var(--translate-up)',
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
