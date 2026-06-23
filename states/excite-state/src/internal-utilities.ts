// Types:
import {
    type ExciteStateProps,
    type ExciteStateOptions,
    type ExciteClassname,
}                           from './types.js'
import {
    type ExciteStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveActivityClassnameArgs,
}                           from '@reusable-ui/activity-state'      // Reusable abstraction for representing state-driven animations in React components — indicating ongoing activity or draw user attention.



/** Resolves the semantic activity classname for excited state behavior. */
export const resolveExciteActivityClassname = ({ visualState }: ResolveActivityClassnameArgs<boolean, ExciteStateProps, ExciteStateOptions, ExciteStateDefinition>): ExciteClassname => {
    return visualState ? 'is-excited' : 'not-excited';
};
