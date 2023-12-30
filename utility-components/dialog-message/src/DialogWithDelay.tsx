// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
    useEffect,
}                           from 'react'

// internals:
import type {
    // types:
    ModalExpandedChangeWithAnswerEvent,
    ModalBaseProps,
}                           from './types.js'



// react components:
export interface DialogWithDelayProps<TElement extends Element = HTMLElement, TAnswer extends any = 'ok', TModalExpandedChangeEvent extends ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'> = ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'>>
    extends
        // bases:
        ModalBaseProps<TElement, TModalExpandedChangeEvent>
{
    // components:
    modalComponent : React.ReactComponentElement<any, ModalBaseProps<TElement, TModalExpandedChangeEvent>>
}
const DialogWithDelay = <TElement extends Element = HTMLElement, TAnswer extends any = 'ok', TModalExpandedChangeEvent extends ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'> = ModalExpandedChangeWithAnswerEvent<TAnswer|'ok'>>(props: DialogWithDelayProps<TElement, TAnswer, TModalExpandedChangeEvent>): JSX.Element|null => {
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
