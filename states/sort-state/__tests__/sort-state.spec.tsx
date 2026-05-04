import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { SortStateTestProps, SortStateTest } from './SortStateTest.js';
import { initialProducts } from './dummy-products.js'
import { usesSortState } from '../dist/index.js'



/**
 * Represents a single test scenario for validating sorting transitions.
 */
interface SortStateTestCase {
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
        sortBy ?: SortStateTestProps['sortBy']
    }[]
}



test.describe('usesSortState', () => {
    for (const { title, updates } of [
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
    ] as SortStateTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let previousSortBy : SortStateTestProps['sortBy'] = undefined;
            let currentSortBy  : SortStateTestProps['sortBy'] = undefined;
            
            
            
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
                <SortStateTest
                    sortBy={currentSortBy}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('sorting-state-test');
            await expect(box).toContainText('Sorting State Test');
            
            
            
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
            
            
            
            // Get the CSS variable name for `sortFactor` to read its value during the test:
            const { sortStateVars: { sortFactor } } = usesSortState();
            const sortFactorVar = sortFactor.slice(4, -1); // Convert `var(--sortFactor)` → `--sortFactor`
            
            
            
            // Apply update scenarios:
            let previousExpectedItemPositions = initialItemPositions;
            let expectedSortedItemPositions   = initialItemPositions;
            for (const { title, sortBy } of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                currentSortBy = sortBy;
                
                
                
                // Re-render:
                await component.update(
                    <SortStateTest
                        sortBy={currentSortBy}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('sorting-state-test');
                await expect(box).toContainText('Sorting State Test');
                
                
                
                // Compute the expected positions after sorting:
                // - Assign each product to the slot position it will occupy in the new order.
                switch (sortBy) {
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
                    // Wait for the sorting animation to start by monitoring active animations:
                    let attemptsLeft = 20;
                    for (let attempts = 0; attemptsLeft > 0; attemptsLeft--, attempts++) {
                        const isSorting = runningAnimations.has('boo-test-sorting');
                        if (isSorting) {
                            console.log(`Detected sorting animation is running after ${attempts * 10}ms`);
                            break;
                        } // if
                        
                        // Wait for 10ms before checking again to allow the animation to start:
                        if (attemptsLeft >= 1) await new Promise((resolve) => setTimeout(resolve, 10));
                    } // for
                    expect(attemptsLeft).toBeGreaterThan(0); // Fail if we exhausted all attempts without detecting the animation.
                    
                    
                    
                    // During the animation, periodically check the `sortFactor` value and item positions to verify they are transitioning correctly:
                    for (let time = 0; time <= 1000;) {
                        const perfStart = performance.now();
                        
                        
                        
                        // Read the current `sortFactor` value and item positions from the DOM:
                        const [actualSortFactorValue, actualItemPositionsArray] = await box.evaluate((container, sortFactorVar) => {
                            const style = getComputedStyle(container);
                            const value = parseFloat(style.getPropertyValue(sortFactorVar));
                            
                            
                            
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
                            
                            
                            
                            return [value, Array.from(positions.entries())];
                        }, sortFactorVar);
                        const actualItemPositions = new Map(actualItemPositionsArray);
                        
                        
                        
                        // Verify the `actualSortFactorValue` is close to the expected value with MAX_FACTOR_DEVIATION tolerance:
                        const MAX_FACTOR_DEVIATION = 20; // percents
                        const expectedSortFactor = 1 - (time / 1000);
                        const deviation = Math.abs(actualSortFactorValue - expectedSortFactor) * 100;
                        console.log(`At time ${time.toFixed(0)}ms: actualSortFactorValue=${actualSortFactorValue.toFixed(3)}, expected=${expectedSortFactor.toFixed(3)}, deviation=${deviation.toFixed(3)}%`);
                        expect(deviation).toBeLessThanOrEqual(MAX_FACTOR_DEVIATION);
                        
                        
                        
                        // Verify the actual DOM order matches the expected product order:
                        expect(Array.from(actualItemPositions.keys())).toEqual(Array.from(expectedSortedItemPositions.keys()));
                        
                        // Verify the actual positions match the expected positions:
                        // - `actualSortFactorValue` = 1 → items should be at previous positions.
                        // - `actualSortFactorValue` = 0 → items should be at new sorted positions.
                        const expectedInterpolatedItemPositions = new Map(
                            Array.from(expectedSortedItemPositions.entries())
                            .map(([key, { x: sortedX, y: sortedY }]) => [
                                key,
                                {
                                    x: ((previousExpectedItemPositions.get(key)?.x ?? 0) * actualSortFactorValue) + (sortedX * (1 - actualSortFactorValue)),
                                    y: ((previousExpectedItemPositions.get(key)?.y ?? 0) * actualSortFactorValue) + (sortedY * (1 - actualSortFactorValue)),
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
                        
                        
                        
                        const perfEnd = performance.now();
                        const waited = perfEnd - perfStart;
                        const waitNext = Math.max(0, 200 - waited);
                        
                        if (waitNext > 0) await new Promise((resolve) => setTimeout(resolve, waitNext));
                        time += (waited + waitNext);
                    } // for
                    
                    
                    
                    previousExpectedItemPositions = expectedSortedItemPositions;
                } // if
                
                
                
                previousSortBy = currentSortBy;
            } // for
        });
    } // for
});
