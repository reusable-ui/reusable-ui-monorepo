import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useViewEffectTestStyles = createStyleSheetHook(() =>
    import('./ViewEffectTest.style.js')
, { id: 'view-effect-test' });
