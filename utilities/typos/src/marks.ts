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



//#region configs
export const [marks, markValues, cssMarkConfig] = createCssConfig(() => {
    return {
        // backgrounds:
        backg             : colors.warningThin as CssKnownProps['backg'],
        
        
        
        // foregrounds:
        foreg             : 'inherit'          as CssKnownProps['foreg'],
        
        
        
        // borders:
        border            : borders.default    as CssKnownProps['border'],
        borderRadius      : borderRadiuses.sm  as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline     : '0.2em'            as CssKnownProps['paddingInline'],
        paddingBlock      : '0em'              as CssKnownProps['paddingBlock'],
        
        
        
        // typos:
        fontSize          : 'inherit'          as CssKnownProps['fontSize'],
        fontFamily        : 'inherit'          as CssKnownProps['fontFamily'],
        fontWeight        : 'inherit'          as CssKnownProps['fontWeight'],
        fontStyle         : 'inherit'          as CssKnownProps['fontStyle'],
        textDecoration    : 'inherit'          as CssKnownProps['textDecoration'],
        lineHeight        : 'inherit'          as CssKnownProps['lineHeight'],
        overflowWrap      : 'inherit'          as CssKnownProps['overflowWrap'],
    };
}, { prefix: 'mrk' });
export { marks as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['mark', '.mark'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesCssProps(marks),
        }),
    }),
]);
//#endregion style sheets
