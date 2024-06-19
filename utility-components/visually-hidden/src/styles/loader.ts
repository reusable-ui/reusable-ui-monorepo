// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook



// styles:
export const useVisuallyHiddenStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles.js')
, { id: 'zxyty1yae5' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
