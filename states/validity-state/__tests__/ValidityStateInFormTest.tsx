import React from 'react'
import { ValidityStateTest, type ValidityStateTestProps } from './ValidityStateTest.js'
import { ValidityStateProvider } from './ValidityStateProvider.js'



export const ValidityStateInFormTest = (props: ValidityStateTestProps) => {
    return (
        <ValidityStateProvider>
            <ValidityStateTest {...props} />
        </ValidityStateProvider>
    );
};
