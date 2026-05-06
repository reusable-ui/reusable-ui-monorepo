import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type SortEffectTestProps, SortEffectTest } from './SortEffectTest.js';
import { initialProducts } from './dummy-products.js'



/**
 * Represents a single test scenario for validating sorting transitions.
 */
interface SortEffectTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * A sequence of updates applied to the sorting state, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title   : string
        
        /**
         * The sorting criterion to apply in this update step, which triggers a sorting transition.
         * Set to `undefined` to skip updating this part.
         */
        sortBy ?: SortEffectTestProps['sortBy']
    }[]
}



const testCases: SortEffectTestCase[] = [
    {
        title   : 'No sorting applied',
        updates : [
            {
                title  : 'Initial render (unsorted)',
                sortBy : undefined,
            },
        ],
    },
    {
        title   : 'Sort by price',
        updates : [
            {
                title  : 'Initial render (unsorted)',
                sortBy : undefined,
            },
            {
                title  : 'Apply sorting by price',
                sortBy : 'price',
            },
        ],
    },
    {
        title   : 'Sort by name',
        updates : [
            {
                title  : 'Initial render (unsorted)',
                sortBy : undefined,
            },
            {
                title  : 'Apply sorting by name',
                sortBy : 'name',
            },
        ],
    },
    {
        title   : 'Sort by price, then by name',
        updates : [
            {
                title  : 'Initial render (unsorted)',
                sortBy : undefined,
            },
            {
                title  : 'Apply sorting by price',
                sortBy : 'price',
            },
            {
                title  : 'Apply sorting by name',
                sortBy : 'name',
            },
        ],
    },
    {
        title   : 'Sort by price, then by name, finally by price',
        updates : [
            {
                title  : 'Initial render (unsorted)',
                sortBy : undefined,
            },
            {
                title  : 'Apply sorting by price',
                sortBy : 'price',
            },
            {
                title  : 'Apply sorting by name',
                sortBy : 'name',
            },
            {
                title  : 'Apply sorting by price',
                sortBy : 'price',
            },
        ],
    },
];



