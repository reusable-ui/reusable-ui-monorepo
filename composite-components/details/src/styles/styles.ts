// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    children,
    style,
    scope,
    mainScope,
    
    
    
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
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onBasicStylesChange,
    usesBasicVariants,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    onContentStylesChange,
    usesContentBasicLayout,
    usesContentBasicVariants,
    usesContentChildren,
}                           from '@reusable-ui/content'         // a neighbor component
import {
    // styles:
    onCollapseStylesChange,
    usesCollapseLayout,
    usesCollapseStates,
}                           from '@reusable-ui/collapse'        // a base component

// internals:
import {
    // elements:
    itemElm,
}                           from './elements.js'
import {
    // configs:
    details,
    cssDetailsConfig,
}                           from './config.js'



// styles:
export const onDetailsStylesChange = watchChanges(onBasicStylesChange, onContentStylesChange, onCollapseStylesChange, cssDetailsConfig.onChange);



export const usesDetailsLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule   , borderVars   } = usesBorder(details);
    const {groupableRule, separatorRule} = usesGroupable({
        orientationInlineSelector : null, // never  => the <ToggleButton> & <DetailsBody> are never  stacked in horizontal
        orientationBlockSelector  : '&',  // always => the <ToggleButton> & <DetailsBody> are always stacked in vertical
        itemsSelector             : ':nth-child(n)', // select <ToggleButton> & <DetailsBody>
    });
    
    
    
    return style({
        // features:
        ...groupableRule(), // make a nicely rounded corners
        
        
        
        // layouts:
        ...style({
            // layouts:
            display        : 'flex',    // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'column',  // items are stacked vertically
            justifyContent : 'start',   // if items are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
            alignItems     : 'stretch', // items width are 100% of the parent (for variant `.block`) or height (for variant `.inline`)
            flexWrap       : 'nowrap',  // no wrapping
            
            
            
            // sizes:
            // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
            minInlineSize  : 0,
            
            
            
            // children:
            ...children(itemElm, {
                // borders:
                ...separatorRule(), // turns the current border as separator between <ToggleButton> & <DetailsBody>
            }),
            
            
            
            // customize:
            ...usesCssProps(details), // apply config's cssProps
            
            
            
            // borders:
            border                 : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
        }),
        
        
        
        // features:
        ...borderRule(), // must be placed at the last
    });
};

export const usesDetailsVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(details);
    
    
    
    return style({
        // variants:
        ...usesBasicVariants(),
        ...resizableRule(),
    });
};



export const usesTogglerLayout = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(details, 'toggler')), // apply config's cssProps starting with toggler***
    });
};

export const usesTogglerVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(usesPrefixedProps(details, 'toggler'));
    
    
    
    return style({
        // variants:
        ...resizableRule(),
    });
};



export const usesCollapsibleBodyLayout = () => {
    return style({
        // layouts:
        ...usesCollapseLayout(),
        ...style({
            // customize:
            ...usesCssProps(usesPrefixedProps(details, 'body')), // apply config's cssProps starting with body***
        }),
    });
};

export const usesCollapsibleBodyVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(usesPrefixedProps(details, 'body'));
    
    
    
    return style({
        // variants:
        ...resizableRule(),
        ...variants([
            /*
                a hack with :not(_)
                the total selector combined with parent is something like this: `.content>:where(.detailsBody):not(_)`, the specificity weight = 1.1
                the specificity of 1.1 is a bit higher than:
                * `.basic`          , the specificity weight = 1
                * `.custom`         , the specificity weight = 1
                * but can be easily overriden by specificity weight >= 2, like:
                * `.basic.awesome`  , the specificity weight = 2
                * `.custom.awesome` , the specificity weight = 2
            */
            rule('.content>:where(&):not(_)', { // <DetailsBody>
                // layouts:
                ...usesContentBasicLayout(),
                
                // variants:
                ...usesContentBasicVariants(),
                
                // children:
                ...usesContentChildren(),
            }),
        ]),
    });
};

export const usesCollapsibleBodyStates = usesCollapseStates;



export default () => [
    mainScope({
        // layouts:
        ...usesDetailsLayout(),
        
        // variants:
        ...usesDetailsVariants(),
    }),
    scope('toggler', {
        // layouts:
        ...usesTogglerLayout(),
        
        // variants:
        ...usesTogglerVariants(),
    }, { specificityWeight: 2 }), // increase the specificity weight to overcome .toggleButton's specificity weight
    scope('body', {
        // layouts:
        ...usesCollapsibleBodyLayout(),
        
        // variants:
        ...usesCollapsibleBodyVariants(),
        
        // states:
        ...usesCollapsibleBodyStates(),
    }, { specificityWeight: 2 }), // increase the specificity weight to overcome .basic's specificity weight
];
