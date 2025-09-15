import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type ValidityStateProps,
    type ValidityStateUpdateProps,
    type ValidityStatePhaseEventProps,
    useValidityBehaviorState,
    useValidityStatePhaseEvents,
} from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useValidityStateTestStyles } from './ValidityStateTest.loader.js'

const animationPattern = [
    'test-validate',
    'test-invalidate',
    'test-unvalidate',
];

export interface ValidityStateTestProps
    extends
        ValidityStateProps,
        ValidityStateUpdateProps,
        ValidityStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const ValidityStateTest = (props: ValidityStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useValidityStateTestStyles();
    
    const {
        validity,
        validityPhase,
        validityClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useValidityBehaviorState(props, {
        animationPattern,
    });
    
    useValidityStatePhaseEvents(props, validityPhase);
    
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
                data-testid="validity-state-test"
                data-state={(() => {
                    switch (validity) {
                        case true  : return 'valid';
                        case false : return 'invalid';
                        case null  : return 'unvalidated';
                        default    : throw new Error('unexpected validity value');
                    } // switch
                })()}
                className={`${styles.main} ${validityClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                Validity State Test
            </div>
        </div>
    );
};
