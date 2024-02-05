// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    EventHandler,
}                           from '@reusable-ui/hooks'           // react helper hooks



// hooks:

// capabilities:

//#region pointer capturable
export interface PointerCapturableProps {
    // states:
    enabled ?: boolean
    
    
    
    // handlers:
    onPointerCaptureStart  ?: (event: MouseEvent) => void
    onPointerCaptureEnd    ?: (event: MouseEvent) => void
    onPointerCaptureCancel ?: (event: MouseEvent) => void
    onPointerCaptureMove    : (event: MouseEvent) => void
}
export interface PointerCapturableApi<TElement extends Element = HTMLElement> {
    // handlers:
    handleMouseDown  : React.MouseEventHandler<TElement>
    handleTouchStart : React.TouchEventHandler<TElement>
}
export const usePointerCapturable = <TElement extends Element = HTMLElement>(props: PointerCapturableProps): PointerCapturableApi<TElement> => {
    // props:
    const {
        // states:
        enabled = true,
        
        
        
        // handlers:
        onPointerCaptureStart,
        onPointerCaptureEnd,
        onPointerCaptureCancel,
        onPointerCaptureMove,
    } = props;
    
    
    
    
    // handlers:
    const isMouseActive           = useRef<boolean>(false);
    const isTouchActive           = useRef<boolean>(false);
    const lastPointerStatusEvent  = useRef<MouseEvent|TouchEvent|undefined>(undefined);
    const handlePointerStatus     = useEvent((event: MouseEvent|TouchEvent|undefined): void => {
        // updates:
        if (event) {
            lastPointerStatusEvent.current = event;
        }
        else {
            event = lastPointerStatusEvent.current;
        } // if
        
        
        
        // actions:
        if (
            (!isMouseActive.current && !isTouchActive.current) // both mouse & touch are inactive
            ||
            ( isMouseActive.current &&  isTouchActive.current) // both mouse & touch are active
        ) {
            if (watchGlobalPointer(false) === false) { // unwatch global mouse/touch move
                if (onPointerCaptureEnd || onPointerCaptureCancel) {
                    const isCanceled = (
                        !enabled // canceled by disabled
                        ||
                        !event   // canceled by unknown event
                        ||
                        (
                            (
                                ((event as MouseEvent|null)?.buttons ?? 0)
                                +
                                ((event as TouchEvent|null)?.touches?.length ?? 0)
                            )
                            > 1  // canceled by pressed_mouse_nonprimary_button and/or multiple touched_screen
                        )
                    );
                    const mouseEvent : MouseEvent = (
                        (event && ('buttons' in event))
                        ? event
                        // simulates the Touch(Start|End|Cancel) as Mouse(Down|Up):
                        : new MouseEvent((event?.type === 'touchstart') ? 'mousedown' : 'mouseup', {
                            ...event,
                            ...(() => {
                                const isTouchStart = event?.type === 'touchstart';
                                const touch        = isTouchStart ? event?.touches?.[0] : event?.changedTouches?.[0];
                                return {
                                    clientX : touch?.clientX ?? 0,
                                    clientY : touch?.clientY ?? 0,
                                    
                                    screenX : touch?.screenX ?? 0,
                                    screenY : touch?.screenY ?? 0,
                                    
                                    pageX   : touch?.pageX   ?? 0,
                                    pageY   : touch?.pageY   ?? 0,
                                    
                                    button  : isTouchStart ? 1 : 0, // if touched: simulates primary button (usually the left button), otherwise simulates no button pressed
                                    buttons : isTouchStart ? 1 : 0, // if touched: simulates primary button (usually the left button), otherwise simulates no button pressed
                                };
                            })(),
                        })
                    );
                    if (isCanceled) {
                        onPointerCaptureCancel?.(mouseEvent);
                    }
                    else {
                        onPointerCaptureEnd?.(mouseEvent);
                    } // if
                } // if
            } // if
            
            
            
            lastPointerStatusEvent.current = undefined; // clear the last pointer status event
        } // if
    });
    const handleMouseStatusNative = useEvent<EventHandler<MouseEvent>>((event) => {
        // actions:
        isMouseActive.current = enabled && (
            (event.buttons === 1) // only left button pressed, ignore multi button pressed
        );
        handlePointerStatus(event); // update pointer status
    });
    const handleMouseActive       = useEvent<React.MouseEventHandler<TElement>>((event) => {
        handleMouseStatusNative(event.nativeEvent);
    });
    const handleTouchStatusNative = useEvent<EventHandler<TouchEvent>>((event) => {
        // actions:
        isTouchActive.current = enabled && (
            (event.touches.length === 1) // only single touch
        );
        handlePointerStatus(event); // update pointer status
    });
    const handleTouchActive       = useEvent<React.TouchEventHandler<TElement>>((event) => {
        handleTouchStatusNative(event.nativeEvent);
    });
    
    const handleMouseMoveNative   = useEvent<EventHandler<MouseEvent>>(async (event) => {
        // conditions:
        // one of the mouse or touch is active but not both are active:
        if (
            (!isMouseActive.current && !isTouchActive.current) // both mouse & touch are inactive
            ||
            ( isMouseActive.current &&  isTouchActive.current) // both mouse & touch are active
        ) return;
        
        
        
        if (watchGlobalPointer(true) === true){ // watch global mouse/touch move
            onPointerCaptureStart?.(event);
        } // if
        
        
        
        onPointerCaptureMove(event);
    });
    const handleTouchMoveNative   = useEvent<EventHandler<TouchEvent>>((event) => {
        // conditions:
        if (event.touches.length !== 1) return; // only single touch
        
        
        
        // simulates the TouchMove as MouseMove:
        handleMouseMoveNative(new MouseEvent('mousemove', {
            ...event,
            ...(() => {
                const touch = event?.touches?.[0];
                return {
                    clientX : touch?.clientX ?? 0,
                    clientY : touch?.clientY ?? 0,
                    
                    // screenX : touch?.screenX ?? 0, // not needed, just for internal use
                    // screenY : touch?.screenY ?? 0, // not needed, just for internal use
                    
                    // pageX   : touch?.pageX   ?? 0, // not needed, just for internal use
                    // pageY   : touch?.pageY   ?? 0, // not needed, just for internal use
                    
                    // button  : 1,                   // not needed, just for internal use
                    buttons : 1, // primary button (usually the left button)
                };
            })(),
        }));
    });
    
    const handleMouseSlide        = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // simulates the MouseDown as MouseMove (update the mouse position):
        handleMouseMoveNative(event.nativeEvent);
    });
    const handleTouchSlide        = useEvent<React.TouchEventHandler<TElement>>((event) => {
        // simulates the TouchStart as TouchMove (update the touch position):
        handleTouchMoveNative(event.nativeEvent);
    });
    
    const handleMouseDown         = useEvent<React.MouseEventHandler<TElement>>((event) => {
        handleMouseActive(event); // update the mouse active status
        handleMouseSlide(event);  // update the mouse position
    });
    const handleTouchStart        = useEvent<React.TouchEventHandler<TElement>>((event) => {
        handleTouchActive(event); // update the touch active status
        handleTouchSlide(event);  // update the touch position
    });
    
    
    
    // global handlers:
    const watchGlobalPointerStatusRef = useRef<undefined|(() => void)>(undefined);
    const watchGlobalPointer          = useEvent((active: boolean): boolean|null => {
        // conditions:
        const shouldActive = active && enabled; // control is disabled or readOnly => no response required
        if (!!watchGlobalPointerStatusRef.current === shouldActive) return null; // already activated|deactivated => nothing to do
        
        
        
        // actions:
        if (shouldActive) {
            // setups:
            const passiveOption : AddEventListenerOptions = { passive: true };
            
            const currentHandleMouseMoveNative   = handleMouseMoveNative;
            const currentHandleTouchMoveNative   = handleTouchMoveNative;
            const currentHandleMouseStatusNative = handleMouseStatusNative;
            const currentHandleTouchStatusNative = handleTouchStatusNative;
            
            window.addEventListener('mousemove'  , currentHandleMouseMoveNative   , passiveOption); // activating event
            window.addEventListener('touchmove'  , currentHandleTouchMoveNative   , passiveOption); // activating event
            
            window.addEventListener('mouseup'    , currentHandleMouseStatusNative , passiveOption); // deactivating event
            window.addEventListener('touchend'   , currentHandleTouchStatusNative , passiveOption); // deactivating event
            window.addEventListener('touchcancel', currentHandleTouchStatusNative , passiveOption); // deactivating event
            
            
            
            // cleanups later:
            watchGlobalPointerStatusRef.current = () => {
                window.removeEventListener('mousemove'  , currentHandleMouseMoveNative  ); // activating event
                window.removeEventListener('touchmove'  , currentHandleTouchMoveNative  ); // activating event
                
                window.removeEventListener('mouseup'    , currentHandleMouseStatusNative); // deactivating event
                window.removeEventListener('touchend'   , currentHandleTouchStatusNative); // deactivating event
                window.removeEventListener('touchcancel', currentHandleTouchStatusNative); // deactivating event
            };
        }
        else {
            // cleanups:
            watchGlobalPointerStatusRef.current?.();
            watchGlobalPointerStatusRef.current = undefined;
        } // if
        
        
        
        return shouldActive;
    });
    
    
    
    // effects:
    useEffect(() => {
        // conditions:
        if (enabled) return; // control is enabled and mutable => no reset required
        
        
        
        // resets:
        isMouseActive.current = false;  // unmark as pressed
        isTouchActive.current = false;  // unmark as touched
        handlePointerStatus(undefined); // update pointer status
    }, [enabled]);
    
    
    
    // api:
    return {
        // handlers:
        handleMouseDown,
        handleTouchStart,
    };
};
//#endregion pointer capturable
