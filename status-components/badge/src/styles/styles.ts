// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    ifEmpty,
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borderRadiuses,
    
    
    
    // reusable common layouts:
    fillTextLineHeightLayout,
    fillTextLineWidthLayout,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // nude variant of UI:
    ifNotNude,
    
    
    
    // a capability of UI to highlight itself to attract user's attention:
    usesExcitable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onPopupStylesChange,
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
}                           from '@reusable-ui/popup'           // a base component

// internals:
import {
    // configs:
    badges,
    cssBadgeConfig,
}                           from './config.js'



// styles:
export const onBadgeStylesChange = watchChanges(onPopupStylesChange, cssBadgeConfig.onChange);

export const usesBadgeLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {paddingRule, paddingVars} = usesPadding(badges);
    
    
    
    return style({
        // layouts:
        ...usesPopupLayout(),
        ...style({
            // layouts:
            display       : 'inline-block', // use inline block, so it takes the width & height as needed
            ...ifEmpty({
                display   : 'inline-grid',  // required for filling the width & height using `::before` & `::after`
            }),
            
            
            
            // positions:
            verticalAlign : 'baseline',    // <Badge>'s text should be aligned with sibling text, so the <Badge> behave like <span> wrapper
            
            
            
            // sizes:
            justifySelf   : 'center',         // protect from stretching by flex/grid
            alignSelf     : 'center',         // protect from stretching by flex/grid
            flex          : [[0, 0, 'auto']], // protect from stretching by flex
            ...ifEmpty({
                // makes the width and height equal, by filling `width === height === line(Height/Width)`:
                
                // width  : '1em', // not working, (font-width  !== 1em) if the font-size is fractional number
                // height : '1em', // not working, (font-height !== 1em) if the font-size is fractional number
                
                ...children('::before', {
                    // layouts:
                    ...fillTextLineHeightLayout(),
                }),
                ...children('::after', {
                    // layouts:
                    ...fillTextLineWidthLayout(),
                }),
            }),
            
            
            
            // spacings:
            ...ifEmpty({
                // makes the width and height equal, by making `paddingInline === paddingBlock`:
                [paddingVars.paddingInline] : paddingVars.paddingBlock,
            }),
            
            
            
            // typos:
            lineHeight    : 1,
            textAlign     : 'center',
            
            
            
            // customize:
            ...usesCssProps(badges), // apply config's cssProps
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
        
        
        
        // features:
        ...paddingRule(), // must be placed at the last
    });
}, onBadgeStylesChange);

export const usesBadgeVariants = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {borderVars   } = usesBorder();
    const {paddingVars  } = usesPadding();
    
    // variants:
    const {resizableRule} = usesResizable(badges);
    
    
    
    return style({
        // variants:
        
        /* write specific badgeStyle first, so it can be overriden by `.nude`, `.mild`, `.outlined`, etc */
        
        ...variants([
            rule(['.pill', '.circle'], {
                // borders:
                // big rounded corners on top:
                [borderVars.borderStartStartRadius] : borderRadiuses.pill,
                [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
                // big rounded corners on bottom:
                [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
                [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
            }),
            rule(['.square', '.circle'], {
                ...ifNotNude({
                    // spacings:
                    // makes the width and height equal, by making `paddingInline === paddingBlock`:
                    [paddingVars.paddingInline] : paddingVars.paddingBlock,
                }),
            }),
            rule('.pill', {
                // customize:
                ...usesCssProps(usesPrefixedProps(badges, 'pill')), // apply config's cssProps starting with pill***
            }),
            rule('.square', {
                // customize:
                ...usesCssProps(usesPrefixedProps(badges, 'square')), // apply config's cssProps starting with square***
            }),
            rule('.circle', {
                // customize:
                ...usesCssProps(usesPrefixedProps(badges, 'circle')), // apply config's cssProps starting with circle***
            }),
        ]),
        
        ...usesPopupVariants(),
        ...resizableRule(),
    });
}, onBadgeStylesChange);

export const usesBadgeStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {excitableRule} = usesExcitable(badges);
    
    
    
    return style({
        // states:
        ...usesPopupStates(),
        ...excitableRule(),
    });
}, onBadgeStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesBadgeLayout(),
    
    // variants:
    ...usesBadgeVariants(),
    
    // states:
    ...usesBadgeStates(),
}), onBadgeStylesChange);
