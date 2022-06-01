import { 
// rules:
atRoot, 
// scopes:
globalScope, 
// style sheets:
styleSheets, } from '@cssfn/cssfn'; // writes css in javascript
import { createCssConfig, 
// utilities:
usesCssProps, } from '@cssfn/css-config'; // reads/writes css variables configuration
// reusable-ui:
import { 
// configs:
colors, } from '@reusable-ui/colors'; // a color management system
//#region configs
const [typos, typoValues, cssTypoConfig] = createCssConfig(() => {
    const basics = {
        // backgrounds:
        /**
         * The default is a solid color of `colors.backg`.
         * It can be an image or gradient with the average color of `colors.backg`.
         */
        backg: colors.backg,
        // foregrounds:
        foreg: colors.foreg,
        // typos:
        fontSizeNm: '1rem',
        fontFamilySansSerief: [
            'system-ui',
            '-apple-system',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            '"Noto Sans"',
            '"Liberation Sans"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ],
        fontFamilyMonospace: [
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ],
        fontWeightLighter: 'lighter',
        fontWeightLight: 300,
        fontWeightNormal: 400,
        fontWeightSemibold: 600,
        fontWeightBold: 700,
        fontWeightBolder: 'bolder',
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeightSm: 1.25,
        lineHeightNm: 1.50,
        lineHeightLg: 2.00,
        overflowWrap: 'break-word',
    };
    return {
        ...basics,
        // typos:
        fontSizeXs: [['calc(', basics.fontSizeNm, '*', 0.50, ')']],
        fontSizeSm: [['calc(', basics.fontSizeNm, '*', 0.75, ')']],
        fontSize: basics.fontSizeNm,
        fontSizeMd: [['calc(', basics.fontSizeNm, '*', 1.25, ')']],
        fontSizeLg: [['calc(', basics.fontSizeNm, '*', 1.50, ')']],
        fontSizeXl: [['calc(', basics.fontSizeNm, '*', 1.75, ')']],
        fontSizeXxl: [['calc(', basics.fontSizeNm, '*', 2.00, ')']],
        fontSizeXxxl: [['calc(', basics.fontSizeNm, '*', 2.25, ')']],
        fontFamily: basics.fontFamilySansSerief,
        fontWeight: basics.fontWeightNormal,
        lineHeight: basics.lineHeightNm,
    };
}, { prefix: '' });
export { typos, typos as cssProps, typos as default, };
export { typoValues, typoValues as cssVals, };
export { cssTypoConfig, cssTypoConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...atRoot({
            // customize:
            ...usesCssProps(typos),
        }),
    }),
]);
//#endregion style sheets
