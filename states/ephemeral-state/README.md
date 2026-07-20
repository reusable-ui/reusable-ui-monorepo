# @reusable-ui/ephemeral-state 📦  

**ephemeral-state** animates short-lived UI feedback in ephemeral components (e.g. like buttons, saved indicators, delete icons) whenever an activity or status change occurs.  
It makes activity-driven state changes feel visible and intuitive by animating the transition,
instead of instantly mutating the UI with no feedback.  

Without ephemeral-state, updating UI directly (e.g. toggling the like icon: `showLikeIcon(true)`, toggling the saved icon: `showSavedIcon(true)`)
changes the indicator immediately, without visual feedback of *how* the indicator changes.  
With ephemeral-state, the indicator updates gradually with a nice animation — clearly conveying the change.

With **ephemeral-state**, you get:  
- Smooth animated transitions for ephemeral activities  
- Imperative activity triggers via `setActivity`  

Instead of re-implementing similar logic for each ephemeral-like state, `ephemeral-state` acts as a common foundation.  
By reusing the same core contract, you ensure consistent behavior, predictable animation lifecycles, and reduced code duplication across your UI ecosystem.  

Implementation examples:  
- Like button → when the user clicks "like", the icon animates.  
- Saved indicator → when autosave occurs, the floppy disk animates.  
- Delete button → when an item is deleted, the trash can animates.  

## ✨ Features
✔ Animated transitions whenever an activity or status change occurs  
✔ Imperative trigger via `setActivity`  
✔ Queues animations to handle rapid consecutive activities gracefully  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across animations and feedback systems  

## 📦 Installation
Install **@reusable-ui/ephemeral-state** via npm or yarn:

```sh
npm install @reusable-ui/ephemeral-state
# or
yarn add @reusable-ui/ephemeral-state
```

## 🧩 Exported Hooks

### `useEphemeralState(props, options, definition)`

Animates short-lived UI feedback whenever an activity or status change occurs,
making activity-driven state changes feel visible and intuitive
by animating the transition.

Without this hook, updating UI directly (e.g. toggling the like icon: `showLikeIcon(true)`, toggling the saved icon: `showSavedIcon(true)`)
changes the indicator immediately, without visual feedback of *how* the indicator changes.  
With this hook, the indicator updates gradually with a nice animation — clearly conveying the change.

Can be specialized into **sort-state**, **liked-state**, or **saved-state**
by defining the `definition` parameter.

**Definition parameters:**
- **Ephemeral classname resolver**  
  Resolves the semantic classname from the current activity status.
- **Default animation pattern**  
  Default animation names to match against.
- **Default animation bubbling**  
  Whether to enable bubbling from nested child elements.

#### 💡 Usage Example

The following example demonstrates how to implement a short-lived **like/unlike** interaction using `useEphemeralState()`.

When the user clicks the **Like** button, a brief animation and styling are applied to visually confirm that the action has been registered.  
The same behavior applies to the **Unlike** button, providing intuitive feedback for both interactions.

```ts
import React from 'react';
import {
    useEphemeralState,
    type EphemeralStateProps,
    type EphemeralStateOptions,
    type EphemeralStateDefinition,
} from '@reusable-ui/ephemeral-state';
import styles from './LikeButton.module.css';

/** Props for controlling the like/unlike state of a component. */
export interface LikeStateProps extends EphemeralStateProps {
    // Extend with custom props if needed.
}

/** Options for customizing like/unlike behavior and its animation lifecycle. */
export interface LikeStateOptions extends EphemeralStateOptions {
    // Extend with custom options if needed.
}

/** Activity types for like interactions. */
export type LikeActivity = 'like' | 'unlike'

/** A CSS classname for triggering the like/unlike animation. */
export type LikeClassname = 'is-liking' | 'is-unliking' | 'is-idle'

/** Private definition for like/unlike state behavior. */
interface LikeStateDefinition extends EphemeralStateDefinition<
    LikeActivity,
    LikeClassname,
    LikeStateProps,
    LikeStateOptions,
    LikeStateDefinition
> {
    // Extend with custom definition if needed.
}

/**
 * Hook for animating like/unlike interactions.
 */
export const useLikeState = <TElement extends Element = HTMLElement>(props: LikeStateProps, options: LikeStateOptions) => {
    const [{
        // Map generic properties to domain-specific ones:
        activity           : liking,        // LikeAction | undefined
        ephemeralClassname : likeClassname, // LikeClassname
        ...handlers
    }, setLikeActivity] = useEphemeralState<
        LikeActivity,
        LikeClassname,
        
        LikeStateProps,
        LikeStateOptions,
        LikeStateDefinition,
        
        TElement
    >(props, options, {
        defaultAnimationPattern  : /(liking|unliking)$/, // Match animation names ending with 'liking' or 'unliking'
        defaultAnimationBubbling : false,
        resolveEphemeralClassname({ activity, props, options, definition }): LikeClassname {
            // If needed, use provided `props`, `options` and `definition` to compute the classname result:
            switch (activity) {
                case 'like'   : return 'is-liking';
                case 'unlike' : return 'is-unliking';
                default       : return 'is-idle';
            } // switch
        },
    });
    
    return [{
        liking,
        likeClassname,
        ...handlers,
    }, setLikeActivity] as const;
};



/**
 * Example component: LikeButton
 * 
 * Shows how to use the `useLikeState` hook to animate
 * short-lived like/unlike interactions.
 */
export const LikeButton = () => {
    const [{
        liking,        // A short-lived like/unlike activity during animation.
        likeClassname, // A classname for toggling animations.
    }, setLikeActivity] = useLikeState({ /* no props */ }, {
        // Provide the options if needed:
        // animationPattern  :
        // bubblingAnimation :
    });
    
    return (
        <div className={`${styles.container} ${likeClassname}`}>
            <button type='button' onClick={() => setLikeActivity('like')}>Like</button>
            <button type='button' onClick={() => setLikeActivity('unlike')}>Unlike</button>
            
            {(liking !== undefined) && <div className={styles.illustration}>
                {(liking === 'like'  ) && <span>Liking...</span>}
                {(liking === 'unlike') && <span>Unliking...</span>}
            </div>}
        </div>
    );
};
```

