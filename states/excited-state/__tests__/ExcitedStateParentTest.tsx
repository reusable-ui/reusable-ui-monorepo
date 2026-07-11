import React, { type AnimationEvent, useState, useLayoutEffect } from 'react'
import { type ExcitedStateTestProps, ExcitedStateTest } from './ExcitedStateTest.js'
import { useStableEventHandler } from '@reusable-ui/callbacks'
import { ValueChangeHandler } from '@reusable-ui/controllable';

export interface ExcitedStateParentTestProps
    extends
        Omit<ExcitedStateTestProps, 'onExcitedComplete'>
{
    responseExcitedComplete ?: boolean
}
export const ExcitedStateParentTest = (props: ExcitedStateParentTestProps) => {
    const {
        excited : controlledExcited = false,
        responseExcitedComplete = true,
    } = props;
    
    const [excited, setExcited] = useState<boolean>(controlledExcited);
    useLayoutEffect(() => {
        setExcited(controlledExcited);
    }, [controlledExcited]);
    
    const handleExcitedComplete : ValueChangeHandler<boolean, AnimationEvent> = useStableEventHandler((newExcited, event): void => {
        if (!responseExcitedComplete) return;
        setExcited(newExcited);
    });
    
    return (
        <ExcitedStateTest
            {...props}
            excited={excited}
            onExcitedComplete={handleExcitedComplete}
        />
    );
};