# @reusable-ui/active-state 📦  

**active-state** is a reusable abstraction for managing activation and selection in UI components.  
It provides a lifecycle-aware way to animate transitions between *active* and *inactive* states, exposing semantic variables that make styling and contributor reasoning clear.  

Instead of manually toggling classes or setting up activation context, active-state automatically manages active/inactive classes and cascaded context, ensuring transitions are smooth, predictable, and easy to maintain. This makes it ideal for interactive components — such as toggles, switches, and selections — where users can directly control activation, while still giving implementors the flexibility to handle the activation.  

With **active-state**, you get:  
- Controlled activation feedback  
- Transition animations tied to the activation lifecycle  
- Semantic styling variables (`isActive`, `isInactive`, etc.) for fine-grained control  
- Cascaded context support for parent-driven active state  

## ✨ Features
✔ Lifecycle-aware activate/deactivate animations based on current active state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and feedback systems  
✔ Supports controlled, uncontrolled, and hybrid activation behavior  
✔ Contextual override via `cascadeActive` for parent-driven active state  
✔ Restricted state handling — blocks user interaction while restricted (disabled or readonly), preserving the last known state until unrestricted  

## 📦 Installation
Install **@reusable-ui/active-state** via npm or yarn:

```sh
npm install @reusable-ui/active-state
# or
yarn add @reusable-ui/active-state
```

## 🧩 Exported Hooks

### `useActiveBehaviorState(props, options?)`

Resolves the active/inactive state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled, uncontrolled, and hybrid activation behavior with optional change dispatching.
- Supports contextual override via `cascadeActive`.

#### 💡 Usage Example

```tsx
import React, { FC, MouseEventHandler } from 'react';
import {
    useActiveBehaviorState,
    ActiveStateProps,
    UncontrollableActiveStateProps,
    ActiveStateChangeProps,
} from '@reusable-ui/active-state';
import styles from './ActivatableBox.module.css';

export interface ActivatableBoxProps extends
    ActiveStateProps,
    UncontrollableActiveStateProps, // optional uncontrolled behavior
    ActiveStateChangeProps<MouseEventHandler<HTMLButtonElement>> // optional change dispatching behavior
{}

// A box that can be activated and deactivated.
export const ActivatableBox: FC<ActivatableBoxProps> = (props) => {
    const {
        active,
        actualActive,
        activePhase,
        activeClassname,
        
        dispatchActiveChange,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useActiveBehaviorState(props, {
        defaultActive        : false,                          // Fallback for uncontrolled mode.
        defaultCascadeActive : false,                          // Defaults to prevent contextual activation.
        animationPattern     : ['activating', 'deactivating'], // Matches animation names ending with 'activating' or 'deactivating'.
        animationBubbling    : false,                          // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.box} ${activeClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            <button onClick={(event) => dispatchActiveChange(!active, event)}>
                Toggle state
            </button>
            {active && <div className={styles.details}>
                <p>Active content goes here.</p>
            </div>}
        </div>
    );
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between `active` and `inactive` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from active to inactive) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🔒 Restricted Behavior (`disabled` or `readonly`)
- **Block dispatch; preserve last state**: When restricted, activation requests are ignored. The component remains in its last active/inactive state.  
- **On unrestricted (re‑enabled or exit readonly)**: `dispatchActiveChange()` works normally.  
- **Rationale**: Restricted components freeze interaction — they don’t reset activation, but prevent user interactions until unrestricted.

### `useActiveStatePhaseEvents(props, activePhase)`

Emits lifecycle events in response to activate/deactivate phase transitions.

This hook observes the resolved `activePhase` from `useActiveBehaviorState()` and triggers the appropriate callbacks defined in `ActiveStatePhaseEventProps`, such as:

- `onActivatingStart`
- `onActivatingEnd`
- `onDeactivatingStart`
- `onDeactivatingEnd`

### `useActiveState(props, options?)`

Resolves the current active/inactive state for a fully controlled component.

This hook is intended for components that **consume** the resolved `active` state and **forward** it to a base component.

Unlike `useActiveBehaviorState()`, which supports both controlled and uncontrolled modes, `useActiveState()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Supports contextual override via `cascadeActive`.
- Ideal for components that **consume** the resolved `active` state.

