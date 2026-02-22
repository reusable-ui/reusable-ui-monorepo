import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useHoverEffectTestStyles = createStyleSheetHook(() =>
    import('./HoverEffectTest.style.js')
, { id: 'hover-effect-test' });
