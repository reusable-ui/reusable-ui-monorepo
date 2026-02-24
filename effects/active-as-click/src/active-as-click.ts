// cssfn:
import {
    // cssfn general types:
    type Factory,
    
    
    
    // cssfn css specific types:
    type CssRule,
    
    
    
    // strongly typed of css variables:
    type CssVars,
    cssVars,
}                           from '@cssfn/core'                      // writes css in javascript

// Reusable-ui states:
import {
    usesActiveEffect,
}                           from '@reusable-ui/active-effect'       // Provides default visual effects for active state styling. Emphasizes theme colors by making components visually stand out when active.



/**
 * @deprecated since v7.0.0
 * Deprecated in favor of `@reusable-ui/active-effect`.
 * Represents the CSS variables used by the legacy active-as-click styling.
 * 
 * NOTE: This package is no longer a compatibility layer — it exists only
 * as a migration guide. There is no 1:1 equivalent replacement.
 */
export interface ActiveAsClickVars {
    filterActive            : any
    
    animPress               : any
    animRelease             : any
    
    animActive              : any
    animPassive             : any
    
    animActiveAsClick       : any
    animPassiveAsClick      : any
    
    
    
    altFilterActiveTg       : any
    
    altAnimPressTg          : any
    altAnimReleaseTg        : any
    
    altAnimActiveTg         : any
    altAnimPassiveTg        : any
    
    altAnimActiveAsClickTg  : any
    altAnimPassiveAsClickTg : any
}
const [activeAsClickVars] = cssVars<ActiveAsClickVars>({ prefix: 'ak', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



/**
 * @deprecated since v7.0.0
 * Deprecated in favor of `@reusable-ui/active-effect`.
 * Represents the legacy active-as-click rule and variables bundle.
 */
export interface ActiveAsClickStuff { activeAsClickRule: Factory<CssRule>, activeAsClickVars: CssVars<ActiveAsClickVars> }

/**
 * @deprecated since v7.0.0
 * Deprecated in favor of `@reusable-ui/active-effect`.
 * Previously used to style components as "clicked" when active.
 * 
 * This API now simply delegates to `usesActiveEffect` and exposes
 * the legacy variable bundle for migration purposes.
 * 
 * @returns An `ActiveAsClickStuff` representing the deprecated active-as-click state.
 */
export const usesActiveAsClick = (): ActiveAsClickStuff => {
    // Effects:
    const { activeEffectRule } = usesActiveEffect();
    
    
    
    return {
        activeAsClickRule: (): CssRule => activeEffectRule(),
        activeAsClickVars,
    };
};
