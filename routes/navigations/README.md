# @reusable-ui/navigations 🔗  

Router-agnostic hooks and utilities for pathname extraction, resolution, and matching.  
Perfect for building navigation components and route-aware states in any React environment — whether you’re using Next.js, React Router, or a custom routing solution.

## ✨ Features
✔ `<Link>`-aware matching hooks  
✔ Absolute and relative path resolution  
✔ Exact and partial pathname comparison  
✔ Trailing slash and segment-boundary normalization  
✔ SSR-compatible design with no router dependency  
✔ Robust utilities for advanced navigation logic  

## 📦 Installation
Install **@reusable-ui/navigations** via npm or yarn:

```sh
npm install @reusable-ui/navigations
# or
yarn add @reusable-ui/navigations
```

## 🔁 Exported Hooks

### `useLinkPathMatch(props: LinkPathMatchProps): boolean`

High-level hook for determining if a `<Link>`’s destination matches the current page location.

Ideal for components that accept a `<Link>` as a child. Automatically extracts and compares the `<Link>`’s destination against the current page location.


#### 🔧 Usage Example

```tsx
import React, { ComponentProps } from 'react';
import { useLinkPathMatch, LinkPathMatchProps, extractRouteSegmentUnits } from '@reusable-ui/navigations';
import { useOptionalLinkWrapper } from '@reusable-ui/links';
import { usePathname } from 'next/navigation'; // Next.js
// import { useMatches } from 'react-router'; // React Router

export interface NavMenuProps extends ComponentProps<'button'>, Omit<LinkPathMatchProps, 'currentPathname'> {
}
export const NavMenu = (props: NavMenuProps) => {
    const { pathMatchStrategy } = props;
    const currentPathname = usePathname() ?? ''; // Next.js
    // const currentPathname = extractRouteSegmentUnits(useMatches()); // React Router
    
    const isActive = useLinkPathMatch({
        currentPathname,
        children : props.children, // Pass the actual pathname from `<Link href|to={...}>`.
        pathMatchStrategy,
    });
    
    return useOptionalLinkWrapper(
        <button type='button' {...props} className={`${props.className} ${isActive ? 'active' : ''}`} />
    );
};

// Usage:

// Next.js:
<NavMenu pathMatchStrategy='partial'>
    <Link href='/profile'>Profile</Link>
</NavMenu>

// React Router:
<NavMenu pathMatchStrategy='partial'>
    <Link to='/profile'>Profile</Link>
</NavMenu>
```

### `useCurrentPathMatch(props: CurrentPathMatchProps): boolean`

Mid-level hook for determining if an explicit actual pathname (such as from `href`) matches the current page location.

Ideal for components that cannot accept a `<Link>` as a child, but you still need to compare given actual pathname against the current page location.

#### 🔧 Usage Example

```tsx
import React, { ComponentProps } from 'react';
import { useCurrentPathMatch, CurrentPathMatchProps, extractRouteSegmentUnits } from '@reusable-ui/navigations';
import { usePathname } from 'next/navigation'; // Next.js
// import { useMatches } from 'react-router'; // React Router

export interface NavLinkProps extends ComponentProps<'a'>, Omit<CurrentPathMatchProps, 'currentPathname' | 'actualPathname'> {
}
export const NavLink = (props: NavLinkProps) => {
    const { pathMatchStrategy } = props;
    const currentPathname = usePathname() ?? ''; // Next.js
    // const currentPathname = extractRouteSegmentUnits(useMatches()); // React Router
    
    const isActive = useCurrentPathMatch({
        currentPathname,
        actualPathname: props.href, // Pass the actual pathname from `href`.
        pathMatchStrategy,
    });
    
    return (
        <a {...props} className={`${props.className} ${isActive ? 'active' : ''}`} />
    );
};

// Usage:
<NavLink href='/profile' pathMatchStrategy='partial'>
    Profile
</NavLink>
```

### `useNavigationPathMatch(props: NavigationPathMatchProps): boolean`

Low-level hook for determining if an explicit actual pathname (such as from `href`) matches a manually defined expected pathname.

