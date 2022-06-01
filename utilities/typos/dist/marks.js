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
//#region configs
const [marks, markValues, cssMarkConfig] = createCssConfig(() => {
    return {
        // backgrounds:
        backg: colors.warningThin,
        // foregrounds:
        foreg: 'inherit',
        // borders:
        border: borders.default,
        borderRadius: borderRadiuses.sm,
        // spacings:
        paddingInline: '0.2em',
        paddingBlock: '0em',
        // typos:
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        textDecoration: 'inherit',
        lineHeight: 'inherit',
        overflowWrap: 'inherit',
    };
}, { prefix: 'mrk' });
export { marks, marks as cssProps, marks as default, };
export { markValues, markValues as cssVals, };
export { cssMarkConfig, cssMarkConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule(['mark', '.mark'], {
            // layouts:
            display: 'inline',
            // customize:
            ...usesCssProps(marks),
        }),
    }),
]);
//#endregion style sheets
