# @reusable-ui/animation-state 🎥  

Declarative animation lifecycle management for React components.  
Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing — making motion predictable and enhancing visual feedback.

Perfect for expand/collapse flows, form validation feedback, focus/blur transitions, and any interaction where animation timing matters.

## ✨ Features
✔️ Tracks both current intent and running transition  
✔️ Never interrupts animations mid-flight  
✔️ Defers new intent until the current animation completes  
✔️ Synchronizes CSS classnames with lifecycle state  
✔️ Plays well with modals, forms, togglers, and accordions  

## 📦 Installation
Install **@reusable-ui/animation-state** via npm or yarn:

```sh
npm install @reusable-ui/animation-state
# or
yarn add @reusable-ui/animation-state
```

## 🔁 Exported Hooks

### `useAnimationState(options: AnimationStateOptions): AnimationStateApi`

Tracks animation-aware intent and transition state.

#### Lifecycle Principles

- 🚫 Never interrupts animations mid-flight.
- 🕒 Defers new intent until the current animation completes.
- 🧹 Discards outdated transitions during overlapping changes.
- 🔁 Resumes the latest intent once prior animation finishes.

#### 🔧 Usage Example

```tsx
import React, { useEffect } from 'react';
import { useAnimationState } from '@reusable-ui/animation-state';
import { useMergeEventHandlers } from '@reusable-ui/callbacks';
import styles from './styles.module.css';

export const AnimatedComponent = () => {
    // Initialize animation-aware expanded/collapsed state:
    const [isExpanded, setExpanded, isExpanding, expandHandlers] = useAnimationState<boolean, HTMLDivElement>({
        initialIntent    : false, // Initial state is collapsed.
        animationPattern : ['expand', 'collapse'], // Matches animation names ending with 'expand' or 'collapse'.
    });
    
    // Initialize animation-aware focus/blur state:
    const [isFocused, setFocused, isFocusing, focusHandlers] = useAnimationState<boolean, HTMLInputElement>({
        initialIntent    : false, // Initial state is blurred.
        animationPattern : ['focus', 'blur'], // Matches animation names ending with 'focus' or 'blur'.
    });
    
    // Example state transitions:
    useEffect(() => {
        setExpanded(true); // Example trigger
        setFocused(true);  // Example trigger
    }, []);
    
    // Determine appropriate animation class based on lifecycle state:
    const expandClass = (
        isExpanding !== undefined
        ? isExpanding ? 'expanding' : 'collapsing' // In-progress animations
        : isExpanded  ? 'expanded'  : 'collapsed'  // Final states
    );
    const focusClass = (
        isFocusing !== undefined
        ? isFocusing ? 'focusing'  : 'blurring'   // In-progress animations
        : isFocused  ? 'focused'   : 'blurred'    // Final states
    );
    
    // Combine event handlers for animation lifecycle:
    const handleAnimationStart = useMergeEventHandlers(
        expandHandlers.handleAnimationStart,
        focusHandlers.handleAnimationStart,
    );
    const handleAnimationEnd = useMergeEventHandlers(
        expandHandlers.handleAnimationEnd,
        focusHandlers.handleAnimationEnd,
    );
    
    return (
        <div
            className={`${styles.main} ${expandClass} ${focusClass}`}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        />
    );
};
```

CSS example for animations:

```css
/* ========== Expand/Collapse ========== */

/* In-progress animation states */
.expanding {
    animation: expand 0.3s forwards;
}
.collapsing {
    animation: collapse 0.3s forwards;
}

/* Final resting states */
.expanded {
    /* Styles for fully expanded */
}
.collapsed {
    /* Styles for fully collapsed */
}

/* Keyframes for expand/collapse */
@keyframes expand {
    from { height: 0; }
    to   { height: 100px; }
}
@keyframes collapse {
    from { height: 100px; }
    to   { height: 0; }
}



/* ========== Focus/Blur ========== */

/* In-progress animation states */
.focusing {
    animation: focus 0.2s forwards;
}
.blurring {
    animation: blur 0.2s forwards;
}

/* Final resting states */
.focused {
    /* Styles for focused input */
}
.blurred {
    /* Styles for blurred input */
}

/* Keyframes for focus/blur */
@keyframes focus {
    from { border-color: gray; }
    to   { border-color: blue; }
}
@keyframes blur {
    from { border-color: blue; }
    to   { border-color: gray; }
}
```

