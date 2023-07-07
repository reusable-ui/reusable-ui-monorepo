// cssfn:
import {
    // writes css in javascript:
    styleSheets,
}                           from '@cssfn/core'          // writes css in javascript



// styles:
styleSheets(
    () => import(/* webpackPrefetch: true */ '../styles/plainLists.js')
, { id: 'a1mvibmo4t' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
