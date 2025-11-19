# @reusable-ui/hover-state 📦  

Adds hover/unhover functionality to UI components, with transition animations and semantic styling hooks.  
Ideal for buttons, selects, menuItems, and any interactive component requiring hover feedback.

## ✨ Features
✔ Lifecycle-aware hover/unhover animations based on current hover state  
✔ Gracefully completes running animations before resolving new state  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across appearance, animation, and accessibility systems  
✔ Built-in internal hover observer via `ref`, `handleMouseEnter()`, and `handleMouseLeave()` — no need for external state unless desired  
✔ Optional `computedHover` override for custom hover resolution logic in advanced use cases  
✔ Deterministic disabled handling: always unhovered when disabled, with immediate recomputation on re-enable  

## 📦 Installation
Install **@reusable-ui/hover-state** via npm or yarn:

```sh
npm install @reusable-ui/hover-state
# or
yarn add @reusable-ui/hover-state
```

## 🧩 Exported Hooks

### `useHoverBehaviorState(props, options?)`

Resolves the hover state, current transition phase, associated CSS class name, and animation event handlers based on component props, optional default configuration, and animation lifecycle.

- Supports controlled hover state, when `hovered` is set to `true` or `false`.
- Supports diagnostic mode, when `hovered` is set to `'auto'`, which derives the effective hover from `computedHover`.

#### 💡 Usage Example

```tsx
import React, { FC, useState, useEffect } from 'react';
import {
    useHoverBehaviorState,
    HoverStateProps,
    HoverStateUpdateProps,
} from '@reusable-ui/hover-state';
import styles from './CustomCard.module.css';

export interface CustomCardProps extends
    HoverStateProps,
    HoverStateUpdateProps // optional update reporting behavior
{}

// A card with custom hover logic.
export const CustomCard: FC<CustomCardProps> = (props) => {
    const [internalComputedHover, setInternalComputedHover] = useState<boolean>(false);
    
    const {
        // Allows derived components to override the internal hover logic:
        computedHover : externalComputedHover,
        
        ...restProps,
    } = props;
    
    const isExternallyComputed = (externalComputedHover !== undefined);
    const computedHover        = isExternallyComputed ? externalComputedHover : internalComputedHover;
    
    useEffect(() => {
        if (isExternallyComputed) return;
        
        // Perform internal hover logic here:
        // setInternalComputedHover(true);
    }, [isExternallyComputed]);
    
    const {
        hovered,
        actualHovered,
        hoverPhase,
        hoverClassname,
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
        
        // Use these ref and handlers to use built-in hover observer when `computedHover` is not provided:
        ref,
        handleMouseEnter,
        handleMouseLeave,
    } = useHoverBehaviorState({
        computedHover,
        ...restProps,
    }, {
        defaultHovered    : 'auto',                     // Defaults to diagnostic mode.
        animationPattern  : ['hovering', 'unhovering'], // Matches animation names ending with 'hovering' or 'unhovering'.
        animationBubbling : false,                      // Ignores bubbling animation events from children.
    });
    
    return (
        <div
            className={`${styles.card} ${hoverClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {hovered  && <p className={styles.hovered}>Hovered</p>}
            {!hovered && <p className={styles.unhovered}>Unhovered</p>}
        </div>
    );
};
```

#### 🧠 Transition Animation Behavior

The hook manages transitions between `hovered` and `unhovered` states using a unified animation flow:

- If a transition is already in progress, new intent (e.g., switching from hovered to unhovered) is deferred until the current animation completes.
- Once the active animation finishes, the latest intent is resumed and the corresponding transition begins.
- This ensures animations are never interrupted mid-flight and outdated transitions are discarded.

#### 🔒 Disabled Behavior
- **Always unhovered when disabled**: Components are forced into a unhovered state whenever `disabled` is active, regardless of `hovered` or `computedHover` values.  
- **On re-enable**:
    - **Auto mode (internal hover observer)**: The component immediately re-evaluates based on the current pointer position and containment.  
    - **Explicit (`true`/`false`) or external (`computedHover`) modes**: The component resumes following the provided value.  
- **Rationale**: Hover is a continuous state — pointer position may persist across enabled/disabled transitions, so recomputation ensures visual consistency.

### `useHoverStatePhaseEvents(props, hoverPhase)`

Emits lifecycle events in response to hover/unhover phase transitions.

This hook observes the resolved `hoverPhase` from `useHoverBehaviorState()` and triggers the appropriate callbacks defined in `HoverStatePhaseEventProps`, such as:

- `onHoveringStart`
- `onHoveringEnd`
- `onUnhoveringStart`
- `onUnhoveringEnd`

### `useHoverState(props, options?)`

Resolves the current hovered/unhovered state for a fully controlled component.

This hook is intended for components that **consume** the resolved `hovered` state and **forward** it to a base component.

Unlike `useHoverBehaviorState()`, which handles animation and lifecycle, `useHoverState()` performs a lightweight resolution of the effective hover value.

- No internal state or uncontrolled fallback.
- `'auto'` is treated as a declarative diagnostic mode.
- Ideal for components that **consume** the resolved `hovered` state.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Hover Selectors:
    isHoveredSelector,               // Targets `.is-hovered` class
    isUnhoveredSelector,             // Targets `.is-unhovered` class
    isHoveringSelector,              // Targets `.is-hovering` class
    isUnhoveringSelector,            // Targets `.is-unhovering` class
    isHoveringOrHoveredSelector,     // Targets `.is-hovering` and `.is-hovered` class
    isUnhoveringOrUnhoveredSelector, // Targets `.is-unhovering` and `.is-unhovered` class
    
    // Conditional styling helpers:
    ifHovered,               // Applies the given `styles` to elements in the fully hovered state.
    ifUnhovered,             // Applies the given `styles` to elements in the fully unhovered state.
    ifHovering,              // Applies the given `styles` to elements currently in the hovering transition.
    ifUnhovering,            // Applies the given `styles` to elements currently in the unhovering transition.
    ifHoveringOrHovered,     // Applies the given `styles` to elements that are either hovering or fully hovered.
    ifUnhoveringOrUnhovered, // Applies the given `styles` to elements that are either unhovering or fully unhovered.
} from '@reusable-ui/hover-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifHoveringOrHovered({
        outline: '2px solid blue',
    }),
    ...ifUnhoveringOrUnhovered({
        outline: 'none',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isHoveringOrHoveredSelector, { // equivalent to `ifHoveringOrHovered`
        boxShadow: '0 0 0 2px blue',
    }),
    ...rule(isUnhoveringOrUnhoveredSelector, { // equivalent to `ifUnhoveringOrUnhovered`
        boxShadow: 'none',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesHoverState(options?: CssHoverStateOptions): CssHoverState`

