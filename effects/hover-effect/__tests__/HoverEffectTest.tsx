import React, { type CSSProperties, useMemo } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useHoverEffectTestStyles } from './HoverEffectTest.loader.js'
import { useHoverEffectReversedTestStyles } from './HoverEffectReversedTest.loader.js'
import { usesHoverState } from '@reusable-ui/hover-state'



export interface HoverEffectTestProps {
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
     * Simulates the `isHovered` CSS variable.
     * 
     * - `false` : not hovered (inactive state)
     * - `true`  : hovered (active state)
     */
    isHovered     ?: boolean
    
    /**
     * Optional flag to simulate reverse intent behavior.
     */
    reverseIntent ?: boolean
}

/**
 * Test component for HoverEffect.
 * 
 * - Mocks `activeFactor` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const HoverEffectTest = (props: HoverEffectTestProps) => {
    const {
        activeFactor  = 'unset',
        isHovered     = false,
        reverseIntent = true,
    } = props;
    
    const styles = useHoverEffectTestStyles();
    const reversedStyles = useHoverEffectReversedTestStyles();
    
    const { hoverStateVars  : { hoverFactor: hoverFactorVar, isHovered: isHoveredVar } } = usesHoverState();
    
    // Inline style overrides:
    // - Assigns `activeFactor` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            hoverFactorVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(activeFactor),
        // @ts-ignore
        [
            isHoveredVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: (
            isHovered
            ? ' ' // avoids an empty string for truthly, use a space instead
            : 'unset'
        ),
    } as CSSProperties), [hoverFactorVar, activeFactor, isHoveredVar, isHovered]);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="hover-effect-test"
                className={reverseIntent ? reversedStyles.main : styles.main}
                style={inlineStyle}
            >
                Hover Effect Test
            </div>
        </div>
    );
};
