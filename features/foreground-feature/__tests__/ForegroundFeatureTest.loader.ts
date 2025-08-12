import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useForegroundFeatureTestStyles = createStyleSheetHook(() =>
    import('./ForegroundFeatureTest.style.js')
, { id: 'foreground-feature-test' });
