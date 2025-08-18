import { createStyleSheetsHook } from '@cssfn/cssfn-react'



export const useBackgroundFeatureTestStyles = createStyleSheetsHook(() =>
    import('./BackgroundFeatureTest.style.js')
, { id: 'background-feature-test' });