### `useActiveChangeDispatcher(props)`

Creates a stable dispatcher for requesting a change to the active state.

This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `active` state and forwards it to a `<BaseComponent active={...}>`.

Unlike `useActiveBehaviorState()`, which supports both controlled and uncontrolled modes, `useActiveChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.

- Supports only controlled mode.
- Always triggers `onActiveChange`, if provided.
- Ideal for components that **dictate** the `active` state externally and need a stable dispatcher without lifecycle orchestration.

### `useUncontrollableActiveState(props, options?)`

Resolves the current active/inactive state and provides a dispatcher for requesting changes.

This hook is intended for components that **manage** the resolved `active` state and **forward** it to a base component, while optionally supporting uncontrolled behavior.

Unlike `useActiveBehaviorState()`, which resolves full lifecycle, `useUncontrollableActiveState()` provides a **simplified implementation** for managing activation state and dispatching changes.

- Supports both controlled and uncontrolled modes.
- Supports contextual override via `cascadeActive`.
- If `active` is provided, the internal state is disabled and the component becomes fully controlled.
- If `active` is omitted, the internal state is initialized via `defaultActive`.
- Ideal for components that **manage** the resolved `active` state.

#### 🧬 Context Propagation

Use `<ActiveStateProvider>` to share active state with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    ActiveStateProps,
    ActiveStateProvider,
    useActiveBehaviorState,
    useActiveState,
} from '@reusable-ui/active-state';

export interface ParentComponentProps extends ActiveStateProps {
    children ?: ReactNode
}

// A component that shares its active state with descendant components.
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve active state from props and handle animation phases:
    const {
        active,
        activePhase,
        activeClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useActiveBehaviorState(props, {
        defaultActive        : false,                          // Fallback for uncontrolled mode.
        defaultCascadeActive : false,                          // Defaults to prevent contextual activation.
        animationPattern     : ['activating', 'deactivating'], // Matches animation names ending with 'activating' or 'deactivating'.
        animationBubbling    : false,                          // Ignores bubbling animation events from children.
    });
    
    // Or use `useActiveState()` if not concerned with animation phases:
    // const active = useActiveState(props, {
    //     defaultActive        : false, // Defaults to inactive.
    //     defaultCascadeActive : false, // Defaults to prevent contextual activation.
    //     defaultCascadeActive : false, // Defaults to prevent contextual activation.
    // });
    
    // Propagate active state to descendants:
    return (
        <ActiveStateProvider active={active}>
            {props.children}
        </ActiveStateProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Activate/deactivate Selectors:
    isActiveSelector,                 // Targets `.is-active` classes
    isInactiveSelector,               // Targets `.is-inactive` classes
    isActivatingSelector,             // Targets `.is-activating` classes
    isDeactivatingSelector,           // Targets `.is-deactivating` classes
    isActivatingOrActiveSelector,     // Targets `.is-activating` and `.is-active` class
    isDeactivatingOrInactiveSelector, // Targets `.is-deactivating` and `.is-inactive` class
    
    // Conditional styling helpers:
    ifActive,                 // Applies styles to elements in the fully active state
    ifInactive,               // Applies styles to elements in the fully inactive state
    ifActivating,             // Applies styles to elements currently in the activating transition
    ifDeactivating,           // Applies styles to elements currently in the deactivating transition
    ifActivatingOrActive,     // Applies styles to elements that are either activating or fully active
    ifDeactivatingOrInactive, // Applies styles to elements that are either deactivating or fully inactive
} from '@reusable-ui/active-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifActivatingOrActive({
        fontWeight: 'bold',
    }),
    ...ifDeactivatingOrInactive({
        fontWeight: 'normal',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isActivatingOrActiveSelector, { // equivalent to `ifActivatingOrActive`
        opacity: '100%',
    }),
    ...rule(isDeactivatingOrInactiveSelector, { // equivalent to `ifDeactivatingOrInactive`
        opacity: '60%',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesActiveState(options?: CssActiveStateOptions): CssActiveState`

