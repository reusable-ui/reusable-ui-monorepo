import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type ViewEffectTestProps, ViewEffectTest } from './ViewEffectTest.js';
import { viewIndices } from './view-indices.js'
import { startsCapitalized } from '@cssfn/core'



interface ViewEffectTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title            : string
    
    /**
     * Props to pass to the `<ViewEffectTest>` component.
     */
    props            : ViewEffectTestProps
    
    
    
    // Expected Outcomes:
    /**
     * The expected view ID shown within the viewport.
     */
    expectedViewId   : string
    
    /**
     * The expected area of the view that is visible within the viewport,
     * as a fraction of the total view area (0 to 1).
     */
    expectedViewArea : number
}



const testCases: ViewEffectTestCase[] = [
    // Settled → expect settled at a specific index
    ...[false, true].flatMap((enablesSelectiveRendering) =>
        (['inline', 'block'] as const).flatMap((orientation) =>
            (['start', 'end'] as const).flatMap((flowDirection) =>
                viewIndices.map((settledViewIndex) => ({
                    title                         : `Settled, factor=unset → expect settled at ${settledViewIndex} index (${orientation} ${flowDirection} - ${enablesSelectiveRendering ? 'with selective rendering' : 'no selective rendering'})`,
                    props                         : {
                        prevViewIndex             : settledViewIndex, // The settled view index.
                        viewIndex                 : settledViewIndex, // Target view index (already settled).
                        viewFactorCond            : 'unset',          // No running transformation.
                        orientation,
                        flowDirection,
                        enablesSelectiveRendering,
                    },
                    expectedViewId                : `view-${settledViewIndex}`,
                    expectedViewArea              : 1,
                } satisfies ViewEffectTestCase))
            )
        )
    ),
    
    // Advanced → expect settled at a specific index
    ...[false, true].flatMap((enablesSelectiveRendering) =>
        (['inline', 'block'] as const).flatMap((orientation) =>
            (['start', 'end'] as const).flatMap((flowDirection) =>
                viewIndices.flatMap((prevViewIndex) =>
                    viewIndices.filter((viewIndex) => viewIndex > prevViewIndex).map((targetViewIndex) => ({
                        title                         : `Advanced, factor=+0.999 → from ${prevViewIndex}, expect settled at ${targetViewIndex} index (${orientation} ${flowDirection} - ${enablesSelectiveRendering ? 'with selective rendering' : 'no selective rendering'})`,
                        props                         : {
                            prevViewIndex             : prevViewIndex,   // Previously settled view index.
                            viewIndex                 : targetViewIndex, // Target view index (settling soon).
                            viewFactorCond            : +0.999,          // Advanced to target (end of transition), not yet settled (one frame before).
                            orientation,
                            flowDirection,
                            enablesSelectiveRendering,
                        },
                        expectedViewId                : `view-${targetViewIndex}`,
                        expectedViewArea              : 1,
                    } satisfies ViewEffectTestCase))
                )
            )
        )
    ),
    
    // Receded → expect settled at a specific index
    ...[false, true].flatMap((enablesSelectiveRendering) =>
        (['inline', 'block'] as const).flatMap((orientation) =>
            (['start', 'end'] as const).flatMap((flowDirection) =>
                viewIndices.toReversed().flatMap((prevViewIndex) =>
                    viewIndices.toReversed().filter((viewIndex) => viewIndex < prevViewIndex).map((targetViewIndex) => ({
                        title                         : `Receded, factor=-0.999 → from ${prevViewIndex}, expect settled at ${targetViewIndex} index (${orientation} ${flowDirection} - ${enablesSelectiveRendering ? 'with selective rendering' : 'no selective rendering'})`,
                        props                         : {
                            prevViewIndex             : prevViewIndex,   // Previously settled view index.
                            viewIndex                 : targetViewIndex, // Target view index (settling soon).
                            viewFactorCond            : -0.999,          // Receded to target (end of transition), not yet settled (one frame before).
                            orientation,
                            flowDirection,
                            enablesSelectiveRendering,
                        },
                        expectedViewId                : `view-${targetViewIndex}`,
                        expectedViewArea              : 1,
                    } satisfies ViewEffectTestCase))
                )
            )
        )
    ),
    
    // Halfway settled → expect partial visibility at a specific index
    ...[false, true].flatMap((enablesSelectiveRendering) =>
        (['inline', 'block'] as const).flatMap((orientation) =>
            (['start', 'end'] as const).flatMap((flowDirection) =>
                [-0.9, -0.6, -0.3, +0.3, +0.6, +0.9].flatMap((offBy) =>
                    viewIndices.map((settledViewIndex) => settledViewIndex - offBy).filter((partialSettledViewIndex) => (partialSettledViewIndex >= viewIndices[0]) && (partialSettledViewIndex <= viewIndices[viewIndices.length - 1])).map((partialSettledViewIndex) => ({
                        title                         : `Halfway settled, off by=${offBy}, factor=0 → expect ${((1 - (partialSettledViewIndex % 1)) * 100).toFixed(2)}% visible at ${Math.floor(partialSettledViewIndex)} index (halfway with previous/next) (${orientation} ${flowDirection} - ${enablesSelectiveRendering ? 'with selective rendering' : 'no selective rendering'})`,
                        props                         : {
                            prevViewIndex             : partialSettledViewIndex, // The fractional settled view index.
                            viewIndex                 : partialSettledViewIndex, // Target fractional view index (already settled).
                            viewFactorCond            : 0,                       // Starts running transformation.
                            orientation,
                            flowDirection,
                            enablesSelectiveRendering,
                        },
                        expectedViewId                : `view-${Math.floor(partialSettledViewIndex)}`,
                        expectedViewArea              : (1 - (partialSettledViewIndex % 1)),
                    } satisfies ViewEffectTestCase))
                )
            )
        )
    ),
    
    // Halfway advanced → expect partial visibility at a specific index
    ...[false, true].flatMap((enablesSelectiveRendering) =>
        (['inline', 'block'] as const).flatMap((orientation) =>
            (['start', 'end'] as const).flatMap((flowDirection) =>
                [-0.9, -0.6, -0.3, +0.3, +0.6, +0.9].flatMap((offBy) =>
                    viewIndices.flatMap((prevViewIndex) =>
                        viewIndices.filter((viewIndex) => viewIndex > prevViewIndex).flatMap((targetViewIndex) => {
                            const expectedViewArea = (1 - Math.abs(offBy));
                            const incompleteFactor = +0.999 + (1 / Math.abs(targetViewIndex - prevViewIndex) * offBy);
                            
                            return {
                                title                         : `Halfway advanced, off by=${offBy}, factor=${incompleteFactor.toFixed(2)} → from ${prevViewIndex}, expect ${(expectedViewArea * 100).toFixed(2)}% visible at ${targetViewIndex} index (halfway with previous/next) (${orientation} ${flowDirection} - ${enablesSelectiveRendering ? 'with selective rendering' : 'no selective rendering'})`,
                                props                         : {
                                    prevViewIndex             : prevViewIndex,    // Previously settled view index.
                                    viewIndex                 : targetViewIndex,  // Target view index (settling soon).
                                    viewFactorCond            : incompleteFactor, // Advanced to target (end of transition), not yet settled (one frame before).
                                    orientation,
                                    flowDirection,
                                    enablesSelectiveRendering,
                                },
                                expectedViewId                : `view-${targetViewIndex}`,
                                expectedViewArea              : expectedViewArea,
                            } satisfies ViewEffectTestCase;
                        })
                    )
                )
            )
        )
    ),
    
    // Halfway receded → expect partial visibility at a specific index
    ...[false, true].flatMap((enablesSelectiveRendering) =>
        (['inline', 'block'] as const).flatMap((orientation) =>
            (['start', 'end'] as const).flatMap((flowDirection) =>
                [-0.9, -0.6, -0.3, +0.3, +0.6, +0.9].flatMap((offBy) =>
                    viewIndices.toReversed().flatMap((prevViewIndex) =>
                        viewIndices.toReversed().filter((viewIndex) => viewIndex < prevViewIndex).flatMap((targetViewIndex) => {
                            const expectedViewArea = (1 - Math.abs(offBy));
                            const incompleteFactor = -0.999 - (1 / Math.abs(targetViewIndex - prevViewIndex) * offBy);
                            
                            return {
                                title                         : `Halfway receded, off by=${offBy}, factor=${incompleteFactor.toFixed(2)} → from ${prevViewIndex}, expect ${(expectedViewArea * 100).toFixed(2)}% visible at ${targetViewIndex} index (halfway with previous/next) (${orientation} ${flowDirection} - ${enablesSelectiveRendering ? 'with selective rendering' : 'no selective rendering'})`,
                                props                         : {
                                    prevViewIndex             : prevViewIndex,    // Previously settled view index.
                                    viewIndex                 : targetViewIndex,  // Target view index (settling soon).
                                    viewFactorCond            : incompleteFactor, // Advanced to target (end of transition), not yet settled (one frame before).
                                    orientation,
                                    flowDirection,
                                    enablesSelectiveRendering,
                                },
                                expectedViewId                : `view-${targetViewIndex}`,
                                expectedViewArea              : expectedViewArea,
                            } satisfies ViewEffectTestCase;
                        })
                    )
                )
            )
        )
    ),
];



