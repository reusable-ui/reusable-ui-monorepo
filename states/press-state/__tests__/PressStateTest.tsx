import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type PressStateProps,
    type PressStateUpdateProps,
    type PressStatePhaseEventProps,
    usePressBehaviorState,
    usePressStatePhaseEvents,
} from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { useMergeRefs } from '@reusable-ui/references'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { usePressStateTestStyles } from './PressStateTest.loader.js'

const animationPattern = [
    'test-pressing',
    'test-releasing',
];

export interface PressStateTestProps
    extends
        PressStateProps,
        PressStateUpdateProps,
        PressStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onClick'>
{
    implementsPressHandlers ?: boolean
}
export const PressStateTest = (props: PressStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
        onClick,
        implementsPressHandlers = false,
    } = props;
    
    const styles = usePressStateTestStyles();
    
    const {
        pressed,
        pressPhase,
        pressClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        ref,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } = usePressBehaviorState(props, {
        animationPattern,
    });
    
    usePressStatePhaseEvents(props, pressPhase);
    
    const handleMergedAnimationStart = useMergeEventHandlers(
        handleAnimationStart,
        onAnimationStart,
    );
    const handleMergedAnimationEnd = useMergeEventHandlers(
        handleAnimationEnd,
        onAnimationEnd,
    );
    const handleMergedAnimationCancel = useMergeEventHandlers(
        handleAnimationCancel,
        onAnimationEnd,
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
    
    const mergedRef = useMergeRefs(
        elementRef,
        ref,
    );
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={mergedRef}
                data-testid="press-state-test"
                data-state={pressed ? 'pressed' : 'released'}
                className={`${styles.main} ${pressClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
                onPointerDown={implementsPressHandlers ? handlePointerDown : undefined}
                onPointerUp={implementsPressHandlers ? handlePointerUp : undefined}
                onPointerCancel={implementsPressHandlers ? handlePointerCancel : undefined}
                onKeyDown={implementsPressHandlers ? handleKeyDown : undefined}
                onKeyUp={implementsPressHandlers ? handleKeyUp : undefined}
                onClick={onClick}
                tabIndex={implementsPressHandlers ? 0 : undefined} // make it pressable
            >
                Press State Test
            </div>
        </div>
    );
};
