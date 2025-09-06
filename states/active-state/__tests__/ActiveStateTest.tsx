import React, { AnimationEvent as ReactAnimationEvent, MouseEvent as ReactMouseEvent, useRef, useEffect } from 'react'
import {
    type ActiveStateProps,
    type ActiveStateUncontrollableProps,
    type ActiveStateChangeProps,
    type ActiveStatePhaseEventProps,
    useActiveState,
    useActiveStatePhaseEvents,
} from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useActiveStateTestStyles } from './ActiveStateTest.loader.js'

const animationPattern = [
    'test-activate',
    'test-deactivate',
];

export interface ActiveStateTestProps
    extends
        ActiveStateProps,
        ActiveStateUncontrollableProps,
        ActiveStateChangeProps<ReactMouseEvent<HTMLButtonElement, MouseEvent>>,
        ActiveStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const ActiveStateTest = (props: ActiveStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useActiveStateTestStyles();
    
    const {
        active,
        activePhase,
        activeClassname,
        
        dispatchActiveChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useActiveState(props, {
        animationPattern,
    });
    
    useActiveStatePhaseEvents(props, activePhase);
    
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
    
    // Ensure the `dispatchActiveChange` has a stable reference:
    const dispatchActiveChangeRef = useRef(dispatchActiveChange);
    if (dispatchActiveChangeRef.current !== dispatchActiveChange) throw new Error('reference equality violated');
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={elementRef}
                data-testid="active-state-test"
                data-state={active ? 'active' : 'inactive'}
                className={`${styles.main} ${activeClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                Active State Test
                
                <button data-testid="activate-btn" onClick={(event) => dispatchActiveChange(true, event)}>Activate</button>
                <button data-testid="deactivate-btn" onClick={(event) => dispatchActiveChange(false, event)}>Deactivate</button>
            </div>
        </div>
    );
};
