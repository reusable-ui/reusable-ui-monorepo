// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
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
import type {
    // states:
    useCollapsible,
}                           from './collapsible.js'



// hooks:
export const useLastKnownExpandedSize = <TElement extends Element = HTMLElement>(collapsibleState: ReturnType<typeof useCollapsible>) => {
    // states:
    const isFullyExpanded        = collapsibleState.class === 'expanded';
    const isFullyCollapsed       = !collapsibleState.class;
    const lastKnownSize          = useRef<ResizeObserverSize|undefined>(undefined);
    const [lastKnownExpandedSize, setLastKnownExpandedSize] = useState<ResizeObserverSize|undefined>(undefined);
    
    
    
    // features:
    const {lastKnownExpandedSizeVars} = usesLastKnownExpandedSize();
    
    
    
    // handlers:
    const handleCollapseResize = useEvent<ResizeObserverCallback>((entries) => {
        // conditions:
        const size = entries[0].borderBoxSize[0];
        if ((size.inlineSize) === 0 && (size.blockSize === 0)) return; // <Collapse> is *fully collapsed* => ignore
        if (lastKnownSize.current && (lastKnownSize.current.inlineSize === size.inlineSize) && (lastKnownSize.current.blockSize === size.blockSize)) return; // already the same => ignore
        
        
        
        // update:
        lastKnownSize.current = size;
        
        // re-render (if necessary):
        if (isFullyExpanded || isFullyCollapsed) { // not being animating => update the final known size
            setLastKnownExpandedSize(lastKnownSize.current);
        } // if
    });
    
    
    
    // refs:
    const [ref, setRef] = useState<TElement|null>(null);
    
    
    
    // dom effects:
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!ref) return; // the ref is not set => ignore
        
        
        
        // setups:
        const observer = new ResizeObserver(handleCollapseResize);
        observer.observe(ref, { box: 'border-box'  });
        
        
        
        // cleanups:
        return () => {
            observer.disconnect();
        };
    }, [ref]);
    
    useEffect(() => {
        // conditions:
        if (!isFullyExpanded)       return; // <Collapse> is NOT *fully expanded* => ignore
        if (!lastKnownSize.current) return; // not already calculated => ignore
        if (lastKnownExpandedSize && (lastKnownExpandedSize.inlineSize === lastKnownSize.current.inlineSize) && (lastKnownExpandedSize.blockSize === lastKnownSize.current.blockSize)) return; // already the same => ignore
        
        
        
        // sync:
        setLastKnownExpandedSize(lastKnownSize.current);
    }, [lastKnownExpandedSize, isFullyExpanded]);
    
    const hasTweakedRef = useRef<boolean>(false);
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (hasTweakedRef.current) return; // already been tweaked     => ignore permanently
        if (!ref)                  return; // the ref is not ready yet => ignore temporarily => watch for future changes
        
        
        
        // tweak:
        if (
            !lastKnownSize.current // the <Collapse>'s size has never been calculated
            &&
            isFullyCollapsed       // the <Collapse> is *fully collapsed* (hidden)
        ) {
            try {
                ref.classList.add('expanded');
                
                const style = getComputedStyle(ref);
                if (style.display !== 'none') { // the <Collapse> is rendered
                    const size : ResizeObserverSize = {
                        inlineSize : Number.parseFloat(style.inlineSize),
                        blockSize  : Number.parseFloat(style.blockSize),
                    };
                    if ((size.inlineSize !== 0) || (size.blockSize !== 0)) { // check if the <Collapse> is alive (has width and/or height)
                        lastKnownSize.current = size;                    // update
                        setLastKnownExpandedSize(lastKnownSize.current); // trigger to re-render with the update
                    } // if
                } // if
            }
            finally {
                ref.classList.remove('expanded');
            } // try
        } // if
        
        
        
        // finalize:
        hasTweakedRef.current = true; // prevents to tweak multiple times
    }, [ref, isFullyCollapsed]);
    
    
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
        ] : (lastKnownExpandedSize?.blockSize  !== undefined) ? `${lastKnownExpandedSize.blockSize}px`  : undefined,
    }), [lastKnownExpandedSizeVars.inlineSize, lastKnownExpandedSizeVars.blockSize, lastKnownExpandedSize]);
    
    
    
    return {
        setRef,
        style,
    };
};
