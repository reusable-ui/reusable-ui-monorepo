import { createCssConfig, } from '@cssfn/css-config'; // reads/writes css variables configuration
//#endregion types
//#region configs
const [spacers, spacerValues, cssSpacerConfig] = createCssConfig(() => {
    const basics = {
        none: '0rem',
        md: '1rem',
    };
    const defaults = {
        default: basics.md,
    };
    return {
        ...basics,
        ...defaults,
        xxs: [['calc(', basics.md, '/', 8, ')']],
        xs: [['calc(', basics.md, '/', 4, ')']],
        sm: [['calc(', basics.md, '/', 2, ')']],
        lg: [['calc(', basics.md, '*', 1.5, ')']],
        xl: [['calc(', basics.md, '*', 3, ')']],
    };
}, { prefix: 'spc' });
export { spacers, spacers as cssProps, spacers as default, };
export { spacerValues, spacerValues as cssVals, };
export { cssSpacerConfig, cssSpacerConfig as cssConfig, };
//#endregion configs
