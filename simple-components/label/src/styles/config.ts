// cssfn:
import {
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [labels, labelValues, cssLabelConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'lbl' });
