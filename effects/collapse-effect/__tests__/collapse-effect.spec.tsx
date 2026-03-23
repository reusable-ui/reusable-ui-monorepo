import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { type CollapseEffectTestProps, CollapseEffectTest } from './CollapseEffectTest.js';



/**
 * Total inline size (width) of the box in pixels.
 * 
 * Computed as:
 * content width (300px)
 * + padding-inline-start (15px)
 * + padding-inline-end   (15px)
 * + border-left width    (10px)
 * + border-right width   (10px)
 */
const totalInlineSize = 300 + 15 + 15 + 10 + 10;

/**
 * Total block size (height) of the box in pixels.
 * 
 * Computed as:
 * content height (200px)
 * + padding-block-start (12px)
 * + padding-block-end   (12px)
 * + border-top width    (10px)
 * + border-bottom width (10px)
 */
const totalBlockSize  = 200 + 12 + 12 + 10 + 10;



interface CollapseEffectTestCase {
    // Test Inputs:
    
    /**
     * Descriptive name for the test scenario.
     */
    title              : string
    
    /**
     * Props to pass to the `<CollapseEffectTest>` component.
     */
    props              : CollapseEffectTestProps
    
    
    
    // Expected Outcomes:
    /**
     * Expected total inline size (width), in pixels, excluding margins.
     */
    expectedInlineSize : number
    
    /**
     * Expected total block size (height), in pixels, excluding margins.
     */
    expectedBlockSize  : number
    
    /**
     * Expected reveal origin side.
     * 
     * Indicates the logical side from which content is revealed when expanding,
     * or exits when collapsing.
     * 
     * Accepts:
     * - `'inline-start'` → content reveals/exits from the inline start side.
     * - `'inline-end'`   → content reveals/exits from the inline end side.
     * - `'block-start'`  → content reveals/exits from the block start side (usually the top).
     * - `'block-end'`    → content reveals/exits from the block end side (usually the bottom).
     * - `null`           → fully expanded (no reveal side to validate).
     */
    expectedRevealSide : 'inline-start' | 'inline-end' | 'block-start' | 'block-end' | null
    
    /**
     * Expected rendered CSS display property.
     */
    expectedDisplay    : 'none' | 'grid'
    
    /**
     * Expected rendered CSS display property.
     */
    expectedTransform  : 'none' | [number, number, number, number, number, number]
}



