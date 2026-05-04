// React:
import {
    // Types:
    type Key,
    type RefObject,
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
    type ValueChangeEventHandler,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateProps,
    type FeedbackStateUpdateProps,
    type FeedbackStateOptions,
    type FeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/**
 * NOTE:
 * 
 * Sort-state does not expose a `sorted` prop (user intent)
 * to keep the component in a **continuously** sorted condition or to loop the animation indefinitely.
 * Instead, sorting animations are triggered only when the `stagedSortData` prop changes,
 * and they run **once** to transition items into their new order.
 * 
 * For this reason, sort-state uses the -ing form (`is-sorting`, `not-sorting`, `sorting`)
 * to reflect a **transient** activity flag —
 * rather than the -ed form (`sorted`, `actualSorted`) which would imply a **persistent** intent-driven condition.
 */



/**
 * Callback for committing staged sort data into the committed state (the authoritative state that renders the sortable items).
 * 
 * @template TSortData - The type of the data driving the sortable elements (commonly an array of item metadata).
 * 
 * @param stagedSortData - The staged sort data to commit into the committed state.
 */
export type SortCommitCallback<TSortData = Array<unknown>> = (stagedSortData: TSortData) => void



/**
 * Props for staging sort data and coordinating item transitions.
 * 
 * Sorting animation runs once when `stagedSortData` changes,
 * allowing the component to measure item movement and commit the new order.
 * 
 * @template TItemElement - The type of the sortable DOM element.
 * @template TSortData - The type of the data driving the sortable elements (commonly an array of item metadata).
 */
export interface SortStateProps<TItemElement extends Element = HTMLElement, TSortData = Array<unknown>>
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState'> // Currently equivalent to an empty object, reserved for future extensions.
{
    /**
     * References to the sortable item elements, keyed by their stable React `key`.
     * 
     * - Used to snapshot positions before and after a sort commit,
     *   then diff to calculate movement offsets.
     * - Elements must exist both before and after the sort for accurate measurement.
     * - Disappearing or newly added elements are ignored.
     * 
     * Why keys?
     * React `key`s provide a stable identity for each item across renders.
     * By storing refs keyed to these identities, we can:
     * - Reconstruct `sortOffsets`: numeric deltas (x, y) describing each item's
     *   movement from unsorted → sorted position.
     * - Reconstruct `sortStyles`: inline CSS variables exposing each item's
     *   unsorted position in a styling-friendly form.
     * 
     * This keyed design makes offsets and styles retrievable by item identity
     * during JSX iteration (e.g. `style={sortStyles.get(item.id)}`)
     */
    sortItemRefs   ?: RefObject<Map<Key, TItemElement>>
    
    /**
     * Specifies the temporary (staged) sort data that is ready to be committed.
     * 
     * When provided, this value will be merged into the committed state on the next render cycle,
     * triggering the sorting animation and transition measurement.
     * Pass `undefined` when there is no pending order to avoid unnecessary animations.
     * 
     * @example
     * ```ts
     * // Array-based staged sort data:
     * stagedSortData={stagedData.length ? stagedData : undefined}
     * 
     * // Nullable staged sort data:
     * stagedSortData={stagedData ?? undefined}
     * 
     * // Custom empty-state sentinel:
     * stagedSortData={isDataEmpty(stagedData) ? undefined : stagedData}
     * ```
     * 
     * Defaults to `undefined` (no pending order).
     */
    stagedSortData ?: TSortData
    
    /**
     * Commits the staged sort data into the committed state (the authoritative state that renders the sortable items).
     * 
     * - Used to update the committed state in the component.
     * - Should be wrapped in `flushSync` to ensure React has fully rendered the committed state
     *   before this callback returns.
     * 
     * @example
     * ```ts
     * onSortCommit: (stagedSortData) => {
     *     // Use `flushSync` so React fully renders the committed state immediately within this callback:
     *     // - Ensures item positions can be diffed accurately between the **before and after** states.
     *     // - Produces correct movement offsets for the animation.
     *     flushSync(() => {
     *         // Commit the new sorted order:
     *         setCommittedData(stagedSortData);
     *     });
     * },
     * ```
     */
    onSortCommit   ?: SortCommitCallback<TSortData>
}

/**
 * Props for clearing the external staged sort data after a commit.
 */
export interface SortStateClearProps
    extends
        // Bases:
        Omit<FeedbackStateUpdateProps<boolean>, 'onStateUpdate'> // Currently equivalent to an empty object, reserved for future extensions.
{
    /**
     * Signals to clear the external staged sort data.
     * 
     * The implementors should reset their staged sort state to an empty sentinel, such as:
     * - `[]` (empty array)
     * - `undefined`
     * - `null`
     * - or any other value representing "no staged sort"
     * 
     * Ensures that commit and clear are coordinated,
     * preventing stale staged data from persisting after the committed order is applied.
     */
    onStagedSortDataClear ?: ValueChangeEventHandler<undefined, unknown>
}

/**
 * Optional configuration options for customizing sort transition behavior and animation lifecycle.
 */
export interface SortStateOptions
    extends
        // Bases:
        FeedbackStateOptions<boolean>
{
    /**
     * Defines the pattern used to identify sort-related animation names.
     * 
     * This pattern determines which animation names are recognized as part of the sorting transition lifecycle.
     * 
     * Supports:
     * - A string suffix (with word-boundary awareness)
     * - An array of suffixes
     * - A RegExp for advanced matching
     * 
     * Word-boundary behavior mimics regex `\b` semantics:
     * - If the matched pattern starts with a non-word character, it's always considered boundary-safe.
     * - Otherwise, the character preceding the suffix must be a non-word character or undefined.
     * 
     * Defaults to `'sorting'`.
     */
    animationPattern  ?: FeedbackStateOptions<boolean>['animationPattern']
    
    /**
     * Enables listening to animation events bubbling up from nested child elements.
     * Useful when the animated node is deeply nested within the component.
     * 
     * Defaults to `false` (no bubbling).
     */
    animationBubbling ?: FeedbackStateOptions<boolean>['animationBubbling']
}

/**
 * A CSS class name for triggering the sorting animation.
 * 
 * Used for styling based on the current sorting state.
 */
export type SortClassname = 'is-sorting' | 'not-sorting'

/**
 * Represents a relative translation (delta) for a sortable element.
 * 
 * Note:
 * - These are **physical coordinates** (pixel deltas) derived from sort movements.
 * - They describe how far an element must shift along the x/y axes to recreate
 *   its unsorted illusion relative to the current sorted layout.
 * - They are not logical layout values.
 */
export interface SortOffset {
    /**
     * Horizontal delta in pixels.
     * Positive values move the element to the right,
     * negative values move it to the left.
     */
    x : number
    
    /**
     * Vertical delta in pixels.
     * Positive values move the element downward,
     * negative values move it upward.
     */
    y : number
}

/**
 * NOTE:
 * 
 * Unlike intent-driven packages (e.g. disabled-state), sort-state does not include
 * an `actualSorting` flag in its public API.
 * In activity-driven sorting, the trigger for animations is modeled as `symbol`:
 * - `Symbol()` : a unique pulse value that queues a new sorting animation.
 * 
 * Using `symbol` ensures that consecutive `stagedSortData` changes
 * always produce a distinct trigger value, so `useFeedbackBehaviorState`
 * detects each change reliably. A plain boolean could not re-trigger if set
 * to `true` twice in a row, but a new `Symbol()` guarantees uniqueness.
 * 
 * Internally, `useSortBehaviorState` still leverages `useFeedbackBehaviorState`
 * with an **ephemeral** `sorted` value for implementation symmetry with
 * `useDisabledBehaviorState`. However, only the animation-aware `sorting` flag
 * and its associated classname are exposed.
 * There's no `actualSorting` that driven directly by user's intent for triggering animations,
 * so it is intentionally omitted from the public API to avoid confusion.
 * 
 * The `sortPhase` is also not included since it's a boolean-like activity flag
 * that can be replaced by the more intuitive `sorting`.
 */

/**
 * An API for accessing the current sorting activity status, associated CSS class name, and animation event handlers.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface SortBehaviorState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackBehaviorState<boolean, string, SortClassname, TElement>,
            | 'prevSettledState'
            | 'state'
            | 'actualState'
            | 'transitionPhase'
            | 'transitionClassname'
        >
{
    /**
     * The current sorting activity status used for animation-aware rendering and behavioral coordination.
     * 
     * This reflects whether the sorting transition is actively running.
     * 
     * Useful for styling and rendering decisions that depend on the visually active sorting transition on screen.
     * 
     * Possible values:
     * - `true`  : the sorting transition is currently active
     * - `false` : the sorting transition is idle
     */
    sorting       : FeedbackBehaviorState<boolean, string, SortClassname, TElement>['state']
    
    /**
     * Translates each sortable element back to its **unsorted position**.
     * 
     * Provides raw numeric deltas (x, y) for each sortable element,
     * keyed by its stable React `key`.
     * 
     * When multiplied by `sortFactor` (transitioning from 1 → 0),
     * these offsets create the illusion that items remain in their unsorted positions
     * while gradually settling into their sorted order.
     * 
     * Useful for animation authors who need direct numeric deltas for
     * driving custom sorting transitions.
     */
    sortOffsets   : Map<Key, SortOffset>
    
    /**
     * A CSS class name for triggering the sorting animation.
     * 
     * Possible values:
     * - `'is-sorting'`
     * - `'not-sorting'`
     */
    sortClassname : FeedbackBehaviorState<boolean, string, SortClassname, TElement>['transitionClassname']
    
    /**
     * Provides inline CSS variables for styling each sortable element,
     * keyed by its stable React `key`.
     * 
     * Each element receives `--so-sortOffsetX` and `--so-sortOffsetY`,
     * providing the translation back to its **unsorted position**
     * in a styling-friendly form.
     * 
     * When multiplied by `sortFactor` (transitioning from 1 → 0),
     * these variables create the illusion that items remain in their unsorted positions
     * while gradually settling into their sorted order.
     * 
     * Useful for animation authors who need direct numeric deltas for
     * driving custom sorting transitions.
     * 
     * The returned map and style objects are referentially stable
     * as long as the variable values remain unchanged,
     * avoiding unnecessary re-renders.
     */
    sortStyles    : Map<Key, CSSProperties>
}



