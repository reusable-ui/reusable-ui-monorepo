/**
 * Represents the logical orientation of the component:
 * - `'inline'`: horizontal orientation, aligns along the inline axis (e.g., left-to-right or right-to-left)
 * - `'block'` : vertical orientation, aligns along the block axis (e.g., top-to-bottom)
 * 
 * Orientation semantics adapt to writing modes, making them direction-agnostic.
 */
export type Orientation =
    | 'inline'
    | 'block'
