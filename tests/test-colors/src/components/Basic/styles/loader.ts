import { createStyleSheetHook } from '@cssfn/cssfn-react'



export const useBasicStyles = createStyleSheetHook(
  () => import('./styles')
, { id: 'basic-styles' });
import './styles'
