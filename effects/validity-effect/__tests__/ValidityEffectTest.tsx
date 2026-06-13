import React, { type CSSProperties, useMemo, useLayoutEffect } from 'react'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usingValidityState } from '@reusable-ui/validity-state'
import { colorConfigVars } from '@reusable-ui/color-config'
import { colorParamConfigVars } from '@reusable-ui/color-config'
import { useThemeVariant } from '@reusable-ui/theme-variant'
import { useOutlineVariant, type OutlineVariantProps } from '@reusable-ui/outline-variant'
import { useMildVariant, type MildVariantProps} from '@reusable-ui/mild-variant'
import {
    regularBaseColor,
    mildBaseColor,
    
    validRegularBaseColor,
    validMildBaseColor,
    
    invalidRegularBaseColor,
    invalidMildBaseColor,
} from './base-colors.js'
import { colorRoleMap } from '../dist/internal-utilities.js'
import { useValidityEffectTestStyles } from './ValidityEffectTest.loader.js'



export interface ValidityEffectTestProps
    extends
        // Variants:
        Required<OutlineVariantProps>,
        Required<MildVariantProps>
{
    /**
     * Simulates the `validityFactorCond` CSS variable.
     * 
     * Typical values:
     * - `'unset'` : fully unvalidated
     * - `0`       : start of unvalidated state
     * - `0.5`     : halfway through valid transition
     * - `1`       : fully valid
     * - `-0.5`    : halfway through invalid transition
     * - `-1`      : fully invalid
     * - `> 1`     : overshoot (bump effect)
     * - `< 0`     : undershoot (bounce back effect)
     */
    validityFactorCond ?: 'unset' | number
    
    /**
     * Specifies the theme mode for the test.
     */
    mode              : 'light' | 'dark'
}

/**
 * Test component for ValidityEffect.
 * 
 * - Mocks `validityFactorCond` via inline style for controlled testing.
 * - Uses static colors for simplicity:
 *   - Regular background  → pure blue   `oklch(0.5 0.3 265 / 1)`
 *   - Outlined background → transparent `oklch(0 0 0 / 0)`
 *   - Mild background     → light blue  `oklch(0.7 0.2 265 / 1)`
 */
export const ValidityEffectTest = (props: ValidityEffectTestProps) => {
    const {
        validityFactorCond = 'unset',
        mode,
    } = props;
    
    const styles = useValidityEffectTestStyles();
    
    useLayoutEffect(() => {
        colorParamConfigVars.mode = ((mode === 'light') ? 1 : -1) as any;
    }, [mode]);
    
    useLayoutEffect(() => {
        colorConfigVars[`primary${colorRoleMap['regular']['backg']}` as keyof typeof colorConfigVars] = regularBaseColor        as any;
        colorConfigVars[`primary${colorRoleMap['mild'   ]['backg']}` as keyof typeof colorConfigVars] = mildBaseColor           as any;
        
        colorConfigVars[`success${colorRoleMap['regular']['backg']}` as keyof typeof colorConfigVars] = validRegularBaseColor   as any;
        colorConfigVars[`success${colorRoleMap['mild'   ]['backg']}` as keyof typeof colorConfigVars] = validMildBaseColor      as any;
        
        colorConfigVars[`danger${ colorRoleMap['regular']['backg']}` as keyof typeof colorConfigVars] = invalidRegularBaseColor as any;
        colorConfigVars[`danger${ colorRoleMap['mild'   ]['backg']}` as keyof typeof colorConfigVars] = invalidMildBaseColor    as any;
    }, []);
    
    const { validityStateVars  : { validityFactorCond: validityFactorCondVar } } = usingValidityState();
    
    // Inline style overrides:
    // - Assigns `validityFactorCond` directly
    // - Statically sets regular/mild background colors for predictable testing
    const inlineStyle : CSSProperties = useMemo(() => ({
        // @ts-ignore
        [
            validityFactorCondVar
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(validityFactorCond),
    } as CSSProperties), [validityFactorCondVar, validityFactorCond]);
    
    const { themeClassname } = useThemeVariant({ theme: 'primary' });
    const { outlineClassname } = useOutlineVariant(props);
    const { mildClassname } = useMildVariant(props);
    
    return (
        <div>
            <HydrateStyles />
            <div
                data-testid="validity-effect-test"
                className={`${styles.main} ${themeClassname} ${outlineClassname} ${mildClassname}`}
                style={inlineStyle}
            >
                Validity Effect Test
            </div>
        </div>
    );
};
