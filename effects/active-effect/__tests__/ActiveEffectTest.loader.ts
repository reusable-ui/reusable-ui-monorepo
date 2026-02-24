import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useActiveEffectTestStyles = createStyleSheetHook(() =>
    import('./ActiveEffectTest.style.js')
, { id: 'active-effect-test' });
