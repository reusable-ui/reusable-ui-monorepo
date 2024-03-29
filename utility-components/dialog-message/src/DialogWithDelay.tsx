// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useEffect,
}                           from 'react'

// reusable-ui components:
import type {
    // react components:
    ModalExpandedChangeEvent,
}                           from '@reusable-ui/modal'           // overlays a dialog to the entire site's page

// internals:
import type {
    // types:
    ModalBaseProps,
}                           from './types.js'



// react components:
export interface DialogWithDelayProps<TElement extends Element = HTMLElement, TData extends any = any, TModalExpandedChangeEvent extends ModalExpandedChangeEvent<TData> = ModalExpandedChangeEvent<TData>>
    extends
        // bases:
        ModalBaseProps<TElement, TModalExpandedChangeEvent>
{
    // components:
    modalComponent : React.ReactComponentElement<any, ModalBaseProps<TElement, TModalExpandedChangeEvent>>
}
const DialogWithDelay = <TElement extends Element = HTMLElement, TData extends any = any, TModalExpandedChangeEvent extends ModalExpandedChangeEvent<TData> = ModalExpandedChangeEvent<TData>>(props: DialogWithDelayProps<TElement, TData, TModalExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        modalComponent,
    ...restModalBaseProps} = props;
    
    
    
    // states:
    const [loaded, setLoaded] = useState<boolean>(false);
    
    
    
    // effects:
    useEffect(() => {
        // setups:
        let cancelRequest = requestAnimationFrame(() => {
            cancelRequest = requestAnimationFrame(() => {
                setLoaded(true);
            });
        });
        
        
        
        // cleanups:
        return () => {
            cancelAnimationFrame(cancelRequest);
        };
    }, []);
    
    
    
    // jsx:
    return React.cloneElement<ModalBaseProps<TElement, TModalExpandedChangeEvent>>(modalComponent,
        // props:
        {
            // other props:
            ...restModalBaseProps,
            ...modalComponent.props, // overwrites restModalBaseProps (if any conflics)
            
            
            
            // states:
            expanded : loaded && (modalComponent.props.expanded ?? props.expanded ?? false),
        },
    );
};
export {
    DialogWithDelay,
    DialogWithDelay as default,
}
