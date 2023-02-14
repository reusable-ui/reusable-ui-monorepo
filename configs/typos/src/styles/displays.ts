// cssfn:
import {
    // writes css in javascript:
    globalScope,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    displays,
}                           from '../configs/displays.js'
import {
    // styles:
    usesHeadingRule,
}                           from './headings.js'



// styles:
export default [
    globalScope({
        ...usesHeadingRule(displays, ['.display-']),
    }),
];
