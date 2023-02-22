// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // shows the UI as clicked when activated:
    usesActiveAsClick,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
}                           from '@reusable-ui/indicator'       // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // styles:
    inheritBorderFromParent,
}                           from './sharedStyles.js'
import {
    // configs:
    lists,
    cssListConfig,
}                           from './config.js'



// styles:
export const usesListItemBaseLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    /*
        a hack with :not(_)
        the total selector combined with parent is something like this: `:not(.inline)>*>.listItem:not(_)`, the specificity weight = 2.1
        the specificity of 2.1 is a bit higher than:
        * `.list.content`               , the specificity weight = 2
        * `.someComponent.toggleButton` , the specificity weight = 2
        but can be easily overriden by specificity weight >= 3, like:
        * `.list.button.button`         , the specificity weight = 3
        * `.someComponent.boo.foo`      , the specificity weight = 3
    */
    const parentOrientationInlineSelector = `${orientationInlineSelector}>*>&:not(_)`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }>*>&:not(_)`;
    
    
    
    // dependencies:
    
    // features:
    const {separatorRule} = usesGroupable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
        itemsSelector             : '*', // select <ListItem> & <foreign-elm>
    });
    
    
    
    return style({
        // borders:
        /*
            Accordion supports: a separator between Accordion's header & body.
        */
        ...separatorRule, // turns the current border as separator between <ListItem> & <foreign-elm>
        
        
        
        // layouts:
        ...style({
            // spacings:
            margin: 0, // a fix for marginBlockEnd of <h1>...<h6>
        }),
    });
};

export const usesListItemSelfLayout = memoizeStyle(() => {
    return style({
        // layouts:
        display   : 'block',  // fills the entire wrapper's width
        
        
        
        // sizes:
        flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(lists, 'item')), // apply config's cssProps starting with item***
        
        
        
        // animations:
        ...style({
            transition : [
                // original:
                [lists.itemTransition],
                
                // overwrites:
                
                // borders:
                ['border-width', '0s'], // does not support transition on border width, because we use it to make a separator
            ],
        }),
    });
}, cssListConfig.onChange);

export const usesListItemLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    options = orientationableStuff;
    
    
    
    return style({
        // layouts:
        ...usesIndicatorLayout(),
        ...inheritBorderFromParent(),
        ...usesListItemBaseLayout(options), // must be placed at the last
        ...usesListItemSelfLayout(),        // must be placed at the last
    });
};

export const usesListItemVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(usesPrefixedProps(lists, 'item'));
    
    
    
    return style({
        // variants:
        ...usesIndicatorVariants(),
        ...resizableRule(),
    });
}, cssListConfig.onChange);

export const usesListItemStates = () => {
    // dependencies:
    
    // states:
    const {activeAsClickRule} = usesActiveAsClick();
    
    
    
    return style({
        // states:
        ...usesIndicatorStates(),
        ...activeAsClickRule(),
    });
};

export default () => style({
    // layouts:
    ...usesListItemLayout(),
    
    // variants:
    ...usesListItemVariants(),
    
    // states:
    ...usesListItemStates(),
});
