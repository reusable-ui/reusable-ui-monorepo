import { 
// rules:
rule, ifFirstChild, ifLastChild, 
// scopes:
globalScope, 
// style sheets:
styleSheets, } from '@cssfn/cssfn'; // writes css in javascript
import { createCssConfig, 
// utilities:
usesCssProps, } from '@cssfn/css-config'; // reads/writes css variables configuration
//#region configs
const [paragraphs, paragraphValues, cssParagraphConfig] = createCssConfig(() => {
    return {
        // foregrounds:
        foreg: 'inherit',
        // spacings:
        marginInlineStart: '0em',
        marginInlineEnd: '0em',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        // typos:
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        textDecoration: 'inherit',
        lineHeight: 'inherit',
    };
}, { prefix: 'p' });
export { paragraphs, paragraphs as cssProps, paragraphs as default, };
export { paragraphValues, paragraphValues as cssVals, };
export { cssParagraphConfig, cssParagraphConfig as cssConfig, };
//#endregion configs
//#region style sheets
styleSheets([
    globalScope({
        ...rule(['p', '.p'], {
            // layouts:
            display: 'block',
            // spacings:
            ...ifFirstChild({
                marginBlockStart: 0, // kill the top_margin at the first paragraph
            }),
            ...ifLastChild({
                marginBlockEnd: 0, // kill the bottom_margin at the last paragraph
            }),
            // customize:
            ...usesCssProps(paragraphs),
        }),
    }),
]);
//#endregion style sheets
