# @reusable-ui/sort-state 📦  

**sort-state** adds animated sorting transitions to sortable UI components (e.g. lists, galleries, grids).  
It makes sorting actions feel visible and intuitive by animating items from their original unsorted positions into their new sorted order, instead of instantly reordering them with no feedback.  

Without sort-state, updating items directly (e.g. `setItems(items.toSorted(...))`)
reorders items immediately, without visual feedback of *how* items moved.  
With sort-state, item positions are snapshotted before and after the sort,
and each item smoothly animates into place — clearly conveying the transition.  

With **sort-state**, you get:  
- Smooth animated sorting transitions  
- Declarative sorting workflow with staged data and commit/clear callbacks  

## ✨ Features
✔ Animated transitions whenever a sorting action occurs  
✔ Declarative workflow via staged sort data → commit callback → clear staged data  
✔ Queues animations to handle rapid consecutive sorting actions gracefully  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Seamless integration across animations and feedback systems  

## 📦 Installation
Install **@reusable-ui/sort-state** via npm or yarn:

```sh
npm install @reusable-ui/sort-state
# or
yarn add @reusable-ui/sort-state
```

## 🧩 Exported Hooks

### `useSortBehaviorState(props, options?)`

Adds animated sorting transitions that make sorting actions feel visible and intuitive
by animating items from their original unsorted positions into their new sorted order.

Without this hook, updating items directly (e.g. `setItems(items.toSorted(...))`)
reorders items immediately, without visual feedback of *how* items moved.  
With this hook, item positions are snapshotted before and after the sort,
and each item animates into place — clearly conveying the transition.

#### 💡 Usage Example

```tsx
import React, { FC, Key, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
    useSortBehaviorState,
    SortStateProps,
    SortStateClearProps,
} from '@reusable-ui/sort-state';
import styles from './SortableList.module.css';

// Example model with a stable id and metadata:
interface Product {
    id    : string
    name  : string
    price : number
    // Other fields...
}

export interface SortableListProps
    extends
        SortStateProps<HTMLDivElement, Product[]>,
        SortStateClearProps
{
}

// A list with sortable items and animated transitions:
export const SortableList: FC<SortableListProps> = (props) => {
    // Internal map of item refs keyed by React `key` (stable id):
    const internalSortItemRefs = useRef<Map<Key, HTMLElement>>(new Map<Key, HTMLElement>());
    
    // Committed data currently rendered in the DOM:
    const [committedItems, setCommittedItems] = useState<Product[]>(() => {
        // Initialize with your data:
        return [];
    });
    
    // Temporary staged data (pending sorted order, not yet committed):
    const [internalStagedSortData, setInternalStagedSortData] = useState<Product[] | undefined>(undefined);
    
    // Props can override these defaults, allowing parent and derived components to control sorting:
    const {
        sortItemRefs          = internalSortItemRefs,
        stagedSortData        = internalStagedSortData,
        onSortCommit          = (stagedSortData) => {
            // Use `flushSync` so React fully renders the committed state immediately within this callback:
            // - Ensures item positions can be diffed accurately between the **before and after** states.
            // - Produces correct movement offsets for the animation.
            flushSync(() => {
                // Commit the new sorted order:
                setCommittedItems(stagedSortData);
            });
        },
        onStagedSortDataClear = () => {
            // Clear staged state:
            setInternalStagedSortData(undefined);
        },
    } = props;
    
    // Hook manages animated sorting transitions:
    const {
        sorting,       // Activity flag
        sortOffsets,   // Per-item movement
        sortClassname, // CSS class for animation triggers
        sortStyles,    // Inline CSS variables
        
        handleAnimationStart,
        handleAnimationEnd,
        handleAnimationCancel,
    } = useSortBehaviorState({
        sortItemRefs,
        stagedSortData,
        onSortCommit,
        onStagedSortDataClear,
    }, {
        animationPattern  : 'list-sorting', // Matches animation names ending with 'list-sorting'.
        animationBubbling : false,          // Ignores bubbling animation events from children.
    });
    
    // Example sort handler: stage a new sorted order without committing immediately:
    const handleSortByPrice = async () => {
        // Example synchronous sort:
        const sortedData = committedItems.toSorted((a, b) => a.price - b.price);
        
        // Example asynchronous sort:
        // const sortedData = await customAsyncSort(committedItems);
        
        // Do not commit directly (would skip animation):
        // setCommittedItems(sortedData);
        
        // Instead stage the new order:
        // - Snapshots current (unsorted) and next (sorted) positions.
        // - Runs animation by transitioning items from unsorted → sorted.
        setInternalStagedSortData(sortedData);
    };
    
    return (
        <div
            className={`${styles.list} ${sortClassname}`}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
        >
            {committedItems.map(({ id, name, price }) => (
                <div
                    key={id}
                    ref={(element) => {
                        if (!element) return;
                        sortItemRefs.current.set(id, element);
                        return () => {
                            sortItemRefs.current.delete(id);
                        };
                    }}
                    className={styles.item}
                    style={sortStyles.get(id)}
                >
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
            ))}
            
            <button onClick={handleSortByPrice}>Sort by price</button>
        </div>
    );
};
```

