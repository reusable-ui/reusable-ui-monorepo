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
    // features:
    usesProgressBar,
}                           from './features/progressBar.js'
import {
    // variants:
    ProgressBarVariant,
    useProgressBarVariant,
}                           from './variants/ProgressBarVariant.js'
import {
    // states:
    RunnableProps,
    useRunnable,
}                           from './states/runnable.js'
import {
    // utilities:
    calculateValues,
}                           from './utilities.js'



// styles:
export const useProgressBarStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/progressBarStyles.js')
, { specificityWeight: 2, id: 'ymt3ybn64g' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface ProgressBarProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>,
        
        // variants:
        ProgressBarVariant,
        
        // states:
        RunnableProps
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