test.describe('usesViewEffect', () => {
    for (const { title, props, expectedViewId, expectedViewArea } of testCases) {
        test(title, async ({ mount }) => {
            const component = await mount(<ViewEffectTest {...props} />);
            const box = component.getByTestId('view-effect-test');
            
            // Verify the component renders correctly:
            await expect(box).toContainText('View Effect Test');
            
            // Allow time for stylesheets to fully apply:
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            // Locate the expected view element:
            const viewBox = component.getByTestId(expectedViewId);
            
            // Verify the view renders correctly:
            await expect(viewBox).toContainText(startsCapitalized(expectedViewId));
            
            // Measure intersection ratio of the view with its container:
            const intersectionRatio = await viewBox.evaluate((el) => {
                return new Promise<number>((resolve) => {
                    const root = document.querySelector('[data-testid="view-effect-test"]');
                    const observer = new IntersectionObserver((entries, obs) => {
                        resolve(entries[0].intersectionRatio);
                        obs.disconnect();
                    }, { root });
                    observer.observe(el);
                });
            });
            
            // Validate the visible area fraction:
            // expect(intersectionRatio).toBeCloseTo(expectedViewArea, 2);
            expect(Math.abs(intersectionRatio - expectedViewArea)).toBeLessThan(0.05); // An inaccuracy between 0.01 - 0.02 is normal, set the threshold to 0.05 for a safer limit.
        });
    } // for
});
