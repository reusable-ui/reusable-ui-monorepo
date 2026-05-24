import React, { type AnimationEvent, useState, useLayoutEffect } from 'react'
import { type ExciteStateTestProps, ExciteStateTest } from './ExciteStateTest.js'
import { useStableEventHandler } from '@reusable-ui/callbacks'
import { ValueChangeEventHandler } from '@reusable-ui/events';

export interface ExciteStateParentTestProps
    extends
        Omit<ExciteStateTestProps, 'onExcitedComplete'>
{
    responseExcitedComplete ?: boolean
}
export const ExciteStateParentTest = (props: ExciteStateParentTestProps) => {
    const {
        excited : controlledExcited = false,
        responseExcitedComplete = true,
    } = props;
    
    const [excited, setExcited] = useState<boolean>(controlledExcited);
    useLayoutEffect(() => {
        setExcited(controlledExcited);
    }, [controlledExcited]);
    
    const handleExcitedComplete : ValueChangeEventHandler<boolean, AnimationEvent> = useStableEventHandler((newExcited, event): void => {
        if (!responseExcitedComplete) return;
        setExcited(newExcited);
    });
    
    return (
        <ExciteStateTest
            {...props}
            excited={excited}
            onExcitedComplete={handleExcitedComplete}
        />
    );
};