#### 🧠 How Sort State Works

When you trigger a sort action, the system quickly takes a **before and after snapshot** of where each item sits on the screen.  
From these snapshots, it calculates how far each item needs to move to reach its new position.  

Instead of instantly jumping into the new order, the items first appear to stay in their old spots.  
This is done by quickly applying translation offsets right before the browser paints the new sorted positions.  
Then, those offsets are gradually reduced back to zero, so the items smoothly glide into their new places.  

The result is a clear visual transition from *unsorted* → *sorted*, helping users see what changed instead of the list suddenly rearranging with no feedback.

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Sorting Selectors:
    isSortingSelector,    // Targets `.is-sorting`  classes
    isNotSortingSelector, // Targets `.not-sorting` classes
    
    // Conditional styling helpers:
    ifSorting,            // Applies styles to elements currently being sorted
    ifNotSorting,         // Applies styles to elements currently not being sorted (idle)
} from '@reusable-ui/sort-state';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    fontSize: '1rem',
    ...ifSorting({
        opacity: 0.5,
        pointerEvents: 'none',
    }),
    ...ifNotSorting({
        opacity: 1,
        pointerEvents: 'auto',
    }),
    
    // Alternative approach using explicit selectors:
    ...rule(isSortingSelector, { // equivalent to `ifSorting`
        border: 'none',
    }),
    ...rule(isNotSortingSelector, { // equivalent to `ifNotSorting`
        border: 'solid 1px black',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesSortState(options?: CssSortStateOptions): CssSortState`

Generates CSS rules that conditionally apply the sorting transition whenever a sorting action occurs,
and exposes sort-related CSS variables for conditional animation.

#### Supporting Variables (Advanced Use)

These variables are conditionally valid and may be **invalid** (`unset`) when the component is idle.  
Use `switchOf(...)` to ensure graceful fallback. Useful for conditional styling.

| Variable           | Active When...                | Purpose                                                                                     |
|--------------------|-------------------------------|---------------------------------------------------------------------------------------------|
| `animationSorting` | `.is-sorting` active          | Triggers sorting animation                                                                  |
| `sortFactor`       | Always available (animatable) | Normalized factor: 1 = unsorted illusion, 0 = fully sorted, interpolates during transitions |
| `sortFactorCond`   | Not fully sorted              | Conditional mirror of `sortFactor`, drops to `unset` when fully sorted                      |

#### 💡 Usage Example

```ts
// Animation feature:
import { usesAnimationFeature } from '@reusable-ui/animation-feature';

// Sort state:
import { usesSortState } from '@reusable-ui/sort-state';

// CSS-in-JS:
import { style, vars, keyframes, children } from '@cssfn/core';

export const sortableListStyle = () => {
    // Feature: animation handling
    const {
        animationFeatureRule,
        animationFeatureVars: { animation },
    } = usesAnimationFeature();
    
    // Feature: sorting transition
    const {
        sortStateRule,
        sortStateVars: { sortOffsetX, sortOffsetY, sortFactor },
    } = usesSortState({
        animationSorting: 'var(--list-sorting)',
    });
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply animation feature rules:
        ...animationFeatureRule(),
        
        // Apply sorting state rules:
        ...sortStateRule(),
        
        // Sorting animation: interpolate sortFactor from 1 → 0
        ...vars({
            '--list-sorting': [
                ['0.3s', 'ease-out', 'both', 'sorting'],
            ],
        }),
        ...keyframes('sorting', {
            from : { [sortFactor]: 1 }, // Start fully unsorted.
            to   : { [sortFactor]: 0 }, // End fully sorted.
        }),
        
        // Example usage:
        
        ...children('.item', {
            // Translate each item from its unsorted position → sorted position:
            // - `sortOffsetX` and `sortOffsetY` are applied per item (via sortStyles).
            // - `sortFactor` applies at container level, interpolating the offsets over time.
            transform: `translate(calc(${sortOffsetX} * 1px * ${sortFactor}), calc(${sortOffsetY} * 1px * ${sortFactor}))`,
        }),
        
        // Apply composed animations:
        animation,
    });
}
```

#### 🧠 Resolution Logic

The `animationSorting` variable is conditionally defined when `.is-sorting` is active.  

The variable is already registered to `@reusable-ui/animation-feature`, so you typically don't need to consume it directly.  
Instead, use `animationFeatureVars.animation` from `usesAnimationFeature()` to apply the unified animation stack—combining sorting animation with other state-driven animations.

## Why Declarative Sorting Workflow

Originally, **sort-state** exposed an imperative sorting command pattern:

```ts
const sortItemRefs      = useRef<Map<Key, HTMLElement>>(new Map<Key, HTMLElement>());
const [items, setItems] = useState<ItemMetadata[]>(initialItems);