test.describe('usesSortEffect', () => {
    for (const { title, updates } of testCases) {
        test(title, async ({ mount }) => {
            // States:
            let previousSortBy : SortEffectTestProps['sortBy'] = undefined;
            let currentSortBy  : SortEffectTestProps['sortBy'] = undefined;
            
            
            
            // First render:
            const component = await mount(
                <SortEffectTest
                    sortBy={currentSortBy}
                    sortFactor='unset'
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('sorting-effect-test');
            await expect(box).toContainText('Sorting Effect Test');
            
            
            
            // Allow time for stylesheets to fully apply:
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            
            
            // Measure the initial positions of all items:
            const initialItemPositions = new Map(await box.evaluate((container) => {
                const positions: Map<string, { x: number; y: number }> = new Map();
                container.querySelectorAll('.item').forEach((item) => {
                    const testId = item.getAttribute('data-testid') ?? '';
                    const { x, y, width, height } = item.getBoundingClientRect();
                    positions.set(testId, {
                        // Use the element's center point for consistency:
                        x: x + (width  / 2),
                        y: y + (height / 2),
                    });
                });
                return Array.from(positions.entries());
            }));
            
            // Map item positions by their index in the initial render order:
            const slotPositionsByIndex = new Map<number, { x: number; y: number }>(
                Array.from(initialItemPositions.values()).map((position, index) => [
                    index,
                    position,
                ])
            );
            
            
            
            // Verify we have positions for all items:
            expect(initialItemPositions.size).toBe(initialProducts.size);
            
            // Verify the initial DOM order matches the product order:
            expect(Array.from(initialItemPositions.keys())).toEqual(Array.from(initialProducts.keys()));
            
            
            
            // Apply update scenarios:
            let previousExpectedItemPositions = initialItemPositions;
            let expectedSortedItemPositions   = initialItemPositions;
            for (const { title, sortBy } of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                currentSortBy = sortBy;
                
                
                
                // Compute the expected positions after sorting:
                // - Assign each product to the slot position it will occupy in the new order.
                switch (currentSortBy) {
                    case 'price':
                        expectedSortedItemPositions = new Map<string, { x: number; y: number }>(
                            Array.from(initialProducts.entries())
                            .sort(([, a], [, b]) => a.price - b.price)
                            .map(([id], index) => [
                                id,
                                slotPositionsByIndex.get(index) ?? { x: NaN, y: NaN },
                            ])
                        );
                        break;
                    
                    case 'name':
                        expectedSortedItemPositions = new Map<string, { x: number; y: number }>(
                            Array.from(initialProducts.entries())
                            .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                            .map(([id], index) => [
                                id,
                                slotPositionsByIndex.get(index) ?? { x: NaN, y: NaN },
                            ])
                        );
                        break;
                    
                    default:
                        // no change in order, so expected positions remain the same as previous:
                        break;
                } // switch
                
                
                
                if ((currentSortBy !== undefined) && (currentSortBy !== previousSortBy)) {
                    // Simulate the progression of the sorting animation by reading item positions at different `sortFactor` values:
                    for (let simulateSortFactorValue = 1; simulateSortFactorValue >= 0; simulateSortFactorValue -= 0.2) {
                        // Re-render:
                        await component.update(
                            <SortEffectTest
                                sortBy={currentSortBy}
                                sortFactor={simulateSortFactorValue}
                            />
                        );
                        
                        
                        
                        // Allow time for stylesheets to fully apply:
                        await new Promise((resolve) => setTimeout(resolve, 50));
                        
                        
                        
                        // Ensure the component is rendered correctly:
                        const box = component.getByTestId('sorting-effect-test');
                        await expect(box).toContainText('Sorting Effect Test');
                        
                        
                        
                        // Read the current item positions from the DOM:
                        const actualItemPositionsArray = await box.evaluate((container) => {
                            const positions: Map<string, { x: number; y: number }> = new Map();
                            container.querySelectorAll('.item').forEach((item) => {
                                const testId = item.getAttribute('data-testid') ?? '';
                                const { x, y, width, height } = item.getBoundingClientRect();
                                positions.set(testId, {
                                    // Use the element's center point for consistency:
                                    x: x + (width  / 2),
                                    y: y + (height / 2),
                                });
                            });
                            
                            
                            
                            return Array.from(positions.entries());
                        });
                        const actualItemPositions = new Map(actualItemPositionsArray);
                        
                        
                        
                        // Verify the actual DOM order matches the expected product order:
                        expect(Array.from(actualItemPositions.keys())).toEqual(Array.from(expectedSortedItemPositions.keys()));
                        
                        // Verify the actual positions match the expected positions:
                        // - `simulateSortFactorValue` = 1 → items should be at previous positions.
                        // - `simulateSortFactorValue` = 0 → items should be at new sorted positions.
                        const expectedInterpolatedItemPositions = new Map(
                            Array.from(expectedSortedItemPositions.entries())
                            .map(([key, { x: sortedX, y: sortedY }]) => [
                                key,
                                {
                                    x: ((previousExpectedItemPositions.get(key)?.x ?? 0) * simulateSortFactorValue) + (sortedX * (1 - simulateSortFactorValue)),
                                    y: ((previousExpectedItemPositions.get(key)?.y ?? 0) * simulateSortFactorValue) + (sortedY * (1 - simulateSortFactorValue)),
                                }
                            ])
                        );
                        
                        // Validate each item's position is close to its expected interpolated position with a reasonable tolerance to account for minor discrepancies in CSS calculations and DOM measurements:
                        for (const [key, { x: actualX, y: actualY }] of (actualItemPositions.entries())) {
                            const expectedPosition = expectedInterpolatedItemPositions.get(key);
                            expect(expectedPosition).toBeDefined();
                            const { x: expectedX, y: expectedY } = expectedPosition!;
                            
                            // Allow a small margin of error due to decimal precision issues in CSS calculations and DOM measurements:
                            expect(actualX).toBeCloseTo(expectedX, 1);
                            expect(actualY).toBeCloseTo(expectedY, 1);
                        } // for
                        
                        // Verify all expected items are present in the actual positions:
                        for (const [key] of (expectedSortedItemPositions.entries())) {
                            expect(actualItemPositions.has(key)).toBeTruthy();
                        } // for
                    } // for
                    
                    
                    
                    previousExpectedItemPositions = expectedSortedItemPositions;
                } // if
                
                
                
                previousSortBy = currentSortBy;
            } // for
        });
    } // for
});
