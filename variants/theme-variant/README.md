# @reusable-ui/theme-variant 📦  

A utility for managing themes consistently across React components.  
Provides hooks and CSS helpers for theme resolution and conditional styling — ideal for buttons, cards, badges, input fields, and any themeable UI elements.

## ✨ Features
✔ Declarative theme tokens (`primary`, `secondary`, `danger`, etc.) with support for custom values  
✔ Automatic CSS class generation (`.t-primary`, `.t-secondary`, etc.)  
✔ Fallback mechanism for default theme resolution  
✔ CSS selectors and conditional rule helpers for theme-aware styling  
✔ Seamless integration across layout, appearance, and color systems

## 📦 Installation
Install **@reusable-ui/theme-variant** via npm or yarn:

```sh
npm install @reusable-ui/theme-variant
# or
yarn add @reusable-ui/theme-variant
```

## 🧩 Exported Hooks

### `useThemeVariant(props, options)`

Resolves the theme value along with its associated CSS class name, based on component props, optional default configuration, and parent context.

#### 💡 Usage Example

```tsx
import React, { FC } from 'react';
import {
    useThemeVariant,
    ThemeVariantProps,
} from '@reusable-ui/theme-variant';
import styles from './ThemeableCard.module.css';

export interface ThemeableCardProps extends ThemeVariantProps {}

/**
 * A themeable card component that adapts based on the given theme.
 * Supports `primary`, `secondary`, `danger`, etc.
 */
export const ThemeableCard : FC<ThemeableCardProps> = (props) => {
    const {
        theme,
        themeClassname,
    } = useThemeVariant(props, {
        defaultTheme: 'primary', // fallback if not provided
    });
    
    return (
        <div
            className={`${styles.box} ${themeClassname}`}
        >
            <strong>Resolved theme:</strong> {theme}
        </div>
    );
};
```

#### 🧠 Theme Resolution Strategy

The hook determines the final theme using the following priority:
1. **Explicit Prop Override**  
   - If `props.theme` is a value other than `'inherit'`, it takes precedence.
2. **Relative Resolution**  
   - If set to `'inherit'`, uses the value from context, if available (`ThemeVariantProvider`).
3. **Fallback Logic**  
   - Uses `options.defaultTheme` if provided.
   - Defaults to system default if none is provided.

#### 🧬 Context Propagation

Use `<ThemeVariantProvider>` to share theme with descendant components:

```tsx
import React, { ReactNode, FC } from 'react';
import {
    ThemeVariantProps,
    ThemeVariantProvider,
    useThemeVariant,
} from '@reusable-ui/theme-variant';

export interface ParentComponentProps extends ThemeVariantProps {
    children ?: ReactNode
}

/**
 * A component that shares its theme with descendant components.
 */
export const ParentComponent: FC<ParentComponentProps> = (props) => {
    // Resolve theme value from props:
    const { theme } = useThemeVariant(props, {
        defaultTheme: 'primary', // fallback if not provided
    });
    
    // Propagate theme value to descendants:
    return (
        <ThemeVariantProvider theme={theme}>
            {props.children}
        </ThemeVariantProvider>
    );
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Theme Selectors:
    themeSelector, // Targets `.t-${theme}` class
    
    // Conditional styling helpers:
    ifTheme,       // Applies styles to a specific theme
} from '@reusable-ui/theme-variant';
import { style, rule } from '@cssfn/core';

export const componentStyle = () => style({
    display: 'grid',
    padding: '1rem',
    color: 'currentColor',
    ...ifTheme('success', {
        backgroundColor: 'lightgreen',
        color: 'darkgreen',
    }),
    ...ifTheme('danger', {
        backgroundColor: 'pink',
        color: 'darkred',
    }),
    ...rule(themeSelector('warning'), {
        backgroundColor: 'yellow',
        color: 'black',
    }),
});
```

---

## 🧩 Exported CSS Hooks

### `usesThemeVariant()`

Generates theme-specific CSS rules and exposes theme-related CSS variables for styling components based on the active theme.

