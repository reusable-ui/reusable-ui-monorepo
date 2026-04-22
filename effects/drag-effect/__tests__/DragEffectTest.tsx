import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useDragEffectTestStyles } from './DragEffectTest.loader.js'
import { useDragEffectReversedTestStyles } from './DragEffectReversedTest.loader.js'
import { usesDragState } from '@reusable-ui/drag-state'
import {
    draggedShiftX,
    draggedShiftY,
} from './effect-intents.js'



export interface DragEffectTestProps {
    /**
     * Simulates the `activeFactor` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully inactive
     * - `0`       : start of inactive state
     * - `0.5`     : halfway through transition
     * - `1`       : fully active
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    activeFactor  ?: 'unset' | number
    
    /**
     * Simulates the `isDragged` CSS variable.
     * 
     * - `false` : dropped (inactive state)
     * - `true`  : dragged (active state)
     */
    isDragged     ?: boolean
    
    /**
     * Optional flag to simulate reverse intent behavior.
     */
    reverseIntent ?: boolean
}

/**
 * Test component for DragEffect.
 * 
 * - Mocks `activeFactor` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const DragEffectTest = (props: DragEffectTestProps) => {
    const {
        activeFactor  = 'unset',
        isDragged     = false,
        reverseIntent = true,
    } = props;
    
    const styles = useDragEffectTestStyles();
    const reversedStyles = useDragEffectReversedTestStyles();
    
    const { dragStateVars  : { dragFactor: dragFactorVar, isDragged: isDraggedVar, dragOffsetX: dragOffsetXVar, dragOffsetY: dragOffsetYVar } } = usesDragState();
    
    // Inline style overrides:
    // - Assigns `activeFactor` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            dragFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(activeFactor),
        // @ts-ignore
        [
            isDraggedVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: (
            isDragged
            ? ' ' // avoids an empty string for truthly, use a space instead
            : 'unset'
        ),
        
        // @ts-ignore
        [
            dragOffsetXVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(draggedShiftX),
        [
            dragOffsetYVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(draggedShiftY),
    } as CSSProperties), [dragFactorVar, activeFactor, isDraggedVar, isDragged, dragOffsetXVar, dragOffsetYVar]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="drag-effect-test"
                className={reverseIntent ? reversedStyles.main : styles.main}
                style={inlineStyle}
            >
                Drag Effect Test
            </div>
        </div>
    );
};
