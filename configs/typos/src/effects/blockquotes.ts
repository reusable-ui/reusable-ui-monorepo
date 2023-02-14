// cssfn:
import {
    // writes css in javascript:
    styleSheets,
}                           from '@cssfn/core'          // writes css in javascript



// styles:
styleSheets(
    () => import(/* webpackPrefetch: true */ '../styles/blockquotes.js')
, { id: '6h0f4cwli6' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
