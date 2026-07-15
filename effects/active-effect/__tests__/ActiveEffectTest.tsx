import React, { type CSSProperties, useMemo, useLayoutEffect } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usingActiveState } from '@reusable-ui/active-state'
import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { colorParamConfigVars } from '@reusable-ui/color-config'
import { useMildVariant, type MildVariantProps} from '@reusable-ui/mild-variant'
import { useOutlinedVariant, type OutlinedVariantProps } from '@reusable-ui/outlined-variant'
import { regularBaseColor, mildBaseColor } from './base-colors.js'
import { useActiveEffectTestStyles } from './ActiveEffectTest.loader.js'



export interface ActiveEffectTestProps
    extends
        // Variants:
        Required<MildVariantProps>,
        Required<OutlinedVariantProps>
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
     * Specifies the theme mode (light or dark) for the test.
     */
    colorMode         : 'light' | 'dark'
}

/**
 * Test component for ActiveEffect.
 * 
 * - Mocks `activeFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 */
export const ActiveEffectTest = (props: ActiveEffectTestProps) => {
    const {
        activeFactorCond = 'unset',
        colorMode,
    } = props;
    
    const styles = useActiveEffectTestStyles();
    
    useLayoutEffect(() => {
        colorParamConfigVars.mode = ((colorMode === 'light') ? 1 : -1) as any;
    }, [colorMode])
    
    const { activeStateVars  : { activeFactorCond: activeFactorCondVar } } = usingActiveState();
    const { themeVariantVars : { regularBackg, mildBackg } } = usingThemeVariant();
    
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
            regularBackg
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: regularBaseColor,
        
        // @ts-ignore
        [
            mildBackg
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: mildBaseColor,
    } as CSSProperties), [activeFactorCondVar, activeFactorCond]);
    
    const { mildClassname     } = useMildVariant(props);
    const { outlinedClassname } = useOutlinedVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="active-effect-test"
                className={`${styles.main} ${mildClassname} ${outlinedClassname}`}
                style={inlineStyle}
            >
                Active Effect Test
            </div>
        </div>
    );
};
