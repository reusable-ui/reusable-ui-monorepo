import {
    type CssCustomSimpleRef,
} from '@cssfn/core'
import {
    boxShadowRegistry,
} from '../dist/index'
import { test, expect } from '@playwright/experimental-ct-react';



// Tests:

/**
 * Represents a single test scenario for validating box shadow registry states.
 */
interface BoxShadowRegistryTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * A sequence of updates applied to the box shadow registry, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title              : string
        
        /**
         * A box shadow variable with an optional stacking priority for registration.
         */
        newBoxShadow       : { boxShadowVariable: CssCustomSimpleRef, priority?: number }
        
        // Expected Outcomes:
        
        /**
         * Expected the list of registered box shadow variables.
         */
        expectedBoxShadows : CssCustomSimpleRef[]
    }[]
}



test.describe('boxShadowRegistry', () => {
    for (const { title, updates } of [
        {
            title   : 'Single box shadow registration',
            updates : [
                {
                    title              : 'Register soft box shadow',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-soft)' },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                    ],
                },
            ],
        },
        {
            title   : 'Multiple box shadows with default priority',
            updates : [
                {
                    title              : 'Register soft',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-soft)' },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                    ],
                },
                {
                    title              : 'Register lift',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-lift)' },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                        'var(--shadow-lift)',
                    ],
                },
            ],
        },
        {
            title   : 'Priority stacking overrides default order',
            updates : [
                {
                    title              : 'Register soft with priority 1',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-soft)', priority: 1 },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                    ],
                },
                {
                    title              : 'Register lift with priority 2',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-lift)', priority: 2 },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                        'var(--shadow-lift)',
                    ],
                },
                {
                    title              : 'Register pop with priority 0',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-pop)', priority: 0 },
                    expectedBoxShadows : [
                        'var(--shadow-pop)',
                        'var(--shadow-soft)',
                        'var(--shadow-lift)',
                    ],
                },
            ],
        },
        {
            title   : 'Duplicate registration should not duplicate entry',
            updates : [
                {
                    title              : 'Register soft',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-soft)' },
                    expectedBoxShadows : ['var(--shadow-soft)'],
                },
                {
                    title              : 'Register soft again',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-soft)' },
                    expectedBoxShadows : [
                        'var(--shadow-soft)', // No duplication
                    ],
                },
            ],
        },
        {
            title   : 'Re-register with higher priority should reorder',
            updates : [
                {
                    title              : 'Register soft with priority 1',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-soft)', priority: 1 },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                    ],
                },
                {
                    title              : 'Register lift with priority 0',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-lift)', priority: 0 },
                    expectedBoxShadows : [
                        'var(--shadow-lift)',
                        'var(--shadow-soft)',
                    ],
                },
                {
                    title              : 'Re-register lift with priority 2',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-lift)', priority: 2 },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                        'var(--shadow-lift)',
                    ],
                },
            ],
        },
        {
            title   : 'Same priority preserves insertion order',
            updates : [
                {
                    title              : 'Register soft with priority 1',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-soft)', priority: 1 },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                    ],
                },
                {
                    title              : 'Register lift with priority 1',
                    newBoxShadow       : { boxShadowVariable: 'var(--shadow-lift)', priority: 1 },
                    expectedBoxShadows : [
                        'var(--shadow-soft)',
                        'var(--shadow-lift)',
                    ],
                },
            ],
        },
    ] as BoxShadowRegistryTestCase[]) {
        test(title, async () => {
            // Cleanup:
            if (boxShadowRegistry.boxShadows.length) {
                for (const variable of boxShadowRegistry.boxShadows) {
                    // Re-register and immediately unregister:
                    boxShadowRegistry.registerBoxShadow(variable)();
                } // for
            } // if
            
            
            
            // Sanity check:
            expect(boxShadowRegistry.boxShadows).toEqual([]);
            
            
            
            // Apply update scenarios:
            for (const {
                // Test Inputs:
                title : updateTitle,
                
                newBoxShadow : { boxShadowVariable, priority },
                
                // Expected Outcomes:
                expectedBoxShadows,
            } of updates) {
                // Apply the update:
                boxShadowRegistry.registerBoxShadow(boxShadowVariable, priority);
                
                
                
                // Verify the expected values:
                console.log(`[subtest] ${updateTitle}`);
                expect(boxShadowRegistry.boxShadows).toEqual(expectedBoxShadows);
            } // for
        });
    } // for
});
