// defaults:
const _defaultInfiniteLoop : boolean = false



// hooks:

// variants:

//#region CarouselVariant
export interface CarouselVariant {
    infiniteLoop ?: boolean
}
export const useCarouselVariant = ({infiniteLoop = _defaultInfiniteLoop}: CarouselVariant) => {
    return {
        infiniteLoop,
    };
};
//#endregion CarouselVariant