Ideal for components that both actual and expected pathnames are known ahead of time and need to be compared directly.

For even more granular control, consider using the `evaluatePathMatch()` utility.

#### 🔧 Usage Example

```tsx
import React, { ComponentProps } from 'react';
import { useNavigationPathMatch, NavigationPathMatchProps, extractRouteSegmentUnits } from '@reusable-ui/navigations';
import { usePathname } from 'next/navigation'; // Next.js
// import { useMatches, useHref } from 'react-router'; // React Router

export interface NavLabelProps extends ComponentProps<'span'>, Omit<NavigationPathMatchProps, 'currentPathname' | 'actualPathname'> {
    target : string
}
export const NavLabel = (props: NavLabelProps) => {
    const { pathMatchStrategy } = props;
    const currentPathname = usePathname() ?? ''; // Next.js
    // const currentPathname = extractRouteSegmentUnits(useMatches()); // React Router
    
    const expectedPathname = currentPathname; // Next.js
    // const expectedPathname = useLocation().pathname; // React Router
    
    const isActive = useNavigationPathMatch({
        currentPathname,
        expectedPathname,
        actualPathname: props.target, // provides the actual pathname from target
        pathMatchStrategy,
    });
    
    return (
        <span {...props} className={`${props.className} ${isActive ? 'active' : ''}`} />
    );
};

// Usage:
<NavLabel target='/profile' pathMatchStrategy='partial'>
    Profile
</NavLabel>
```

## 🧩 Exported Utilities

### `evaluatePathMatch(actualPathname: string, expectedPathname: string, strategy: PathMatchStrategy): boolean`

Lowest-level comparator for determining if two pathnames match under a given strategy.

Requires both inputs to be **absolute paths** (i.e., start with `/`).  
Always returns `false` if either input is non-absolute.

Use `resolveAbsolutePathFromRelative()` to convert relative path to absolute one.

### `resolveAbsolutePathFromRelative(currentPathname: string | string[], relativePath: string): \`/${string}\``

Resolves an absolute path from a relative path (e.g. `'../profile'`, `'./settings'`) against a current absolute pathname (e.g. `'/dashboard/settings'`).

Returns a normalized absolute path starting with `/`.

### `resolveAbsolutePathFromSource(currentPathname: string | string[], pathSource: string | UrlObject | To): \`/${string}\``

Extracts a guaranteed absolute pathname from any path-like source (relative path, absolute path, `UrlObject` object, or `To` object).

### `extractPathnameFromSource(pathSource: string | UrlObject | To): string`

Extracts a pathname (can be absolute or relative) from any path-like source (relative path, absolute path, `UrlObject` object, or `To` object).

If you need a guaranteed absolute path, use `resolveAbsolutePathFromSource()`.

### `extractRouteSegmentUnits(matchedRoutes: MatchedRoute[]): string[]`

A React Router helper to extract segment-based pathnames from `useMatches()`.

Returns the full route stack as a pathname segment — ideal for comparisons and breadcrumb logic.

---

## 🧠 Hook Hierarchy Reference

| Hook                     | Level      | Input Style                                          |
|--------------------------|------------|------------------------------------------------------|
| `useLinkPathMatch`       | High       | Infers `href/to` from `<Link>` children              |
| `useCurrentPathMatch`    | Mid        | Accepts explicit `actualPathname`                    |
| `useNavigationPathMatch` | Low        | Accepts both `actualPathname` and `expectedPathname` |
| `evaluatePathMatch`      | Lowest     | Raw string comparator for absolute paths             |

---

## 📖 Part of the Reusable-UI Framework  
**@reusable-ui/navigations** is a core logic module within the [Reusable-UI](https://github.com/reusable-ui/reusable-ui-monorepo) project.  
For full UI components, visit **@reusable-ui/core** and **@reusable-ui/components**.

## 🤝 Contributing  
Want to improve **@reusable-ui/navigations**? Check out our [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines!  

## 🛡️ License  
Licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.  

---

🚀 **@reusable-ui/navigations brings clarity, precision, and elegance to route-aware React design.**  
Give it a ⭐ on GitHub if you find it useful!  
