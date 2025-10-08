import React from 'react'
import {
    type ActiveStateTestProps,
    ActiveStateTest,
} from "./ActiveStateTest";
import {
    ActiveStateProvider,
} from '../dist/index.js'



export interface ActiveStateWithContextTestProps extends ActiveStateTestProps {
    parentActive : boolean
}
export const ActiveStateWithContextTest = (props: ActiveStateWithContextTestProps) => {
    const {
        parentActive,
        ...childProps
    } = props;
    return (
        <div data-testid="active-context-test">
            CONTEXT
            <ActiveStateProvider active={parentActive}>
                <ActiveStateTest {...childProps} />
            </ActiveStateProvider>
        </div>
    );
};