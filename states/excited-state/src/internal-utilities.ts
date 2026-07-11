// Types:
import {
    type ExcitedStateProps,
    type ExcitedStateOptions,
    type ExcitedClassname,
}                           from './types.js'
import {
    type ExcitedStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveActivityClassnameArgs,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/** Resolves the semantic activity classname for excited state behavior. */
export const resolveExcitedActivityClassname = ({ visualState }: ResolveActivityClassnameArgs<boolean, ExcitedStateProps, ExcitedStateOptions, ExcitedStateDefinition>): ExcitedClassname => {
    return visualState ? 'is-excited' : 'not-excited';
};
