import { createStyleSheetsHook } from '@cssfn/cssfn-react'



export const useAnimationFeatureTestStyles = createStyleSheetsHook(() =>
    import('./AnimationFeatureTest.style.js')
, { id: 'animation-feature-test' });
