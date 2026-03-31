import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useExciteEffectTestStyles } from './ExciteEffectTest.loader.js'
import { useExciteEffectReversedTestStyles } from './ExciteEffectReversedTest.loader.js'
import { usesExciteState } from '@reusable-ui/excite-state'



export interface ExciteEffectTestProps {
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
 * Test component for ExciteEffect.
 * 
 * - Mocks `activeFactor` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const ExciteEffectTest = (props: ExciteEffectTestProps) => {
    const {
        activeFactor  = 'unset',
        isExcited     = false,
        reverseIntent = true,
    } = props;
    
    const styles = useExciteEffectTestStyles();
    const reversedStyles = useExciteEffectReversedTestStyles();
    
    const { exciteStateVars  : { exciteFactor: exciteFactorVar } } = usesExciteState();
    
    // Inline style overrides:
    // - Assigns `activeFactor` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            exciteFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(activeFactor),
    } as CSSProperties), [exciteFactorVar, activeFactor]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="excite-effect-test"
                className={`${reverseIntent ? reversedStyles.main : styles.main} ${isExcited ? 'is-excited' : 'not-excited' }`}
                style={inlineStyle}
            >
                Excite Effect Test
            </div>
        </div>
    );
};
