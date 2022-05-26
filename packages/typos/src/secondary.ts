// cssfn:
import {
    // rules:
    rule,
    
    
    
    // scopes:
    globalScope,
    
    
    
    // style sheets:
    styleSheets,
}                           from '@cssfn/cssfn'         // writes css in javascript
import {
    createCssConfig,
    
    
    
    // utilities:
    usesCssProps,
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
}                           from './types.js'



//#region configs
const [secondaries, secondaryValues, cssSecondaryConfig] = createCssConfig(() => {
    return {
        fontSize       : 'inherit' as FontSize,
        fontFamily     : 'inherit' as FontFamily,
        fontWeight     : 'inherit' as FontWeight,
        fontStyle      : 'inherit' as FontStyle,
        textDecoration : 'inherit' as TextDecoration,
        lineHeight     : 'inherit' as LineHeight,
        
        foreg          : 'inherit' as Foreground,
        opacity        : 0.65      as Opacity,
    };
}, { prefix: 'sec' });
export {
    secondaries,
    secondaries as cssProps,
    secondaries as default,
}
export {
    secondaryValues,
    secondaryValues as cssVals,
}
export {
    cssSecondaryConfig,
    cssSecondaryConfig as cssConfig,
}
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
