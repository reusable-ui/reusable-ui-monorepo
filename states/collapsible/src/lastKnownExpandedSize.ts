// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useState,
    useMemo,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useEvent,
}                           from '@reusable-ui/hooks'           // react helper hooks

// internals:
import {
    // features:
    usesLastKnownExpandedSize,
}                           from './features/lastKnownExpandedSize.js'
import {
    // states:
    CollapsibleState,
    CollapsibleApi,
}                           from './collapsible.js'



// hooks:

// states:

//#region lastKnownExpandedSize
export interface LastKnownExpandedSizeApi<TElement extends Element = HTMLElement> {
    setRef : React.Ref<TElement> // setter ref
    style  : React.CSSProperties
}

export const useLastKnownExpandedSize = <TElement extends Element = HTMLElement>(collapsibleApi: CollapsibleApi<TElement>): LastKnownExpandedSizeApi<TElement> => {
    // states:
    const {state} = collapsibleApi;
    
    
    
    // refs:
    const [ref, setRef] = useState<TElement|null>(null);
    
    
    
    // utilities:
    /**
     * The last known size of `<ComponentElement>` when the collapsible state is `expanded`.
     */
    let   [lastKnownExpandedSize, setLastKnownExpandedSize] = useState<ResizeObserverSize|undefined>(undefined);
    const updateSize          = useEvent((size: ResizeObserverSize): void => {
        // conditions:
        if (
            lastKnownExpandedSize
            &&
            (lastKnownExpandedSize.inlineSize === size.inlineSize)
            &&
            (lastKnownExpandedSize.blockSize  === size.blockSize )
        ) return;                 // no change => ignore
        
        
        
        // updates:
        setLastKnownExpandedSize( // sync
            lastKnownExpandedSize = size
        );
    });
    const measureExpandedSize = useEvent((): void => {
        // conditions:
        if (!ref) return; // the ref is not ready yet
        
        
        
        // measures:
        const hasInitialExpandingClass = ref.classList.contains('expanding');
        const hasInitialExpandedClass  = ref.classList.contains('expanded');
        try {
            if (hasInitialExpandingClass) {
                ref.classList.remove('expanding'); // a *hack* temporary hide `.expanding` class
            } // if
            
            if (!hasInitialExpandedClass) {
                ref.classList.add('expanded');     // a *hack* temporary add  `.expanded`  class
            } // if
            
            
            
            const style = getComputedStyle(ref);
            if (style.display !== 'none') { // the <ComponentElement> is rendered
                const size : ResizeObserverSize = {
                    inlineSize : Number.parseFloat(style.inlineSize),
                    blockSize  : Number.parseFloat(style.blockSize),
                };
                updateSize(size);
            } // if
        }
        finally {
            if (hasInitialExpandingClass) ref.classList.add('expanding');   // a *hack* restore `.expanding` class
            if (!hasInitialExpandedClass) ref.classList.remove('expanded'); // a *hack* remove  `.expanded`  class
        } // try
    });
    
    
    
    // handlers:
    const observerHandleResize = useEvent<ResizeObserverCallback>((entries) => {
        // conditions:
        if (state !== CollapsibleState.Expanded) return; // only interested of fully_expanded state, ignore the size when fully_collapsed|collapsing|expanding
        
        const size : ResizeObserverSize|null|undefined = entries[0]?.borderBoxSize?.[0];
        if (!size) return;
        
        
        
        // actions:
        updateSize(size);
    });
    
    
    
    // effects:
    
    // force to perform size measurement prior to expanding event (before the browser has chance to perform animation):
    const prevStateRef = useRef<CollapsibleState>(state);
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (prevStateRef.current === state) return; // no change => ignore
        prevStateRef.current = state;               // sync
        if (state !== CollapsibleState.Expanding) return; // only interested of expanding event
        
        
        
        // actions:
        measureExpandedSize();
    }, [state]);
    
    // while the <ComponentElement> is still on expanded state, continously monitors the size of the inspecting element:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!ref) return; // the ref is not set => ignore
        
        
        
        // setups:
        const observer = new ResizeObserver(observerHandleResize);
        observer.observe(ref, { box: 'border-box'  });
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
        };
    }, [ref]);
    
    
    
    // features:
    const {lastKnownExpandedSizeVars} = usesLastKnownExpandedSize();
    
    
    
    // styles:
    const style = useMemo<React.CSSProperties>(() => ({
        // values:
        [
            lastKnownExpandedSizeVars.inlineSize
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : (lastKnownExpandedSize?.inlineSize !== undefined) ? `${lastKnownExpandedSize.inlineSize}px` : undefined,
        
        [
            lastKnownExpandedSizeVars.blockSize
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ] : (lastKnownExpandedSize?.blockSize  !== undefined) ? `${lastKnownExpandedSize.blockSize }px` : undefined,
    }), [lastKnownExpandedSizeVars.inlineSize, lastKnownExpandedSizeVars.blockSize, lastKnownExpandedSize]);
    
    
    
    // api:
    return {
        setRef,
        style,
    };
};
//#endregion lastKnownExpandedSize
