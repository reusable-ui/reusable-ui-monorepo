import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useExcitedEffectTestStyles } from './ExcitedEffectTest.loader.js'
import { useExcitedEffectReversedTestStyles } from './ExcitedEffectReversedTest.loader.js'
import { usingExcitedState } from '@reusable-ui/excited-state'



export interface ExcitedEffectTestProps {
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
     * Simulates the `isExcited` CSS variable.
     * 
     * - `false` : released (inactive state)
     * - `true`  : pressed (active state)
     */
    isExcited     ?: boolean
    
    /**
     * Optional flag to simulate reverse intent behavior.
     */
    reverseIntent ?: boolean
}

/**
 * Test component for ExcitedEffect.
 * 
 * - Mocks `activeFactor` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const ExcitedEffectTest = (props: ExcitedEffectTestProps) => {
    const {
        activeFactor  = 'unset',
        isExcited     = false,
        reverseIntent = true,
    } = props;
    
    const styles = useExcitedEffectTestStyles();
    const reversedStyles = useExcitedEffectReversedTestStyles();
    
    const { excitedStateVars  : { excitedFactor: excitedFactorVar } } = usingExcitedState();
    
    // Inline style overrides:
    // - Assigns `activeFactor` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            excitedFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(activeFactor),
    } as CSSProperties), [excitedFactorVar, activeFactor]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="excited-effect-test"
                className={`${reverseIntent ? reversedStyles.main : styles.main} ${isExcited ? 'is-excited' : 'not-excited' }`}
                style={inlineStyle}
            >
                Excited Effect Test
            </div>
        </div>
    );
};
