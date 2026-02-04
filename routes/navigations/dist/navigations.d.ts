import { type ReactNode } from 'react';
import { type PathMatchStrategy } from './types.js';
import { type UrlObject } from 'url';
import { type To } from 'history';
/**
 * Props for determining if an explicit actual pathname (such as from `href`) matches a manually defined expected pathname.
 *
 * Ideal for components that both actual and expected pathnames are known ahead of time and need to be compared directly.
 */
export interface NavigationPathMatchProps {
    /**
     * The current page pathname, used for resolving relative paths,
     * and as a reference point for semantic path matching.
     *
     * Must be explicitly provided for SSR compatibility.
     * Accepts:
     *   - A pathname string (e.g. '/users/matt')
     *   - An array of segment units (e.g. ['', 'users', 'matt']), where:
     *       - Each string represents the segment(s) contributed by one route level
     *       - Units may contain multiple segments delimited by '/'
     *       - Examples:
     *           - ['', 'users', 'matt'] → resolves from '/users/matt'
     *           - ['', 'admin/settings'] → represents one route contributing two segments
     */
    currentPathname: string | string[];
    /**
     * The pathname to test against the expected location.
     * Accepts:
     *   - A pathname string (e.g. `/about/team`)
     *   - A `UrlObject` with a `pathname` property (e.g. `{ pathname: '/about/team' }`)
     *   - A `To` object with a `pathname` property (e.g. `{ pathname: '/about/team' }`)
     *   - `null` to skip resolution and matching.
     *
     * Defaults to `null`
     */
    actualPathname?: string | UrlObject | To | null;
    /**
     * The expected target pathname.
     * Accepts:
     *   - Absolute pathname string (e.g. '/about')
     *   - Relative pathname string (e.g. '../team')
     *   - `null` to skip resolution and matching.
     *
     * Defaults to `null`
     */
    expectedPathname?: string | null;
    /**
     * Defines how strictly paths are compared.
     * Accepts:
     *   - `'exact'`: Full pathname equality.
     *   - `'partial'`: `startsWith()` match with segment boundary awareness.
     *
     * Defaults to `'partial'`
     */
    pathMatchStrategy?: PathMatchStrategy;
}
/**
 * Low-level hook for determining if an explicit actual pathname (such as from `href`) matches a manually defined expected pathname.
 *
 * Ideal for components that both actual and expected pathnames are known ahead of time and need to be compared directly.
 *
 * For even more granular control, consider using the `evaluatePathMatch()` utility.
 *
 * @param props - A configuration for path matching.
 *   @param props.currentPathname - The current page pathname, used for resolving relative paths and as a reference point for semantic path matching.
 *   @param props.actualPathname - The pathname to test against the expected location. If `null`, skips resolution and matching.
 *   @param props.expectedPathname - The expected target pathname. If `null`, skips resolution and matching.
 *   @param props.pathMatchStrategy - Defines how strictly paths are compared. Defaults to `'partial'`.
 *
 * @returns `true` if the actual pathname matches the expected target; otherwise `false`.
 *
 * @example
 * ```tsx
 * import React, { ComponentProps } from 'react';
 * import { useNavigationPathMatch, NavigationPathMatchProps, extractRouteSegmentUnits } from '@reusable-ui/navigations';
 * import { usePathname } from 'next/navigation'; // Next.js
 * // import { useMatches, useHref } from 'react-router'; // React Router
 *
 * export interface NavLabelProps extends ComponentProps<'span'>, Omit<NavigationPathMatchProps, 'currentPathname' | 'actualPathname'> {
 *     target : string
 * }
 * export const NavLabel = (props: NavLabelProps) => {
 *     const { pathMatchStrategy } = props;
 *     const currentPathname = usePathname() ?? ''; // Next.js
 *     // const currentPathname = extractRouteSegmentUnits(useMatches()); // React Router
 *
 *     const expectedPathname = currentPathname; // Next.js
 *     // const expectedPathname = useLocation().pathname; // React Router
 *
 *     const isActive = useNavigationPathMatch({
 *         currentPathname,
 *         expectedPathname,
 *         actualPathname: props.target, // provides the actual pathname from target
 *         pathMatchStrategy,
 *     });
 *
 *     return (
 *         <span {...props} className={`${props.className} ${isActive ? 'active' : ''}`} />
 *     );
 * };
 *
 * // Usage:
 * <NavLabel target='/profile' pathMatchStrategy='partial'>
 *     Profile
 * </NavLabel>
 * ```
 */
export declare const useNavigationPathMatch: (props: NavigationPathMatchProps) => boolean;
/**
 * Props for determining if an explicit actual pathname (such as from `href`) matches the current page location.
 *
 * Ideal for components that cannot accept a `<Link>` as a child, but you still need to compare given actual pathname against the current page location.
 */
