import React, { AnimationEvent as ReactAnimationEvent, MouseEvent as ReactMouseEvent, useRef, useEffect } from 'react'
import {
    type ViewStateProps,
    type UncontrollableViewStateProps,
    type ViewStateChangeProps,
    type ViewStatePhaseEventProps,
    useViewBehaviorState,
    useViewStatePhaseEvents,
} from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useViewStateTestStyles } from './ViewStateTest.loader.js'

const animationPattern = [
    'test-view-progressing',
    'test-view-regressing',
];

export interface ViewStateTestProps
    extends
        ViewStateProps,
        UncontrollableViewStateProps,
        ViewStateChangeProps<ReactMouseEvent<HTMLButtonElement, MouseEvent>>,
        ViewStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const ViewStateTest = (props: ViewStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useViewStateTestStyles();
    
    const {
        viewIndex,
        prevViewIndex,
        minVisibleViewIndex,
        maxVisibleViewIndex,
        viewPhase,
        viewClassname,
        viewStyle,
        
        dispatchViewIndexChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useViewBehaviorState(props, {
        defaultViewIndex  : 0,
        minViewIndex      : 0,
        maxViewIndex      : 3,
        viewIndexStep     : 1,
        animationPattern,
    });
    
    useViewStatePhaseEvents(props, viewPhase);
    
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
    
    // Ensure the `dispatchViewIndexChange` has a stable reference:
    const dispatchViewIndexChangeRef = useRef(dispatchViewIndexChange);
    if (dispatchViewIndexChangeRef.current !== dispatchViewIndexChange) throw new Error('reference equality violated');
    
    // Determine which views to render based on visibility range:
    const minRenderViewIndex = Math.floor(minVisibleViewIndex);
    const maxRenderViewIndex = Math.ceil(maxVisibleViewIndex);
    
    return (
        <div>
            <HydrateStyles />
            <div className={styles.container}>
                <div
                    ref={elementRef}
                    data-testid="view-state-test"
                    data-state={String(viewIndex)}
                    className={`${styles.views} ${viewClassname}`}
                    style={viewStyle}
                    onAnimationStart={handleMergedAnimationStart}
                    onAnimationEnd={handleMergedAnimationEnd}
                >
                    {['Zero', 'One', 'Two', 'Three'].map((label, currentIndex) => (
                        // Only render views within the visible or transitioning range to optimize performance:
                        ((currentIndex >= minRenderViewIndex) && (currentIndex <= maxRenderViewIndex)) && <div
                            key={currentIndex}
                            className={styles.view}
                            data-testid={`view-item-${currentIndex}`}
                        >
                            Item #{currentIndex}
                        </div>
                    ))}
                    
                    <span className={styles.label}>
                        View State Test
                    </span>
                </div>
            </div>
            
            <nav>
                {[0, 1, 2, 3].map((viewIndex) =>
                    <button data-testid={`switch-${viewIndex}-btn`} onClick={(event) => dispatchViewIndexChange(viewIndex, event)}>{viewIndex}</button>
                )}
            </nav>
            <div>
                <h6>Debug Info:</h6>
                <p>Previous View Index: {prevViewIndex ?? 'undefined'}</p>
                <p>Current View Index: {viewIndex}</p>
                <p>Visible view range: {minVisibleViewIndex} - {maxVisibleViewIndex}</p>
                <p>Current View Phase: {viewPhase}</p>
            </div>
        </div>
    );
};
