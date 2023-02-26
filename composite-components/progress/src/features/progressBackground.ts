// cssfn:
import {
    // writes css in javascript:
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    cssVars,
    switchOf,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a color management system:
    colors,
    
    
    
    // background stuff of UI:
    BackgroundStuff,
    BackgroundConfig,
    usesBackground,
    
    
    
    // outlined (background-less) variant of UI:
    usesOutlineable,
    
    
    
    // mild (soft color) variant of UI:
    usesMildable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// features:

//#region progressBackground
export interface ProgressBackgroundVars {
    mildAltBackgTg : any
}
const [progressBackgroundVars] = cssVars<ProgressBackgroundVars>();



export const usesProgressBackground = (config?: BackgroundConfig): BackgroundStuff => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground(config);
    
    // variants:
    const {outlineableVars} = usesOutlineable();
    const {mildableVars   } = usesMildable();
    
    
    
    return {
        backgroundRule: () => style({
            // features:
            ...backgroundRule(),
            
            
            
            // color functions:
            ...vars({
                // final color functions:
                [backgroundVars.altBackgColor  ] : switchOf(
                    outlineableVars.altBackgTg,            // toggle outlined (if `usesOutlineable()` applied)
                    progressBackgroundVars.mildAltBackgTg, // toggle <Progress>'s mild
                    
                    backgroundVars.altBackgColorFn,        // default => uses our `altBackgColorFn`
                ),
            }),
            
            
            
            // toggling functions:
            ...vars({
                [progressBackgroundVars.mildAltBackgTg] : [[
                    mildableVars.mildSw,  // the mild switching function
                    colors.backg,         // the remaining area should lighter than the <ProgressBar>
                ]],
            }),
        }),
        backgroundVars, // forwards the original variables
    }
};
//#endregion progressBackground
