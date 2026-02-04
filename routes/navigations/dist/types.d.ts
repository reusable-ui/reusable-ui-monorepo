/**
 * Defines the comparison strategy used when evaluating path match.
 *
 * - `'exact'`: Full pathname equality.
 * - `'partial'`: `startsWith()` match with segment boundary awareness.
 */
export type PathMatchStrategy = 'partial' | 'exact';
