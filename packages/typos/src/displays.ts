// cssfn:
import {
    // scopes:
    globalScope,
    
    
    
    // style sheets:
    styleSheets,
}                           from '@cssfn/cssfn'         // writes css in javascript
import {
    createCssConfig,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration

// internals:
import type {
    FontSize,
    FontFamily,
    FontWeight,
    FontStyle,
    TextDecoration,
    LineHeight,
    Foreground,
    Opacity,
    MarginBlockStart,
    MarginBlockEnd,
    MarginInlineStart,
    MarginInlineEnd,
}                           from './types.js'
import {
    typos,
}                           from './typos.js'
import {
    headings as heads,
    usesHeadingRule,
}                           from './headings.js'



//#region configs
const [displays, displayValues, cssDisplayConfig] = createCssConfig(() => {
    return {
        fontSize          : 'unset',
        fontSize1         : [['calc(', 5.0, '*', typos.fontSize, ')']] as FontSize,
        fontSize2         : [['calc(', 4.5, '*', typos.fontSize, ')']] as FontSize,
        fontSize3         : [['calc(', 4.0, '*', typos.fontSize, ')']] as FontSize,
        fontSize4         : [['calc(', 3.5, '*', typos.fontSize, ')']] as FontSize,
        fontSize5         : [['calc(', 3.0, '*', typos.fontSize, ')']] as FontSize,
        fontSize6         : [['calc(', 2.5, '*', typos.fontSize, ')']] as FontSize,
        
        fontFamily        : heads.fontFamily        as FontFamily,
        fontWeight        : 300                     as FontWeight,
        fontStyle         : heads.fontStyle         as FontStyle,
        textDecoration    : heads.textDecoration    as TextDecoration,
        lineHeight        : heads.lineHeight        as LineHeight,
        
        foreg             : heads.foreg             as Foreground,
        
        marginBlockStart  : heads.marginBlockStart  as MarginBlockStart,
        marginBlockEnd    : heads.marginBlockEnd    as MarginBlockEnd,
        marginInlineStart : heads.marginInlineStart as MarginInlineStart,
        marginInlineEnd   : heads.marginInlineEnd   as MarginInlineEnd,
        
        subOpacity        : heads.subOpacity        as Opacity,
    };
}, { prefix: 'd' });
export {
    displays,
    displays as cssProps,
    displays as default,
}
export {
    displayValues,
    displayValues as cssVals,
}
export {
    cssDisplayConfig,
    cssDisplayConfig as cssConfig,
}
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...usesHeadingRule(displays, ['.display-']),
    }),
]);
//#endregion style sheets
