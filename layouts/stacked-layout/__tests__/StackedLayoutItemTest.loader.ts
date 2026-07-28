import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useStackedLayoutTestStyles = createStyleSheetHook(() =>
    import('./StackedLayoutItemTest.style.js')
, { id: 'stacked-layout-item-test' });
