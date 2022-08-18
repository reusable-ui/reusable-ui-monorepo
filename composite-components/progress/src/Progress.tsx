// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    fallbacks,
    
    
    
    // styles:
    style,
    vars,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    // utilities:
    CssVars,
    cssVars,
}                           from '@cssfn/css-vars'              // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesBackground,
}                           from '@reusable-ui/background'      // background stuff of UI
import {
    // hooks:
    usesAnimation,
}                           from '@reusable-ui/animation'       // animation stuff of UI

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    defaultInlineOrientationableOptions,
    usesOrientationable,
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    listItemElm,
    usesListLayout,
    usesListBasicVariants,
    ListBasicStyle,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
export const defaultOrientationableOptions = defaultInlineOrientationableOptions;



// hooks:

// features:

//#region progressBar
export interface ProgressBarVars {
    /**
     * ProgressBar's thumb ratio.
     */
    valueRatio : any
}
const [progressBarVars] = cssVars<ProgressBarVars>({ minify: false, prefix: 'progressBar' }); // do not minify to make sure `style={{ --progressBar-valueRatio: ... }}` is the same between in server



export interface ProgressBarStuff { progressBarRule: Factory<CssRule>, progressBarVars: CssVars<ProgressBarVars> }
export interface ProgressBarConfig {
    valueRatio ?: number
}
/**
 * Uses progressBar variables.
 * @param config  A configuration of `progressBarRule`.
 * @returns A `ProgressBarStuff` represents the progressBar rules.
 */
export const usesProgressBar = (config?: ProgressBarConfig): ProgressBarStuff => {
    return {
        progressBarRule: () => style({
            ...vars({
                // variables:
                [progressBarVars.valueRatio] : config?.valueRatio,
            }),
        }),
        progressBarVars,
    };
};
//#endregion progressBar


// states:

//#region runnable
export interface RunnableVars {
    /**
     * final animation for the progressbar element.
     */
    anim : any
}
const [runnableVars] = cssVars<RunnableVars>();



export const ifNotRunning = (styles: CssStyleCollection) => rule(':not(.running)', styles);
export const ifRunning    = (styles: CssStyleCollection) => rule(     '.running' , styles);



export interface RunnableStuff { runnableRule: Factory<CssRule>, runnableVars: CssVars<RunnableVars> }
export interface RunnableConfig {
    animRunning ?: CssKnownProps['animation']
}
/**
 * Adds a capability of UI to animate to indicate a running state.
 * @param config  A configuration of `runnableRule`.
 * @returns A `RunnableStuff` represents a runnable state.
 */
export const usesRunnable = (config?: RunnableConfig): RunnableStuff => {
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    return {
        runnableRule: () => style({
            ...imports([
                // features:
                animationRule,
            ]),
            
            
            
            // reset functions:
            // declare default values at lowest specificity:
            ...fallbacks({
                ...vars({
                    [runnableVars.anim] : animationVars.animNone,
                }),
            }),
            
            
            
            ...states([
                ifRunning({
                    ...vars({
                        [runnableVars.anim] : config?.animRunning,
                    }),
                }),
            ]),
        }),
        runnableVars,
    };
};



export interface RunnableProps {
    // states:
    running ?: boolean
}
export const useRunnable = ({running}: RunnableProps) => ({
    class: running ? 'running' : null,
});
//#endregion runnable



// styles:
export const usesProgressLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    options = orientationableStuff;
    
    
    
    // dependencies:
    
    // features:
    const {backgroundVars} = usesBackground();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesListLayout(options),
        ]),
        ...style({
            // layouts:
            ...ifOrientationInline({ // inline
                display    : 'flex',        // use block flexbox, so it takes the entire parent's width
            }),
            ...ifOrientationBlock({  // block
                display    : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
            }),
            justifyContent : 'start',       // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            
            
            
            // backgrounds:
            backg          : backgroundVars.altBackgColor,
            
            
            
            // customize:
            ...usesCssProps(progresses),     // apply config's cssProps
            ...ifOrientationInline({ // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(progresses, usesSuffixedProps(progresses, 'inline')),
            }),
            ...ifOrientationBlock({  // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(progresses, usesSuffixedProps(progresses, 'block')),
            }),
        }),
    });
};
export const usesProgressVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(progresses);
    
    
    
    return style({
        ...imports([
            // variants:
            usesBasicVariants(),
            usesListBasicVariants(),
            resizableRule,
        ]),
    });
};

export const useProgressStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesProgressLayout(),
        
        // variants:
        usesProgressVariants(),
    ]),
}), { id: 'vcm24axqvn' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export type ProgressStyle = ListBasicStyle // might be added more styles in the future
export interface ProgressVariant {
    progressStyle ?: ProgressStyle
}
export const useProgressVariant = (props: ProgressVariant) => {
    return {
        class: props.progressStyle ?? null,
    };
};



export type ProgressBarStyle = 'striped' // might be added more styles in the future
export interface ProgressBarVariant {
    progressBarStyle ?: ProgressBarStyle
}
export const useProgressBarVariant = (props: ProgressBarVariant) => {
    return {
        class: props.progressBarStyle ?? null,
    };
};



// configs:
export const [progresses, progressValues, cssProgressConfig] = cssConfig(() => {
    return {
        // TODO: add config
    };
}, { prefix: 'lb' });



// react components:
export interface ProgressProps<TElement extends Element = HTMLSpanElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // variants:
        ProgressVariant
{
    // children:
    children ?: React.ReactNode
}
const Progress = <TElement extends Element = HTMLSpanElement>(props: ProgressProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet      = useProgressStyleSheet();
    
    
    
    // variants:
    const progressVariant = useProgressVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        progressStyle : _progressStyle, // remove
    ...restBasicProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        progressVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // semantics:
            
            
            
            // variants:
            theme={props.theme ?? 'secondary'}
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Progress,
    Progress as default,
}