/**
 * A list of sort-related CSS variables used for sorting-aware styling.
 * 
 * The keys are used for semantic mapping and documentation purposes. The values are ignored.
 */
export interface SortStateVars {
    /**
     * References an animation used during sorting actions.
     * It becomes invalid (`unset`) when no sorting animation is running.
     * 
     * Typically, this variable is not consumed directly.
     * Prefer: `const { animationFeatureVars: { animation } } = usesAnimationFeature();`
     */
    animationSorting : unknown
    
    /**
     * A normalized, animatable factor representing the **sorting progress**.
     * 
     * ### Expected values:
     * - **1**     : unsorted illusion (items offset back to their original unsorted positions)
     * - **0**     : fully sorted baseline (items settled into their sorted positions)
     * - **1 → 0** : sorting progress (unsorted → sorted)
     * 
     * ### Usage:
     * - Applicable to numeric-based properties such as `translate`, `opacity`, `scale`, `color`, etc.
     * - Implementators are responsible for assigning transitional values in their animations.
     *   For example, a sorting animation might interpolate `sortFactor` from 1 → 0.
     * - Values outside the 0–1 range are allowed, and implementors must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 1`, `90%: -0.2`, `100%: 0`  
     *   The undershoot value `-0.2` at `90%` is intentional, creating an over-trip effect.
     * 
     * ### Notes:
     * - Already registered as an animatable custom property; no need to apply `@property` manually.
     * - **Value rationale:**  
     *   - The factor represents the sorting progress, not a persistent condition.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `sortFactor = 1`: active unsorted illusion  
     *     - `sortFactor = 0`: idle, fully sorted baseline
     */
    sortFactor       : unknown
    
