import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useFilterEffectTestStyles } from './FilterEffectTest.loader.js'
import { useFilterEffectReversedTestStyles } from './FilterEffectReversedTest.loader.js'



export interface FilterEffectTestProps {
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
     * Optional flag to simulate reverse intent behavior.
     */
    reverseIntent ?: boolean
}

/**
 * Test component for FilterEffect.
 * 
 * - Mocks `activeFactor` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const FilterEffectTest = (props: FilterEffectTestProps) => {
    const {
        activeFactor  = 'unset',
        reverseIntent = true,
    } = props;
    
    const styles = useFilterEffectTestStyles();
    const reversedStyles = useFilterEffectReversedTestStyles();
    
    // Inline style overrides:
    // - Assigns `activeFactor` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        '--activeFactor': String(activeFactor),
    } as CSSProperties), [activeFactor]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="filter-effect-test"
                className={reverseIntent ? reversedStyles.main : styles.main}
                style={inlineStyle}
            >
                Filter Effect Test
            </div>
        </div>
    );
};
