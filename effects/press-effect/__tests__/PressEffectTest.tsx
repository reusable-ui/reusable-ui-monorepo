import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usePressEffectTestStyles } from './PressEffectTest.loader.js'
import { usePressEffectReversedTestStyles } from './PressEffectReversedTest.loader.js'
import { usesPressState } from '@reusable-ui/press-state'



export interface PressEffectTestProps {
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
     * Simulates the `isPressed` CSS variable.
     * 
     * - `false` : released (inactive state)
     * - `true`  : pressed (active state)
     */
    isPressed     ?: boolean
    
    /**
     * Optional flag to simulate reverse intent behavior.
     */
    reverseIntent ?: boolean
}

/**
 * Test component for PressEffect.
 * 
 * - Mocks `activeFactor` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const PressEffectTest = (props: PressEffectTestProps) => {
    const {
        activeFactor  = 'unset',
        isPressed     = false,
        reverseIntent = true,
    } = props;
    
    const styles = usePressEffectTestStyles();
    const reversedStyles = usePressEffectReversedTestStyles();
    
    const { pressStateVars  : { pressFactor: pressFactorVar, isPressed: isPressedVar } } = usesPressState();
    
    // Inline style overrides:
    // - Assigns `activeFactor` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            pressFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(activeFactor),
        // @ts-ignore
        [
            isPressedVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: (
            isPressed
            ? ' ' // avoids an empty string for truthly, use a space instead
            : 'unset'
        ),
    } as CSSProperties), [pressFactorVar, activeFactor, isPressedVar, isPressed]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="press-effect-test"
                className={reverseIntent ? reversedStyles.main : styles.main}
                style={inlineStyle}
            >
                Press Effect Test
            </div>
        </div>
    );
};
