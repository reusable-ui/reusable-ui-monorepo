// React:
import {
    // Types:
    type Key,
    type RefObject,
    type CSSProperties,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeHandler,
}                           from '@reusable-ui/controllable'        // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).

// Reusable-ui states:
import {
    // Types:
    type FeedbackStateProps,
    type FeedbackStateOptions,
    type FeedbackState,
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
 * Handler for committing staged sort data into the committed state (the authoritative state that renders the sortable items).
 * 
 * @template TSortData - The type of the data driving the sortable elements (commonly an array of item metadata).
 * 
 * @param stagedSortData - The staged sort data to commit into the committed state.
 */
export type SortCommitHandler<TSortData = Array<unknown>> = (stagedSortData: TSortData) => void



/**
 * Props for animating sort transitions of the component's items.
 * 
 * Provides a declarative way to stage and animate item reordering whenever a sorting action occurs,
 * along with an optional callback to clear the staged data once it has been committed.
 * 
 * Sorting animations run once when `stagedSortData` changes,
 * allowing the component to snapshot positions, measure item movement, and commit the new order.
 * 
 * @template TItemElement - The type of the sortable DOM element.
 * @template TSortData - The type of the data driving the sortable elements (commonly an array of item metadata).
 */
export interface SortStateProps<TItemElement extends Element = HTMLElement, TSortData = Array<unknown>>
    extends
        // Bases:
        Omit<FeedbackStateProps<boolean>, 'effectiveState' | 'onStateUpdate'> // Currently equivalent to an empty object, reserved for future extensions.
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
     * during JSX iteration (e.g. `style={sortStyles.get(item.id)}`).
     */
    sortItemRefs          ?: RefObject<Map<Key, TItemElement>>
    
    /**
     * Provides the temporary (staged) sort data that is ready to be committed.
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
    stagedSortData        ?: TSortData
    
    /**
     * Signals a command to clear the external staged sort data.
     * 
     * Implementors should reset their staged sort state to an empty sentinel, such as:
     * - `[]` (empty array)
     * - `undefined`
     * - `null`
     * - or any other value representing "no staged sort"
     * 
     * Ensures that commit and clear are coordinated,
     * preventing stale staged data from persisting after the committed order is applied.
     * 
     * ⚠️ Note: Clearing staged data can also be done inside `onSortCommit()`
     * (for example, commit and clear atomically within a `flushSync` block).
     * However, using this dedicated `onStagedSortDataClear()` callback is recommended,
     * since derived components may override `onSortCommit()` with custom commit logic.
     * In such cases, `onStagedSortDataClear()` ensures the staged data is reset reliably,
     * regardless of how the commit logic is implemented.
     */
    onStagedSortDataClear ?: ValueChangeHandler<undefined, unknown>
    
    /**
     * Commits the staged sort data into the committed state (the authoritative state that renders the sortable items).
     * 
     * - Used to update the committed state in the component.
     * - Should be wrapped in `flushSync` to ensure React has fully rendered the committed state
     *   before this callback returns.
     * - Clearing staged data may also be done here,
     *   but note that `onStagedSortDataClear()` is the recommended place
     *   to ensure reset consistency if commit logic is overridden.
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
    onSortCommit          ?: SortCommitHandler<TSortData>
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
 * always produce a distinct trigger value, so `useFeedbackState`
 * detects each change reliably. A plain boolean could not re-trigger if set
 * to `true` twice in a row, but a new `Symbol()` guarantees uniqueness.
 * 
 * Internally, `useSortState` still leverages `useFeedbackState`
 * with an **ephemeral** `sorted` value for implementation symmetry with
 * `useDisabledState`. However, only the animation-aware `sorting` flag
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
export interface SortState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Omit<FeedbackState<boolean, string, SortClassname, TElement>,
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
    sorting       : FeedbackState<boolean, string, SortClassname, TElement>['state']
    
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
    sortClassname : FeedbackState<boolean, string, SortClassname, TElement>['transitionClassname']
    
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
