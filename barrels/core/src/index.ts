// Reusable-ui configs:
// - Provides shared configurations (app cutomization) across UI components for consistency and seamless theming.
// - Exposes the configured values via css config variables to be consumed across component's styling.
// - Exposes configuration functions to update their variables from JavaScript code.
// - Requires to be installed as peer dependencies as these configs act as single source of truth.
/*peer*/ export * from '@reusable-ui/color-config'              // Configures theme color system across UI components.
/*peer*/ export * from '@reusable-ui/border-config'             // Configures border stroke (thickness, styling, and colors) across UI components.
/*peer*/ export * from '@reusable-ui/radius-config'             // Configures rounding system (border radii) across UI components.
/*peer*/ export * from '@reusable-ui/spacer-config'             // Configures spacer system (margins, paddings, and gaps) across UI components.
/*peer*/ export * from '@reusable-ui/breakpoint-config'         // Configures breakpoint system (responsive layouts) across UI components.
/*peer*/ export * from '@reusable-ui/typo-config'               // Configures typography (font faces, font sizes, overflow wraps, etc) across UI components.



// Reusable-ui utilities:
// - Provides common utilities for building any UI components.
export * from '@reusable-ui/strict-props'                       // Prevents forgotten or foreign props from leaking into base components and identifies them as errors at development/compile time.
export * from '@reusable-ui/numbers'                            // Handles numeric precision, decimal formatting, and clamping.
export * from '@reusable-ui/nodes'                              // Manages React nodes, fragments, forward refs, and nested structures.
export * from '@reusable-ui/resets'                             // Resets default browser styles, ensuring a clean and customizable foundation for UI design.
export * from '@reusable-ui/runtime-checks'                     // Determines whether JavaScript is running on the client-side or server-side, including JSDOM environments.
export * from '@reusable-ui/isomorphics'                        // Provides isomorphic (universal) polyfilled React hooks designed to work seamlessly across both client and server environments.
export * from '@reusable-ui/lifecycles'                         // Manages component lifecycles, ensuring stable effects, and optimizing state updates.
export * from '@reusable-ui/callbacks'                          // Manages stable callbacks and event handlers.
export * from '@reusable-ui/styles'                             // Merges styles and class names.
export * from '@reusable-ui/references'                         // Merges React refs.
export * from '@reusable-ui/directionality'                     // Handles directionality (RTL/LTR) in UI components.
export * from '@reusable-ui/timers'                             // Provides timing utilities for UI components.
export * from '@reusable-ui/controllable'                       // Provides control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).
export * from '@reusable-ui/events'                             // Generates synthetic events from underlying native events.
export * from '@reusable-ui/semantics'                          // Resolves semantic tag and role from component's props.



// Reusable-ui variants:
// - Provides common variation of component's appearances.
// - Does not change the semantic state, just for styling purpose.
// - Exposes the toggled variant state via css factor variables (numeric 0 ↔ 1).
// - Does not drive visual styling, just expose the toggled variant state.
//   The "Reusable-ui features" consumes the factors and drive the appropriate colors.

// Variant resolvers:
// - Not directly ready-to-use to be implemented in components.
export * from '@reusable-ui/effective-variant'                  // Resolves effective variant value from component's props — with optional contextual inheritance and inverting.

// Variant bases:
// - Not directly ready-to-use to be implemented in components.
// - Used for creating any variant implementations with minimal code.
export * from '@reusable-ui/switch-variant'                     // Creates switch-based variants for driving boolean-like flag variables and numeric factor variable.
export * from '@reusable-ui/config-variant'                     // Creates config-driven variants that overrides base CSS configuration variables with their variant-specific counterparts.

// Variant implementations:
// - Ready-to-use to be implemented in components.
// - Requires to be installed as peer dependencies as these variants act as single source of truth and may contain React Context for inheritance mechanism.
/*peer*/ export * from '@reusable-ui/orientation-variant'       // Varies component appearance by horizontal or vertial orientation.
/*peer*/ export * from '@reusable-ui/flow-direction-variant'    // Varies component appearance by directional placement (start or end).
/*peer*/ export * from '@reusable-ui/size-variant'              // Varies component appearance by size options (sm, md, lg).
/*peer*/ export * from '@reusable-ui/theme-variant'             // Varies component appearance by thematic color options (primary, success, danger, etc).
/*peer*/ export * from '@reusable-ui/emphasized-variant'        // Varies component appearance by emphasizing its visual presentation (a bolder look).
/*peer*/ export * from '@reusable-ui/mild-variant'              // Varies component appearance by optimize for reading experience (increase contrast and desaturate its color).
/*peer*/ export * from '@reusable-ui/outlined-variant'          // Varies component appearance for preserving background content or image (transparent body with constrast border).
/*peer*/ export * from '@reusable-ui/stripped-variant'          // Varies component appearance to blend with parent layout (stripping out the border and padding).

// Variant utilities:
export * from '@reusable-ui/styling-variants'                   // Clones a component variant set (size, theme, emphasized, mild, and outlined) to sibling companion component for unifying the whole theming appearance.



