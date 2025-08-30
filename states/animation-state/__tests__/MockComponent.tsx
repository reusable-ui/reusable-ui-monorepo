import React, { useRef, useEffect, type RefCallback, type AnimationEventHandler } from 'react'
import {
    useAnimationState,
} from '../dist/index.js'
import { useStableEventHandler, useMergeEventHandlers } from '@reusable-ui/callbacks'
import './TestComponent.css'



type UndoAnimation =
    |  0  // undoing valid
    | -0  // undoing invalid
export type ValidityState =
    |  1  // valid
    | -1  // invalid
    | UndoAnimation
/**
 * Props for the mock component used to test animation-aware state transitions.
 */
interface MockComponentProps {
    /**
     * Indicates whether the component is expanded (`true`) or collapsed (`false`).
     * Changing this value will trigger an expand/collapse animation.
     */
    expanded         ?: boolean
    
    /**
     * Reference to access the internal expand/collapse animation state.
     * Useful for testing and tracking animated expand/collapse transitions.
     */
    expandValueRef    : RefCallback<[boolean, boolean | undefined] | null>
    
    /**
     * Validity state of the component.
     * - `true`: marked as valid.
     * - `false`: marked as invalid.
     * - `null`: neutral (no validation applied).
     * Changing this value will trigger a validity animation.
     */
    valid            ?: boolean | null
    
