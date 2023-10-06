// react:
import {
    // react:
    default as React,
}                           from 'react'



// utilities:
const fragmentType = (<React.Fragment />).type;
export const flattenChildren = (children: React.ReactNode): React.ReactNode[] => {
    const flattenedChildren : React.ReactNode[] = [];
    let childIndex = -1;
    for (const child of React.Children.toArray(children)) {
        // childIndex counter:
        childIndex++;
        
        
        
        // handle non <Element>:
        if (!React.isValidElement<React.PropsWithChildren<{}>>(child)) {
            flattenedChildren.push(child);
            continue; // handled => skip
        } // if
        
        
        
        // handle <React.Fragment>:
        if (child.type === fragmentType) {
            const fragmentKey = child.key ?? `.${childIndex}`;
            for (const grandChild of flattenChildren(child.props.children)) {
                // handle non <Element>:
                if (!React.isValidElement<React.PropsWithChildren<{}>>(grandChild)) {
                    flattenedChildren.push(grandChild);
                    continue; // handled => skip
                } // if
                
                
                
                // handle <Element>:
                flattenedChildren.push(React.cloneElement<React.PropsWithChildren<{}>>(grandChild,
                    // props:
                    {
                        key : `${fragmentKey}/${grandChild.key}`, // fix the key to avoid collision
                    },
                ));
            } // for
            continue; // handled => skip
        } // if
        
        
        
        // handle <Element>:
        flattenedChildren.push(child);
    } // for
    return flattenedChildren;
};
