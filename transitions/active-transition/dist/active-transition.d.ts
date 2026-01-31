import { type CssActiveTransitionOptions, type CssActiveTransition } from './types.js';
/**
 * Applies active-state transitions that emphasize the current theme colors,
 * making the component **visually stand out** when active.
 *
 * Exposes strongly typed CSS variables for transitional effects.
 *
 * Behavior:
 * - Regular variants: darken in light mode or lighten in dark mode.
 * - Outlined/mild variants: interpolate from variant colors to regular colors.
 *
 * Smoothly transitions between inactive and active states.
 * Affects background, foreground, decoration, and border colors.
 *
 * @param options - An optional configuration for customizing active-state transitions.
 * @returns A CSS API containing transition rules and active-transition CSS variables for highlighting theme colors.
 */
export declare const usesActiveTransition: (options?: CssActiveTransitionOptions) => CssActiveTransition;