    /**
     * Reference to access the internal validity animation state.
     * Useful for testing and tracking animated validation transitions.
     * 
     * Validity states:
     * - `-1`: invalid.
     * - `-0`: transitioning from invalid to neutral.
     * - `+0`: transitioning from valid to neutral.
     * - `+1`: valid.
     */
    validityValueRef  : RefCallback<[ValidityState, ValidityState | undefined] | null>
}
export const MockComponent = (props: MockComponentProps) => {
    // Extract props and assign defaults:
    const {
        expanded          = false,
        expandValueRef,
        
        valid             = null,
        validityValueRef,
    } = props;
    
    
    
    //#region Expand/Collapse Animation API
    const expandState = useAnimationState<boolean, HTMLDivElement>({
        initialIntent     : expanded,
        animationPattern  : [
            'expand',
            'collapse',
        ],
        animationBubbling : false,
    });
    expandValueRef([expandState[0], expandState[2]]);
    
    const [
        isExpanded,     // Latest intent
        setExpanded,    // Intent setter
        isExpanding,    // Ongoing animation (if any)
        expandHandlers, // Lifecycle event handlers
    ] = expandState;
    
    useEffect(() => {
        setExpanded(expanded);
    }, [expanded]);
    
    // Map expand animation state to corresponding class:
    const expandClass = (
        (isExpanding !== undefined)
        ? isExpanding ? 'expanding' : 'collapsing'
        : isExpanded  ? 'expanded'  : 'collapsed'
    );
    //#endregion Expand/Collapse Animation API
    
    
    
    //#region Validity Animation API
    const validityState = useAnimationState<ValidityState, HTMLDivElement>({
        initialIntent     : (() => {
            switch (valid) {
                case true  : return +1;
                case false : return -1;
                default    : return +0;
            } // switch
        })(),
        animationPattern  : [
            'validate',
            'unvalidate',
            'invalidate',
            'uninvalidate',
        ],
        animationBubbling : false,
    });
    validityValueRef([validityState[0], validityState[2]]);
    
    const [
        currentValidity,  // Latest intent
        setValidity,      // Intent setter
        validating,       // Ongoing animation
        validityHandlers, // Lifecycle event handlers
    ] = validityState;
    
    useEffect(() => {
        if (valid !== null) {
            setValidity(valid ? 1 : -1);
        }
        else {
            setValidity((currentValue, currentRunning) => {
                const latestEffect = currentRunning ?? currentValue;
                switch (latestEffect) {
                    case -1 : return -0;   // undoing invalid
                    case +1 : return +0;   // undoing valid
                    default : return latestEffect; // already neutral
                } // switch
            });
        } // if
    }, [valid]);
    
    // Map validity animation state to corresponding class:
    const validityClass = (() => {
        if (validating !== undefined) {
            if (validating === -1)         return 'invalidating';
            if (Object.is(validating, -0)) return 'uninvalidating';
            if (Object.is(validating, +0)) return 'unvalidating';
            if (validating === +1)         return 'validating';
        } // if
        
        if (currentValidity === -1) return 'invalidated';
        if (currentValidity === +1) return 'validated';
        if (currentValidity === 0) return 'novalidity';
        
        return '';
    })();
    //#endregion Validity Animation API
    
    
    
    // Merged Event Handlers:
    const handleLogAnimationStart : AnimationEventHandler<HTMLDivElement> = useStableEventHandler((event) => {
        console.log('animation start: ', event.animationName);
    });
    const handleAnimationStart = useMergeEventHandlers(
        expandHandlers.handleAnimationStart,
        validityHandlers.handleAnimationStart,
        handleLogAnimationStart,
    );
    const handleLogAnimationEnd : AnimationEventHandler<HTMLDivElement> = useStableEventHandler((event) => {
        console.log('animation end: ', event.animationName);
    });
    const handleAnimationEnd   = useMergeEventHandlers(
        expandHandlers.handleAnimationEnd,
        validityHandlers.handleAnimationEnd,
        handleLogAnimationEnd,
    );
    
    
    
    // Asserts:
    {
        // Tuple-style destructuring:
        const [
            isExpanded,
            setIsExpanded,
            isExpandingOrCollapsing,
            {
                handleAnimationStart  : handleAnimationStartForExpand,
                handleAnimationEnd    : handleAnimationEndForExpand,
                handleAnimationCancel : handleAnimationCancelForExpand,
            },
        ] = expandState;
        const [
            isValid,
            setIsValid,
            isValidatingOrInvalidating,
            {
                handleAnimationStart  : handleAnimationStartForValidity,
                handleAnimationEnd    : handleAnimationEndForValidity,
                handleAnimationCancel : handleAnimationCancelForValidity,
            },
        ] = validityState;
        
        
        
        // Named-property destructuring:
        const {
            intent    : isExpanded2,
            setIntent : setIsExpanded2,
            running   : isExpandingOrCollapsing2,
            
            handleAnimationStart  : handleAnimationStartForExpand2,
            handleAnimationEnd    : handleAnimationEndForExpand2,
            handleAnimationCancel : handleAnimationCancelForExpand2,
        } = expandState;
        const {
            intent    : isValid2,
            setIntent : setIsValid2,
            running   : isValidatingOrInvalidating2,
            
            handleAnimationStart  : handleAnimationStartForValidity2,
            handleAnimationEnd    : handleAnimationEndForValidity2,
            handleAnimationCancel : handleAnimationCancelForValidity2,
        } = validityState;
        
        
        
        // Confirm tuple-style and named properties match:
        if (isExpanded !== isExpanded2) throw Error('not equal');
        if (setIsExpanded !== setIsExpanded2) throw Error('not equal');
        if (isExpandingOrCollapsing !== isExpandingOrCollapsing2) throw Error('not equal');
        if (handleAnimationStartForExpand !== handleAnimationStartForExpand2) throw Error('not equal');
        if (handleAnimationEndForExpand !== handleAnimationEndForExpand2) throw Error('not equal');
        if (handleAnimationCancelForExpand !== handleAnimationCancelForExpand2) throw Error('not equal');
        
        if (isValid !== isValid2) throw Error('not equal');
        if (setIsValid !== setIsValid2) throw Error('not equal');
        if (isValidatingOrInvalidating !== isValidatingOrInvalidating2) throw Error('not equal');
        if (handleAnimationStartForValidity !== handleAnimationStartForValidity2) throw Error('not equal');
        if (handleAnimationEndForValidity !== handleAnimationEndForValidity2) throw Error('not equal');
        if (handleAnimationCancelForValidity !== handleAnimationCancelForValidity2) throw Error('not equal');
    }
    
    
    
    // Manual `animationcancel` Handling:
    // This is necessary because React does not provide an `onAnimationCancel` event handler.
    const divRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const divElm = divRef.current;
        if (!divElm) return;
        
        const handleNativeAnimationCancel = (event: AnimationEvent) => {
            expandHandlers.handleAnimationCancel(event as any);
            validityHandlers.handleAnimationCancel(event as any);
        };
        
        divElm.addEventListener('animationcancel', handleNativeAnimationCancel);
        return () => {
            divElm.removeEventListener('animationcancel', handleNativeAnimationCancel);
        };
    }, []);
    
    
    
    // Render:
    return (
        <div
            ref={divRef}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            // onAnimationCancel={handleAnimationCancel} // There's no `onAnimationCancel` on React's DOMAttributes
            
            className={`main ${expandClass} ${validityClass}`}
        >
            Mock Component Test
        </div>
    );
};