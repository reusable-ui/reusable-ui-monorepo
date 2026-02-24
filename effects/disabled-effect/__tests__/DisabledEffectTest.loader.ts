import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useDisabledEffectTestStyles = createStyleSheetHook(() =>
    import('./DisabledEffectTest.style.js')
, { id: 'disabled-effect-test' });
