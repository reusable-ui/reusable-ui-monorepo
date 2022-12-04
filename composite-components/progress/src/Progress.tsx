// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    variants,
    states,
    keyframes,
    fallbacks,
    children,
    style,
    vars,
    imports,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
    switchOf,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
    usesPrefixedProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a color management system:
    colors,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // react helper hooks:
    useMergeClasses,
    useMergeStyles,
    
    
    
    // background stuff of UI:
    BackgroundStuff,
    BackgroundConfig,
    usesBackground,
    
    
    
    // foreground (text color) stuff of UI:
    usesForeground,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    defaultInlineOrientationableOptions,
    usesOrientationable,
    OrientationableProps,
    useOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // gradient variant of UI:
    usesGradientable,
    
    
    
    // outlined (background-less) variant of UI:
    usesOutlineable,
    
    
    
    // mild (soft color) variant of UI:
    usesMildable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    Generic,
}                           from '@reusable-ui/generic'         // a complement component
import {
    // styles:
    usesBasicLayout,
    usesBasicVariants,
    
    
    
    // configs:
    basics,
    basicValues,
    
    
    
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
const _defaultProgressStyle    : ProgressStyle    = 'regular'
const _defaultProgressBarStyle : ProgressBarStyle = 'regular'



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
    barAnimRunning ?: CssKnownProps['animation']
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
                        [runnableVars.anim] : config?.barAnimRunning,
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



// configs:
export const [progresses, progressValues, cssProgressConfig] = cssConfig(() => {
    //#region keyframes
    const [keyframesItemRunningRule, keyframesItemRunning] = keyframes({
        from  : {
            backgroundPositionX : ['1rem', 0],
        },
        to    : {
            backgroundPositionX : [0, 0],
        },
    });
    keyframesItemRunning.value = 'running'; // the @keyframes name should contain 'running' in order to be recognized by `useRunnable`
    
    
    
    const [keyframesItemRunningBlockRule, keyframesItemRunningBlock] = keyframes({
        from  : {
            backgroundPositionY : ['1rem', 0],
        },
        to    : {
            backgroundPositionY : [0, 0],
        },
    });
    keyframesItemRunningBlock.value = 'runningBlock'; // the @keyframes name should contain 'running' in order to be recognized by `useRunnable`
    //#endregion keyframes
    
    
    
    return {
        // sizes:
        minInlineSize            : '8rem'       as CssKnownProps['minInlineSize'], // fills the entire parent's width:
        minBlockSize             : 'auto'       as CssKnownProps['minBlockSize' ], // depends on ProgressBar's height
        
        minInlineSizeBlock       : 'auto'       as CssKnownProps['minInlineSize'], // depends on ProgressBar's width
        minBlockSizeBlock        : '8rem'       as CssKnownProps['minBlockSize' ], // manually set the min height
        
        
        
        // backgrounds:
        backgGrad      : basics.backgGrad       as CssKnownProps['backgroundImage'],
        backgGradBlock : (() => {
            const value = [[...(basicValues.backgGrad as Extract<CssKnownProps['backgroundImage'], any[][]>)[0]]] as Extract<CssKnownProps['backgroundImage'], any[][]>;
            value[0][0] = value[0][0].toString().replace('180deg', '270deg');
            return value;
        })()                                    as CssKnownProps['backgroundImage'],
        
        barBackgStripedImg       : 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)'   as CssKnownProps['backgroundImage'],
        barBackgStripedWidth     : '1rem'       as CssKnownProps['backgroundSize' ],
        barBackgStripedWidthSm   : '0.25rem'    as CssKnownProps['backgroundSize' ],
        barBackgStripedWidthLg   : '3rem'       as CssKnownProps['backgroundSize' ],
        barBackgStripedHeight    : '1rem'       as CssKnownProps['backgroundSize' ],
        barBackgStripedHeightSm  : '0.25rem'    as CssKnownProps['backgroundSize' ],
        barBackgStripedHeightLg  : '3rem'       as CssKnownProps['backgroundSize' ],
        
        
        
        barBoxSizing             : 'border-box' as CssKnownProps['boxSizing'    ], // the final size is including borders & paddings
        
        barMinInlineSize         : 'unset'      as CssKnownProps['minInlineSize'],
        barMinBlockSize          : spacers.md   as CssKnownProps['minBlockSize' ],
        barMinBlockSizeSm        : spacers.xs   as CssKnownProps['minBlockSize' ],
        barMinBlockSizeLg        : spacers.xl   as CssKnownProps['minBlockSize' ],
        
        barMinBlockSizeBlock     : 'unset'      as CssKnownProps['minBlockSize' ],
        barMinInlineSizeBlock    : spacers.md   as CssKnownProps['minInlineSize'],
        barMinInlineSizeBlockSm  : spacers.xs   as CssKnownProps['minInlineSize'],
        barMinInlineSizeBlockLg  : spacers.xl   as CssKnownProps['minInlineSize'],
        
        
        
        // spacings:
        barPaddingInline         : '0px'        as CssKnownProps['paddingInline'],
        barPaddingBlock          : '0px'        as CssKnownProps['paddingBlock' ],
        
        
        
        // animations:
        ...keyframesItemRunningRule,
        ...keyframesItemRunningBlockRule,
        barAnimRunning           : [
            ['1000ms', 'linear', 'both', 'infinite', keyframesItemRunning]
        ]                                       as CssKnownProps['animation'],
        barAnimRunningBlock      : [
            ['1000ms', 'linear', 'both', 'infinite', keyframesItemRunningBlock]
        ]                                       as CssKnownProps['animation'],
    };
}, { prefix: 'prgs' });



