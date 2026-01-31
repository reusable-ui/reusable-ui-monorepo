// cssfn:
import { cssVars, } from '@cssfn/core'; // writes css in javascript
// Reusable-ui states:
import { usesActiveTransition, } from '@reusable-ui/active-transition'; // Provides default CSS transitions for active state styling. Emphasizes theme colors to make components visually stand out when active.
const [activeAsClickVars] = cssVars({ prefix: 'ak', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names
/**
 * @deprecated since v7.0.0
 * Deprecated in favor of `@reusable-ui/active-transition`.
 * Previously used to style components as "clicked" when active.
 *
 * This API now simply delegates to `usesActiveTransition` and exposes
 * the legacy variable bundle for migration purposes.
 *
 * @returns An `ActiveAsClickStuff` representing the deprecated active-as-click state.
 */
export const usesActiveAsClick = () => {
    // Transitions:
    const { activeTransitionRule } = usesActiveTransition();
    return {
        activeAsClickRule: () => activeTransitionRule(),
        activeAsClickVars,
    };
};
