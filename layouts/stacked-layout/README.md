# @reusable-ui/stacked-layout 📦  

**stacked-layout** seamlessly stacks multiple components into a unified container,
making individual sub-elements **visually appear as a single composite component**.

It serves as the underlying foundation for building composite components with sectioned sub-elements, such as:

- `<Group>` — Groups inline or block controls together seamlessly.
- `<List>` — Stacks list items with unified outer borders and inner dividers.
- `<Card>` — Combines body content with optional headers, footers, or media sections.
- **Custom Groupables** — Any custom components designed to pair together visually.

By integrating `usingStackedLayout()`, you can apply consistent layout logic —  
automatically adjusting inner corner radii, collapsing overlapping edges, and optionally adding separators between children for a unified appearance.

## 🎨 What Stacked Layout Does

Instead of every child element rendering its own independent borders and rounded corners,
stacked-layout dynamically coordinates them so the stack feels like a single, solid piece:

- **Corners**     → The first child gets rounded corners at the start, the last child gets rounded corners at the end, and the middle children stay squared so everything fits together.  
- **Separators**  → Optional borders can be placed between children to visually divide them without doubling up border widths.  
- **Consistency** → Borders and radii are coordinated so the whole stack appears as a single rounded rectangle, no matter how many children are inside.  

### ✨ Key Idea

Stacked layout **collapses borders, unifies corners, and adds separators when needed**,
turning a set of components into a **single composite component**.

## 🔗 Integration with Border Feature

To participate in stacked layouts, a component must implement `usingBorderFeature()`.  
This allows the framework to dynamically *override* borders and corner radii
while preserving the component's default style properties when used standalone.

### ✅ Stackable Component (Managed Border Feature)

Use `usingBorderFeature()` to let the framework dynamically control the borders and radii:

```ts
export const componentStyle = () => {
    // Configure manageable border feature:
    const {
        borderFeatureRule,
        borderFeatureVars: {
            borderStyle,
            borderColor,
            
            borderInlineStartWidth,
            borderInlineEndWidth,
            borderBlockStartWidth,
            borderBlockEndWidth,
            
            borderStartStartRadius,
            borderStartEndRadius,
            borderEndStartRadius,
            borderEndEndRadius,
        },
    } = usingBorderFeature({
        // Default border properties when used as a standalone component:
        borderStyle  : 'solid',
        borderWidth  : '1px',
        borderRadius : '0.25rem',
        borderColor  : 'black',
    });
    
    
    
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Integrate manageable border feature:
        ...borderFeatureRule(),
        
        // Dynamic border properties:
        borderStyle,
        borderColor,
        
        // Dynamic directional widths:
        borderInlineStartWidth,
        borderInlineEndWidth,
        borderBlockStartWidth,
        borderBlockEndWidth,
        
        // Dynamic directional radii:
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
    });
};
```

### 🚫 Non-Stackable Component (Fixed Borders)

Hardcoding CSS border properties *prevents* the framework from adjusting borders and corner radii:

```ts
export const componentStyle = () => {
    return style({
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the component goes here.
        
        // Fixed border properties — cannot be managed by the framework:
        borderStyle  : 'solid',
        borderWidth  : '1px',
        borderRadius : '0.25rem',
        borderColor  : 'black',
    });
};
```

## ✨ Features

✔ Smart corner rounding (start/end corners automatically adjusted)  
✔ Optional separators between children  
✔ Dynamic orientation and flow direction control  
✔ Works seamlessly with component border and radius properties  
✔ Pure CSS runtime — powered by `calc(…)` and algebraic logic  
✔ Strongly typed CSS variables for safe, expressive styling across SSR and hydration  
✔ Extensible foundation for building composite UI primitives  

## 📦 Installation
Install **@reusable-ui/stacked-layout** via npm or yarn:

```sh
npm install @reusable-ui/stacked-layout
# or
yarn add @reusable-ui/stacked-layout
```

## 🧩 Exported CSS Hooks

### `usingStackedLayout(options?: CssStackedLayoutOptions): CssStackedLayout`

Seamlessly stacks multiple components into a unified container,
making individual sub-elements **visually appear as a single composite component**.

#### 💡 Usage Example

The following example shows how to build a **stacked-layout compatible component**.  
It demonstrates two parts working together:

- A **container style** that establishes the stacked layout rules, manages borders, and applies inner corner and separator logic to its children.  
- An **item style** that integrates with the container by exposing its borders and radii through `usingBorderFeature()`, allowing the container to unify them seamlessly.

The container uses `usingStackedLayout()` to define how children are stacked, which corners should be rounded, and where separators should appear.  
Each child item uses `usingBorderFeature()` so its borders and radii can be overridden consistently by the stacked layout, ensuring that the whole group looks like a single composite block.

