// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'     // cssfn css specific types
import type {
    // cssfn properties:
    CssSelector,
    CssSelectorCollection,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // rules:
    rule,
    rules,
    ifFirstChild,
    ifLastChild,
    ifNotLastChild,
    
    
    
    // combinators:
    nextSiblings,
    
    
    
    // scopes:
    globalScope,
    
    
    
    // style sheets:
    styleSheets,
}                           from '@cssfn/cssfn'         // writes css in javascript
import {
    flat,
}                           from '@cssfn/cssfn/src/utilities.js'
import {
    createCssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration

// internals:
import {
    typos,
}                           from './typos.js'



//#region configs
const [headings, headingValues, cssHeadingConfig] = createCssConfig(() => {
    return {
        // appearances:
        subOpacity        : 0.8       as CssKnownProps['opacity'],
        
        
        
        // foregrounds:
        foreg             : 'inherit' as CssKnownProps['foreg'],
        
        
        
        // spacings:
        marginInlineStart : 0         as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : 0         as CssKnownProps['marginInlineEnd'],
        marginBlockStart  : 0         as CssKnownProps['marginBlockStart'],
        marginBlockEnd    : '0.75em'  as CssKnownProps['marginBlockEnd'],
        
        
        
        // typos:
        fontSize          : 'unset'                                     as CssKnownProps['fontSize'],
        fontSize1         : [['calc(', 2.25, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize2         : [['calc(', 2.00, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize3         : [['calc(', 1.75, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize4         : [['calc(', 1.50, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize5         : [['calc(', 1.25, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize6         : [['calc(', 1.00, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        
        fontFamily        : 'inherit' as CssKnownProps['fontFamily'],
        fontWeight        : 500       as CssKnownProps['fontWeight'],
        fontStyle         : 'inherit' as CssKnownProps['fontStyle'],
        textDecoration    : 'inherit' as CssKnownProps['textDecoration'],
        lineHeight        : 1.25      as CssKnownProps['lineHeight'],
    };
}, { prefix: 'h' });
export {
    headings,
    headings as cssProps,
    headings as default,
}
export {
    headingValues,
    headingValues as cssVals,
}
export {
    cssHeadingConfig,
    cssHeadingConfig as cssConfig,
}
//#endregion configs



//#region style sheets
export const usesHeadingRule = <THeadings extends typeof headings>(cssProps: THeadings, selector: CssSelectorCollection, levels = [1,2,3,4,5,6]) => {
    const selectors = (
        flat(selector)
        .filter((selector): selector is CssSelector => (!!selector || (selector === '')) && (selector !== true))
    );
    const selectorsWithLevels = (
        levels
        .flatMap((level) =>
            selectors
            .map((selector) =>
                `${selector}${level}`
            )
        )
    );
    
    
    
    return rules([
        // global rule for h1-h6:
        rule(selectorsWithLevels, {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first heading
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last heading
            }),
            
            
            
            ...nextSiblings(selectorsWithLevels, {
                /*
                 * treats subsequent headings as subtitles
                 * make it closer to the main heading
                 * make it further to the content
                */
                
                
                
                // appearances:
                opacity: cssProps.subOpacity,
                
                
                
                // spacings:
                // make subtitle closer to the main heading:
                marginBlockStart: `calc(0px - ${cssProps.marginBlockEnd})`, // cancel-out parent's marginBlockEnd with negative marginBlockStart
                
                ...ifNotLastChild({
                    // make subtitle further to the content:
                    marginBlockEnd: cssProps.marginBlockEnd,
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(cssProps),
        }),
        
        
        
        // individual rule for each h1-h6:
        levels
        .map((level) =>
            rule(selectors.map((selector) => `${selector}${level}`), {
                // customize with propName{level}:
                ...overwriteProps(cssProps, usesSuffixedProps(cssProps, `${level}`)),
            })
        ),
    ]);
};
styleSheets([
    globalScope({
        ...usesHeadingRule(headings, ['h', '.h']),
    }),
]);
//#endregion style sheets