// styles:
export type ProgressStyle = ListBasicStyle // might be added more styles in the future
export interface ProgressVariant {
    progressStyle ?: ProgressStyle
}
export const useProgressVariant = ({progressStyle = _defaultProgressStyle}: ProgressVariant) => {
    return {
        class: (progressStyle === 'regular') ? null : progressStyle,
    };
};



interface ProgressBackgroundVars {
    mildAltBackgTg : any
}
const [progressBackgroundVars] = cssVars<ProgressBackgroundVars>();



const usesProgressBackground = (config?: BackgroundConfig): BackgroundStuff => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground(config);
    
    // variants:
    const {outlineableVars} = usesOutlineable();
    const {mildableVars   } = usesMildable();
    
    
    
    return {
        backgroundRule: () => style({
            ...imports([
                backgroundRule,
            ]),
            
            
            
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
        backgroundVars,
    }
};
export const usesProgressLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    options = orientationableStuff;
    
    
    
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesProgressBackground();
    const {foregroundRule, foregroundVars} = usesForeground();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesListLayout(options),
            
            // features:
            backgroundRule,
            foregroundRule,
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
            backg          : backgroundVars.altBackg, // the remaining area should lighter than the <ProgressBar>
            
            
            
            // foregrounds:
            foreg          : foregroundVars.foreg,
            
            
            
            // customize:
            ...usesCssProps(progresses), // apply config's cssProps
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
    const {resizableRule   } = usesResizable(progresses);
    const {gradientableRule} = usesGradientable(progresses);
    
    
    
    return style({
        ...imports([
            // variants:
            
            /* the most general variants: */
            usesListBasicVariants(),
            
            /* the king variants: */
            usesBasicVariants(),
            resizableRule,
            gradientableRule,
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



export type ProgressBarStyle = 'regular'|'striped' // might be added more styles in the future
export interface ProgressBarVariant {
    progressBarStyle ?: ProgressBarStyle
}
export const useProgressBarVariant = ({progressBarStyle = _defaultProgressBarStyle}: ProgressBarVariant) => {
    return {
        class: (progressBarStyle === 'regular') ? null : progressBarStyle,
    };
};



export const usesProgressBarLayout = () => {
    // dependencies:
    
    // features:
    const {                 borderVars     } = usesBorder();
    const {progressBarRule, progressBarVars} = usesProgressBar();
    
    
    
    return style({
        // sizes:
        flex     : [[progressBarVars.valueRatio, progressBarVars.valueRatio, 0]], // growable, shrinkable, initial from 0 width; using `valueRatio` for the grow/shrink ratio
        overflow : 'hidden',
        
        
        
        // children:
        ...children(listItemElm, {
            ...imports([
                // layouts:
                usesBasicLayout(),
                
                // features:
                progressBarRule,
            ]),
            ...style({
                // layouts:
                display        : 'flex',   // fills the entire wrapper's width
                flexDirection  : 'row',    // items are stacked horizontally
                justifyContent : 'center', // center items (text, icon, etc) horizontally
                alignItems     : 'center', // center items (text, icon, etc) vertically
                flexWrap       : 'nowrap', // no wrapping
                
                
                
                // borders:
                [borderVars.borderWidth           ] : '0px', // discard border
                // remove rounded corners on top:
                [borderVars.borderStartStartRadius] : '0px',
                [borderVars.borderStartEndRadius  ] : '0px',
                // remove rounded corners on bottom:
                [borderVars.borderEndStartRadius  ] : '0px',
                [borderVars.borderEndEndRadius    ] : '0px',
                
                
                
                // sizes:
                flex : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(progresses, 'bar')), // apply config's cssProps starting with bar***
            }),
        }),
    });
};
export const usesProgressBarVariants = () => {
    // dependencies:
    
    // features:
    const {backgroundVars} = usesBackground();
    
    
    
    return style({
        ...variants([
            rule('.striped', {
                // children:
                ...children(listItemElm, {
                    // backgrounds:
                    backg : [
                        // layering: backg1 | backg2 | backg3 ...
                        
                        // top layer:
                        `${progresses.barBackgStripedImg} left/${progresses.barBackgStripedWidth} ${progresses.barBackgStripedHeight}`,
                        
                        // bottom layer:
                        backgroundVars.backg,
                    ],
                }),
            }),
        ]),
    });
};
export const usesProgressBarStates = () => {
    // dependencies:
    
    // states:
    const {runnableRule, runnableVars} = usesRunnable(progresses);
    
    
    
    return style({
        ...imports([
            // states:
            runnableRule,
        ]),
        ...style({
            // children:
            ...children(listItemElm, {
                // animations:
                anim  : runnableVars.anim,
            }),
        }),
    });
};

export const useProgressBarStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesProgressBarLayout(),
        
        // variants:
        usesProgressBarVariants(),
        
        // states:
        usesProgressBarStates(),
    ]),
}), { specificityWeight: 2, id: 'ymt3ybn64g' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// utilities:
const calculateValues = <TElement extends Element = HTMLElement>(props: ProgressBarProps<TElement>) => {
    // fn props:
    const valueFn    : number  = props.value ?? 0;
    const minFn      : number  = props.min   ?? 0;
    const maxFn      : number  = props.max   ?? 100;
    const negativeFn : boolean = (maxFn < minFn);
    const valueRatio : number  = (valueFn - minFn) / (maxFn - minFn);
    
    
    
    return {
        valueFn,
        minFn,
        maxFn,
        negativeFn,
        valueRatio,
    };
};



// react components:
export interface ProgressProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // variants:
        OrientationableProps,
        ProgressVariant
{
    // children:
    children ?: React.ReactNode
}
const Progress = <TElement extends Element = HTMLElement>(props: ProgressProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useProgressStyleSheet();
    const barStyleSheet          = useProgressBarStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const isOrientationBlock     = orientationableVariant.isOrientationBlock;
    const progressVariant        = useProgressVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        orientation   : _orientation,   // remove
        progressStyle : _progressStyle, // remove
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
        progressVariant.class,
    );
    
    
    
    // features:
    const {progressBarVars} = usesProgressBar();
    
    
    
    // jsx:
    // get the (1 - sum(<ProgressBar>.valueRatio)):
    const remainingValueRatio = 1 - Math.min((
        React.Children.toArray(children).map((child) => {
            // <ProgressBar> component:
            if (React.isValidElement<ProgressBarProps<Element>>(child)) {
                // fn props:
                const {valueRatio} = calculateValues<Element>(child.props);
                return valueRatio;
            }// if
            
            
            
            // foreign component:
            return 0;
        })
        .reduce((accum, valueRatio) => accum + valueRatio, /*initialAccum = */0) // sum
    ), 1); // trim to 1 if the total > 1
    
    const restProgressBar = useMemo((): JSX.Element => {
        return (
            <Generic
                // semantics:
                aria-hidden={true} // just a dummy element, no meaningful content here
                
                
                
                // classes:
                mainClass={barStyleSheet.main}
                
                
                
                // styles:
                style={{
                    // values:
                    [
                        progressBarVars.valueRatio
                        .slice(4, -1) // fix: var(--customProp) => --customProp
                    ] : remainingValueRatio,
                }}
            />
        )
    }, [remainingValueRatio]);
    
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? 'group'}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        >
            { isOrientationBlock ? restProgressBar : null }
            { isOrientationBlock ? React.Children.toArray(children).slice().reverse() : children }
            { isOrientationBlock ? null : restProgressBar }
        </Basic>
    );
};
export {
    Progress,
    Progress as default,
}



