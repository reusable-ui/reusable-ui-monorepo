import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import { type ExciteStateProps, type ExciteStateChangeProps, useExciteBehaviorState } from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useExciteStateTestStyles } from './ExciteStateTest.loader.js'

export interface ExciteStateTestProps
    extends
        ExciteStateProps,
        ExciteStateChangeProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const ExciteStateTest = (props: ExciteStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useExciteStateTestStyles();
    
    const {
        exciteClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useExciteBehaviorState(props, {
        animationPattern: 'test-exciting',
    });
    
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
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={elementRef}
                data-testid="excite-state-test"
                className={`${styles.main} ${exciteClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                Excite State Test
            </div>
        </div>
    );
};