    /**
     * A conditional mirror of `sortFactor` representing the **sorting progress**.
     * Mirrors `sortFactor` during animation, but is explicitly
     * set to `unset` once the animation completes.
     * 
     * ### Expected values:
     * - **1**     : unsorted illusion (items offset back to their original unsorted positions, mirrors `sortFactor`)
     * - **unset** : fully sorted baseline (items settled into their sorted positions, declaration dropped)
     * - **1 → 0** : sorting progress (unsorted → sorted)
     * 
     * ### Usage:
     * - Use when dependent properties should be **poisoned** (ignored) once idle.
     *   Example: gating `translate`, `opacity`, or other overrides that should disappear when idle.
     * - During animation, `sortFactorCond` mirrors the numeric
     *   value of `sortFactor`, ensuring smooth progress and consistency.
     * - Applicable to numeric-based properties such as `translate`, `opacity`, `scale`, `color`, etc.
     * - Values outside the 0–1 range are allowed, and implementors must handle them appropriately.  
     *   Example of an animation with a spring/bump effect:  
     *     `0%: 1`, `90%: -0.2`, `100%: 0`  
     *   The undershoot value `-0.2` at `90%` is intentional, creating an over-trip effect.
     * 
     * ### Notes:
     * - **Value rationale:**  
     *   - The factor represents the sorting progress, not a persistent condition.  
     *   - Mirrors the sorting progress while the animation is running.  
     *   - Drops to `unset` only when idle, so dependent declarations fall back cleanly.  
     *   - This keeps naming predictable and teachable across the ecosystem:
     *     - `sortFactorCond = 1`: active unsorted illusion  
     *     - `sortFactorCond = unset`: idle (fully sorted baseline, declaration dropped)  
     * - **Naming rationale:**  
     *   - `Cond` suffix indicates conditional presence: mirrors numeric factor while the animation is running,
     *     but conditionally drops to `unset` at baseline idle.
     */
    sortFactorCond   : unknown
    
