import React, { type CSSProperties, useMemo, useLayoutEffect } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesHoverState } from '@reusable-ui/hover-state'
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { colorParamVars } from '@reusable-ui/colors'
import { useOutlineVariant, type OutlineVariantProps } from '@reusable-ui/outline-variant'
import { useMildVariant, type MildVariantProps} from '@reusable-ui/mild-variant'
import { regularBaseColor, mildBaseColor } from './base-colors.js'
import { useHoverEffectTestStyles } from './HoverEffectTest.loader.js'



export interface HoverEffectTestProps
    extends
        // Variants:
        Required<OutlineVariantProps>,
        Required<MildVariantProps>
{
    /**
     * Simulates the `hoverFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully unhovered
     * - `0`       : start of unhover state
     * - `0.5`     : halfway through transition
     * - `1`       : fully hovered
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    hoverFactorCond ?: 'unset' | number
    
    /**
     * Specifies the theme mode for the test.
     */
    mode             : 'light' | 'dark'
}

/**
 * Test component for HoverEffect.
 * 
 * - Mocks `hoverFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const HoverEffectTest = (props: HoverEffectTestProps) => {
    const {
        hoverFactorCond = 'unset',
        mode,
    } = props;
    
    const styles = useHoverEffectTestStyles();
    
    useLayoutEffect(() => {
        colorParamVars.mode = ((mode === 'light') ? 1 : -1) as any;
    }, [mode])
    
    const { hoverStateVars  : { hoverFactorCond: hoverFactorCondVar } } = usesHoverState();
    const { themeVariantVars : { backgRegular, backgMild } } = usesThemeVariant();
    
    // Inline style overrides:
    // - Assigns `hoverFactorCond` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            hoverFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(hoverFactorCond),
        
        // @ts-ignore
        [
            backgRegular
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: regularBaseColor,
        
        // @ts-ignore
        [
            backgMild
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: mildBaseColor,
    } as CSSProperties), [hoverFactorCondVar, hoverFactorCond]);
    
    const { outlineClassname } = useOutlineVariant(props);
    const { mildClassname } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="hover-effect-test"
                className={`${styles.main} ${outlineClassname} ${mildClassname}`}
                style={inlineStyle}
            >
                Hover Effect Test
            </div>
        </div>
    );
};
