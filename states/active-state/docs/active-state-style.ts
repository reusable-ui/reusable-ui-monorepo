// Variants:
import { usesOutlineVariant } from '@reusable-ui/outline-variant';
import { usesMildVariant } from '@reusable-ui/mild-variant';

// Features:
import { usesBackgroundFeature, /* backgroundOverrideRegistry */ } from '@reusable-ui/background-feature'
import { usesForegroundFeature, /* foregroundOverrideRegistry */ } from '@reusable-ui/foreground-feature'
import { usesBorderFeature, /* borderOverrideRegistry */ } from '@reusable-ui/border-feature'
import { usesDecorationFeature, /* decorationOverrideRegistry */ } from '@reusable-ui/decoration-feature'

// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Filter feature:
import { usesFilterFeature, filterRegistry } from '@reusable-ui/filter-feature';

// Active/inactive state:
import { usesActiveState } from '@reusable-ui/active-state';

// CSS-in-JS:
import { atRule, children, style, vars, keyframes, switchOf } from '@cssfn/core';

filterRegistry.registerFilter('var(--activeFilter)');

// Not yet implemented by background/foreground/decoration features:
// backgroundRegistry.registerBackgroundOverride('var(--activeBackgColor)', /* priority: */ 80);
// foregroundRegistry.registerForegroundOverride('var(--activeForegColor)', /* priority: */ 80);
// borderOverrideRegistry.registerForegroundOverride('var(--activeBorderColor)', /* priority: */ 80);
// decorationRegistry.registerDecorationOverride('var(--activeDecorColor)', /* priority: */ 80);

/**
 * Vanilla implementation for an activatable box style.
 * 
 * Lifecycle semantics:
 * - Deactivating transition:
 *   - Colors  : unchanged for all variants.
 *   - Filters : unchanged for all variants.
 * - Settled inactive:
 *   - Active color/filter variables resolve to base feature colors (factor = 0).
 * - Activating transition:
 *   - Colors:
 *     - Regular       : unchanged (still regular color).
 *     - Outlined/Mild : interpolates to regular color.
 *   - Filters:
 *     - Regular       : interpolates to brightness(65%) + contrast(150%).
 *     - Outlined/Mild : unchanged (no filter).
 * - Settled active:
 *   - Active color/filter variables remain set even after animation completes.
 */
