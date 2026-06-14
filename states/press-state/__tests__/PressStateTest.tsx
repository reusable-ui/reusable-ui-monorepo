import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type PressStateProps,
    usePressBehaviorState,
} from '../dist/index.js'
import { useMergedEventHandlers } from '@reusable-ui/callbacks'
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
        pressClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } = usePressBehaviorState(props, {
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
