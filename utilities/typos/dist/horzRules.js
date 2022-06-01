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
borders, } from '@reusable-ui/borders'; // a border (stroke) management system
import { 
// configs:
spacers, } from '@reusable-ui/spacers'; // a spacer (gap) management system
//#region configs
const [horzRules, horzRuleValues, cssHorzRuleConfig] = createCssConfig(() => {
    return {
        // appearances:
        opacity: 0.25,
        // foregrounds:
        foreg: 'inherit',
        // spacings:
        marginInlineStart: '0em',
        marginInlineEnd: '0em',
        marginBlockStart: spacers.default,
        marginBlockEnd: spacers.default,
    };
}, { prefix: 'hr' });
export { horzRules, horzRules as cssProps, horzRules as default, };
export { horzRuleValues, horzRuleValues as cssVals, };
export { cssHorzRuleConfig, cssHorzRuleConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule('hr', {
            // layouts:
            display: 'block',
            // borders:
            border: '0em',
            borderBlockStart: borders.default,
            borderBlockStartColor: 'currentcolor',
            // customize:
            ...usesCssProps(horzRules),
        }),
    }),
]);
//#endregion style sheets
