// Cssfn:
import {
    // Writes css in javascript:
    rule,
    globalScope,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui configs:
import {
    typoConfigVars,
}                           from '@reusable-ui/typo-config'         // Configures the typography system (font sizes, font families, font weights, line heights, and text wrapping rules) across all UI components.



// Styles:

export default [
    globalScope({
        ...rule(['html', 'body'], {
            // Core Typography:
            fontSize       : typoConfigVars.fontSize,
            fontFamily     : typoConfigVars.fontFamily,
            fontWeight     : typoConfigVars.fontWeight,
            fontStyle      : typoConfigVars.fontStyle,
            textDecoration : typoConfigVars.textDecoration,
            lineHeight     : typoConfigVars.lineHeight,
            overflowWrap   : typoConfigVars.overflowWrap,
            
            
            
            // Baseline Normalizations & Layout Foundation:
            margin               : 0,
            padding              : 0,
            WebkitTextSizeAdjust : '100%',
            MozTextSizeAdjust    : '100%',
            textSizeAdjust       : '100%',
            WebkitFontSmoothing  : 'antialiased',
            MozOsxFontSmoothing  : 'grayscale',
        }),
    }),
];
