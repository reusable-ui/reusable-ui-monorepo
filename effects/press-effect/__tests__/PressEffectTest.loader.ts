import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const usePressEffectTestStyles = createStyleSheetHook(() =>
    import('./PressEffectTest.style.js')
, { id: 'press-effect-test' });
