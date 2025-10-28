// React:
import {
    // Types:
    type CSSProperties,
}                           from 'react'

// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssKnownProps,
    type CssRule,
    
    
    
    // Strongly typed of css variables:
    type CssVars,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeDispatcher,
    type ValueChangeEventHandler,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Types:
    type AnimationStateOptions,
    type AnimationStateHandlers,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Props for controlling the current view index of the component.
 * 
 * Accepts an optional `viewIndex` prop, defaulting to `0` (first view) when not provided.
 */
export interface ViewStateProps {
    /**
     * Specifies the current view index:
     * - `0`, `1`, `2`, … : the component is showing the view at the given index
     * 
     * Defaults to `undefined` (uncontrolled mode).
     */
    viewIndex ?: number
}

/**
 * Props for initializing the view index in uncontrolled components.
 * 
 * Enables default view behavior when the parent does not actively manage state.
 * Commonly used in components like `<Tabs>`, `<Slide>`, or `<Carousel>` that switch content
 * without requiring external control or feedback loops.
 */
export interface UncontrollableViewStateProps {
    /**
     * Specifies the initial view index for uncontrolled mode:
     * - `0`, `1`, `2`, … : the component is initially showing the view at the given index
     * 
     * Defaults to `0` (first view).
     */
    defaultViewIndex ?: number
}

/**
 * Props for reporting a change request to the view index.
 * 
 * Typically used in interactive components (e.g. Tabs, Slide, Carousel) that may initiate view changes
 * through user actions such as tab clicks, swipe gestures, or navigation buttons.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. tab click, swipe gesture).
 */
export interface ViewStateChangeProps<TChangeEvent = unknown> {
    /**
     * Signals intent to change the view index:
     * - `0`, `1`, `2`, … : request to navigate to the given index
     * 
     * The parent may choose to honor or ignore this request.
     */
    onViewIndexChange ?: ValueChangeEventHandler<number, TChangeEvent>
}

/**
 * Props for listening lifecycle events triggered by view phase transitions.
 * 
 * These events allow external listeners to react to phase changes—such as logging, analytics,
 * or chaining animations.
 */
export interface ViewStatePhaseEventProps {
    /**
     * Called when the progressing (next) view transition begins.
     * 
     * Triggered when the component starts animating toward a higher index.
     */
    onViewProgressingStart ?: ValueChangeEventHandler<ViewPhase, unknown>
    
    /**
     * Called when the progressing (next) view transition completes.
     * 
     * Triggered when the component settles at the target index after moving forward.
     */
    onViewProgressingEnd   ?: ValueChangeEventHandler<ViewPhase, unknown>
    
    /**
     * Called when the regressing (previous) view transition begins.
     * 
     * Triggered when the component starts animating toward a lower index.
     */
    onViewRegressingStart  ?: ValueChangeEventHandler<ViewPhase, unknown>
    
    /**
     * Called when the regressing (previous) view transition completes.
     * 
     * Triggered when the component settles at the target index after moving backward.
     */
    onViewRegressingEnd    ?: ValueChangeEventHandler<ViewPhase, unknown>
}

/**
 * Optional configuration options for customizing view-switching behavior and animation lifecycle.
 */
export interface ViewStateOptions
    extends
        // Bases:
        Partial<Pick<AnimationStateOptions<number>,
            | 'animationPattern'
            | 'animationBubbling'
        >>
{
    /**
     * Specifies the initial view index for uncontrolled mode when no `defaultViewIndex` prop is explicitly provided:
     * - `0`, `1`, `2`, … : the component is initially showing the view at the given index
     * 
     * Defaults to `0` (first view).
     */
    defaultViewIndex  ?: number
    
    /**
     * The minimum allowed view index.
     * 
     * This defines the lower bound of the valid view range.
     * Values below this will be clamped to `minViewIndex`.
     * 
     * Defaults to `0`, aligning with zero-based indexing conventions (e.g., arrays).
     */
    minViewIndex      ?: number
    
    /**
     * The maximum allowed view index.
     * 
     * This defines the upper bound of the valid view range.
     * Values above this will be clamped to `maxViewIndex`.
     * 
     * Defaults to `Infinity`, allowing unrestricted view navigation unless explicitly clamped.
     */
    maxViewIndex      ?: number
    
    /**
     * The step size or resolution for view index values.
     * 
     * This controls snapping behavior. A value of `1` enables integer-based snapping.
     * To allow fractional scrolling or smooth syncing, use a smaller value (e.g., `0.01`) or `0`.
     * 
     * Defaults to `1`, enabling snapping to nearest integer value.
     */
    viewIndexStep     ?: number
    
    /**
     * Defines the pattern used to identify view-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the forward/backward transition lifecycle.
     * 
     * Supports:
     * - A string suffix (with word-boundary awareness)
     * - An array of suffixes
     * - A RegExp for advanced matching
     * 
     * Word-boundary behavior mimics regex `\b` semantics:
     * - If the matched pattern starts with a non-word character, it’s always considered boundary-safe.
     * - Otherwise, the character preceding the suffix must be a non-word character or undefined.
     * 
     * Defaults to `['view-progressing', 'view-regressing']`.
     */
    animationPattern  ?: AnimationStateOptions<number>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: AnimationStateOptions<number>['animationBubbling']
}

