// cssfn:
import {
    // writes css in javascript:
    styleSheets,
}                           from '@cssfn/core'          // writes css in javascript



// styles:
styleSheets(
    () => import(/* webpackPrefetch: true */ '../styles/horzRules.js')
, { id: 'b1y9111nws' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
