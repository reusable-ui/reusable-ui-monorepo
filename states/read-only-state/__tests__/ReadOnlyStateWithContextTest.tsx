import React from 'react'
import {
    type ReadOnlyStateTestProps,
    ReadOnlyStateTest,
} from "./ReadOnlyStateTest";
import {
    ReadOnlyStateProvider,
} from '../dist/index.js'



export interface ReadOnlyStateWithContextTestProps extends ReadOnlyStateTestProps {
    parentReadOnly : boolean
}
export const ReadOnlyStateWithContextTest = (props: ReadOnlyStateWithContextTestProps) => {
    const {
        parentReadOnly,
        ...childProps
    } = props;
    return (
        <div data-testid="readonly-context-test">
            CONTEXT
            <ReadOnlyStateProvider readOnly={parentReadOnly}>
                <ReadOnlyStateTest {...childProps} />
            </ReadOnlyStateProvider>
        </div>
    );
};