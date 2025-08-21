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
                    title           : 'Register contrast-boost filter',
                    newFilter       : { filterVariable: 'var(--contrast-boost)' },
                    expectedFilters : [
                        'var(--contrast-boost)',
                    ],
                },
            ],
        },
        {
            title   : 'Multiple filters with default priority',
            updates : [
                {
                    title           : 'Register contrast-boost',
                    newFilter       : { filterVariable: 'var(--contrast-boost)' },
                    expectedFilters : [
                        'var(--contrast-boost)',
                    ],
                },
                {
                    title           : 'Register lift-brightness',
                    newFilter       : { filterVariable: 'var(--lift-brightness)' },
                    expectedFilters : [
                        'var(--contrast-boost)',
                        'var(--lift-brightness)',
                    ],
                },
            ],
        },
        {
            title   : 'Priority stacking overrides default order',
            updates : [
                {
                    title           : 'Register contrast-boost with priority 1',
                    newFilter       : { filterVariable: 'var(--contrast-boost)', priority: 1 },
                    expectedFilters : [
                        'var(--contrast-boost)',
                    ],
                },
                {
                    title           : 'Register lift-brightness with priority 2',
                    newFilter       : { filterVariable: 'var(--lift-brightness)', priority: 2 },
                    expectedFilters : [
                        'var(--contrast-boost)',
                        'var(--lift-brightness)',
                    ],
                },
                {
                    title           : 'Register focus-sharpen with priority 0',
                    newFilter       : { filterVariable: 'var(--focus-sharpen)', priority: 0 },
                    expectedFilters : [
                        'var(--focus-sharpen)',
                        'var(--contrast-boost)',
                        'var(--lift-brightness)',
                    ],
                },
            ],
        },
        {
            title   : 'Duplicate registration should not duplicate entry',
            updates : [
                {
                    title           : 'Register contrast-boost',
                    newFilter       : { filterVariable: 'var(--contrast-boost)' },
                    expectedFilters : ['var(--contrast-boost)'],
                },
                {
                    title           : 'Register contrast-boost again',
                    newFilter       : { filterVariable: 'var(--contrast-boost)' },
                    expectedFilters : [
                        'var(--contrast-boost)', // No duplication
                    ],
                },
            ],
        },
        {
            title   : 'Re-register with higher priority should reorder',
            updates : [
                {
                    title           : 'Register contrast-boost with priority 1',
                    newFilter       : { filterVariable: 'var(--contrast-boost)', priority: 1 },
                    expectedFilters : [
                        'var(--contrast-boost)',
                    ],
                },
                {
                    title           : 'Register lift-brightness with priority 0',
                    newFilter       : { filterVariable: 'var(--lift-brightness)', priority: 0 },
                    expectedFilters : [
                        'var(--lift-brightness)',
                        'var(--contrast-boost)',
                    ],
                },
                {
                    title           : 'Re-register lift-brightness with priority 2',
                    newFilter       : { filterVariable: 'var(--lift-brightness)', priority: 2 },
                    expectedFilters : [
                        'var(--contrast-boost)',
                        'var(--lift-brightness)',
                    ],
                },
            ],
        },
        {
            title   : 'Same priority preserves insertion order',
            updates : [
                {
                    title           : 'Register contrast-boost with priority 1',
                    newFilter       : { filterVariable: 'var(--contrast-boost)', priority: 1 },
                    expectedFilters : [
                        'var(--contrast-boost)',
                    ],
                },
                {
                    title           : 'Register lift-brightness with priority 1',
                    newFilter       : { filterVariable: 'var(--lift-brightness)', priority: 1 },
                    expectedFilters : [
                        'var(--contrast-boost)',
                        'var(--lift-brightness)',
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
