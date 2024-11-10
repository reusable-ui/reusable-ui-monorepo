// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onListStylesChange,
    usesListItemLayout,
    usesListItemVariants,
    usesListItemStates,
}                           from '@reusable-ui/list'            // represents a series of content
import {
    // features:
    usesCollapse,
    
    
    
    // styles:
    onCollapseStylesChange,
    usesCollapseLayout,
    usesCollapseStates,
}                           from '@reusable-ui/collapse'        // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // configs:
    accordions,
    cssAccordionConfig,
}                           from './config.js'



// styles:

/*
    <AccordionItem> is a composite component made of
    <ListItem>
    and
    *modified* <Collapse>
*/

export const onAccordionItemStylesChange = watchChanges(onListStylesChange, onCollapseStylesChange, cssAccordionConfig.onChange);

export const usesAccordionItemLayout = (options?: OrientationableOptions) => {
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
    options = orientationableStuff;
    
    const orientationableStuff2 = usesOrientationable({
        orientationInlineSelector : parentOrientationInlineSelector,
        orientationBlockSelector  : parentOrientationBlockSelector,
    });
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff2;
    const options2 = orientationableStuff2;
    
    
    
    // dependencies:
    
    // features:
    const {collapseVars} = usesCollapse();
    
    
    
    return style({
        // layouts:
        ...usesCollapseLayout(options2), // `usesCollapseLayout` first then `usesListItemLayout`, so any conflict the `usesListItemLayout` wins
        ...usesListItemLayout(options), // the options are already handled internally by `usesListItemBaseLayout`
        ...style({
            // customize:
            ...usesCssProps(accordions), // apply config's cssProps
            ...ifOrientationInline({ // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(accordions, usesSuffixedProps(accordions, 'inline')),
            }),
            ...ifOrientationBlock({  // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(accordions, usesSuffixedProps(accordions, 'block')),
            }),
            
            
            
            // sizes:
            boxSizing                 : 'border-box', // the final size is including borders & paddings
            maxInlineSize             : '100%',       // the <AccordionItem>'s size is|may `fit-content` but up to the maximum available <Wrapper>'s width
            maxBlockSize              : '100%',       // the <AccordionItem>'s size is|may `fit-content` but up to the maximum available <Wrapper>'s height
            [collapseVars.inlineSize] : null,         // remove the custom prop definition from `usesCollapseLayout()`, because we redefined conditionally by 'inline|block' variants
            [collapseVars.blockSize ] : null,         // remove the custom prop definition from `usesCollapseLayout()`, because we redefined conditionally by 'inline|block' variants
            
            
            
            // variants:
            // we defined 'inline|block' variants here, instead of in `usesAccordionItemVariants`.
            // but it's ok since we decided the 'inline|block' variants are the mandatory option that should be selected.
            ...ifOrientationInline({ // inline
                // sizes:
                [collapseVars.inlineSize] : 'fit-content', // follows content's width  but up to `maxInlineSize`
                [collapseVars.blockSize ] : '100%',        // full height
            }),
            ...ifOrientationBlock({  // block
                // sizes:
                [collapseVars.inlineSize] : '100%',        // full width
                [collapseVars.blockSize ] : 'fit-content', // follows content's height but up to `maxBlockSize`
            }),
        }),
    });
};

export const usesAccordionItemVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(accordions);
    
    
    
    return style({
        // variants:
        ...usesListItemVariants(),
        ...resizableRule(),
    });
};

export const usesAccordionItemStates = () => {
    return style({
        // states:
        ...usesListItemStates(),
        ...usesCollapseStates(),
    });
};

export default () => style({
    // layouts:
    ...usesAccordionItemLayout(),
    
    // variants:
    ...usesAccordionItemVariants(),
    
    // states:
    ...usesAccordionItemStates(),
});