---

#### 🧠 Animation Behavior

The hook manages animations between states using a unified lifecycle flow.  
When the implementator of `useAnimationState()` toggles a classname (e.g. `.is-validating`, `.is-invalidating`, `.is-unvalidating`), the corresponding case in `usesAnimationState()` activates, and the browser's CSS engine runs the assigned animation.

The lifecycle flow ensures:

- If an animation is already in progress, any new intent (e.g., switching from one state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is resumed.  
- This ensures animations are never interrupted mid-flight and outdated animations are discarded.  

## 🧩 Exported CSS Hook

### `usesAnimationState(animationCases: MaybeArray<AnimationCase>): CssRule`

Applies animation cases for styling.

Runs the corresponding animation automatically whenever `useAnimationState()` activates the matching classname.

Accepts either:
- A single `AnimationCase`
- An array of `AnimationCase[]`

**`AnimationCase` interface:**
- **`ifState`**  
  Determines when the animation applies.
- **`variable`**  
  Specifies the CSS variable to assign when the state condition is met.
- **`animation`**  
  Specifies the animation value or reference to apply to the variable.

#### 💡 Usage Example
```ts
export default () => style({
    display  : 'grid',
    fontSize : '1rem',
    
    // Apply animations:
    animation: 'var(--validity-validating, none), var(--validity-invalidating, none), var(--validity-unvalidating, none)',
    
    // Define animation cases when the state is met:
    ...usesAnimationState([
        { ifState: ifValidating,   variable: 'var(--validity-validating)',   animation: 'var(--anim-validating)'   },
        { ifState: ifInvalidating, variable: 'var(--validity-invalidating)', animation: 'var(--anim-invalidating)' },
        { ifState: ifUnvalidating, variable: 'var(--validity-unvalidating)', animation: 'var(--anim-unvalidating)' },
    ]),
});

// Define conditional selectors:
const ifValidating   = (styles: CssStyleCollection) => rule('.is-validating'  , styles);
const ifInvalidating = (styles: CssStyleCollection) => rule('.is-invalidating', styles);
const ifUnvalidating = (styles: CssStyleCollection) => rule('.is-unvalidating', styles);
```

#### 🎨 Rendered CSS
```css
.the-component-scope {
    display   : grid;
    font-size : 1rem;
    
    animation: var(--validity-validating, none), var(--validity-invalidating, none), var(--validity-unvalidating, none);
    
    &.is-validating {
        --validity-validating: var(--anim-validating);
    }
    &.is-invalidating {
        --validity-invalidating: var(--anim-invalidating);
    }
    &.is-unvalidating {
        --validity-unvalidating: var(--anim-unvalidating);
    }
}
```

#### 🧠 How CSS Animation State Works
Each **`AnimationCase`** defines a mapping between:
- **Condition (`ifState`)** → determines when the case is active (e.g. `ifValidating`).
- **Variable (`variable`)** → the CSS variable to assign.
- **Animation (`animation`)** → the animation value or reference applied to the variable.

When the implementator of `useAnimationState()` (React side) toggles a classname (e.g. `.is-validating`, `.is-invalidating`, `.is-unvalidating`), the corresponding case in `usesAnimationState()` (CSS side) activates. The browser's CSS engine then applies the animation by assigning the variable to the provided value.  

This separation ensures:
- **React hook** orchestrates runtime state (`intent`, `running`, lifecycle handlers).  
- **CSS hook** declares how those states map to animations at the stylesheet level.  
- Together they form a predictable, declarative animation system.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/animation-state** is a foundational module within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/animation-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/animation-state makes motion lifecycle a predictable part of your state model.**  
Give it a ⭐ on GitHub if you find it useful!  
