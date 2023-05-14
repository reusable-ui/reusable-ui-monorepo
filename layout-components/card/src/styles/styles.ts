// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    children,
    style,
    vars,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onIndicatorStylesChange,
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // configs:
    contents,
    
    
    
    // styles:
    onContentStylesChange,
    usesContentLayout,
    usesContentVariants,
    usesContentChildren,
}                           from '@reusable-ui/content'         // a neighbor component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // elements:
    headerElm,
    footerElm,
    bodyElm,
}                           from './elements.js'
import {
    // configs:
    cards,
    cssCardConfig,
}                           from './config.js'



// utility styles:
const inheritBorderFromParent = () => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    // makes <CardItem>'s border & borderRadius inherit from <Card>:
    return style({
        // borders:
        // undef border stroke:
        [borderVars.borderStyle           ] : null, // always same as <Card>
        [borderVars.borderWidth           ] : null, // always same as <Card>
        /*
        [borderVars.borderColorFn] // independent for each <CardItem>
        [borderVars.borderColor  ] // independent for each <CardItem>
        [borderVars.border       ] // independent for each <CardItem>
        */
        
        // undef border radius:
        [borderVars.borderStartStartRadius] : null, // always same as <Card>
        [borderVars.borderStartEndRadius  ] : null, // always same as <Card>
        [borderVars.borderEndStartRadius  ] : null, // always same as <Card>
        [borderVars.borderEndEndRadius    ] : null, // always same as <Card>
        /*
        [borderVars.borderRadius ] // independent for each <CardItem>
        */
    });
};



// child styles:
export const usesCardItemLayout    = () => {
    return style({
        // layouts:
        ...usesIndicatorLayout(),
        ...usesContentLayout(),
        
        
        
        // borders:
        ...inheritBorderFromParent(),
        
        
        
        // children:
        ...usesContentChildren(),
        
        
        
        // layouts:
        ...style({
            // layouts:
            display : 'block', // fills the entire parent's width
            
            
            
            // customize:
            ...usesCssProps(usesPrefixedProps(cards, 'item')), // apply config's cssProps starting with item***
            
            
            
            // configs:
            ...vars({
                // animations:
                
                // a tweak for <Content> itself:
                [contents.transition     ] : [
                    // original:
                    [cards.itemTransition],
                    
                    // overwrites:
                    
                    // borders:
                    ['border-width', '0s'], // does not support transition on border width, because we use it to make a separator
                ],
                
                // a tweak for <Content>'s media:
                [contents.mediaTransition] : contents.transition,
            }),
            ...style({
                // animations:
                
                // a tweak for <Header>|<Body>|<Footer>:
                transition                 : contents.transition,
            }),
        }),
    });
};
export const usesCardCaptionLayout = () => {
    return style({
        // sizes:
        // the default <Card>'s items height are unresizeable (excepts for the <Card>'s body):
        flex : [[0, 1, 'auto']], // ungrowable, shrinkable, initial from it's width (for variant `.inline`) or height (for variant `.block`)
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'caption')), // apply config's cssProps starting with caption***
    });
};
export const usesCardHeaderLayout  = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'header')), // apply config's cssProps starting with header***
    });
};
export const usesCardFooterLayout  = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'footer')), // apply config's cssProps starting with footer***
    });
};
export const usesCardBodyLayout    = () => {
    return style({
        // sizes:
        // the default <Card>'s body height is resizeable, ensuring footers are aligned to the bottom:
        flex     : [[1, 1, 'auto']], // growable, shrinkable, initial from it's width (for variant `.inline`) or height (for variant `.block`)
        
        
        
        // scrolls:
        overflow : 'auto', // enable horz & vert scrolling
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(cards, 'body')), // apply config's cssProps starting with body***
    });
};



// styles:
export const onCardStylesChange = watchChanges(onIndicatorStylesChange, onContentStylesChange, cssCardConfig.onChange);

