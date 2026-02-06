import React, { type CSSProperties, useMemo, useLayoutEffect } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usesDisabledState } from '@reusable-ui/disabled-state'
import { usesThemeVariant } from '@reusable-ui/theme-variant'
import { colorParamVars } from '@reusable-ui/colors'
import { useOutlineVariant, type OutlineVariantProps } from '@reusable-ui/outline-variant'
import { useMildVariant, type MildVariantProps} from '@reusable-ui/mild-variant'
import { regularBaseColor, mildBaseColor } from './base-colors.js'
import { useDisabledTransitionTestStyles } from './DisabledTransitionTest.loader.js'



export interface DisabledTransitionTestProps
    extends
        // Variants:
        Required<OutlineVariantProps>,
        Required<MildVariantProps>
{
    /**
     * Simulates the `disableFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully enabled
     * - `0`       : start of enabled state
     * - `0.5`     : halfway through transition
     * - `1`       : fully disabled
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    disableFactorCond ?: 'unset' | number
    
    /**
     * Specifies the theme mode for the test.
     */
    mode              : 'light' | 'dark'
}

/**
 * Test component for DisabledTransition.
 * 
 * - Mocks `disableFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const DisabledTransitionTest = (props: DisabledTransitionTestProps) => {
    const {
        disableFactorCond = 'unset',
        mode,
    } = props;
    
    const styles = useDisabledTransitionTestStyles();
    
    useLayoutEffect(() => {
        colorParamVars.mode = ((mode === 'light') ? 1 : -1) as any;
    }, [mode])
    
    const { disabledStateVars  : { disableFactorCond: disableFactorCondVar } } = usesDisabledState();
    const { themeVariantVars : { backgRegular, backgMild } } = usesThemeVariant();
    
    // Inline style overrides:
    // - Assigns `disableFactorCond` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            disableFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(disableFactorCond),
        
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
    } as CSSProperties), [disableFactorCondVar, disableFactorCond]);
    
    const { outlineClassname } = useOutlineVariant(props);
    const { mildClassname } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="disabled-transition-test"
                className={`${styles.main} ${outlineClassname} ${mildClassname}`}
                style={inlineStyle}
            >
                Disabled Transition Test
            </div>
        </div>
    );
};
