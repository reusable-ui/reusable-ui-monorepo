// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // hooks:
    WindowResizeCallback,
    useWindowResizeObserver,
}                           from './dimensions.js'



// react components:
export interface WindowResponsiveProps {
    // behaviors:
    mediaMinWidth : number
    
    
    
    // children:
    children      : React.ReactNode | ((expanded: boolean) => React.ReactNode);
}
const WindowResponsive = ({mediaMinWidth, children: childrenFn}: WindowResponsiveProps): JSX.Element|null => {
    // states:
    const [expanded, setExpanded] = useState<boolean>(mediaMinWidth === 0); // initially expanded if (mediaMinWidth === 0); otherwise initially collapsed
    
    
    
    // dom effects:
    const handleWindowResize = useEvent<WindowResizeCallback>(({inlineSize: mediaCurrentWidth}) => {
        const newExpanded = (mediaCurrentWidth >= mediaMinWidth);
        if (expanded === newExpanded) return;
        setExpanded(newExpanded);
    });
    useWindowResizeObserver(handleWindowResize);
    
    
    
    // jsx:
    return (
        <>{
            (typeof(childrenFn) !== 'function')
            ?
            childrenFn
            :
            childrenFn(expanded)
        }</>
    );
};
export {
    WindowResponsive,
    WindowResponsive as default,
}
