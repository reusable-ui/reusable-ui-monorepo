// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useMergeClasses,
    useMergeStyles,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    Generic,
}                           from '@reusable-ui/generic'         // a complement component
import {
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'
import {
    // features:
    usesProgressBar,
}                           from './features/progressBar.js'
import {
    // variants:
    ProgressVariant,
    useProgressVariant,
}                           from './variants/ProgressVariant'
import {
    // variants:
    ProgressBarVariant,
    useProgressBarVariant,
}                           from './variants/ProgressBarVariant'
import {
    // states:
    RunnableProps,
    useRunnable,
}                           from './states/runnable.js'



// styles:
export const useProgressStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/progressStyles.js')
, { id: 'vcm24axqvn' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useProgressBarStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/progressBarStyles.js')
, { specificityWeight: 2, id: 'ymt3ybn64g' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
