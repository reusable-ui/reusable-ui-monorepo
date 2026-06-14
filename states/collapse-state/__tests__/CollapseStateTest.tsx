import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type CollapseStateProps,
    useCollapseBehaviorState,
} from '../dist/index.js'
import { useMergedEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useCollapseStateTestStyles } from './CollapseStateTest.loader.js'

const animationPattern = [
    'test-expanding',
    'test-collapsing',
];

export interface CollapseStateTestProps
    extends
        CollapseStateProps<React.MouseEvent<HTMLButtonElement>>,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const CollapseStateTest = (props: CollapseStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useCollapseStateTestStyles();
    
    const {
        expanded,
        expandClassname,
        
        dispatchExpandedChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useCollapseBehaviorState(props, {
        animationPattern,
    });
    
    const handleMergedAnimationStart = useMergedEventHandlers(
        handleAnimationStart,
        onAnimationStart,
    );
    const handleMergedAnimationEnd = useMergedEventHandlers(
        handleAnimationEnd,
        onAnimationEnd,
    );
    const handleMergedAnimationCancel = useMergedEventHandlers(
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
    
    // Ensure the `dispatchExpandedChange` has a stable reference:
    const dispatchExpandedChangeRef = useRef(dispatchExpandedChange);
    if (dispatchExpandedChangeRef.current !== dispatchExpandedChange) throw new Error('reference equality violated');
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={elementRef}
                data-testid="collapse-state-test"
                data-state={expanded ? 'expanded' : 'collapsed'}
                className={`${styles.main} ${expandClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                Collapse State Test
                
                <div className='nav'>
                    <button data-testid="expand-btn" onClick={(event) => dispatchExpandedChange(true, event)}>Expand</button>
                    <button data-testid="collapse-btn" onClick={(event) => dispatchExpandedChange(false, event)}>Collapse</button>
                </div>
            </div>
        </div>
    );
};
