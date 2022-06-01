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
//#region configs
const [secondaries, secondaryValues, cssSecondaryConfig] = createCssConfig(() => {
    return {
        // appearances:
        opacity: 0.65,
        // foregrounds:
        foreg: 'inherit',
        // typos:
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        textDecoration: 'inherit',
        lineHeight: 'inherit',
    };
}, { prefix: 'sec' });
export { secondaries, secondaries as cssProps, secondaries as default, };
export { secondaryValues, secondaryValues as cssVals, };
export { cssSecondaryConfig, cssSecondaryConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule(['small', '.txt-sec'], {
            // customize:
            ...usesCssProps(secondaries),
        }),
    }),
]);
//#endregion style sheets
