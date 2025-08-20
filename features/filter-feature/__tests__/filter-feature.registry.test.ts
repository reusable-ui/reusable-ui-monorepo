import {
    type CssCustomSimpleRef,
} from '@cssfn/core'
import {
    filterRegistry,
} from '../dist/index'
import { test, expect } from '@playwright/experimental-ct-react';



// Tests:

/**
 * Represents a single test scenario for validating filter registry states.
 */
interface FilterRegistryTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * A sequence of updates applied to the filter registry, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title           : string
        
        /**
         * An filter variable with an optional stacking priority for registration.
         */
        newFilter       : { filterVariable: CssCustomSimpleRef, priority?: number }
        
        // Expected Outcomes:
        
        /**
         * Expected the list of registered filter variables.
         */
        expectedFilters : CssCustomSimpleRef[]
    }[]
}



test.describe('filterRegistry', () => {
    for (const { title, updates } of [
        {
            title   : 'Single filter registration',
            updates : [
                {
                    title           : 'Register fade-in filter',
                    newFilter       : { filterVariable: 'var(--fade-in)' },
                    expectedFilters : [
                        'var(--fade-in)',
                    ],
                },
            ],
        },
        {
            title   : 'Multiple filters with default priority',
            updates : [
                {
                    title           : 'Register fade-in',
                    newFilter       : { filterVariable: 'var(--fade-in)' },
                    expectedFilters : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title           : 'Register slide-up',
                    newFilter       : { filterVariable: 'var(--slide-up)' },
                    expectedFilters : [
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
                    title           : 'Register fade-in with priority 1',
                    newFilter       : { filterVariable: 'var(--fade-in)', priority: 1 },
                    expectedFilters : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title           : 'Register slide-up with priority 2',
                    newFilter       : { filterVariable: 'var(--slide-up)', priority: 2 },
                    expectedFilters : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
                {
                    title           : 'Register zoom-in with priority 0',
                    newFilter       : { filterVariable: 'var(--zoom-in)', priority: 0 },
                    expectedFilters : [
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
                    title           : 'Register fade-in',
                    newFilter       : { filterVariable: 'var(--fade-in)' },
                    expectedFilters : ['var(--fade-in)'],
                },
                {
                    title           : 'Register fade-in again',
                    newFilter       : { filterVariable: 'var(--fade-in)' },
                    expectedFilters : [
                        'var(--fade-in)', // No duplication
                    ],
                },
            ],
        },
        {
            title   : 'Re-register with higher priority should reorder',
            updates : [
                {
                    title           : 'Register fade-in with priority 1',
                    newFilter       : { filterVariable: 'var(--fade-in)', priority: 1 },
                    expectedFilters : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title           : 'Register slide-up with priority 0',
                    newFilter       : { filterVariable: 'var(--slide-up)', priority: 0 },
                    expectedFilters : [
                        'var(--slide-up)',
                        'var(--fade-in)',
                    ],
                },
                {
                    title           : 'Re-register slide-up with priority 2',
                    newFilter       : { filterVariable: 'var(--slide-up)', priority: 2 },
                    expectedFilters : [
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
                    title           : 'Register fade-in with priority 1',
                    newFilter       : { filterVariable: 'var(--fade-in)', priority: 1 },
                    expectedFilters : [
                        'var(--fade-in)',
                    ],
                },
                {
                    title           : 'Register slide-up with priority 1',
                    newFilter       : { filterVariable: 'var(--slide-up)', priority: 1 },
                    expectedFilters : [
                        'var(--fade-in)',
                        'var(--slide-up)',
                    ],
                },
            ],
        },
    ] as FilterRegistryTestCase[]) {
        test(title, async () => {
            // Cleanup:
            if (filterRegistry.filters.length) {
                for (const variable of filterRegistry.filters) {
                    // Re-register and immediately unregister:
                    filterRegistry.registerFilter(variable)();
                } // for
            } // if
            
            
            
            // Sanity check:
            expect(filterRegistry.filters).toEqual([]);
            
            
            
            // Apply update scenarios:
            for (const {
                // Test Inputs:
                title : updateTitle,
                
                newFilter : { filterVariable, priority },
                
                // Expected Outcomes:
                expectedFilters,
            } of updates) {
                // Apply the update:
                filterRegistry.registerFilter(filterVariable, priority);
                
                
                
                // Verify the expected values:
                console.log(`[subtest] ${updateTitle}`);
                expect(filterRegistry.filters).toEqual(expectedFilters);
            } // for
        });
    } // for
});