export interface ProgressBarProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // states:
        RunnableProps,
        
        // variants:
        ProgressBarVariant
{
    // values:
    value ?: number
    min   ?: number
    max   ?: number
}
export const ProgressBar = <TElement extends Element = HTMLElement>(props: ProgressBarProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useProgressBarStyleSheet();
    
    
    
    // variants:
    const progressBarVariant = useProgressBarVariant(props);
    
    
    
    // states:
    const runnableState      = useRunnable(props);
    
    
    
    // rest props:
    const {
        // variants:
        progressBarStyle : _progressBarStyle, // remove
        
        
        
        // states:
        running          : _running,          // remove
        
        
        
        // values:
        value : _value, // remove
        min   : _min,   // remove
        max   : _max,   // remove
    ...restBasicProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        progressBarVariant.class,
    );
    const stateClasses   = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        runnableState.class,
    );
    
    
    
    // fn props:
    const {
        valueFn,
        minFn,
        maxFn,
        negativeFn,
        valueRatio,
    } = calculateValues<TElement>(props);
    
    
    
    // features:
    const {progressBarVars} = usesProgressBar();
    
    
    
    // styles:
    const valueRatioStyle = useMemo<React.CSSProperties>(() => ({
        // values:
        [
            progressBarVars.valueRatio
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : valueRatio,
    }), [valueRatio]);
    const mergedStyle     = useMergeStyles(
        // values:
        valueRatioStyle,
        
        
        
        // preserves the original `style` (can overwrite the `valueRatioStyle`):
        props.style,
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // semantics:
            semanticRole={props.semanticRole ?? 'progressbar'}
            
            aria-valuenow={props['aria-valuenow'] ?? valueFn}
            aria-valuemin={props['aria-valuemin'] ?? (negativeFn ? maxFn : minFn)}
            aria-valuemax={props['aria-valuemax'] ?? (negativeFn ? minFn : maxFn)}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            stateClasses={stateClasses}
            
            
            
            // styles:
            style={mergedStyle}
        >
            <Basic<TElement>
                // other props:
                {...restBasicProps}
                
                
                
                // variants:
                mild={props.mild ?? 'inherit'}
            />
        </Generic>
    );
};
