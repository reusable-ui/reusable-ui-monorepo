// cssfn:
import {
    // writes css in javascript:
    rule,
    globalScope,
    styleSheets,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    typos,
}                           from './typos.js'



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['del', 's', 'ins', 'u', 'small', '.small', 'strong', 'b', 'em', 'i'], {
            // layouts:
            display        : 'inline',
        }),
        ...rule(['del', 's'], {
            // typos:
            textDecoration : 'line-through',
        }),
        ...rule(['ins', 'u'], {
            // typos:
            textDecoration : 'underline',
        }),
        ...rule(['small', '.small'], {
            // typos:
            fontSize       : typos.fontSizeSm,
        }),
        ...rule(['strong', 'b'], {
            // typos:
            fontWeight     : typos.fontWeightBolder,
        }),
        ...rule(['em', 'i'], {
            // typos:
            fontStyle      : 'italic',
        }),
    }),
]);
//#endregion style sheets
