import React, { type CSSProperties, useMemo, useLayoutEffect } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesActiveState } from '@reusable-ui/active-state'
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { colorParamVars } from '@reusable-ui/colors'
import { useOutlineVariant, type OutlineVariantProps } from '@reusable-ui/outline-variant'
import { useMildVariant, type MildVariantProps} from '@reusable-ui/mild-variant'
import { regularBaseColor, mildBaseColor } from './base-colors.js'
import { useActiveTransitionTestStyles } from './ActiveTransitionTest.loader.js'



export interface ActiveTransitionTestProps
    extends
        // Variants:
        Required<OutlineVariantProps>,
        Required<MildVariantProps>
{
    /**
     * Simulates the `activeFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully inactive
     * - `0`       : start of inactive state
     * - `0.5`     : halfway through transition
     * - `1`       : fully active
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    activeFactorCond ?: 'unset' | number
    
    /**
     * Specifies the theme mode for the test.
     */
    mode              : 'light' | 'dark'
}

/**
 * Test component for ActiveTransition.
 * 
 * - Mocks `activeFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const ActiveTransitionTest = (props: ActiveTransitionTestProps) => {
    const {
        activeFactorCond = 'unset',
        mode,
    } = props;
    
    const styles = useActiveTransitionTestStyles();
    
    useLayoutEffect(() => {
        colorParamVars.mode = ((mode === 'light') ? 1 : -1) as any;
    }, [mode])
    
    const { activeStateVars  : { activeFactorCond: activeFactorCondVar } } = usesActiveState();
    const { themeVariantVars : { backgRegular, backgMild } } = usesThemeVariant();
    
    // Inline style overrides:
    // - Assigns `activeFactorCond` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            activeFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(activeFactorCond),
        
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
    } as CSSProperties), [activeFactorCondVar, activeFactorCond]);
    
    const { outlineClassname } = useOutlineVariant(props);
    const { mildClassname } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="active-transition-test"
                className={`${styles.main} ${outlineClassname} ${mildClassname}`}
                style={inlineStyle}
            >
                Active Transition Test
            </div>
        </div>
    );
};
