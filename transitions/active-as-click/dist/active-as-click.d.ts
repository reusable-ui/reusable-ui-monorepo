import { type Factory, type CssRule, type CssVars } from '@cssfn/core';
/**
 * @deprecated since v7.0.0
 * Deprecated in favor of `@reusable-ui/active-transition`.
 * Represents the CSS variables used by the legacy active-as-click styling.
 *
 * NOTE: This package is no longer a compatibility layer — it exists only
 * as a migration guide. There is no 1:1 equivalent replacement.
 */
export interface ActiveAsClickVars {
    filterActive: any;
    animPress: any;
    animRelease: any;
    animActive: any;
    animPassive: any;
    animActiveAsClick: any;
    animPassiveAsClick: any;
    altFilterActiveTg: any;
    altAnimPressTg: any;
    altAnimReleaseTg: any;
    altAnimActiveTg: any;
    altAnimPassiveTg: any;
    altAnimActiveAsClickTg: any;
    altAnimPassiveAsClickTg: any;
}
/**
 * @deprecated since v7.0.0
 * Deprecated in favor of `@reusable-ui/active-transition`.
 * Represents the legacy active-as-click rule and variables bundle.
 */
export interface ActiveAsClickStuff {
    activeAsClickRule: Factory<CssRule>;
    activeAsClickVars: CssVars<ActiveAsClickVars>;
}
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
export declare const usesActiveAsClick: () => ActiveAsClickStuff;