    /**
     * Translates the current sortable element back to its **unsorted position**.
     * 
     * Provides the raw horizontal delta (x axis) for this element,
     * translating from its sorted placement to its original unsorted coordinate.
     * 
     * When multiplied by `sortFactor` (transitioning from 1 → 0),
     * this offset creates the illusion that the item remains in its unsorted position
     * while gradually settling into its sorted order.
     * 
     * Useful for animation authors who need direct numeric deltas for
     * driving custom sorting transitions.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use with `calc(... * 1px)` to apply as a pixel translation.
     * 
     * @example
     * ```ts
     * export const sortableComponentItemStyle = () => style({
     *     // Translate the item horizontally back to its unsorted position:
     *     transform : `translateX(calc(${sortStateVars.sortOffsetX} * 1px))`,
     * });
     * ```
     */
    sortOffsetX      : unknown
    
    /**
     * Translates the current sortable element back to its **unsorted position**.
     * 
     * Provides the raw vertical delta (y axis) for this element,
     * translating from its sorted placement to its original unsorted coordinate.
     * 
     * When multiplied by `sortFactor` (transitioning from 1 → 0),
     * this offset creates the illusion that the item remains in its unsorted position
     * while gradually settling into its sorted order.
     * 
     * Useful for animation authors who need direct numeric deltas for
     * driving custom sorting transitions.
     * 
     * Always resolves to a numeric unitless value (the value in pixels).
     * Use with `calc(... * 1px)` to apply as a pixel translation.
     * 
     * @example
     * ```ts
     * export const sortableComponentItemStyle = () => style({
     *     // Translate the item vertically back to its unsorted position:
     *     transform : `translateY(calc(${sortStateVars.sortOffsetY} * 1px))`,
     * });
     * ```
     */
    sortOffsetY      : unknown
}



/**
 * Configuration options for customizing sorting transitions.
 */
export interface CssSortStateOptions {
    /**
     * Defines the animation to apply during sorting actions.
     * 
     * When the `stagedSortData` prop changes, the currently running animation is allowed to complete gracefully—
     * preventing abrupt interruptions or visual glitches.
     * 
     * Accepts a single animation or multiple layered animations.
     */
    animationSorting ?: CssKnownProps['animation']
}



/**
 * Provides a CSS API for conditionally apply the sorting transition whenever a sorting action occurs.
 */
export interface CssSortState {
    /**
     * Generates CSS rules that conditionally apply the sorting transition whenever a sorting action occurs.
     * 
     * Typically used to toggle animation variables during sorting actions.
     */
    sortStateRule : Lazy<CssRule>
    
    /**
     * Exposes sort-related CSS variables for conditional animation.
     * 
     * Includes:
     * - `animationSorting`: Active during sorting actions.
     * 
     * ⚠️ **Caution**: The `animationSorting` variable becomes invalid when the component is idle.
     * If used improperly, it can invalidate the entire CSS declaration.
     * Always wrap it with `switchOf(...)` to ensure graceful fallback.
     * 
     * These variables are strongly typed and automatically resolve to consistent CSS variable names.
     */
    sortStateVars : CssVars<SortStateVars>
}
