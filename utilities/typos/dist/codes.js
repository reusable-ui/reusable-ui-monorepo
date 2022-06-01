import { 
// rules:
rule, 
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
import { 
// configs:
borders, borderRadiuses, } from '@reusable-ui/borders'; // a border (stroke) management system
// internals:
import { 
// configs:
typos, } from './typos.js';
//#region configs
const [codes, codeValues, cssCodeConfig] = createCssConfig(() => {
    return {
        // backgrounds:
        backg: 'none',
        // foregrounds:
        foreg: colors.pink,
        // borders:
        border: borders.none,
        borderRadius: borderRadiuses.none,
        // spacings:
        paddingInline: '0em',
        paddingBlock: '0em',
        // typos:
        fontSize: [[
                'calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)'
            ]],
        fontFamily: typos.fontFamilyMonospace,
        fontWeight: typos.fontWeightNormal,
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeight: 'inherit',
        overflowWrap: 'inherit',
    };
}, { prefix: 'code' });
export { codes, codes as cssProps, codes as default, };
export { codeValues, codeValues as cssVals, };
export { cssCodeConfig, cssCodeConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule(['code', '.code', 'var', '.var', 'samp', '.samp'], {
            // layouts:
            display: 'inline',
            // customize:
            ...usesCssProps(codes),
        }),
    }),
]);
//#endregion style sheets
