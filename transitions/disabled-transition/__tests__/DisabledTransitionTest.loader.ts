import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useDisabledTransitionTestStyles = createStyleSheetHook(() =>
    import('./DisabledTransitionTest.style.js')
, { id: 'disabled-transition-test' });
