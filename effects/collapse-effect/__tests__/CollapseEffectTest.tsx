import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesCollapseState, type ExpandPhase } from '@reusable-ui/collapse-state'
import { useCollapseEffectTestStyles } from './CollapseEffectTest.loader.js'
import { useCollapsibleSize, CssCollapseEffectOptions } from '../dist/index.js'



export interface CollapseEffectTestProps
    extends
        // Bases:
        Required<Pick<CssCollapseEffectOptions, 'orientation' | 'flowDirection'>>
{
    /**
     * Simulates the `expandPhase` lifecycle.
     */
    expandPhase      : ExpandPhase
    
    /**
     * Simulates the `expandFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully collapsed
     * - `0`       : start of expand state
     * - `0.5`     : halfway through transition
     * - `1`       : fully expanded
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    expandFactorCond : 'unset' | number
}

/**
 * Test component for CollapseEffect.
 * 
 * - Mocks `expandFactorCond` via inline style for controlled testing.
 */
export const CollapseEffectTest = (props: CollapseEffectTestProps) => {
    const {
        expandPhase,
        expandFactorCond,
        orientation,
        flowDirection,
    } = props;
    
    const styles = useCollapseEffectTestStyles();
    
    const { collapseStateVars  : { expandFactorCond: expandFactorCondVar } } = usesCollapseState();
    
    const { ref, collapsibleStyle } = useCollapsibleSize<HTMLDivElement>();
    
    // Inline style overrides:
    // - Assigns `expandFactorCond` directly
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            expandFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(expandFactorCond),
        ...collapsibleStyle,
    } as CSSProperties), [expandFactorCondVar, expandFactorCond, collapsibleStyle]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={ref}
                data-testid="collapse-effect-test"
                className={`${styles.main} is-${expandPhase} is-${orientation}-orientation is-${flowDirection}-direction`}
                style={inlineStyle}
            >
                Collapse Effect Test
            </div>
        </div>
    );
};
