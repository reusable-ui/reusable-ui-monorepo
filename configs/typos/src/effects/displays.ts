// cssfn:
import {
    // writes css in javascript:
    styleSheets,
}                           from '@cssfn/core'          // writes css in javascript



// styles:
styleSheets(
    () => import(/* webpackPrefetch: true */ '../styles/displays.js')
, { id: 'p7ufa8wbx4' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
