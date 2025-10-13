import React, { AnimationEvent as ReactAnimationEvent, useRef, useEffect } from 'react'
import {
    type FocusStateProps,
    type FocusStateUpdateProps,
    type FocusStatePhaseEventProps,
    useFocusBehaviorState,
    useFocusStatePhaseEvents,
} from '../dist/index.js'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { useMergeRefs } from '@reusable-ui/references'
import { createSyntheticEvent } from '@reusable-ui/events'
import { HydrateStyles } from '@cssfn/cssfn-react'
import { useFocusStateTestStyles } from './FocusStateTest.loader.js'

const animationPattern = [
    'test-focusing',
    'test-blurring',
];

export interface FocusStateTestProps
    extends
        FocusStateProps,
        FocusStateUpdateProps,
        FocusStatePhaseEventProps,
        Pick<React.DOMAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd'>
{
    implementsFocusHandlers ?: boolean
}
export const FocusStateTest = (props: FocusStateTestProps) => {
    const {
        onAnimationStart,
        onAnimationEnd,
        implementsFocusHandlers = false,
    } = props;
    
    const styles = useFocusStateTestStyles();
    
    const {
        focused,
        focusPhase,
        focusClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        ref,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } = useFocusBehaviorState(props, {
        animationPattern,
        inputLikeFocus: true, // enable input-like focus styling
    });
    
    useFocusStatePhaseEvents(props, focusPhase);
    
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
                data-testid="focus-state-test"
                data-state={focused ? 'focused' : 'blurred'}
                className={`${styles.main} ${focusClassname}`}
                onAnimationStart={handleMergedAnimationStart}
                onAnimationEnd={handleMergedAnimationEnd}
                onFocus={implementsFocusHandlers ? handleFocus : undefined}
                onBlur={implementsFocusHandlers ? handleBlur : undefined}
                onKeyDown={implementsFocusHandlers ? handleKeyDown : undefined}
                tabIndex={implementsFocusHandlers ? 0 : undefined} // make it focusable
            >
                Focus State Test
            </div>
        </div>
    );
};
