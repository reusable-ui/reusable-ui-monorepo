import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type ReadOnlyStateProps,
    useReadOnlyBehaviorState,
} from '../dist/index.js'
import { useMergedEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useReadOnlyStateTestStyles } from './ReadOnlyStateTest.loader.js'

const animationPattern = [
    'test-thawing',
    'test-freezing',
];

export interface ReadOnlyStateTestProps
    extends
        ReadOnlyStateProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const ReadOnlyStateTest = (props: ReadOnlyStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useReadOnlyStateTestStyles();
    
    const {
        readOnly,
        readOnlyClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useReadOnlyBehaviorState(props, {
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
    
    return (
        <div>
            <HydrateStyles />
            <div
                ref={elementRef}
                data-testid="read-only-state-test"
                data-state={readOnly ? 'readonly' : 'editable'}
                className={`${styles.main} ${readOnlyClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                ReadOnly State Test
            </div>
        </div>
    );
};
