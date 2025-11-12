import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useTestComponentStyles = createStyleSheetHook(
  () => import('./styles')
, { id: 'test-component-styles' });
import './styles'
