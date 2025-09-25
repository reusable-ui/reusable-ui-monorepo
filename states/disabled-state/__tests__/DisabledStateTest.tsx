import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type DisabledStateProps,
    type DisabledStateUpdateProps,
    type DisabledStatePhaseEventProps,
    useDisabledBehaviorState,
    useDisabledStatePhaseEvents,
} from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useDisabledStateTestStyles } from './DisabledStateTest.loader.js'

const animationPattern = [
    'test-enable',
    'test-disable',
];

export interface DisabledStateTestProps
    extends
        DisabledStateProps,
        DisabledStateUpdateProps,
        DisabledStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
}
export const DisabledStateTest = (props: DisabledStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
    } = props;
    
    const styles = useDisabledStateTestStyles();
    
    const {
        disabled,
        disabledPhase,
        disabledClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useDisabledBehaviorState(props, {
        animationPattern,
    });
    
    useDisabledStatePhaseEvents(props, disabledPhase);
    
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
                data-testid="disabled-state-test"
                data-state={disabled ? 'disabled' : 'enabled'}
                className={`${styles.main} ${disabledClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
            >
                Disabled State Test
            </div>
        </div>
    );
};
