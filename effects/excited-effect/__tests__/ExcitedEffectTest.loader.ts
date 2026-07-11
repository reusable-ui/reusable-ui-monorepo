import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useExcitedEffectTestStyles = createStyleSheetHook(() =>
    import('./ExcitedEffectTest.style.js')
, { id: 'excited-effect-test' });
