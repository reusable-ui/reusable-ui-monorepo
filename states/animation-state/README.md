# @reusable-ui/animation-state 🎥  

Declarative animation lifecycle management for React components.  
Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing — making motion predictable and enhancing visual feedback.

Perfect for activity indicators, in-motion stages, state transitions, and any interaction where animation timing matters.

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
When the implementator of `useAnimationState()` toggles a classname (e.g. `.is-preparing`, `.is-shipping`, `.is-delivering`), the corresponding case in `usesAnimationState()` activates, and the browser's CSS engine runs the assigned animation.

The lifecycle flow ensures:

- If an animation is already in progress, any new intent (e.g., switching from one state to another) is deferred until the current animation completes.  
- Once the active animation finishes, the latest intent is resumed.  
- This ensures animations are never interrupted mid-flight and outdated animations are discarded.  

## 🧩 Exported CSS Hook

### `usesAnimationState(animationBehavior: AnimationBehavior): CssRule`

Applies live CSS variables for animation styling, including:
- **Animation variables** for *visual effects* whenever the corresponding state becomes active
- **Factor variables** for *movement drivers* of the animation's motion.

**`AnimationBehavior` interface:**
- **`animations`**
  Defines transitional animation cases for *visual effects* whenever the corresponding state becomes active
- Optional **factor variables**:
  Provides numeric drivers that represent the movement of the active animation.
  - **`factorVar`**
    Specifies a CSS variable for smooth transitions.
  - **`factorCondVar`**
    Specifies a CSS variable for smooth transitions with inactive fallback.
  - **`ifInactiveState`**
    Defines the condition for the inactive baseline state.
  - **`activeFactors`**
    Defines active factor cases for holding final numeric values once a transition settles.

#### 💡 Usage Example

```ts
// Describe how order animations should behave:
const orderAnimations : CssRule = usesAnimationState({
    {
        ifState   : ifPreparing,
        variable  : orderStateVars.animationPreparing,
        animation : options.animationPreparing,
    },
    {
        ifState   : ifShipping,
        variable  : orderStateVars.animationShipping,
        animation : options.animationShipping,
    },
    {
        ifState   : ifDelivering,
        variable  : orderStateVars.animationDelivering,
        animation : options.animationDelivering,
    },
    
    // Optional factor variables for movement drivers of animation:
    factorVar       : orderStateVars.orderFactor,
    factorCondVar   : orderStateVars.orderFactorCond,
    ifInactiveState : ifIdle,
    baselineFactor  : 0,
});

// Apply order animations alongside other styles:
return style({
    display  : 'grid',
    fontSize : '1rem',
    
    // Apply animations:
    animation: `${switchOf(orderStateVars.animationPreparing, 'none')}, ${switchOf(orderStateVars.animationShipping, 'none')}, ${switchOf(orderStateVars.animationDelivering, 'none')}`,
    
    // Apply animation state rule:
    ...orderAnimations,
    // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
    // so it can be safely spread without risk of overriding other styles.
});

// Define conditional selectors:
const ifIdle       = (styles: CssStyleCollection) => rule('.is-idle'      , styles);
const ifPreparing  = (styles: CssStyleCollection) => rule('.is-preparing' , styles);
const ifShipping   = (styles: CssStyleCollection) => rule('.is-shipping'  , styles);
const ifDelivering = (styles: CssStyleCollection) => rule('.is-delivering', styles);
```

#### 🎨 Rendered CSS
```css
.the-component-scope {
    display   : grid;
    font-size : 1rem;
    
    animation: var(--order-preparing, none), var(--order-shipping, none), var(--order-delivering, none);
    
    &.is-preparing {
        --order-preparing: var(--anim-preparing);
    }
    &.is-shipping {
        --order-shipping: var(--anim-shipping);
    }
    &.is-delivering {
        --order-delivering: var(--anim-delivering);
    }
}
```

#### 🧠 How CSS Animation State Works
Each **`AnimationCase`** defines a mapping between:
- **Condition (`ifState`)** → determines when the case is active (e.g. `ifPreparing`).
- **Variable (`variable`)** → the CSS variable to assign.
- **Animation (`animation`)** → the animation value or reference applied to the variable.

When the implementator of `useAnimationState()` (React side) toggles a classname (e.g. `.is-preparing`, `.is-shipping`, `.is-delivering`), the corresponding case in `usesAnimationState()` (CSS side) activates. The browser's CSS engine then applies the animation by assigning the variable to the provided value.  

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
