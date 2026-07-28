import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useStackedLayoutTestStyles = createStyleSheetHook(() =>
    import('./StackedLayoutContainerTest.style.js')
, { id: 'stacked-layout-container-test' });
