# @reusable-ui/theme-variant 📦  

A utility for managing component themes consistently across React projects.  
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

```ts
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

The hook evaluates the effective theme using a tiered approach:
1. **Explicit Prop Override**  
   - If `props.theme` is set to a value other than `'inherit'`, it takes precedence.
2. **Relative Resolution**  
   - If no parent context found, skip to next step.
   - If set to `'inherit'`, it adopts theme from a parent context (`ThemeVariantProvider`).
3. **Fallback Options**  
   - Uses `options.defaultTheme` if provided.
   - Falls back to system default if all else fails.

#### 🧬 Example with `inherit`

```tsx
import {
    ThemeVariantProvider,
    useThemeVariant,
} from '@reusable-ui/theme-variant';

const ParentComponent = () => (
    <ThemeVariantProvider theme='danger'>
        <ChildComponent />
    </ThemeVariantProvider>
);

const ChildComponent = () => {
    const { theme, themeClassname } = useThemeVariant({
        theme: 'inherit',
    });
    
    return <div className={themeClassname}>I'm {theme}</div>;
};
```

---

## 🎨 CSS Selectors & Conditional Rule Helpers

```ts
import {
    // Selector:
    themeSelector, // Targets `.t-${theme}` class
    
    // Conditional Rule Helper:
    ifTheme,       // Applies styles for a specific theme
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
