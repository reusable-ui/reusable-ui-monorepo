// cssfn:
import {
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript



// configs:
export const [groups, groupValues, cssGroupConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'grp' });
