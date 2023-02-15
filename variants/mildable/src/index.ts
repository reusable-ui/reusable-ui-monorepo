// cssfn:
import {
    // writes css in javascript:
    styleSheets,
}                           from '@cssfn/core'                  // writes css in javascript

// internals:
export *                    from './mildable.js'



// styles:
/*
    a side-effect styleSheet that forced to `"sideEffects": false` by `package.json`,
    so if you don't import anything from this module, this side effect will gone.
*/
styleSheets(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'jwhfzri437' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