Generates CSS rules that conditionally apply the activate/deactivate animations based on current active state, and exposes activate/deactivate-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable                | Active When...                       | Purpose                                                                      |
|-------------------------|--------------------------------------|------------------------------------------------------------------------------|
| `animationActivating`   | `.is-activating`                     | Runs the activating animation sequence                                       |
| `animationDeactivating` | `.is-deactivating`                   | Runs the deactivating animation sequence                                     |
| `isActive`              | `.is-active` or `.is-activating`     | Conditional variable for the active state                                    |
| `isInactive`            | `.is-inactive` or `.is-deactivating` | Conditional variable for the inactive state                                  |
| `activeFactor`          | Always available (animatable)        | Normalized factor: 0 = inactive, 1 = active, interpolates during transitions |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Active/inactive state:
import { usesActiveState } from '@reusable-ui/active-state';

// Background colors:
import { usesBackgroundFeature } from '@reusable-ui/background-feature';

// Outlined variant:
import { usesOutlineVariant } from '@reusable-ui/outline-variant';

// Mild variant:
import { usesMildVariant } from '@reusable-ui/mild-variant';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const activatableBoxStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: active/inactive lifecycle
    const {
        activeStateRule,
        activeStateVars: { isActive, isInactive, activeFactor },
    } = usesActiveState({
        animationActivating   : 'var(--box-activating)',
        animationDeactivating : 'var(--box-deactivating)',
    });
    
    // Feature: background colors
    const {
        backgroundFeatureVars : { backgRegularCond, backgColor },
    } = usesBackgroundFeature();
    
    // Feature: outlined variant
    const {
        outlineVariantVars : { isOutlined },
    } = usesOutlineVariant();
    
    // Feature: mild variant
    const {
        mildVariantVars    : { isMild },
    } = usesMildVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply active/inactive state rules:
        ...activeStateRule(),
        
        // Activating animation: interpolate activeFactor from 0 → 1
        ...vars({
            '--box-activating': [
                ['0.3s', 'ease-out', 'both', 'transition-activating'],
            ],
        }),
        ...keyframes('transition-activating', {
            from : { [activeFactor]: 0 },
            to   : { [activeFactor]: 1 },
        }),
        
        // Deactivating animation: interpolate activeFactor from 1 → 0
        ...vars({
            '--box-deactivating': [
                ['0.3s', 'ease-out', 'both', 'transition-deactivating'],
            ],
        }),
        ...keyframes('transition-deactivating', {
            from : { [activeFactor]: 1 },
            to   : { [activeFactor]: 0 },
        }),
        
        // Example usage:
        // - Background color interpolates with `activeFactor`.
        // - 0 → base (variant-aware) color, 1 → active (regular) color.
        backgroundColor:
`color-mix(in oklch,
    ${backgColor}
    calc((1 - ${activeFactor}) * 100%),
    
    ${switchOf(backgRegularCond, backgColor)}
    calc(${activeFactor} * 100%)
)`,
        
        // Example usage:
        // - filter (brightness, contrast, saturate) interpolates with `activeFactor`.
        // - 0 → noop filter, 1 → active filter.
        // - only applies when neither outlined nor mild (regular only).
        //
        // Example for active brightness value of 0.65:
        // brightness(calc(1 - ((1 - 0.65) * factor)))
        // → factor=0 → 1 (no change)
        // → factor=1 → 0.65 (dimmed)
        // → smooth linear interpolation in between
        '--_activeBrightness' : 0.65,
        '--_activeContrast'   : 1.5,
        '--_activeSaturate'   : 1,
        '--_noFilter': [[
            // Only applies if either outlined or mild:
            switchOf(
                isOutlined,
                // or
                isMild,
            ),
            
            // No effect filter value:
            'brightness(1) contrast(1) saturate(1)',
        ]],
        filter: switchOf(
            'var(--_noFilter)',
`
brightness(calc(1 - ((1 - var(--_activeBrightness)) * ${activeFactor})))
contrast(calc(1 - ((1 - var(--_activeContrast)) * ${activeFactor})))
saturate(calc(1 - ((1 - var(--_activeSaturate)) * ${activeFactor})))
`
        ),
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationActivating` and `animationDeactivating` variables are only defined during **activating** and **deactivating** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining activate/deactivate animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/active-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/active-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/active-state brings expressive, adaptive activation styling to your components.**  
Give it a ⭐ on GitHub if you find it useful!  
