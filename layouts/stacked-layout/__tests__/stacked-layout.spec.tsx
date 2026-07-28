import React from 'react'
import { type Locator } from '@playwright/test'
import { test, expect } from '@playwright/experimental-ct-react'
import { type StackedLayoutContainerTestProps, StackedLayoutContainerTest } from './StackedLayoutContainerTest.js'



interface ExpectedItemBorder {
    borderInlineStartWidth : number
    borderInlineEndWidth   : number
    borderBlockStartWidth  : number
    borderBlockEndWidth    : number
    
    borderStartStartRadius : number
    borderStartEndRadius   : number
    borderEndStartRadius   : number
    borderEndEndRadius     : number
}

interface StackedLayoutTestCase {
    /**
     * Descriptive name for the test scenario.
     */
    title         : string
    
    /**
     * Props to pass to the `<StackedLayoutContainerTest>` component.
     * Must contain properties to render:
     * - orientation            : 'inline' | 'block'
     * - flowDirection          : 'start' | 'end'
     * - borderWidth            : number
     * - borderStartStartRadius : number
     * - borderStartEndRadius   : number
     * - borderEndStartRadius   : number
     * - borderEndEndRadius     : number
     */
    props         : Omit<StackedLayoutContainerTestProps, 'items'>
    
    
    
    /**
     * Expected outcomes:
     * The expected number of `<StackedLayoutItemTest>` components
     * and the expected border widths/radii for each item.
     */
    expectedItemBorders : ExpectedItemBorder[]
}



const flowDirections = ['start', 'end'] as const;
const orientations   = ['block', 'inline'] as const;
const middleItems    = [0, 1, 2, 5] as const;
const borderWidths   = [0, 1, 2, 12] as const;
const borderRadii    = [0, 1, 8, 20] as const;

const testCases: StackedLayoutTestCase[] = [
    ...borderRadii.flatMap((borderRadius) =>
        borderWidths.flatMap((borderWidth) =>
            middleItems.flatMap((middleItem) =>
                flowDirections.flatMap((flowDirection) =>
                    orientations.map((orientation) => {
                        const expectedInnerCornerRadius = Math.max(0, borderRadius - borderWidth); // Outer corners rounded, slightly smaller
                        const expectedSeparatorWidth    = borderWidth;
                        
                        return {
                            title: `${orientation} orientation, ${flowDirection} flow, ${middleItem + 2} items, border width ${borderWidth}px, border radius ${borderRadius}`,
                            props: {
                                orientation                : orientation,
                                flowDirection              : flowDirection,
                                
                                borderWidth                : borderWidth,
                                
                                borderStartStartRadius     : borderRadius,
                                borderStartEndRadius       : borderRadius,
                                borderEndStartRadius       : borderRadius,
                                borderEndEndRadius         : borderRadius,
                            },
                            expectedItemBorders: [
                                (flowDirection === 'start')
                                    ? (orientation === 'block')
                                        ? {
                                            borderInlineStartWidth : 0,
                                            borderInlineEndWidth   : 0,
                                            borderBlockStartWidth  : 0,
                                            borderBlockEndWidth    : 0,
                                            
                                            borderStartStartRadius : expectedInnerCornerRadius,
                                            borderStartEndRadius   : expectedInnerCornerRadius,
                                            borderEndStartRadius   : 0,
                                            borderEndEndRadius     : 0,
                                        }
                                        : {
                                            borderInlineStartWidth : 0,
                                            borderInlineEndWidth   : 0,
                                            borderBlockStartWidth  : 0,
                                            borderBlockEndWidth    : 0,
                                            
                                            borderStartStartRadius : expectedInnerCornerRadius,
                                            borderStartEndRadius   : 0,
                                            borderEndStartRadius   : expectedInnerCornerRadius,
                                            borderEndEndRadius     : 0,
                                        }
                                    : (orientation === 'block')
                                        ? {
                                            borderInlineStartWidth : 0,
                                            borderInlineEndWidth   : 0,
                                            borderBlockStartWidth  : 0,
                                            borderBlockEndWidth    : 0,
                                            
                                            borderStartStartRadius : 0,
                                            borderStartEndRadius   : 0,
                                            borderEndStartRadius   : expectedInnerCornerRadius,
                                            borderEndEndRadius     : expectedInnerCornerRadius,
                                        }
                                        : {
                                            borderInlineStartWidth : 0,
                                            borderInlineEndWidth   : 0,
                                            borderBlockStartWidth  : 0,
                                            borderBlockEndWidth    : 0,
                                            
                                            borderStartStartRadius : 0,
                                            borderStartEndRadius   : expectedInnerCornerRadius,
                                            borderEndStartRadius   : 0,
                                            borderEndEndRadius     : expectedInnerCornerRadius,
                                        },
                                
                                ...(new Array(middleItem).fill(null).map(() =>
                                    (flowDirection === 'start')
                                        ? (orientation === 'block')
                                            ? {
                                                borderInlineStartWidth : 0,
                                                borderInlineEndWidth   : 0,
                                                borderBlockStartWidth  : expectedSeparatorWidth,
                                                borderBlockEndWidth    : 0,
                                                
                                                borderStartStartRadius : 0,
                                                borderStartEndRadius   : 0,
                                                borderEndStartRadius   : 0,
                                                borderEndEndRadius     : 0,
                                            }
                                            : {
                                                borderInlineStartWidth : expectedSeparatorWidth,
                                                borderInlineEndWidth   : 0,
                                                borderBlockStartWidth  : 0,
                                                borderBlockEndWidth    : 0,
                                                
                                                borderStartStartRadius : 0,
                                                borderStartEndRadius   : 0,
                                                borderEndStartRadius   : 0,
                                                borderEndEndRadius     : 0,
                                            }
                                        : (orientation === 'block')
                                            ? {
                                                borderInlineStartWidth : 0,
                                                borderInlineEndWidth   : 0,
                                                borderBlockStartWidth  : 0,
                                                borderBlockEndWidth    : expectedSeparatorWidth,
                                                
                                                borderStartStartRadius : 0,
                                                borderStartEndRadius   : 0,
                                                borderEndStartRadius   : 0,
                                                borderEndEndRadius     : 0,
                                            }
                                            : {
                                                borderInlineStartWidth : 0,
                                                borderInlineEndWidth   : expectedSeparatorWidth,
                                                borderBlockStartWidth  : 0,
                                                borderBlockEndWidth    : 0,
                                                
                                                borderStartStartRadius : 0,
                                                borderStartEndRadius   : 0,
                                                borderEndStartRadius   : 0,
                                                borderEndEndRadius     : 0,
                                            },
                                )),
                                
                                
                                
                                (flowDirection === 'start')
                                    ? (orientation === 'block')
                                        ? {
                                            borderInlineStartWidth : 0,
                                            borderInlineEndWidth   : 0,
                                            borderBlockStartWidth  : expectedSeparatorWidth,
                                            borderBlockEndWidth    : 0,
                                            
                                            borderStartStartRadius : 0,
                                            borderStartEndRadius   : 0,
                                            borderEndStartRadius   : expectedInnerCornerRadius,
                                            borderEndEndRadius     : expectedInnerCornerRadius,
                                        }
                                        : {
                                            borderInlineStartWidth : expectedSeparatorWidth,
                                            borderInlineEndWidth   : 0,
                                            borderBlockStartWidth  : 0,
                                            borderBlockEndWidth    : 0,
                                            
                                            borderStartStartRadius : 0,
                                            borderStartEndRadius   : expectedInnerCornerRadius,
                                            borderEndStartRadius   : 0,
                                            borderEndEndRadius     : expectedInnerCornerRadius,
                                        }
                                    : (orientation === 'block')
                                        ? {
                                            borderInlineStartWidth : 0,
                                            borderInlineEndWidth   : 0,
                                            borderBlockStartWidth  : 0,
                                            borderBlockEndWidth    : expectedSeparatorWidth,
                                            
                                            borderStartStartRadius : expectedInnerCornerRadius,
                                            borderStartEndRadius   : expectedInnerCornerRadius,
                                            borderEndStartRadius   : 0,
                                            borderEndEndRadius     : 0,
                                        }
                                        : {
                                            borderInlineStartWidth : 0,
                                            borderInlineEndWidth   : expectedSeparatorWidth,
                                            borderBlockStartWidth  : 0,
                                            borderBlockEndWidth    : 0,
                                            
                                            borderStartStartRadius : expectedInnerCornerRadius,
                                            borderStartEndRadius   : 0,
                                            borderEndStartRadius   : expectedInnerCornerRadius,
                                            borderEndEndRadius     : 0,
                                        },
                            ],
                        } satisfies StackedLayoutTestCase;
                    })
                )
            )
        ),
    ),
];



