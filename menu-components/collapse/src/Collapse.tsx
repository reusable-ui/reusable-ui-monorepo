// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
    useState,
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
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
    
    
    
    // a capability of UI to float/overlay on the top/beside the another UI:
    FloatableProps,
    useFloatable,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    CollapsibleProps,
    useCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    ElementResizeCallback,
    useElementResizeObserver,
}                           from '@reusable-ui/dimensions'      // a set of React helper for fetching the dimension of elements

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'
import {
    // features:
    usesCollapse,
}                           from './features/collapse.js'



// styles:
export const useCollapseStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'gh2oi6zjs0' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface CollapseProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        GenericProps<TElement>,
        
        // capabilities:
        FloatableProps,
        
        // variants:
        OrientationableProps,
        
        // states:
        CollapsibleProps<TExpandedChangeEvent>
{
    // behaviors:
    lazy     ?: boolean
    
    
    
    // children:
    children ?: React.ReactNode
}
const Collapse = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: CollapseProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet             = useCollapseStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    
    
    
    // states:
    const collapsibleState       = useCollapsible<TElement, TExpandedChangeEvent>(props);
    const isVisible              = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const isFullyExpanded        = collapsibleState.class === 'expanded';
    const isFullyCollapsed       = !collapsibleState.class;
    
    const lastKnownSize          = useRef<ResizeObserverSize|undefined>(undefined);
    const [lastKnownExpandedSize, setLastKnownExpandedSize] = useState<ResizeObserverSize|undefined>(undefined);
    
    
    
    // capabilities:
    const floatable              = useFloatable<TElement>(props, isVisible);
    
    
    
    // rest props:
    const {
        // behaviors:
        lazy               = false,
        
        
        
        // variants:
        orientation        : _orientation,        // remove
        
        
        
        // states:
        expanded           : _expanded,           // remove
        
        
        
        // floatable:
        floatingOn         : _floatingOn,         // remove
        floatingPlacement  : _floatingPlacement,  // remove
        floatingMiddleware : _floatingMiddleware, // remove
        floatingStrategy   : _floatingStrategy,   // remove
        
        floatingAutoFlip   : _floatingAutoFlip,   // remove
        floatingAutoShift  : _floatingAutoShift,  // remove
        floatingOffset     : _floatingOffset,     // remove
        floatingShift      : _floatingShift,      // remove
        
        onFloatingUpdate   : _onFloatingUpdate,   // remove
        
        
        
        // children:
        children,
    ...restGenericProps} = props;
    
    
    
    // refs:
    const [collapseRefInternal, setCollapseRefInternal] = useState<TElement|null>(null);
    const mergedOuterRef = useMergeRefs<TElement>(
        // preserves the original `outerRef`:
        props.outerRef,
        
        
        
        floatable.outerRef,
        setCollapseRefInternal,
    );
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
    );
    const stateClasses   = useMergeClasses(
        // preserves the original `stateClasses`:
        props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    const classes        = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // capabilities:
        floatable.classes,
    );
    
    
    
    // features:
    const {collapseVars} = usesCollapse();
    
    
    
    // styles:
    const collapseSizeStyle = useMemo<React.CSSProperties>(() => ({
        // values:
        [
            collapseVars.lastKnownInlineSize
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : (lastKnownExpandedSize?.inlineSize !== undefined) ? `${lastKnownExpandedSize.inlineSize}px` : undefined,
        
        [
            collapseVars.lastKnownBlockSize
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : (lastKnownExpandedSize?.blockSize  !== undefined) ? `${lastKnownExpandedSize.blockSize}px`  : undefined,
    }), [collapseVars.lastKnownInlineSize, collapseVars.lastKnownBlockSize, lastKnownExpandedSize]);
    const mergedStyle       = useMergeStyles(
        // styles:
        collapseSizeStyle,
        
        
        
        // preserves the original `style` (can overwrite the `collapseSizeStyle`):
        props.style,
    );
    
    
    
    // handlers:
    const handleAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart`:
        props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    const handleCollapseResize = useEvent<ElementResizeCallback>((size) => {
        // conditions:
        if ((size.inlineSize) === 0 && (size.blockSize === 0)) return; // <Collapse> is *fully collapsed* => ignore
        if (lastKnownSize.current && (lastKnownSize.current.inlineSize === size.inlineSize) && (lastKnownSize.current.blockSize === size.blockSize)) return; // already the same => ignore
        
        
        
        // update:
        lastKnownSize.current = size;
        
        // re-render (if necessary):
        if (isFullyExpanded || isFullyCollapsed) { // not being animating => update the final known size
            setLastKnownExpandedSize(lastKnownSize.current);
            console.log('size: ', {isFullyExpanded, isFullyCollapsed, width: size.inlineSize, height: size.blockSize});
        } // if
    });
    
    
    
    // dom effects:
    useElementResizeObserver(collapseRefInternal as HTMLElement|null, handleCollapseResize); // assumes the size of <Collapse> uses `border-box`
    useEffect(() => {
        // conditions:
        if (!isFullyExpanded)       return; // <Collapse> is NOT *fully expanded* => ignore
        if (!lastKnownSize.current) return; // not already calculated => ignore
        if (lastKnownExpandedSize && (lastKnownExpandedSize.inlineSize === lastKnownSize.current.inlineSize) && (lastKnownExpandedSize.blockSize === lastKnownSize.current.blockSize)) return; // already the same => ignore
        
        
        
        // sync:
        setLastKnownExpandedSize(lastKnownSize.current);
        console.log('SYNC SYNC: ', {isFullyExpanded, isFullyCollapsed, width: lastKnownSize.current?.inlineSize, height: lastKnownSize.current?.blockSize});
    }, [lastKnownExpandedSize, isFullyExpanded])
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // refs:
            outerRef={mergedOuterRef}
            
            
            
            // semantics:
            // no need to set [aria-orientation], because the expand/collapse is for styling purpose:
            // aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            stateClasses={stateClasses}
            classes={classes}
            
            
            
            // styles:
            style={mergedStyle}
            
            
            
            // [open]:
            {...collapsibleState.props}
            
            
            
            // handlers:
            onAnimationStart = {handleAnimationStart}
            onAnimationEnd   = {handleAnimationEnd  }
        >
            { (!lazy || isVisible) && children }
        </Generic>
    );
};
export {
    Collapse,
    Collapse as default,
}



export interface CollapseComponentProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
{
    // components:
    collapseComponent ?: React.ReactComponentElement<any, CollapseProps<TElement, TExpandedChangeEvent>>
}
