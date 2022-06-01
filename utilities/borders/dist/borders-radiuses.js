import { createCssConfig, } from '@cssfn/css-config'; // reads/writes css variables configuration
//#endregion types
//#region configs
const [radiuses, radiusValues, cssBorderRadiusConfig] = createCssConfig(() => {
    const basics = {
        none: '0rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '1rem',
        xxl: '2rem',
        pill: '50rem',
        circle: '50%',
    };
    const defaults = {
        default: basics.md,
    };
    return {
        ...basics,
        ...defaults,
    };
}, { prefix: 'bd-rd' });
export { radiuses, radiuses as cssProps, radiuses as default, };
export { radiusValues, radiusValues as cssVals, };
export { cssBorderRadiusConfig, cssBorderRadiusConfig as cssConfig, };
//#endregion configs
