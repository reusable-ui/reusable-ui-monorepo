// cssfn:
import {
    // cssfn css specific types:
    CssSelector,
    CssSelectorCollection,
    
    
    
    // writes css in javascript:
    rule,
    rules,
    ifFirstChild,
    ifLastChild,
    ifNotLastChild,
    nextSiblings,
    globalScope,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // utilities:
    flat,
}                           from '@cssfn/core'          // writes css in javascript

// internals:
import {
    // configs:
    headings,
}                           from '../configs/headings.js'



// styles:
export const usesHeadingRule = <THeadings extends typeof headings>(cssProps: THeadings, selector: CssSelectorCollection, conditions: CssSelectorCollection = '&', levels = [1,2,3,4,5,6]) => {
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
        // shared rule for h1-h6:
        rule(selectorsWithLevels, {
            ...rule(conditions, {
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
                    ...rule(conditions, {
                        /*
                         * treats subsequent headings as subtitles
                         * make it closer to the main heading
                         * make it further to the content
                        */
                        
                        
                        
                        // appearances:
                        opacity: cssProps.subOpacity,
                        
                        
                        
                        // spacings:
                        // make the subtitle closer to the main heading:
                        marginBlockStart: `calc(0px - ${cssProps.marginBlockEnd})`, // cancel-out parent's marginBlockEnd with negative marginBlockStart
                        
                        ...ifNotLastChild({
                            // make subtitle further to the content:
                            marginBlockEnd: cssProps.marginBlockEnd,
                        }),
                    }, { specificityWeight: 0 }),
                }),
                
                
                
                // customize:
                ...usesCssProps(cssProps),
            }, { specificityWeight: 0 }),
        }),
        
        
        
        // individual rule for each h1-h6:
        levels
        .map((level) =>
            rule(selectors.map((selector) => `${selector}${level}`), {
                ...rule(conditions, {
                    // customize with propName{level}:
                    ...overwriteProps(cssProps, usesSuffixedProps(cssProps, `${level}`)),
                }, { specificityWeight: 0 }),
            })
        ),
    ]);
};
export default [
    globalScope({
        ...usesHeadingRule(headings, ['h', '.h'], `:not(:where(${[1,2,3,4,5,6].map((level) => `.display-${level}`).join(', ')}, .lead))`),
    }),
];
