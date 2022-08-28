// utilities:
export const sortByTabIndex = (a: Element|undefined, b: Element|undefined) => {
    if (!a || !b) return 0;
    return ((a as HTMLElement|SVGElement).tabIndex ?? 0) - ((b as HTMLElement|SVGElement).tabIndex ?? 0);
};
export const getFocusableElements = (parentElement : Element): Element[] => {
    return (
        Array.from(parentElement.children)
        .flatMap((liElement) => {
            const focusableElements = (
                Array.from(liElement.querySelectorAll(
`:is(
    a,
    button,
    textarea,
    select,
    details,
    input:not([type="hidden"]),
    [tabindex]:not([tabindex^="-"])
):not(
    :is(
        [disabled]:not([disabled="false"]),
        [aria-disabled]:not([aria-disabled="false"])
    )
)`              ))
                .sort(sortByTabIndex)
            );
            return {
                primary : focusableElements.at(0),
                items   : focusableElements,
            };
        })
        .sort((x, y) => sortByTabIndex(x.primary, y.primary))
        .flatMap((item) => item.items)
    )
};
export const setFocusAt    = (parentElement : Element, index: number,) => {
    // get all possible focusable elements within <parentElement>:
    const focusableElements = getFocusableElements(parentElement);
    
    
    
    // find the target element:
    let targetElement = focusableElements.at(index);
    
    
    
    // set focus:
    (targetElement as HTMLElement|SVGElement|undefined)?.focus?.();
};
export const setFocusFirst = (parentElement : Element) => {
    setFocusAt(parentElement, 0);
};
export const setFocusLast  = (parentElement : Element) => {
    setFocusAt(parentElement, -1);
};
export const setFocusPrev  = (parentElement : Element) => {
    // get all possible focusable elements within <parentElement>:
    const focusableElements = getFocusableElements(parentElement);
    
    
    
    // get the current focusable element (if any):
    const currentFocusedElement = document.activeElement;
    const currentFocusedElementIndex = (
        currentFocusedElement
        ?
        focusableElements.indexOf(currentFocusedElement)
        :
        -1
    );
    
    
    
    // set focus:
    if (currentFocusedElementIndex < 0) {
        // focus to the last focusable element:
        (focusableElements.at(-1) as HTMLElement|SVGElement|undefined)?.focus();
    }
    else {
        // focus to the prev focusable element:
        // wrap to the last for the first:
        (focusableElements.at(currentFocusedElementIndex -1) as HTMLElement|SVGElement|undefined)?.focus();
    }
};
export const setFocusNext  = (parentElement : Element) => {
    // get all possible focusable elements within <parentElement>:
    const focusableElements = getFocusableElements(parentElement);
    
    
    
    // get the current focusable element (if any):
    const currentFocusedElement = document.activeElement;
    const currentFocusedElementIndex = (
        currentFocusedElement
        ?
        focusableElements.indexOf(currentFocusedElement)
        :
        -1
    );
    
    
    
    // set focus:
    if (currentFocusedElementIndex < 0) {
        // focus to the first focusable element:
        (focusableElements.at(0) as HTMLElement|SVGElement|undefined)?.focus();
    }
    else {
        // focus to the next focusable element:
        // wrap to the first for the last:
        ((focusableElements.at(currentFocusedElementIndex +1) ?? focusableElements.at(0)) as HTMLElement|SVGElement|undefined)?.focus();
    }
};
