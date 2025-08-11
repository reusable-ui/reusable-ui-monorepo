import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useBackgroundFeatureTestStyles = createStyleSheetHook(() =>
    import('./BackgroundFeatureTest.style.js')
, { id: 'background-feature-test' });
