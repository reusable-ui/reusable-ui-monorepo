import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type HoverStateProps,
    type HoverStateUpdateProps,
    type HoverStatePhaseEventProps,
    useHoverBehaviorState,
    useHoverStatePhaseEvents,
} from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { useMergeRefs } from '@reusable-ui/references'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useHoverStateTestStyles } from './HoverStateTest.loader.js'

const animationPattern = [
    'test-hovering',
    'test-unhovering',
];

export interface HoverStateTestProps
    extends
        HoverStateProps,
        HoverStateUpdateProps,
        HoverStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
    implementsHoverHandlers ?: boolean
}
export const HoverStateTest = (props: HoverStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
        implementsHoverHandlers = false,
    } = props;
    
    const styles = useHoverStateTestStyles();
    
    const {
        hovered,
        hoverPhase,
        hoverClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } = useHoverBehaviorState(props, {
        animationPattern,
    });
    
    useHoverStatePhaseEvents(props, hoverPhase);
    
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
                data-testid="hover-state-test"
                data-state={hovered ? 'hovered' : 'unhovered'}
                className={`${styles.main} ${hoverClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
                onMouseEnter={implementsHoverHandlers ? handleMouseEnter : undefined}
                onMouseLeave={implementsHoverHandlers ? handleMouseLeave : undefined}
                tabIndex={implementsHoverHandlers ? 0 : undefined} // make it hoverable
            >
                Hover State Test
            </div>
            <div data-testid='hover-exit'>
                An exit area to move mouse cursor away
            </div>
        </div>
    );
};
