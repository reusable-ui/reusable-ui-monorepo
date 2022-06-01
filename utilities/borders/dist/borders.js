import { createCssConfig, } from '@cssfn/css-config'; // reads/writes css variables configuration
// internals:
export * as radius from './borders-radiuses.js';
export * as borderRadius from './borders-radiuses.js';
export { radiuses, radiuses as borderRadiuses, radiusValues, radiusValues as borderRadiusValues, cssBorderRadiusConfig, } from './borders-radiuses.js';
//#endregion types
//#region configs
const [borders, borderValues, cssBorderConfig] = createCssConfig(() => {
    const widths = {
        none: '0px',
        hair: '1px',
        thin: '2px',
        bold: '4px',
    };
    const styles = {
        color: 'currentColor',
        style: 'solid',
    };
    const defaults = {
        defaultWidth: widths.hair,
        default: [[styles.style, widths.hair, styles.color]],
    };
    return {
        ...widths,
        ...styles,
        ...defaults,
    };
}, { prefix: 'bd' });
export { borders, borders as cssProps, borders as default, };
export { borderValues, borderValues as cssVals, };
export { cssBorderConfig, cssBorderConfig as cssConfig, };
//#endregion configs
