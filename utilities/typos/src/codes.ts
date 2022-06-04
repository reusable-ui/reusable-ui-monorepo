// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'     // cssfn css specific types
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

// reusable-ui:
import {
    // configs:
    colors,
}                           from '@reusable-ui/colors'  // a color management system
import {
    // configs:
    borders,
    borderRadiuses,
}                           from '@reusable-ui/borders' // a border (stroke) management system

// internals:
import {
    // configs:
    typos,
}                           from './typos.js'



//#region configs
export const [codes, codeValues, cssCodeConfig] = createCssConfig(() => {
    return {
        // backgrounds:
        backg             : 'none'                    as CssKnownProps['backg'],
        
        
        
        // foregrounds:
        foreg             : colors.pink               as CssKnownProps['foreg'],
        
        
        
        // borders:
        border            : borders.none              as CssKnownProps['border'],
        borderRadius      : borderRadiuses.none       as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline     : '0em'                     as CssKnownProps['paddingInline'],
        paddingBlock      : '0em'                     as CssKnownProps['paddingBlock'],
        
        
        
        // typos:
        fontSize          : [[
            'calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)'
        ]]                                            as CssKnownProps['fontSize'],
        fontFamily        : typos.fontFamilyMonospace as CssKnownProps['fontFamily'],
        fontWeight        : typos.fontWeightNormal    as CssKnownProps['fontWeight'],
        fontStyle         : 'normal'                  as CssKnownProps['fontStyle'],
        textDecoration    : 'none'                    as CssKnownProps['textDecoration'],
        lineHeight        : 'inherit'                 as CssKnownProps['lineHeight'],
        overflowWrap      : 'inherit'                 as CssKnownProps['overflowWrap'],
    };
}, { prefix: 'code' });
export { codes as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['code', '.code', 'var', '.var', 'samp', '.samp'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesCssProps(codes),
        }),
    }),
]);
//#endregion style sheets
