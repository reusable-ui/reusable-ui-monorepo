import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useValidityEffectTestStyles = createStyleSheetHook(() =>
    import('./ValidityEffectTest.style.js')
, { id: 'validity-effect-test' });