const testCases: CollapseEffectTestCase[] = [
    // Fully collapsed → fully hidden
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).map((flowDirection) => ({
            title                : `Fully collapsed, factor=unset → expect no ${orientation} size and exit at ${flowDirection} side`,
            props                : {
                expandPhase      : 'collapsed',
                expandFactorCond : 'unset',
                orientation,
                flowDirection,
            },
            expectedInlineSize   : 0,    // `display: none` → no size
            expectedBlockSize    : 0,    // `display: none` → no size
            expectedRevealSide   : null, // fully hidden → no reveal side
            expectedDisplay      : 'none',
            expectedTransform    : 'none',
        }) satisfies CollapseEffectTestCase)
    ),
    
    // Fully expanded → fully shown
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).map((flowDirection) => ({
            title                : `Fully expanded, factor=1 → expect full ${orientation} size and no exit at ${flowDirection} side`,
            props                : {
                expandPhase      : 'expanded',
                expandFactorCond : 1,
                orientation,
                flowDirection,
            },
            expectedInlineSize   : totalInlineSize,
            expectedBlockSize    : totalBlockSize,
            expectedRevealSide   : null, // fully shown → no reveal side
            expectedDisplay      : 'grid',
            expectedTransform    : 'none',
        }) satisfies CollapseEffectTestCase)
    ),
    
    // Starts expanding → still fully hidden
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).map((flowDirection) => ({
            title                : `Starts expanding, factor=0 → expect no ${orientation} size and exit at ${flowDirection} side`,
            props                : {
                expandPhase      : 'expanding',
                expandFactorCond : 0,
                orientation,
                flowDirection,
            },
            expectedInlineSize   : (orientation === 'inline') ? 0 : totalInlineSize,
            expectedBlockSize    : (orientation === 'block' ) ? 0 : totalBlockSize,
            expectedRevealSide   : `${orientation}-${flowDirection}`,
            expectedDisplay      : 'grid',
            expectedTransform    : [1, 0, 0, 1, 0, 0],
        }) satisfies CollapseEffectTestCase)
    ),
    
    // Starts collapsing → still fully shown
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).map((flowDirection) => ({
            title                : `Starts collapsing, factor=1 → expect full ${orientation} size and exit at ${flowDirection} side`,
            props                : {
                expandPhase      : 'collapsing',
                expandFactorCond : 1,
                orientation,
                flowDirection,
            },
            expectedInlineSize   : totalInlineSize,
            expectedBlockSize    : totalBlockSize,
            expectedRevealSide   : null, // fully shown → no reveal side
            expectedDisplay      : 'grid',
            expectedTransform    : [1, 0, 0, 1, 0, 0],
        }) satisfies CollapseEffectTestCase)
    ),
    
    // Ends expanding → becomes fully shown
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).map((flowDirection) => ({
            title                : `Ends expanding, factor=1 → expect full ${orientation} size and exit at ${flowDirection} side`,
            props                : {
                expandPhase      : 'expanding',
                expandFactorCond : 1,
                orientation,
                flowDirection,
            },
            expectedInlineSize   : totalInlineSize,
            expectedBlockSize    : totalBlockSize,
            expectedRevealSide   : null, // fully shown → no reveal side
            expectedDisplay      : 'grid',
            expectedTransform    : [1, 0, 0, 1, 0, 0],
        }) satisfies CollapseEffectTestCase)
    ),
    
    // Ends collapsing → becomes fully hidden
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).map((flowDirection) => ({
            title                : `Ends collapsing, factor=0 → expect no ${orientation} size and exit at ${flowDirection} side`,
            props                : {
                expandPhase      : 'collapsing',
                expandFactorCond : 0,
                orientation,
                flowDirection,
            },
            expectedInlineSize   : (orientation === 'inline') ? 0 : totalInlineSize,
            expectedBlockSize    : (orientation === 'block' ) ? 0 : totalBlockSize,
            expectedRevealSide   : `${orientation}-${flowDirection}`,
            expectedDisplay      : 'grid',
            expectedTransform    : [1, 0, 0, 1, 0, 0],
        }) satisfies CollapseEffectTestCase)
    ),
    
    // Halfway expanding → partially shown
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).flatMap((flowDirection) =>
            [0.25, 0.5, 0.75].map((factor) => ({
                title                : `Halfway expanding, factor=${factor} → expect partial ${orientation} size and exit at ${flowDirection} side`,
                props                : {
                    expandPhase      : 'expanding',
                    expandFactorCond : factor,
                    orientation,
                    flowDirection,
                },
                expectedInlineSize   : (orientation === 'inline') ? (totalInlineSize * factor) : totalInlineSize,
                expectedBlockSize    : (orientation === 'block' ) ? (totalBlockSize  * factor) : totalBlockSize,
                expectedRevealSide   : `${orientation}-${flowDirection}`,
                expectedDisplay      : 'grid',
                expectedTransform    : [1, 0, 0, 1, 0, 0],
            }) satisfies CollapseEffectTestCase)
        )
    ),
    
    // Halfway collapsing → partially shown
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).flatMap((flowDirection) =>
            [0.75, 0.5, 0.25].map((factor) => ({
                title                : `Halfway collapsing, factor=${factor} → expect partial ${orientation} size and exit at ${flowDirection} side`,
                props                : {
                    expandPhase      : 'collapsing',
                    expandFactorCond : factor,
                    orientation,
                    flowDirection,
                },
                expectedInlineSize   : (orientation === 'inline') ? (totalInlineSize * factor) : totalInlineSize,
                expectedBlockSize    : (orientation === 'block' ) ? (totalBlockSize  * factor) : totalBlockSize,
                expectedRevealSide   : `${orientation}-${flowDirection}`,
                expectedDisplay      : 'grid',
                expectedTransform    : [1, 0, 0, 1, 0, 0],
            }) satisfies CollapseEffectTestCase)
        )
    ),
    
    // Over expanding → fully shown + elastic effect
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).flatMap((flowDirection) =>
            [1.05, 1.2, 1.35].map((factor) => ({
                title                : `Over expanding, factor=${factor} → expect partial ${orientation} size and exit at ${flowDirection} side`,
                props                : {
                    expandPhase      : 'expanding',
                    expandFactorCond : factor,
                    orientation,
                    flowDirection,
                },
                expectedInlineSize   : totalInlineSize,
                expectedBlockSize    : totalBlockSize,
                expectedRevealSide   : null, // fully shown → no reveal side
                expectedDisplay      : 'grid',
                expectedTransform    : (
                    (orientation === 'block')
                    ? [1, 0, 0, factor, 0, totalBlockSize * (factor - 1) * 1/2 * ((flowDirection === 'start') ? +1 : -1)]
                    : [factor, 0, 0, 1, totalInlineSize * (factor - 1) * 1/2 * ((flowDirection === 'start') ? +1 : -1), 0]
                ),
            }) satisfies CollapseEffectTestCase)
        )
    ),
    
    // Under collapsing → fully hidden + no elastic effect
    ...(['block', 'inline'] as const).flatMap((orientation) =>
        (['start', 'end'] as const).flatMap((flowDirection) =>
            [-0.05, -0.2, -0.35].map((factor) => ({
                title                : `Under collapsing, factor=${factor} → expect partial ${orientation} size and exit at ${flowDirection} side`,
                props                : {
                    expandPhase      : 'collapsing',
                    expandFactorCond : factor,
                    orientation,
                    flowDirection,
                },
                expectedInlineSize   : (orientation === 'inline') ? 0 : totalInlineSize,
                expectedBlockSize    : (orientation === 'block' ) ? 0 : totalBlockSize,
                expectedRevealSide   : `${orientation}-${flowDirection}`,
                expectedDisplay      : 'grid',
                expectedTransform    : [1, 0, 0, 1, 0, 0],
            }) satisfies CollapseEffectTestCase)
        )
    ),
];