export interface CurrentPathMatchProps extends Omit<NavigationPathMatchProps, 'expectedPathname'> {
}
/**
 * Mid-level hook for determining if an explicit actual pathname (such as from `href`) matches the current page location.
 *
 * Ideal for components that cannot accept a `<Link>` as a child, but you still need to compare given actual pathname against the current page location.
 *
 * @param props - A configuration for path matching.
 *   @param props.currentPathname - The current page pathname, used for resolving relative paths and as a reference point for semantic path matching.
 *   @param props.actualPathname - The pathname to test against the current page location. If `null`, skips resolution and matching.
 *   @param props.pathMatchStrategy - Defines how strictly paths are compared. Defaults to `'partial'`.
 *
 * @returns `true` if the actual pathname matches the current page location; otherwise `false`.
 *
 * @example
 * ```tsx
 * import React, { ComponentProps } from 'react';
 * import { useCurrentPathMatch, CurrentPathMatchProps, extractRouteSegmentUnits } from '@reusable-ui/navigations';
 * import { usePathname } from 'next/navigation'; // Next.js
 * // import { useMatches } from 'react-router'; // React Router
 *
 * export interface NavLinkProps extends ComponentProps<'a'>, Omit<CurrentPathMatchProps, 'currentPathname' | 'actualPathname'> {
 * }
 * export const NavLink = (props: NavLinkProps) => {
 *     const { pathMatchStrategy } = props;
 *     const currentPathname = usePathname() ?? ''; // Next.js
 *     // const currentPathname = extractRouteSegmentUnits(useMatches()); // React Router
 *
 *     const isActive = useCurrentPathMatch({
 *         currentPathname,
 *         actualPathname: props.href, // Pass the actual pathname from `href`.
 *         pathMatchStrategy,
 *     });
 *
 *     return (
 *         <a {...props} className={`${props.className} ${isActive ? 'active' : ''}`} />
 *     );
 * };
 *
 * // Usage:
 * <NavLink href='/profile' pathMatchStrategy='partial'>
 *     Profile
 * </NavLink>
 * ```
 */
export declare const useCurrentPathMatch: (props: CurrentPathMatchProps) => boolean;
/**
 * Props for determining if a `<Link>`’s destination matches the current page location.
 *
 * Ideal for components that accept a `<Link>` as a child. Automatically extracts and compares the `<Link>`’s destination against the current page location.
 */
export interface LinkPathMatchProps extends Omit<CurrentPathMatchProps, 'actualPathname'> {
    /**
     * The component’s children, which may include a client-side `<Link>` element.
     * When present, the hook will extract the destination from `href` or `to` props.
     */
    children?: ReactNode;
}
/**
 * High-level hook for determining if a `<Link>`’s destination matches the current page location.
 *
 * Ideal for components that accept a `<Link>` as a child. Automatically extracts and compares the `<Link>`’s destination against the current page location.
 *
 * @param props - A configuration for link-based path matching.
 *   @param props.children - Children elements to inspect for a client-side `<Link>` component.
 *   @param props.currentPathname - The current page pathname, used for resolving relative paths and as a reference point for semantic path matching.
 *   @param props.pathMatchStrategy - Defines how strictly paths are compared. Defaults to `'partial'`.
 *
 * @returns `true` if the `<Link>`’s destination matches the current page location; otherwise `false`.
 *
 * @example
 * ```tsx
 * import React, { ComponentProps } from 'react';
 * import { useLinkPathMatch, LinkPathMatchProps, extractRouteSegmentUnits } from '@reusable-ui/navigations';
 * import { useOptionalLinkWrapper } from '@reusable-ui/links';
 * import { usePathname } from 'next/navigation'; // Next.js
 * // import { useMatches } from 'react-router'; // React Router
 *
 * export interface NavMenuProps extends ComponentProps<'button'>, Omit<LinkPathMatchProps, 'currentPathname'> {
 * }
 * export const NavMenu = (props: NavMenuProps) => {
 *     const { pathMatchStrategy } = props;
 *     const currentPathname = usePathname() ?? ''; // Next.js
 *     // const currentPathname = extractRouteSegmentUnits(useMatches()); // React Router
 *
 *     const isActive = useLinkPathMatch({
 *         currentPathname,
 *         children : props.children, // Pass the actual pathname from `<Link href|to={...}>`.
 *         pathMatchStrategy,
 *     });
 *
 *     return useOptionalLinkWrapper(
 *         <button type='button' {...props} className={`${props.className} ${isActive ? 'active' : ''}`} />
 *     );
 * };
 *
 * // Usage:
 *
 * // Next.js:
 * <NavMenu pathMatchStrategy='partial'>
 *     <Link href='/profile'>Profile</Link>
 * </NavMenu>
 *
 * // React Router:
 * <NavMenu pathMatchStrategy='partial'>
 *     <Link to='/profile'>Profile</Link>
 * </NavMenu>
 * ```
 */
export declare const useLinkPathMatch: (props: LinkPathMatchProps) => boolean;
/**
 * @deprecated - Use `LinkPathMatchProps` instead.
 */
export interface DetermineCurrentPageProps extends Partial<Pick<LinkPathMatchProps, 'children'>> {
    /**
     * @deprecated This option is no longer supported.
     * Path matching is always case-sensitive.
     */
    caseSensitive?: boolean;
    /**
     * @deprecated Use `pathMatchStrategy` instead for match precision.
     * This flag previously indicated exact matching behavior.
     */
    end?: boolean;
}
/**
 * @deprecated Use `useLinkPathMatch` instead.
 *
 * This legacy hook determines whether the page is currently active
 * by comparing the current location to a nested `<Link>` element’s target.
 *
 * ⚠️ It relies on `window.location.pathname`, which is unavailable during server-side rendering.
 * This causes the internal state to be `undefined` on the server and leads to an unintended "blinky" effect
 * on the initial client-side hydration as the state transitions.
 *
 * For a smoother and SSR-compatible experience, migrate to `useLinkPathMatch`.
 *
 * @param props - Legacy configuration.
 *   @param props.children - Children that may include a client-side `<Link>` component.
 *   @param props.end - Whether to use exact path matching. Deprecated in favor of `pathMatchStrategy`.
 *
 * @returns `true` if the `<Link>`’s destination matches the current location; `undefined` while path is loading.
 */
export declare const useDetermineCurrentPage: (props: DetermineCurrentPageProps) => boolean | undefined;
