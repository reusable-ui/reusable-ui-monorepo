// cssfn:
import {
    // writes css in javascript:
    atRoot,
    globalScope,
}                           from '@cssfn/core'                  // writes css in javascript

// internals:
/*
    A circular dependencies:
    mildable.js   import   =>   effects/styles.js   dynamic import   =>   mildable.js
    
    It seems OK because the last import is dynamic.
*/
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
