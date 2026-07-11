import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import { type ExcitedStateProps, useExcitedState } from '../dist/index.js'
import { useMergedEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useExcitedStateTestStyles } from './ExcitedStateTest.loader.js'

export interface ExcitedStateTestProps
    extends
        ExcitedStateProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const ExcitedStateTest = (props: ExcitedStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useExcitedStateTestStyles();
    
    const {
        excitedClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useExcitedState(props, {
        animationPattern: 'test-exciting',
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
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={elementRef}
                data-testid="excited-state-test"
                className={`${styles.main} ${excitedClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                Excited State Test
            </div>
        </div>
    );
};