```ts
// Features:
import { usingBorderFeature } from '@reusable-ui/border-feature';

// Layouts:
import { usingStackedLayout } from '@reusable-ui/stacked-layout';

// CSS-in-JS:
import { style, children } from '@cssfn/core';

/**
 * A container component:
 * - Stacks multiple child items into a unified layout.
 */
export const listContainerStyle = () => {
    // Configure manageable border feature:
    const {
        borderFeatureRule,
        borderFeatureVars: {
            borderStyle,
            borderColor,
            
            borderInlineStartWidth,
            borderInlineEndWidth,
            borderBlockStartWidth,
            borderBlockEndWidth,
            
            borderStartStartRadius,
            borderStartEndRadius,
            borderEndStartRadius,
            borderEndEndRadius,
        },
    } = usingBorderFeature({
        // Default border properties when used as a standalone component:
        borderStyle  : 'solid',
        borderWidth  : '1px',
        borderRadius : '0.25rem',
        borderColor  : 'black',
    });
    
    
    
    // Configure stacked layout behavior:
    const {
        stackedLogicRule,
        stackedInnerCornerRule,
        stackedSeparatorRule,
        
        // Advanced usage (optional):
        // - Raw CSS variables generated by stacked layout if custom `calc(…)` is needed.
        stackedLayoutVars: {
            innerCornerStartStartRadius,
            innerCornerStartEndRadius,
            innerCornerEndStartRadius,
            innerCornerEndEndRadius,
            
            separatorBorderInlineWidth,
            separatorBorderBlockWidth,
        },
    } = usingStackedLayout({
        orientation              : 'block', // Can also accept custom vars like `var(--orientation)`.
        flowDirection            : 'start', // Can also accept custom vars like `var(--flowDirection)`.
        
        innerStartCornerSelector : ':first-child',
        innerEndCornerSelector   : ':last-child',
        separatorBeforeSelector  : ':not(:first-child)',
    });
    
    
    
    return style({
        // Layout structure:
        display       : 'flex',
        flexDirection : 'column',
        // Base styling for the container goes here.
        
        
        
        // Integrate manageable border feature:
        ...borderFeatureRule(),
        
        // Dynamic border properties:
        borderStyle,
        borderColor,
        
        // Dynamic directional widths:
        borderInlineStartWidth,
        borderInlineEndWidth,
        borderBlockStartWidth,
        borderBlockEndWidth,
        
        // Dynamic directional radii:
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
        
        
        
        // Establish stacked layout variables:
        // - Required at container level.
        ...stackedLogicRule(),
        
        
        
        // Apply styles to nested child items:
        ...children('.item', {
            // Automatically adjust inner corners:
            ...stackedInnerCornerRule(),
            
            // Add optional separators between children:
            ...stackedSeparatorRule(),
        }),
    });
};

/**
 * A **stacked-layout compatible** container item component:
 * - Must implement `usingBorderFeature()` to integrate correctly with the container.
 */
export const listItemStyle = () => {
    // Configure manageable border feature:
    const {
        borderFeatureRule,
        borderFeatureVars: {
            borderStyle,
            borderColor,
            
            borderInlineStartWidth,
            borderInlineEndWidth,
            borderBlockStartWidth,
            borderBlockEndWidth,
            
            borderStartStartRadius,
            borderStartEndRadius,
            borderEndStartRadius,
            borderEndEndRadius,
        },
    } = usingBorderFeature({
        // Default border properties when used as a standalone component:
        borderStyle  : 'dashed',
        borderWidth  : '1px',
        borderRadius : '0.25rem',
        borderColor  : 'blue',
    });
    
    
    
    return style({
        // Layout structure:
        display  : 'grid',
        fontSize : '1rem',
        // Base styling for the item goes here.
        
        
        
        // Integrate manageable border feature:
        ...borderFeatureRule(),
        
        // Dynamic border properties:
        borderStyle,
        borderColor,
        
        // Dynamic directional widths:
        borderInlineStartWidth,
        borderInlineEndWidth,
        borderBlockStartWidth,
        borderBlockEndWidth,
        
        // Dynamic directional radii:
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
    });
};
```

## 🧠 How Stacked Layout Works

Stacked layout styling is built from three coordinated parts: **logical variables**, **inner corner styling**, and **separator styling**.  
Together, they extend a basic component's borders and radii into a stacking container,
making multiple children **visually appear as a single composite component**.

### 1. **Logical Variables**

At the container level, the layout captures its **base border widths and corner radii** before any child overrides.  
These values are exposed as CSS variables, ensuring consistent references across children.

- Acts as a **proxy** for reading the parent's custom properties (analogy: `var-of-parent(--borderBaseWidth)`).
- Provides `separatorBorder*Width` for separators and `innerCorner*Radius` for child corners.
- Must be applied to the container element (or an intermediate wrapper between container and children) to establish a shared baseline.

### 2. **Inner Corner Styling**

Each child applies **adjusted corner radii** so that the stacked children align with the container's outer corners.

- **Start and end child** → outer corners rounded, inner corners squared.  
- **Middle children** → all corners squared for seamless interior edges.  
- Radii are clamped to `0px` if border widths exceed the radius, ensuring valid geometry.

This rule makes the stack's edges form a continuous rounded rectangle without overlap.

### 3. **Separator Styling**

Separators visually divide children by applying borders to sides facing the **previous sibling**.

- Uses `separatorBorder*Width` captured from the container, so thickness stays consistent even if children override their own base border widths.  
- Applied only to children after the first.  
- Optional: include only if visual separation is desired.

### ✨ Key Idea

- **Logical variables** capture parent values.  
- **Inner corner styling** ensures rounded/squared corners appear at the correct edges.  
- **Separator styling** adds optional borders between children.  

Together, they collapse borders seamlessly, unify corners, and provide optional separators — making stacked children behave like a **single composite component** while still allowing individual overrides.

### ✅ Summary

Stacked layout is a CSS-only system that:  
- Captures parent border widths and radii as reusable variables.  
- Dynamically adjusts child corners to align with the container.  
- Optionally inserts separators between children.  
- Produces a unified, rounded rectangle appearance using only `calc(…)` and algebraic CSS logic.  

## 📚 Related Packages

- [`@reusable-ui/group`](https://www.npmjs.com/package/@reusable-ui/group) – Groups multiple components inline or block into a single composite component.

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/stacked-layout** is a core layout utility of the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/stacked-layout**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/stacked-layout delivers seamless, unified layout foundations for your composite UI.**  
Give it a ⭐ on GitHub if you find it useful!  
