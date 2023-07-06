// cssfn:
import {
    // writes css in javascript:
    rule,
    globalScope,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    typos,
}                           from '../configs/typos.js'



// styles:
export default [
    globalScope({
        ...rule([
            'del', '.delete', 's',
            'ins', '.insert', 'u',
            'small', '.small',
            'strong', 'b',
            'em', 'i',
            'sub', '.subscript',
            'sup', '.superscript',
        ], {
            // layouts:
            display        : 'inline',
        }),
        ...rule(['del', '.delete', 's'], {
            // typos:
            textDecoration : 'line-through',
        }),
        ...rule(['ins', '.insert', 'u'], {
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
        ...rule(['sub', '.subscript'], {
            // typos:
            verticalAlign  : 'sub',
        }),
        ...rule(['sup', '.superscript'], {
            // typos:
            verticalAlign  : 'super',
        }),
    }),
];