export const usesCardLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    options = orientationableStuff;
    
    
    
    // dependencies:
    
    // features:
    const {borderRule   , borderVars   } = usesBorder(cards);
    const {animationRule, animationVars} = usesAnimation(cards as any);
    
    // capabilities:
    const {groupableRule} = usesGroupable({
        ...options,
        itemsSelector             : ':nth-child(n)', // select <header>, <footer>, <body>, and <foreign-elm>
    });
    const {separatorRule} = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        itemsSelector             : ':nth-child(n)', // select <header>, <footer>, <body>, and <foreign-elm>
        swapFirstItem             : true,
    });
    
    
    
    return style({
        // capabilities:
        ...groupableRule(), // make a nicely rounded corners
        
        
        
        // layouts:
        ...style({
            // layouts:
            ...ifOrientationInline({ // inline
                display       : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
                flexDirection : 'row',         // items are stacked horizontally
            }),
            ...ifOrientationBlock({  // block
                display       : 'flex',        // use block flexbox, so it takes the entire parent's width
                flexDirection : 'column',      // items are stacked vertically
            }),
            justifyContent    : 'start',       // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems        : 'stretch',     // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap          : 'nowrap',      // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize     : 0,
            
            
            
            // borders:
            ...children(['&', headerElm, footerElm, bodyElm], {
                // features:
                ...borderRule(), // must be placed at the last // dedicated border stroke for each <Card> & <CardItem>(s), so each borderRule can be turn on/off indepenently, eg: `cardStyle='flush'`
            }),
            
            
            
            // animations:
            boxShadow         : animationVars.boxShadow,
            filter            : animationVars.filter,
            anim              : animationVars.anim,
            
            
            
            // children:
            ...children([headerElm, footerElm, bodyElm], {
                // layouts:
                ...usesCardItemLayout(),
                
                
                
                // borders:
                ...separatorRule(), // turns the current border as separator between <CardItem>(s)
            }),
            ...children([headerElm, footerElm], {
                // layouts:
                ...usesCardCaptionLayout(),
            }),
            ...children(headerElm, {
                // layouts:
                ...usesCardHeaderLayout(),
            }),
            ...children(footerElm, {
                // layouts:
                ...usesCardFooterLayout(),
            }),
            ...children(bodyElm, {
                // layouts:
                ...usesCardBodyLayout(),
            }),
            
            
            
            // customize:
            ...usesCssProps(cards), // apply config's cssProps
            
            
            
            // borders:
            border                 : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
        }),
        
        
        
        // features:
        // borderRule(),    // moved out to dedicated border stroke for each <Card> & <CardItem>(s)
        ...animationRule(), // must be placed at the last
    });
};
export const usesCardVariants = () => {
    // dependencies:
    
    // features:
    const {borderVars   } = usesBorder();
    
    // variants:
    const {resizableRule} = usesResizable(cards);
    
    
    
    return style({
        // variants:
        
        /* write specific cardStyle first, so it can be overriden by `.nude`, `.mild`, `.outlined`, etc */
        
        ...variants([
            rule(['.flat', '.flush'], {
                // borders:
                // kill borders surrounding Card:
                [borderVars.borderWidth           ] : '0px',
                
                // remove rounded corners on top:
                [borderVars.borderStartStartRadius] : '0px',
                [borderVars.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borderVars.borderEndStartRadius  ] : '0px',
                [borderVars.borderEndEndRadius    ] : '0px',
            }),
            rule(['.flat', '.joined'], {
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // borders:
                    // kill separator between items:
                    [borderVars.borderWidth] : '0px',
                }),
            }),
        ]),
        
        ...usesIndicatorVariants(),
        ...usesContentVariants(),
        ...resizableRule(),
    });
};
export const usesCardStates = usesIndicatorStates;

export default () => style({
    // layouts:
    ...usesCardLayout(),
    
    // variants:
    ...usesCardVariants(),
    
    // states:
    ...usesCardStates(),
});