const {
    startSortTransition,
    sortOffsets,   // Per-item movement
    sortClassname, // CSS class for animation triggers
    sortStyles,    // Inline CSS variables
    ...animationHandlers,
} = useSortBehaviorState(...);

const handleSort = () => {
    // Imperative: manually trigger the transition:
    startSortTransition(sortItemRefs, () => {
        // Commit new sorted order:
        setItems(items.toSorted(...));
    });
};

return items.map(...);
```

This pattern feels similar to React's `startTransition`.  
However, the imperative logic can only live inside the base component (e.g. `<Gallery>`).  
To reuse it in a derived component (e.g. `<SpecificGallery>`), you'd either need to re-implement the same hook logic, or expose `startSortTransition` via `useImperativeHandle` — which is awkward and uncommon in React design.

### Refactored: Declarative Workflow

To solve this, the API was redesigned around a **declarative workflow**:

```ts
const internalSortItemRefs = useRef<Map<Key, HTMLElement>>(new Map<Key, HTMLElement>());
const [items, setItems]    = useState<ItemMetadata[]>(initialItems);

// Local staged state for pending sort data:
const [internalStagedSortData, setInternalStagedSortData] = useState<ItemMetadata[] | undefined>(undefined);

// Props can override these defaults, allowing derived components to control sorting:
const {
    sortItemRefs          = internalSortItemRefs,
    stagedSortData        = internalStagedSortData,
    onSortCommit          = (stagedSortData) => {
        // Commit new sorted order:
        setItems(stagedSortData);
    },
    onStagedSortDataClear = () => {
        // Clear staged state:
        setInternalStagedSortData(undefined);
    },
} = props;

const {
    sorting,       // Activity flag
    sortOffsets,   // Per-item movement
    sortClassname, // CSS class for animation triggers
    sortStyles,    // Inline CSS variables
    ...animationHandlers,
} = useSortBehaviorState({
    sortItemRefs,
    stagedSortData,
    onSortCommit,
    onStagedSortDataClear,
});

const handleSort = () => {
    // Just set staged data, hook handles commit + animation:
    setInternalStagedSortData(items.toSorted(...));
};

return items.map(...);
```

### Why This Matters

Because `sortItemRefs`, `stagedSortData`, `onSortCommit`, and `onStagedSortDataClear` are exposed as **optional props with internal defaults**, derived components can either:
- Use the built-in defaults for internal sorting, or  
- Override them to fit a specific use case.  

This makes sorting behavior **overridable and reusable** without duplicating `useSortBehaviorState` hook — ensuring smoother onboarding, better ergonomics, and consistent animated feedback across components.

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/sort-state** is a state management within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/sort-state**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/sort-state animates sorting transitions to sortable UI components.**  
Give it a ⭐ on GitHub if you find it useful!  