test.describe('usesCollapseEffect', () => {
    for (const { title, props, expectedInlineSize, expectedBlockSize, expectedRevealSide, expectedDisplay, expectedTransform } of testCases) {
        test(title, async ({ mount }) => {
            const component = await mount(<CollapseEffectTest {...props} />);
            const box = component.getByTestId('collapse-effect-test')
            
            // Verify the component renders correctly:
            await expect(box).toContainText('Collapse Effect Test');
            
            // Allow time for stylesheets to fully apply:
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            // ✅ Verify expected total inline & block sizes (content + padding + border):
            const [totalInlineSize, totalBlockSize] = await box.evaluate((el: HTMLElement) => {
                const {
                    display,
                    
                    inlineSize,
                    blockSize,
                    
                    paddingInlineStart,
                    paddingInlineEnd,
                    paddingBlockStart,
                    paddingBlockEnd,
                    
                    borderInlineStartWidth,
                    borderInlineEndWidth,
                    borderBlockStartWidth,
                    borderBlockEndWidth,
                    
                    marginInlineStart,
                    marginInlineEnd,
                    marginBlockStart,
                    marginBlockEnd,
                } = getComputedStyle(el);
                
                if (display === 'none') return [0, 0];
                
                return [
                    (
                        parseFloat(inlineSize)
                        +
                        parseFloat(paddingInlineStart)
                        +
                        parseFloat(paddingInlineEnd)
                        +
                        parseFloat(borderInlineStartWidth)
                        +
                        parseFloat(borderInlineEndWidth)
                        +
                        Math.min(0, parseFloat(marginInlineStart)) // Ignore positive margin (only negative margin visually reduces size)
                        +
                        Math.min(0, parseFloat(marginInlineEnd))   // Ignore positive margin (only negative margin visually reduces size)
                    ),
                    (
                        parseFloat(blockSize)
                        +
                        parseFloat(paddingBlockStart)
                        +
                        parseFloat(paddingBlockEnd)
                        +
                        parseFloat(borderBlockStartWidth)
                        +
                        parseFloat(borderBlockEndWidth)
                        +
                        Math.min(0, parseFloat(marginBlockStart)) // Ignore positive margin (only negative margin visually reduces size)
                        +
                        Math.min(0, parseFloat(marginBlockEnd))   // Ignore positive margin (only negative margin visually reduces size)
                    ),
                ];
            });
            expect(Math.abs(totalInlineSize - expectedInlineSize)).toBeLessThan(1); // Max inacurracy allowed: < 1px
            expect(Math.abs(totalBlockSize  - expectedBlockSize)).toBeLessThan(1);  // Max inacurracy allowed: < 1px
            
            // ✅ Verify the expected reveal side:
            // One of the logical margins should be negative during collapse,
            // depending on orientation + flowDirection.
            const revealSide = await box.evaluate((el) => {
                const {
                    marginInlineStart,
                    marginInlineEnd,
                    marginBlockStart,
                    marginBlockEnd,
                } = getComputedStyle(el);
                if (parseFloat(marginInlineStart)< 0) return 'inline-start';
                if (parseFloat(marginInlineEnd)  < 0) return 'inline-end';
                if (parseFloat(marginBlockStart) < 0) return 'block-start';
                if (parseFloat(marginBlockEnd)   < 0) return 'block-end';
                return null;
            });
            expect(revealSide).toBe(expectedRevealSide);
            
            // ✅ Verify the rendered CSS display property:
            const display = await box.evaluate((el) => {
                return getComputedStyle(el).display;
            });
            expect(display).toBe(expectedDisplay);
            
            // ✅ Verify the rendered CSS transform property:
            const transformString = await box.evaluate((el) => {
                return getComputedStyle(el).transform;
            });
            if (transformString === 'none') {
                expect(transformString).toBe(expectedTransform);
            }
            else {
                if (!Array.isArray(expectedTransform)) throw new Error('Expected transform must be an array');
                
                // Parse "matrix(a, b, c, d, e, f)" into numbers
                const transformArray: [number, number, number, number, number, number] = (
                    transformString
                    .replace(/^matrix\(|\)$/g, '') // strip "matrix(" and ")"
                    .split(',')
                    .map((v) => parseFloat(v.trim())) as [number, number, number, number, number, number]
                );
                
                // Compare with expected array, allowing for floating-point inaccuracy:
                const precision = 3;
                const mismatches = expectedTransform.some((expectedValue, i) =>
                    Math.abs(transformArray[i] - expectedValue) > Math.pow(10, -precision)
                );
                
                if (mismatches) {
                    const actualStr   = `matrix(${transformArray.join(', ')})`;
                    const expectedStr = `matrix(${expectedTransform.join(', ')})`;
                    throw new Error(`Transform mismatch:\nExpected: ${expectedStr}\nActual:   ${actualStr}`);
                }
            }
        });
    } // for
});
