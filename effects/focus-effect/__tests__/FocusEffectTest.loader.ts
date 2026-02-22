import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useFocusEffectTestStyles = createStyleSheetHook(() =>
    import('./FocusEffectTest.style.js')
, { id: 'focus-effect-test' });
