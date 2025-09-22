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
