/**
 * Represents the orientation of primary axis of the component:
 * - `'inline'`: horizontal direction (e.g. left to right)
 * - `'block'` : vertical direction (e.g. top to bottom)
 */
export type AxisOrientation =
    | 'inline'
    | 'block'

/**
 * Represents the orientation of direction of the component:
 * - `'inline-start'`: horizontal direction, start of inline axis (e.g. left in LTR, right in RTL)
 * - `'inline-end'`  : horizontal direction, end of inline axis (e.g. right in LTR, left in RTL)
 * - `'block-start'` : vertical direction, start of block axis (e.g. top in horizontal writing modes)
 * - `'block-end'`   : vertical direction, end of block axis (e.g. bottom in horizontal writing modes)
 * 
 * These values ensure direction-aware orientation for components like dropdowns, tooltips,
 * or modals that anchor or expand relative to their container flow.
 */
export type DirectionalOrientation =
    | 'inline-start'
    | 'inline-end'
    | 'block-start'
    | 'block-end'
