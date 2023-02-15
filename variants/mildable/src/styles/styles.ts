// cssfn:
import {
    // writes css in javascript:
    atRoot,
    globalScope,
}                           from '@cssfn/core'                  // writes css in javascript

// internals:
import {
    // hooks:
    setMild,
}                           from '../mildable.js'



// style:
export default [
    globalScope({
        ...atRoot({
            /*
                supports for `usesColorable()`:
                at outside <component>, which is at <html><body>, the whole page assumes to be *mild*-ed (not filled by bold color theme).
                so we need to reset the whole page to mild={true}
            */
            ...setMild(true),
        }),
    }),
];
