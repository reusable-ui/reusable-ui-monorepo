import React, { type AnimationEvent, useState, useLayoutEffect } from 'react'
import { type ExciteStateTestProps, ExciteStateTest } from './ExciteStateTest.js'
import { useStableEventHandler } from '@reusable-ui/callbacks'
import { ValueChangeEventHandler } from '@reusable-ui/events';

export interface ExciteStateParentTestProps
    extends
        Omit<ExciteStateTestProps, 'onExcitedChange'>
{
    responseExcitedChange ?: boolean
}
export const ExciteStateParentTest = (props: ExciteStateParentTestProps) => {
    const {
        excited : controlledExcited = false,
        responseExcitedChange = true,
    } = props;
    
    const [excited, setExcited] = useState<boolean>(controlledExcited);
    useLayoutEffect(() => {
        setExcited(controlledExcited);
    }, [controlledExcited]);
    
    const handleExcitedChange : ValueChangeEventHandler<boolean, AnimationEvent> = useStableEventHandler((newExcited, event): void => {
        if (!responseExcitedChange) return;
        setExcited(newExcited);
    });
    
    return (
        <ExciteStateTest
            {...props}
            excited={excited}
            onExcitedChange={handleExcitedChange}
        />
    );
};