// Utility: compare CSS numeric values with tolerance
const expectCssValueWithin = async (
    element   : Locator,
    property  : string,
    expected  : number,
    tolerance : number = 0.2
) => {
    const value = await element.evaluate((el: Element, prop: string) => getComputedStyle(el).getPropertyValue(prop), property);
    const numeric = parseFloat(value);
    expect(Math.abs(numeric - expected)).toBeLessThanOrEqual(tolerance);
};

test.describe('usingStackedLayout', () => {
    for (const { title, props, expectedItemBorders } of testCases) {
        test(title, async ({ mount }) => {
            const component = await mount(
                <StackedLayoutContainerTest {...props} items={expectedItemBorders.length} />
            );
            const container = component.getByTestId('stacked-layout-container-test');
            
            // Allow time for stylesheets to fully apply:
            await new Promise((resolve) => setTimeout(resolve, 200));
            
            // Verify each child's border widths and radii with tolerance:
            for (let i = 0; i < expectedItemBorders.length; i++) {
                const child = container.getByTestId(`stacked-layout-item-test-${i}`);
                const expected = expectedItemBorders[i];
                
                await expectCssValueWithin(child, 'border-inline-start-width', expected.borderInlineStartWidth);
                await expectCssValueWithin(child, 'border-inline-end-width'  , expected.borderInlineEndWidth);
                await expectCssValueWithin(child, 'border-block-start-width' , expected.borderBlockStartWidth);
                await expectCssValueWithin(child, 'border-block-end-width'   , expected.borderBlockEndWidth);
                
                await expectCssValueWithin(child, 'border-start-start-radius', expected.borderStartStartRadius);
                await expectCssValueWithin(child, 'border-start-end-radius'  , expected.borderStartEndRadius);
                await expectCssValueWithin(child, 'border-end-start-radius'  , expected.borderEndStartRadius);
                await expectCssValueWithin(child, 'border-end-end-radius'    , expected.borderEndEndRadius);
            }
        });
    }
});
