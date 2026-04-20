import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type DragStateProps,
    type DragStateUpdateProps,
    type DragStatePhaseEventProps,
    useDragBehaviorState,
    useDragStatePhaseEvents,
} from '../dist/index.js'
import {
    type PressStateProps,
    usePressBehaviorState,
} from '@reusable-ui/press-state'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useDragStateTestStyles } from './DragStateTest.loader.js'

const pressAnimationPattern = [
    'test-pressing',
    'test-releasing',
];
const animationPattern = [
    'test-dragging',
    'test-dropping',
];

export interface DragStateTestProps
    extends
        PressStateProps,
        DragStateProps,
        DragStateUpdateProps,
        DragStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onClick' | 'onPointerDown'>
{
    implementsDragHandlers ?: boolean
}
export const DragStateTest = (props: DragStateTestProps) => {
    const {
        computedDrag : externalComputedDrag,
        onAnimationStart,
        onAnimationEnd,
        onClick,
        onPointerDown,
        implementsDragHandlers = false,
    } = props;
    
    const styles = useDragStateTestStyles();
    
    const {
        actualPressed,
        pressClassname,
        
        handleAnimationStart  : handlePressAnimationStart,
        handleAnimationEnd    : handlePressAnimationEnd,
        handleAnimationCancel : handlePressAnimationCancel,
        
        handlePointerDown     : handlePressPointerDown,
        handlePointerUp       : handlePressPointerUp,
        handlePointerCancel   : handlePressPointerCancel,
        handleKeyDown         : handlePressKeyDown,
        handleKeyUp           : handlePressKeyUp,
    } = usePressBehaviorState(props, {
        animationPattern : pressAnimationPattern,
    });
    
    const isExternallyComputed = (externalComputedDrag !== undefined);
    const computedDrag         = isExternallyComputed ? externalComputedDrag : actualPressed;
    const {
        dragged,
        dragPhase,
        dragClassname,
        dragStyle,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        handlePointerDown,
        handlePointerMove,
    } = useDragBehaviorState({
        ...props,
        computedDrag,
    }, {
        animationPattern,
    });
    
    useDragStatePhaseEvents(props, dragPhase);
    
    const handleMergedAnimationStart = useMergeEventHandlers(
        handlePressAnimationStart,
        handleAnimationStart,
        onAnimationStart,
    );
    const handleMergedAnimationEnd = useMergeEventHandlers(
        handlePressAnimationEnd,
        handleAnimationEnd,
        onAnimationEnd,
    );
    const handleMergedAnimationCancel = useMergeEventHandlers(
        handlePressAnimationCancel,
        handleAnimationCancel,
        onAnimationEnd,
    );
    const handleMergedPointerDown = useMergeEventHandlers(
        handlePressPointerDown,
        handlePointerDown,
        onPointerDown,
    );
    
    const elementRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        
        const handleNativeAnimationCancel = (event: AnimationEvent): void => {
            console.log('animation canceled: ', event.animationName);
            handleMergedAnimationCancel(
                createSyntheticEvent({
                    nativeEvent : event,
                    currentTarget : element,
                }) as ReactAnimationEvent<HTMLDivElement>
            );
        };
        element.addEventListener('animationcancel', handleNativeAnimationCancel);
        
        return () => {
            element.removeEventListener('animationcancel', handleNativeAnimationCancel);
        };
    }, []);
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={elementRef}
                data-testid="drag-state-test"
                data-state={dragged ? 'dragged' : 'dropped'}
                className={`${styles.main} ${pressClassname} ${dragClassname}`}
                style={dragStyle}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
                onPointerDown={implementsDragHandlers ? handleMergedPointerDown : undefined}
                onPointerUp={implementsDragHandlers ? handlePressPointerUp : undefined}
                onPointerCancel={implementsDragHandlers ? handlePressPointerCancel : undefined}
                onPointerMove={implementsDragHandlers ? handlePointerMove : undefined}
                onKeyDown={implementsDragHandlers ? handlePressKeyDown : undefined}
                onKeyUp={implementsDragHandlers ? handlePressKeyUp : undefined}
                onClick={onClick}
            >
                Drag State Test
            </div>
        </div>
    );
};