/**
 * Represents the resolved (settled) phase of the view-switching lifecycle.
 * 
 * These states indicate that the component has completed its transition:
 * - 'view-settled'     ✅ fully settled at the target index
 */
export type ResolvedViewPhase =
    | 'view-settled'

/**
 * Represents the transitional phase of the view-switching lifecycle.
 * 
 * These states indicate that the component is currently animating toward a resolved state:
 * - 'view-progressing' 🔄 transitioning to a higher index
 * - 'view-regressing'  🔄 transitioning to a lower index
 */
export type TransitioningViewPhase =
    | 'view-progressing'
    | 'view-regressing'

/**
 * Represents the current transition phase of the view-switching lifecycle.
 * 
 * Used to distinguish between transitional and resolved states:
 * - Resolved: 'view-settled'
 * - Transitional: 'view-progressing', 'view-regressing'
 */
export type ViewPhase =
    | ResolvedViewPhase
    | TransitioningViewPhase

/**
 * An API for accessing the resolved view index, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. tab click, swipe gesture).
 */
export interface ViewBehaviorState<TElement extends Element = HTMLElement, TChangeEvent = unknown>
    extends
        // Bases:
        AnimationStateHandlers<TElement>
{
    /**
     * The current settled view index used for animation-aware rendering and behavioral coordination.
     * 
     * This value may slightly lag behind the actual resolved index due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation state.
     * 
     * Useful for rendering the active view in sync with animation state.
     * 
     * Possible values:
     * - `0`, `1`, `2`, … : the component has visually settled on the view at the given index
     */
    viewIndex               : number
    
    /**
     * The previously settled view index before the most recent transition.
     * 
     * This value trails one step behind `viewIndex`.
     * It updates only after a transition completes, and persists even after settling.
     * When no prior view exists, it resolves to `undefined`.
     * 
     * Useful for rendering both origin and destination views during animations,
     * and for inferring transition direction or layout comparisons.
     * 
     * Possible values:
     * - `undefined` : there is no prior view (e.g., on initial render)
     * - `0`, `1`, `2`, … : the component was previously settled on the view at the given index
     */
    prevViewIndex           : number | undefined
    
    /**
     * The lower bound of the currently visible view range.
     * 
     * During transitions, this reflects the smaller index between the origin and target views.
     * When settled, it equals the current `viewIndex`.
     * 
     * May be fractional if `viewIndexStep` option allows non-integer values, indicating partial visibility.
     * 
     * Useful for conditionally rendering views within the visible range,
     * minimizing unnecessary (invisible) DOM nodes.
     * 
     * For rendering discrete view elements, consider applying `Math.floor(minVisibleViewIndex)`.
     */
    minVisibleViewIndex     : number
    
    /**
     * The upper bound of the currently visible view range.
     * 
     * During transitions, this reflects the larger index between the origin and target views.
     * When settled, it equals the current `viewIndex`.
     * 
     * May be fractional if `viewIndexStep` option allows non-integer values, indicating partial visibility.
     * 
     * Useful for conditionally rendering views within the visible range,
     * minimizing unnecessary (invisible) DOM nodes.
     * 
     * For rendering discrete view elements, consider applying `Math.ceil(maxVisibleViewIndex)`.
     */
    maxVisibleViewIndex     : number
    
    /**
     * The actual resolved view index, regardless of animation state.
     * 
     * This reflects the current target index based on controlled or uncontrolled mode.
     * Unlike `viewIndex`, it updates immediately and does not wait for transitions to complete.
     * 
     * Useful for logic that needs the latest intent or target view, independent of animation lifecycle.
     */
    actualViewIndex         : number
    
    /**
     * The current transition phase of the view-switching lifecycle.
     * 
     * Reflects both transitional states (`view-progressing`, `view-regressing`) and resolved state (`view-settled`).
     */
    viewPhase               : ViewPhase
    
    /**
     * A CSS class name reflecting the current view-switching phase.
     * 
     * Possible values:
     * - `'view-settled'`
     * - `'view-progressing'`
     * - `'view-regressing'`
     */
    viewClassname           : ViewPhase
    
    /**
     * A set of inline CSS variables that reflect the current view lifecycle state.
     * 
     * Includes `--vi-viewIndex` and `--vi-prevViewIndex`, enabling animation authors to drive layout,
     * transitions, and directional inference directly from CSS.
     * 
     * The returned style object is referentially stable as long as the variable values remain unchanged.
     * This ensures predictable rendering behavior and avoids unnecessary re-renders in React.
     * 
     * These variables are updated synchronously and are safe to use in style definitions,
     * keyframes, and conditional selectors.
     */
    viewStyle               : CSSProperties
    
    /**
     * Requests a change to the view index.
     * 
     * - In uncontrolled mode (no `viewIndex` prop), updates internal state directly.
     * - In controlled mode, delegates the decision to the parent component, which may choose to accept or ignore the request.
     * - Always triggers `onViewIndexChange`, if provided, regardless of control mode.
     */
    dispatchViewIndexChange : ValueChangeDispatcher<number, TChangeEvent>
}



