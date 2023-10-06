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
    // a set of React node utility functions:
    flattenChildren,
    
    
    
    // react helper hooks:
    useMergeClasses,
    
    
    
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
}                           from './variants/ProgressVariant.js'
import {
    // utilities:
    calculateValues,
}                           from './utilities.js'
import {
    // styles:
    useProgressBarStyleSheet,
    
    
    
    // react components:
    ProgressBarProps,
}                           from './ProgressBar.js'



// styles:
export const useProgressStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/progressStyles.js')
, { id: 'vcm24axqvn' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



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
    
    
    
    // children:
    const [flattenedChildren, restProgressBar] = useMemo<readonly [React.ReactNode[], React.ReactNode]>(() => {
        const flattenedChildren = flattenChildren(children);
        
        
        
        // get the rest of (1 - sum(<ProgressBar>.valueRatio)):
        const restValueRatio = (
            1
            -
            Math.min((
                flattenedChildren
                .reduce<number>((accum, child) => { // sum the `valueRatio`(s)
                    // conditions:
                    if (!React.isValidElement<ProgressBarProps<Element>>(child)) return accum; // foreign component => not accumulated
                    
                    
                    
                    // fn props:
                    const {valueRatio} = calculateValues<Element>(child.props);
                    
                    
                    
                    // accumulate the `valueRatio`:
                    return accum + valueRatio;
                }, /*initialAccum = */0)
            ), 1) // trim to 1 if the total > 1
        );
        
        
        
        // jsx:
        return [
            (isOrientationBlock ? flattenedChildren.reverse() : flattenedChildren),
            <Generic
                // semantics:
                aria-hidden={true} // just a dummy element, no meaningful content here
                
                
                
                // classes:
                mainClass={barStyleSheet.main}
                
                
                
                // styles:
                style={{ // the inline style is implicitly memorized because the whole <Generic> is inside `useMemo()`
                    // values:
                    [
                        progressBarVars.valueRatio
                        .slice(4, -1) // fix: var(--customProp) => --customProp
                    ] : restValueRatio,
                }}
            />,
        ];
    }, [isOrientationBlock, children]);
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? ''     } // no corresponding semantic tag => defaults to <div>
            semanticRole = {props.semanticRole ?? 'group'} // uses [role="group"] as the default semantic role
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        >
            { isOrientationBlock ? restProgressBar : null }
            { flattenedChildren }
            { isOrientationBlock ? null : restProgressBar }
        </Basic>
    );
};
export {
    Progress,
    Progress as default,
}
