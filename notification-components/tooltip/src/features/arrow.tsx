// reusable-ui core:
import type {
    // a capability of UI to float/overlay on the top/beside the another UI:
    FloatingPlacement,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



//#region arrow
export interface ArrowProps {
    arrow     : Element
    placement : FloatingPlacement
}
export type ArrowSize           = readonly [number, number]
export type CalculateArrowSize  = (props: ArrowProps) => Promise<ArrowSize>

const isSizeClassName = (className: string) => className.startsWith('sz') && (className.at(2) === className.at(2)?.toUpperCase());
const arrowSizeCache = new WeakMap<Element, readonly [string, string, ArrowSize]>();
export const calculateArrowSize : CalculateArrowSize = async ({ arrow, placement }) => {
    const cached = arrowSizeCache.get(arrow);
    if (!cached) {
        const arrowPosition = getComputedStyle(arrow).position;
        if (arrowPosition === 'static') return [0, 0]; // cssfn is not fully loaded => ignore calculation
    } // if
    
    
    
    const basePlacement = placement.split('-')[0];
    const tooltip       = arrow.parentElement;
    const sizeName      = (tooltip ? Array.from(tooltip.classList).find(isSizeClassName) : undefined) ?? 'szMd';
    
    
    
    if (cached) {
        const [cachedSizeName, cachedPlacement, cachedArrowSize] = cached;
        if ((cachedSizeName === sizeName) && (cachedPlacement === basePlacement)) return cachedArrowSize;
    } // if
    
    
    
    // const size
    const tooltipStyle = tooltip?.style;
    const {
        display,
        visibility,
        transition,
        animation,
    } = tooltipStyle ?? {};
    try {
        // temporary modify:
        if (tooltipStyle) {
            tooltipStyle.display    = 'inline-block';
            tooltipStyle.visibility = 'hidden';
            tooltipStyle.transition = 'none';
            tooltipStyle.animation  = 'none';
        } // if
        
        
        
        // perform main calculations:
        const { width, height, }   = arrow.getBoundingClientRect();
        const arrowSize : ArrowSize = [
            (width  / 2) - 1,
            (height / 2) - 1,
        ];
        arrowSizeCache.set(arrow, [sizeName, basePlacement, arrowSize]);
        return arrowSize;
    }
    finally {
        // restore:
        if (tooltipStyle) {
            tooltipStyle.display    = display    ?? '';
            tooltipStyle.visibility = visibility ?? '';
            tooltipStyle.transition = transition ?? '';
            tooltipStyle.animation  = animation  ?? '';
        } // if
    } // try
};
//#endregion arrow