/**
 * A list of view-related CSS variables used for view-switching-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface ViewStateVars {
    /**
     * References an animation used during the progressing (next) view transition.
     * It becomes invalid (`unset`) when not actively animating toward a higher index.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationViewProgressing : unknown
    
    /**
     * References an animation used during the regressing (previous) view transition.
     * It becomes invalid (`unset`) when not actively animating toward a lower index.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationViewRegressing  : unknown
    
    /**
     * Applies when the component is in a fully settled state (not transitioning between views).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is in a fully settled state:
     *     opacity : `${viewStateVars.isViewSettled} 100%`,
     *     scale   : `${viewStateVars.isViewSettled} 100%`,
     * });
     * ```
     */
    isViewSettled            : unknown
    
    /**
     * Applies when the component is currently progressing toward the next view (higher index).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is currently progressing toward the next view:
     *     opacity : `${viewStateVars.isViewProgressing} 50%`,
     *     scale   : `${viewStateVars.isViewProgressing} 80%`,
     * });
     * ```
     */
    isViewProgressing        : unknown
    
    /**
     * Applies when the component is currently regressing toward the previous view (lower index).
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is currently regressing toward the previous view:
     *     opacity : `${viewStateVars.isViewRegressing} 50%`,
     *     scale   : `${viewStateVars.isViewRegressing} 80%`,
     * });
     * ```
     */
    isViewRegressing         : unknown
    
    /**
     * Applies when the component is currently transitioning, either progressing or regressing between views.
     * 
     * Acts as a conditional switch: when declared with an empty value,
     * any CSS property referencing this variable becomes valid and is applied.
     * If `unset`, the variable **poisons** dependent properties,
     * causing the browser to ignore them.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // These properties are only applied when the component is currently transitioning, either progressing or regressing between views:
     *     opacity : `${viewStateVars.isViewTransitioning} 50%`,
     *     scale   : `${viewStateVars.isViewTransitioning} 80%`,
     * });
     * ```
     */
    isViewTransitioning      : unknown
    
    /**
     * The current settled or animating target view index of the component.
     * 
     * This value may slightly lag behind the actual resolved index due to in-flight animations.
     * It updates only after an animation completes, ensuring the styling remains in sync with animation state.
     * Always resolves to a numeric unitless value.
     * 
     * Useful for index-based layout, directional styling, and animation targeting.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // Slide the correct view into place based on the current view index:
     *     translate : `calc(${viewStateVars.viewIndex} * -100%)`,
     * });
     * ```
     */
    viewIndex                : unknown
    
    /**
     * The previously settled view index before the most recent transition.
     * 
     * This value trails one step behind `viewIndex`.
     * It updates only after a transition completes, and persists even after settling.
     * When no prior view exists, it resolves to `unset`.
     * 
     * Useful for directional inference, layout comparisons, and transition-aware animations.
     * 
     * @example
     * ```ts
     * export const componentStyle = () => style({
     *     // Animate sliding from the previous view to the current view:
     *     ...keyframes('slide-view-progressing', {
     *         from : {
     *             translate : `calc(${viewStateVars.prevViewIndex} * -100%)`,
     *         },
     *         to   : {
     *             translate : `calc(${viewStateVars.viewIndex} * -100%)`,
     *         },
     *     }),
     * });
     * ```
     */
    prevViewIndex            : unknown
}



/**
 * Configuration options for customizing view-switching animations.
 */
export interface CssViewStateOptions {
    /**
     * Defines the animation to apply during the progressing (next) view transition.
     * 
     * When the `viewIndex` value changes to a lower index, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationViewProgressing ?: CssKnownProps['animation']
    
    /**
     * Defines the animation to apply during the regressing (previous) view transition.
     * 
     * When the `viewIndex` value changes to a higher index, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationViewRegressing  ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the view-switching animations based on current view index.
 */
export interface CssViewState {
    /**
     * Generates CSS rules that conditionally apply the view-switching animations based on current view index.
     * 
     * Typically used to toggle animation variables during switching-forward or switching-backward transitions.
     */
    viewStateRule : Lazy<CssRule>
    
    /**
     * Exposes view-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationViewProgressing` : Active during the progressing (next) view transition.
     * - `animationViewRegressing`  : Active during the regressing (previous) view transition.
     * 
     * ⚠️ **Caution**: These variables become invalid when the component is not in their respective transition states.
     * If used improperly, they can invalidate the entire CSS declaration.
     * Always wrap them with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    viewStateVars : CssVars<ViewStateVars>
}
