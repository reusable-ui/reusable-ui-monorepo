import React, { type CSSProperties, useMemo, useLayoutEffect } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usingFocusState } from '@reusable-ui/focus-state'
import { usingThemeVariant } from '@reusable-ui/theme-variant'
import { colorParamConfigVars } from '@reusable-ui/color-config'
import { useMildVariant, type MildVariantProps} from '@reusable-ui/mild-variant'
import { useOutlinedVariant, type OutlinedVariantProps } from '@reusable-ui/outlined-variant'
import { regularBaseColor, mildBaseColor } from './base-colors.js'
import { useFocusEffectTestStyles } from './FocusEffectTest.loader.js'



export interface FocusEffectTestProps
    extends
        // Variants:
        Required<MildVariantProps>,
        Required<OutlinedVariantProps>
{
    /**
     * Simulates the `focusFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully blurred
     * - `0`       : start of blur state
     * - `0.5`     : halfway through transition
     * - `1`       : fully focused
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    focusFactorCond ?: 'unset' | number
    
    /**
     * Specifies the theme mode for the test.
     */
    mode              : 'light' | 'dark'
}

/**
 * Test component for FocusEffect.
 * 
 * - Mocks `focusFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 */
export const FocusEffectTest = (props: FocusEffectTestProps) => {
    const {
        focusFactorCond = 'unset',
        mode,
    } = props;
    
    const styles = useFocusEffectTestStyles();
    
    useLayoutEffect(() => {
        colorParamConfigVars.mode = ((mode === 'light') ? 1 : -1) as any;
    }, [mode])
    
    const { focusStateVars  : { focusFactorCond: focusFactorCondVar } } = usingFocusState();
    const { themeVariantVars : { regularBackg, mildBackg } } = usingThemeVariant();
    
    // Inline style overrides:
    // - Assigns `focusFactorCond` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            focusFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(focusFactorCond),
        
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
    } as CSSProperties), [focusFactorCondVar, focusFactorCond]);
    
    const { mildClassname     } = useMildVariant(props);
    const { outlinedClassname } = useOutlinedVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="focus-effect-test"
                className={`${styles.main} ${mildClassname} ${outlinedClassname}`}
                style={inlineStyle}
            >
                Focus Effect Test
            </div>
        </div>
    );
};
