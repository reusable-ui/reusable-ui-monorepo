import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useExciteEffectTestStyles = createStyleSheetHook(() =>
    import('./ExciteEffectTest.style.js')
, { id: 'excite-effect-test' });
