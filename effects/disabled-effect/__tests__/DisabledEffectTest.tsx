import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesDisabledState } from '@reusable-ui/disabled-state'
import { useDisabledEffectTestStyles } from './DisabledEffectTest.loader.js'



export interface DisabledEffectTestProps {
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
     * Simulates the `isDisabled` CSS variable.
     * 
     * - `false` : enabled (inactive state)
     * - `true`  : disabled (active state)
     */
    isDisabled     ?: boolean
}

/**
 * Test component for DisabledEffect.
 * 
 * - Mocks `activeFactor` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const DisabledEffectTest = (props: DisabledEffectTestProps) => {
    const {
        activeFactor  = 'unset',
        isDisabled    = false,
    } = props;
    
    const styles = useDisabledEffectTestStyles();
    
    const { disabledStateVars  : { disableFactor: disableFactorVar, isDisabled: isDisabledVar } } = usesDisabledState();
    
    // Inline style overrides:
    // - Assigns `activeFactor` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            disableFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(activeFactor),
        // @ts-ignore
        [
            isDisabledVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: (
            isDisabled
            ? ' ' // avoids an empty string for truthly, use a space instead
            : 'unset'
        ),
    } as CSSProperties), [disableFactorVar, activeFactor, isDisabledVar, isDisabled]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="disabled-effect-test"
                className={styles.main}
                style={inlineStyle}
            >
                Disabled Effect Test
            </div>
        </div>
    );
};