// Reusable-ui features:
// - A set of visual properties (css properties) that their values
//   are managed by this framework based on configurations,
//   selected variants, and active states.
// - Consumes the toggled variant states of their exposed css factor variables (numeric 0 ↔ 1).
// - The styling authors should not assign the values directly (except for very specific reason).
//   The framework provides css variables to be applied (driven by one/more variant's/state's css variables and config's css variables).
// - For example: theme='danger' mild={true} disabled={true} → produces grayed pink background by:
//   - theme='danger' → gives red color.
//   - mild={true} → desaturate the color.
//   - disabled={true} → grays out the color.

// Simple features:
// - Resoves from configs, variants, and exposed override variables:
export * from '@reusable-ui/background-feature'                 // Resolves the appropriate background color based on the currently active variants — including theme, emphasize, mild, outlined, and stripped.
export * from '@reusable-ui/foreground-feature'                 // Resolves the appropriate foreground color based on the currently active variants — including theme, mild, and outlined.
export * from '@reusable-ui/decoration-feature'                 // Resolves the appropriate decoration color (icons, graphics color) based on the currently active variants — including theme, mild, and outlined.
export * from '@reusable-ui/border-feature'                     // Resolves the appropriate border color, geometry, and radius based on the currently active variants — including theme, mild, outlined, and stripped.
export * from '@reusable-ui/ring-feature'                       // Resolves the appropriate ring color (focus indicator) based on the currently active theme variant.
export * from '@reusable-ui/padding-feature'                    // Resolves the appropriate padding values based on active stripped mode and framework-level overrides.

// Registry-based features:
// - Resolves from registered animations, filters, transforms, box-shadows.
// - Contains registry to hold the registered items.
// - Requires to be installed as peer dependencies as these registries act as single source of truth.
/*peer*/ export * from '@reusable-ui/animation-feature'         // Composes a unified animation stack from custom and registered state packages.
/*peer*/ export * from '@reusable-ui/filter-feature'            // Composes a unified filter stack from custom and registered state packages.
/*peer*/ export * from '@reusable-ui/transform-feature'         // Composes a unified transform stack from custom and registered state packages.
/*peer*/ export * from '@reusable-ui/box-shadow-feature'        // Composes a unified box shadow stack from custom and registered state packages.



// Reusable-ui states:
// - Tracks semantic component conditions.
// - Do change the semantic state, reflecting the currently happened components.
// - Exposes the animation progression state via css factor variables (numeric 0 ↔ 1).
// - Does not drive visual styling, just expose the animation progression state.
//   The "Reusable-ui effects" define the animation to run and consumes the factors (animation progress)
//   for driving the appropriate visual effects (e.g, an opacity driven by the factor).

// State resolvers:
// - Not directly ready-to-use to be implemented in components.
export * from '@reusable-ui/effective-state'                    // Resolves effective state value from props, with optional behaviors like range clamping, context cascading, and external observation.
export * from '@reusable-ui/observer-state'                     // Observes live conditions (typically a DOM interaction) and reactively emits a resolved state whenever that condition changes.

// State bases:
// - Not directly ready-to-use to be implemented in components.
// - Used for creating any state implementations with minimal code.

// Animation state bases:
export * from '@reusable-ui/animation-state'                    // Tracks whenever a given animation is still running or has been ended.

// Task state bases:
export * from '@reusable-ui/ephemeral-state'                    // Tracks whether a task has been completed and animates short-lived UI feedback whenever a new activity status (e.g, copied, deleted) is set. Base: animation-state.
export * from '@reusable-ui/activity-state'                     // Tracks whether a task is still in progress and repeatedly animates ongoing activity as long as the activity status (e.g, downloading, processing) remains active. Base: animation-state.

// Flip-flop state bases:
export * from '@reusable-ui/transition-state'                   // Tracks whether a status has been changed and animates the change transition whenever the status (either by system or user) changes (e.g, offline → online, unselected → selected). Base: animation-state.
export * from '@reusable-ui/feedback-state'                     // Tracks whether a system's status has been updated and animates the change transition whenever the system's status updates (e.g, offline → online, enabled → disabled). Base: transition-state.
export * from '@reusable-ui/interaction-state'                  // Tracks the user's state intent and animates the change transition whenever it changes (e.g, unselected → selected, collapsed → expanded). Base: transition-state.