#### 🧠 Ephemeral Animation Behavior

The hook manages a short-lived state that remains active while an animation is running:

- If an animation is already in progress, any new action is deferred until the current animation completes.  
- Once the active animation finishes, the most recent pending action is resumed and its animation begins.  
- If multiple actions are triggered during an ongoing animation, only the latest one is preserved — earlier ones are discarded.  
- This guarantees that animations are never interrupted mid-flight and outdated actions are ignored, keeping the lifecycle predictable and consistent across all specialized states.  
- When no further actions remain, the ephemeral state resets back to *idle*.  

## 🧩 Exported CSS Hook

### `usingEphemeralState(ephemeralBehavior: CssEphemeralBehavior): CssRule`

Applies live CSS variables for ephemeral styling, including:
- **Animation variables** for *visual effects* whenever an activity or status change occurs
- **Factor variables** for *gradual drivers* that control activity animations

**`CssEphemeralBehavior` interface:**
- **`animations`**
  Defines ephemeral animation cases for *visual effects* whenever an activity or status change occurs.
- **`factorVar`**
  Specifies a CSS variable for smooth transitions.
- **`factorCondVar`**
  Specifies a CSS variable for smooth transitions with idle fallback.
- **`ifInactiveState`**
  Defines the condition for the idle baseline state.

#### 💡 Usage Example

```ts
// Describe how a "like" button should animate:
const likeStateRule : CssRule = usingEphemeralState({
    // Ephemeral animations for visual effects whenever an activity or status change occurs:
    animations      : [
        // Animates a "like" button when toggled:
        {
            // Condition: when the button is in the "liked" state:
            ifState   : ifLiked,
            
            // CSS variable to assign when the condition is met:
            variable  : likeStateVars.likedAnimation,
            
            // Animation reference or value to apply:
            animation : options.likedAnimation,
        },
        
        // Animates an "unlike" button when toggled:
        {
            ifState   : ifUnliked,
            variable  : likeStateVars.unlikedAnimation,
            animation : options.unlikedAnimation,
        },
    ],
    
    // Factor variables for gradual drivers that control activity animations:
    factorVar       : likeStateVars.likeFactor,
    factorCondVar   : likeStateVars.likeFactorCond,
    ifInactiveState : ifIdle,
});

// Apply ephemeral styling alongside other styles:
return style({
    display  : 'grid',
    fontSize : '1rem',
    
    // Apply "like" state rule:
    ...likeStateRule,
    // `CssRule` is an object with a unique symbol property (`{ [Symbol()]: CssRuleData }`),
    // so it can be safely spread without risk of overriding other styles.
});
```

#### 🎨 Rendered CSS

```css
.the-component-scope {
    display   : grid;
    font-size : 1rem;
    
    --like-likeFactorCond: var(--like-likeFactor);
    
    /* Animation states: */
    &.is-liking {
        --like-liking: var(--anim-liking);
    }
    &.is-unliking {
        --like-unliking: var(--anim-unliking);
    }
    &.is-idle {
        --like-likeFactorCond: unset;
    }
}

@property --like-likeFactor {
    syntax        : "<number>";
    inherits      : true;
    initial-value : 0;
}
```

#### 🧠 How CSS Ephemeral State Works

Ephemeral state works by **triggering an animation and tracking its lifecycle**.  
While the animation is running, the ephemeral state is marked as *active*.
Once the animation finishes, the state resets back to *idle*.

- **Intent**: Activates an ephemeral state for a short-lived period.  
- **Mechanics**:  
    - An activity triggers `setActivity()` (or `setLikeActivity()` in the example).  
      This marks the state as active and toggles a semantic `classname`.  
    - When the `classname` matches an `ifState` condition (e.g. `&.is-liking { ... }`),  
      a CSS variable is assigned with the configured animation:  
        ```css
        .the-component-scope {
            /* Conditional animation: */
            &.is-liking {
                --like-liking: var(--anim-liking);
            }
        }
        ```
    - That variable drives the animation:  
        ```css
        .the-component-scope {
            /* Usage: */
            animation: var(--like-liking), var(--other-animation);
        }
        ```
    - The system tracks the running animation until completion.  
      Once finished, the state flag resets to idle.  
      *Note*: If no matching animation is detected within a few frames of activation,  
      the system assumes the animation completed instantly and resets the state immediately.

### ✅ Summary

Ephemeral-state combines two layers into a unified model:  
- **Ephemeral animations** → define which animations run and when.  
- **Animation tracker**    → monitors animation lifetime and toggles a short-lived state.  

This layered approach makes ephemeral feedback **declarative, predictable, and maintainable**, ensuring consistent behavior across components while reducing boilerplate.

## 📚 Related Packages

- [`@reusable-ui/sort-state`](https://www.npmjs.com/package/@reusable-ui/sort-state) – Animates sorting transitions whenever a sorting action occurs, making the changes feel visible and intuitive.  

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/ephemeral-state** is a core utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/ephemeral-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/ephemeral-state delivers expressive, lifecycle‑aware ephemeral management for modern UIs.**  
Give it a ⭐ on GitHub if you find it useful!  
