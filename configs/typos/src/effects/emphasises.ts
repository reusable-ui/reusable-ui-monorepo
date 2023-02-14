// cssfn:
import {
    // writes css in javascript:
    styleSheets,
}                           from '@cssfn/core'          // writes css in javascript



// styles:
styleSheets(
    () => import(/* webpackPrefetch: true */ '../styles/emphasises.js')
, { id: '1uabr1zyyb' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