Generates CSS rules that conditionally apply the hover/unhover animations based on current hovered state, and exposes hover/unhover-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are only active during their respective transition phases.  
Use `switchOf(...)` to ensure graceful fallback when inactive.

| Variable              | Active When...                      | Purpose                       |
|-----------------------|-------------------------------------|-------------------------------|
| `animationHovering`   | `.is-hovering`                      | Triggers hovering animation   |
| `animationUnhovering` | `.is-unhovering`                    | Triggers unhovering animation |
| `isHovered`           | `.is-hovered` or `.is-hovering`     | Styling for hovered state     |
| `isUnhovered`         | `.is-unhovered` or `.is-unhovering` | Styling for unhovered state   |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Hovered/unhovered state:
import { usesHoverState } from '@reusable-ui/hover-state';

// CSS-in-JS:
import { style, vars, keyframes, fallback } from '@cssfn/core';

export const hoverableBoxStyle = () => {
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    const {
        hoverStateRule,
        hoverStateVars: { isHovered, isUnhovered },
    } = usesHoverState({
        animationHovering   : 'var(--box-hovering)',
        animationUnhovering : 'var(--box-unhovering)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply hovered/unhovered state rules:
        ...hoverStateRule(),
        
        // Define hovering animation:
        ...vars({
            '--box-hovering': [
                ['0.3s', 'ease-out', 'both', 'outline-hovering'],
            ],
        }),
        ...keyframes('outline-hovering', {
            from: {
                outline: 'none',
            },
            to: {
                outline: '2px solid blue',
            },
        }),
        
        // Define unhovering animation:
        ...vars({
            '--box-unhovering': [
                ['0.3s', 'ease-out', 'both', 'outline-unhovering'],
            ],
        }),
        ...keyframes('outline-unhovering', {
            from: {
                outline: '2px solid blue',
            },
            to: {
                outline: 'none',
            },
        }),
        
        // Define final outline based on lifecycle state:
        ...fallback({
            '--outline-hovered'   : `${isHovered} 2px solid blue`,
        }),
        ...fallback({
            '--outline-unhovered' : `${isUnhovered} none`,
        }),
        outline: 'var(--outline-hovered, var(--outline-unhovered))',
        
        // Apply composed animations:
        animation,
    });
};
```

#### 🧠 Resolution Logic

The `animationHovering` and `animationUnhovering` variables are only defined during **hovering** and **unhovering** phases.

These variables are registered to `@reusable-ui/animation-feature`, so you typically don’t need to consume them directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining hover/unhover animations with other state-driven transitions.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/hover-state** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/hover-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/hover-state brings expressive, adaptive hover styling to your UI.**  
Give it a ⭐ on GitHub if you find it useful!  
