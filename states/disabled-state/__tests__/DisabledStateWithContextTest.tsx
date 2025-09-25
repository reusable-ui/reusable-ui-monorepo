import React from 'react'
import {
    type DisabledStateTestProps,
    DisabledStateTest,
} from "./DisabledStateTest";
import {
    DisabledStateProvider,
} from '../dist/index.js'



export interface DisabledStateWithContextTest extends DisabledStateTestProps {
    parentDisabled : boolean
}
export const DisabledStateWithContextTest = (props: DisabledStateWithContextTest) => {
    const {
        parentDisabled,
        ...childProps
    } = props;
    return (
        <div data-testid="disabled-context-test">
            CONTEXT
            <DisabledStateProvider disabled={parentDisabled}>
                <DisabledStateTest {...childProps} />
            </DisabledStateProvider>
        </div>
    );
};