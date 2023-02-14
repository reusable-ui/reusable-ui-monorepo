// cssfn:
import {
    // writes css in javascript:
    styleSheets,
}                           from '@cssfn/core'          // writes css in javascript



// styles:
styleSheets(
    () => import(/* webpackPrefetch: true */ '../styles/secondaries.js')
, { id: '6xcjkza3h9' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
