import React from 'react'
import { useStackedLayoutTestStyles } from './StackedLayoutItemTest.loader.js'



export interface StackedLayoutItemTestProps {
    index : number
}
/**
 * Test component for StackedLayout.
 * 
 * - Mocks `stackedFactorCond` via inline style for controlled testing.
 */
export const StackedLayoutItemTest = (props: StackedLayoutItemTestProps) => {
    const {
        index,
    } = props;
    
    const styles = useStackedLayoutTestStyles();
    
    return (
        <div
            data-testid={`stacked-layout-item-test-${index}`}
            className={styles.main}
        >
            Stacked Effect Item Test ({index})
        </div>
    );
};