// State implementations:
// - Ready-to-use to be implemented in components.
// - Requires to be installed as peer dependencies as these states act as single source of truth and may contain React Context for inheritance mechanism.
/*peer*/ export * from '@reusable-ui/sort-state'                // Tracks whether some items are currently being sorted while also provides the original positions of unsorted items to be animated. Base: ephemeral-state.
/*peer*/ export * from '@reusable-ui/excited-state'             // Tracks whether a component is continously in excited state and repeatedly animates the excitement. Base: activity-state.
/*peer*/ export * from '@reusable-ui/disabled-state'            // Tracks whether a component is in enabled or disabled state and animates the change transition whenever it changes. Base: feedback-state.
/*peer*/ export * from '@reusable-ui/read-only-state'           // Tracks whether a component is in editable or read-only state and animates the change transition whenever it changes. Base: feedback-state.
/*peer*/ export * from '@reusable-ui/focus-state'               // Tracks whether a component is in focused or blurred state and animates the change transition whenever it changes. Base: feedback-state.
/*peer*/ export * from '@reusable-ui/hover-state'               // Tracks whether a component is in hovered or unhovered state and animates the change transition whenever it changes. Base: feedback-state.
/*peer*/ export * from '@reusable-ui/press-state'               // Tracks whether a component is in pressed or released state and animates the change transition whenever it changes. Base: feedback-state.
/*peer*/ export * from '@reusable-ui/validity-state'            // Tracks whether a component is in valid, invalid, or unvalidated (unchecked) state and animates the change transition whenever it changes. Base: feedback-state.
/*peer*/ export * from '@reusable-ui/drag-state'                // Tracks pointer coordinates continously during press-and-hold gestures and animates the change transition whenever the gesture activates or releases. Base: feedback-state.
/*peer*/ export * from '@reusable-ui/active-state'              // Tracks the user's activation intent and animates the change transition whenever it changes. Base: interaction-state.
/*peer*/ export * from '@reusable-ui/collapse-state'            // Tracks the user's expansion intent and animates the change transition whenever it changes. Base: interaction-state.
/*peer*/ export * from '@reusable-ui/view-state'                // Tracks the user's view-switching intent and animates the view transition whenever it switches. Base: interaction-state.



// Reusable-ui effects:
// - Provides default visual effects and styling reflecting the component states.
// - Do not alter the semantic state, as it already handled by the corresponding state packages.
// - Consumes the progression state of their exposed css factor variables (numeric 0 ↔ 1).
//   to smoothly drive the configured effects (e.g, a saturation driven by the factor).

// Effect interpolations:
// - Not directly ready-to-use to be implemented in components.
export * from '@reusable-ui/filter-effect'                      // Applies the configured CSS-filter values proportional to the given active factor (0 → unapplied, 0.5 → partially applied, 1 → fully applied).

// Effect implementations:
// - Ready-to-use to be implemented in components.
export * from '@reusable-ui/sort-effect'                        // Animates items into their new sorted order to make components visually rearranged during sorting.
export * from '@reusable-ui/excited-effect'                     // Blinks the component surface by zooming in and flashing color to make components visually highlighted when excited. Base: filter-effect.
export * from '@reusable-ui/disabled-effect'                    // De-emphasizes the entire component surface to make components visually muted when disabled. Base: filter-effect.
export * from '@reusable-ui/focus-effect'                       // Highlights components with a ring indicator to make components visually distinct and signaling readiness for interaction.
export * from '@reusable-ui/hover-effect'                       // Signals interactivity to make components visually responsive and clearly distinguishable from static content. Base: filter-effect.
export * from '@reusable-ui/press-effect'                       // Acknowledges user input to make components visually confirming command when pressed (clicked). Base: filter-effect.
export * from '@reusable-ui/validity-effect'                    // Switches component's theme colors to success/danger to make components visually verified when valid/invalid.
export * from '@reusable-ui/drag-effect'                        // Follows the cursor movement to make components visually carried and repositioned while being dragged. Base: filter-effect.
export * from '@reusable-ui/active-effect'                      // Emphasizes theme colors to make components visually stand out when active. Base: filter-effect.
export * from '@reusable-ui/collapse-effect'                    // Slides-down/up the entire component surface to make components visually revealed or hidden as they expand or collapse.
export * from '@reusable-ui/view-effect'                        // Slides between views to make components visually transitioned to the next view or step.



// Reusable-ui layouts:
export * from '@reusable-ui/stacked-layout'                     // Stacks multiple components into a unified container. Makes individual sub-elements visually appear as a single composite component.



// Reusable-ui interactions:
/*peer*/ export * from '@reusable-ui/drag-drop-interaction'     // Orchestrates the transaction logic for building rich drag-and-drop workflows. Enabling cross-component interactions with data exchange, live UX feedback, and reliable commit events.
export * from '@reusable-ui/focus-interaction'                  // Enhances native keyboard navigation and focus management with robust utilities such as focus traps and cyclic wrap-around navigation.



// Reusable-ui routes:
export * from '@reusable-ui/link-compat'                        // Transforms nested <Link> structures into clean, anchorless interactive elements.
// export * from '@reusable-ui/next-link-compat'                // A Next.js-compatible <Link> alternative with anchorless support and improved semantic navigation.
// export * from '@reusable-ui/router-link-compat'              // A React Router-compatible <Link> and <NavLink> alternative with anchorless support and improved semantic navigation.
export * from '@reusable-ui/links'                              // Enhances clickable elements (e.g. buttons, menu items) with soft-navigation capability, — whether a <Link> component is present.
export * from '@reusable-ui/navigations'                        // Navigates between pages and determines current page location.