Automatically maps theme roles (e.g. background, foreground, decoration, border) to the appropriate color variables from `@reusable-ui/colors`,
depending on the active theme variant. Supports multiple styling modes like **regular**, **mild**, and **outlined**.

#### 💡 Usage Example

```ts
import {
    usesThemeVariant,
} from '@reusable-ui/theme-variant';
import {
    ifOutlined,
} from '@reusable-ui/outline-variant';
import { style } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule, themeVariantVars } = usesThemeVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply theme-specific variable overrides:
        ...themeVariantRule(),
        
        // Use semantic theme variables in styling:
        backgroundColor     : themeVariantVars.backg,
        color               : themeVariantVars.foreg,
        
        // Apply outlined variant styling:
        ...ifOutlined({
            backgroundColor : 'transparent',
            color           : themeVariantVars.foregOutlined,
        }),
    });
};
```

#### 🧠 How It Works

- For each registered theme (e.g. `primary`, `danger`, `success`, etc.), the hook generates scoped rules like:
    ```css
    &.t-primary {
        --t-backg  : var(--col-primaryBase);
        --t-foreg  : var(--col-primaryFlip);
        --t-border : var(--col-primaryBold);
        ...
    }
    ```
- These rules ensure that semantic theme variables (`--t-backg`, `--t-foreg`, etc.) resolve to the correct theme-specific values depending on the active theme variant.
- You can then use those theme variables in your component styles:
    ```ts
    style({
        backgroundColor : themeVariantVars.backg, // gets: `var(--t-backg)`
        color           : themeVariantVars.foreg, // gets: `var(--t-foreg)`
    });
    ```

### `usesThemeOverride(theme)`

Injects theme-specific CSS variables to override the current theme contextually.

Useful for conditional states such as **error**, **success**, **warning**, etc.  
The returned `CssRule` should be scoped within a conditional selector (e.g. `:invalid`, `.error`, `.success`) to avoid applying the override unconditionally.

#### 💡 Usage Example

```ts
import {
    usesThemeVariant,
    usesThemeOverride,
} from '@reusable-ui/theme-variant';
import {
    ifOutlined,
} from '@reusable-ui/outline-variant';
import { style, rule, switchOf } from '@cssfn/core';

export const componentStyle = () => {
    const { themeVariantRule, themeVariantVars } = usesThemeVariant();
    
    return style({
        display: 'flex',
        // Define component styling here.
        
        // Apply theme-specific variable overrides:
        ...themeVariantRule(),
        
        // Use semantic theme variables with fallback chaining:
        backgroundColor     : switchOf(
            themeVariantVars.backgOverride,
            themeVariantVars.backg,
        ),
        color               : switchOf(
            themeVariantVars.foregOverride,
            themeVariantVars.foreg,
        ),
        
        // Apply outlined variant styling:
        ...ifOutlined({
            backgroundColor : 'transparent',
            color           : switchOf(
                themeVariantVars.foregOutlinedOverride,
                themeVariantVars.foregOutlined,
            ),
        }),
        
        // Override theme when component is invalid:
        ...rule(':invalid', {
            ...usesThemeOverride('danger'),
        }),
        
        // Override theme when component is valid:
        ...rule(':valid', {
            ...usesThemeOverride('success'),
        }),
    });
};
```

#### 🧠 How It Works

- `usesThemeOverride('danger')` injects high-priority theme variables like:
    ```css
    --t-backgOverride  : var(--col-dangerBase);
    --t-foregOverride  : var(--col-dangerFlip);
    --t-borderOverride : var(--col-dangerBold);
    ...
    ```
- These override the default theme resolution using `switchOf(...)`, which selects the first defined value in the chain:
    ```ts
    style({
        backgroundColor : switchOf(
            themeVariantVars.backgOverride,
            themeVariantVars.backg,
        ), // Will be rendered to: `var(--t-backgOverride, var(--t-backg))`
    });
    ```

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/theme-variant** is a variant utility within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/theme-variant**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/theme-variant enables theme-aware styling with ergonomic React hooks.**  
Give it a ⭐ on GitHub if you find it useful!  
