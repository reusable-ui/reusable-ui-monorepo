// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
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
    usesListItemBaseLayout,
}                           from '@reusable-ui/list'            // represents a series of content

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // configs:
    groups,
    cssGroupConfig,
}                           from './config.js'



// styles:
export const onGroupItemStylesChange = watchChanges(cssGroupConfig.onChange);

export const usesGroupItemLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    options = orientationableStuff;
    
    
    
    return style({
        // layouts:
        ...usesListItemBaseLayout(options),
        ...style({
            // no layout modification needed.
            // the layout is belong to the <Button>/<Radio>/<Check> itself.
            
            
            
            // sizes:
            // just a few tweak:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesCssProps(groups), // apply config's cssProps
        }),
    });
};

export const usesGroupItemVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(groups);
    
    
    
    return style({
        // variants:
        ...resizableRule(),
    });
};

export default () => style({
    // layouts:
    ...usesGroupItemLayout(),
    
    // variants:
    ...usesGroupItemVariants(),
});
