// cssfn:
import {
    // writes css in javascript:
    rules,
    atRoot,
    globalScope,
    
    
    
    // reads/writes css variables configuration:
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a responsive management system:
    breakpoints,
    ifScreenWidthAtLeast,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // configs:
    containers,
}                           from './config.js'



// styles:
export default [
    globalScope({
        ...atRoot({
            ...rules([
                // the <Container> size is determined by screen width:
                Object.keys(breakpoints)
                .map((breakpointName) =>
                    ifScreenWidthAtLeast(breakpointName, {
                        // overwrites propName = propName{BreakpointName}:
                        ...overwriteProps(containers, usesSuffixedProps(containers, breakpointName)),
                    }),
                ),
            ]),
        }, { specificityWeight: 2 }), // increase the specificity to win with the specificity in cssConfig's :root
    }),
];
