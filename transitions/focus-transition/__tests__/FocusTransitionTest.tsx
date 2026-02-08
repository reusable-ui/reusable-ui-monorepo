import React, { type CSSProperties, useMemo, useLayoutEffect } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesFocusState } from '@reusable-ui/focus-state'
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { colorParamVars } from '@reusable-ui/colors'
import { useOutlineVariant, type OutlineVariantProps } from '@reusable-ui/outline-variant'
import { useMildVariant, type MildVariantProps} from '@reusable-ui/mild-variant'
import { regularBaseColor, mildBaseColor } from './base-colors.js'
import { useFocusTransitionTestStyles } from './FocusTransitionTest.loader.js'



export interface FocusTransitionTestProps
    extends
        // Variants:
        Required<OutlineVariantProps>,
        Required<MildVariantProps>
{
    /**
     * Simulates the `focusFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully focused
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
 * Test component for FocusTransition.
 * 
 * - Mocks `focusFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const FocusTransitionTest = (props: FocusTransitionTestProps) => {
    const {
        focusFactorCond = 'unset',
        mode,
    } = props;
    
    const styles = useFocusTransitionTestStyles();
    
    useLayoutEffect(() => {
        colorParamVars.mode = ((mode === 'light') ? 1 : -1) as any;
    }, [mode])
    
    const { focusStateVars  : { focusFactorCond: focusFactorCondVar } } = usesFocusState();
    const { themeVariantVars : { backgRegular, backgMild } } = usesThemeVariant();
    
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
            backgRegular
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: regularBaseColor,
        
        // @ts-ignore
        [
            backgMild
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: mildBaseColor,
    } as CSSProperties), [focusFactorCondVar, focusFactorCond]);
    
    const { outlineClassname } = useOutlineVariant(props);
    const { mildClassname } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="focus-transition-test"
                className={`${styles.main} ${outlineClassname} ${mildClassname}`}
                style={inlineStyle}
            >
                Focus Transition Test
            </div>
        </div>
    );
};