export const activatableBoxStyle = () => {
    const {
        outlineVariantVars : { isOutlined },
    } = usesOutlineVariant();
    
    const {
        mildVariantVars    : { isMild },
    } = usesMildVariant();
    
    
    const {
        backgroundFeatureVars : { backgRegularCond, backgColor },
    } = usesBackgroundFeature();
    
    const {
        foregroundFeatureVars : { foregRegularCond, foregColor },
    } = usesForegroundFeature();
    
    const {
        borderFeatureVars     : { borderRegularCond, borderColor },
    } = usesBorderFeature();
    
    const {
        decorationFeatureVars : { decorRegularCond, decorColor },
    } = usesDecorationFeature();
    
    
    const {
        animationFeatureRule,
        animationFeatureVars : { animation },
    } = usesAnimationFeature();
    
    const {
        filterFeatureRule,
        filterFeatureVars    : { filter },
    } = usesFilterFeature();
    
    
    const {
        activeStateRule,
        activeStateVars: { isActive },
    } = usesActiveState({
        animationActivating   : 'var(--box-activating)',
        animationDeactivating : 'var(--box-deactivating)',
    });
    
    
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply filter feature rules:
        ...filterFeatureRule(),
        
        // Apply active/inactive state rules:
        ...activeStateRule(),
        
        
        
        /**
         * Animatable factor:
         * - Normalized number: 0 → inactive, 1 → active.
         * - Always defined (initialValue = 0).
         * - Drives all interpolations (colors, filters, transforms).
         */
        ...atRule('@property --activeFactor', {
            // @ts-ignore
            syntax       : '"<number>"',
            inherits     : true,
            initialValue : 0,
        }),
        
        
        
        //#region Transitioning animations
        // Activating animation: 0 → 1
        ...vars({
            '--box-activating': [
                ['0.3s', 'ease-out', 'both', 'transition-activating'],
            ],
        }),
        ...keyframes('transition-activating', {
            from: {
                '--activeFactor' : 0,
            },
            to: {
                '--activeFactor' : 1,
            },
        }),
        
        // Deactivating animation: 1 → 0
        ...vars({
            '--box-deactivating': [
                ['0.3s', 'ease-out', 'both', 'transition-deactivating'],
            ],
        }),
        ...keyframes('transition-deactivating', {
            from: {
                '--activeFactor' : 1,
            },
            to: {
                '--activeFactor' : 0,
            },
        }),
        //#endregion Transitioning animations
        
        
        
        //#region Settled active state
        /**
         * Force factor to `1` when fully active, otherwise `0`.
         * 
         * No explicit fallback needed; @property ensures it resolves to `0`.
         * 
         * This variable is agnostic to animation style:
         * - Can drive color, filter, transform, rotation, etc.
         */
        '--activeFactor': [[
            // Only applies if in active state:
            isActive,
            
            // The fully active value:
            1,
        ]],
        //#endregion Settled active state
        
        
        
        // Configurable filter targets for regular variant:
        '--configBrightness' : 0.65, // 65% brightness
        '--configContrast'   : 1.5,  // 150% contrast
        '--configSaturate'   : 1,    // 100% saturation
        
        
        
        // Conditional active intent filters:
        /**
         * Suppresses filters when the variant is either outlined or mild.
         * Value = `1` (no effect). Otherwise `unset` → falls back to config values.
         */
        '--noFilter'         : [[
            // Only applies if either outlined or mild:
            switchOf(
                isOutlined,
                // or
                isMild,
            ),
            
            // No effect filter value:
            1,
        ]],
        
        /**
         * A brightness adjustment level for regular variant.
         * When the variant is not regular, it becomes no effect.
         */
        '--activeBrightness' : switchOf(
            'var(--noFilter)',
            'var(--configBrightness)',
        ),
        
        /**
         * A contrast adjustment level for regular variant.
         * When the variant is not regular, it becomes no effect.
         */
        '--activeContrast'   : switchOf(
            'var(--noFilter)',
            'var(--configContrast)',
        ),
        
        /**
         * A saturation adjustment level for regular variant.
         * When the variant is not regular, it becomes no effect.
         */
        '--activeSaturate'   : switchOf(
            'var(--noFilter)',
            'var(--configSaturate)',
        ),
        
        
        
        //#region Active colors and filters
        /**
         * Conditional active background color.
         */
        '--activeBackgColor' : `color-mix(in oklch, ${backgColor} calc((1 - var(--activeFactor)) * 100%), ${switchOf(backgRegularCond, backgColor)} calc(var(--activeFactor) * 100%))`,
        
        /**
         * Conditional active foreground color.
         */
        '--activeForegColor' : `color-mix(in oklch, ${foregColor} calc((1 - var(--activeFactor)) * 100%), ${switchOf(foregRegularCond, foregColor)} calc(var(--activeFactor) * 100%))`,
        
        /**
         * Conditional active border color.
         */
        '--activeBorderColor' : `color-mix(in oklch, ${borderColor} calc((1 - var(--activeFactor)) * 100%), ${switchOf(borderRegularCond, borderColor)} calc(var(--activeFactor) * 100%))`,
        
        /**
         * Conditional active decoration color.
         */
        '--activeDecorColor' : `color-mix(in oklch, ${decorColor} calc((1 - var(--activeFactor)) * 100%), ${switchOf(decorRegularCond, decorColor)} calc(var(--activeFactor) * 100%))`,
        
        
        
        /**
         * Conditional active filter (brightness + contrast + saturate).
         * 
         * Interpolation pattern reminder:
         *   formula = baseline + ((target - baseline) * factor)
         * - baseline = 1 (neutral multiplier for filters)
         * - target   = desired multiplier (e.g. 0.65 brightness, 1.5 contrast)
         * - factor   = --activeFactor (0 → inactive, 1 → active)
         * 
         * Example for brightness:
         *   brightness(calc(1 + ((0.65 - 1) * factor)))
         *   → factor=0 → 1 (no change)
         *   → factor=1 → 0.65 (dimmed)
         *   → smooth linear interpolation in between
         */
        '--activeFilter'     : [[
            'brightness(calc(1 + ((var(--activeBrightness) - 1) * var(--activeFactor))))',
            'contrast(calc(1 + ((var(--activeContrast) - 1) * var(--activeFactor))))',
            'saturate(calc(1 + ((var(--activeSaturate) - 1) * var(--activeFactor))))',
        ]],
        //#endregion Active colors and filters
        
        
        
        /**
         * Registries:
         * - `--activeFilter` is registered in filterRegistry.
         *   At factor = 0 → brightness(1) contrast(1) saturate(1).
         * - `--activeBackgColor`, `--activeForegColor`, `--activeBorderColor`, `--activeDecorColor`
         *   can be registered in background/foreground/border/decoration registries.
         *   At factor = 0 → resolve to base feature colors.
         */
        
        
        
        // Apply base feature colors (overridden by registries if active):
        backgroundColor     : backgColor,
        color               : foregColor,
        borderColor         : borderColor,
        ...children('.icon', {
            backgroundColor : decorColor,
        }),
        
        // Apply composed animations:
        animation,
        
        // Apply composed filters:
        filter,
    });
};
