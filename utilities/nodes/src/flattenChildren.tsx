// React:
import {
    // Types:
    type ReactNode,
    
    
    
    // Utilities:
    isValidElement,
    cloneElement,
    Children,
}                           from 'react'
import {
    // Utilities:
    isFragmentElement,
}                           from './nodes.js'



// Utilities:

/**
 * Recursively flattens React children while correctly handling complex nested structures.
 * 
 * This utility processes deeply mixed **arrays**, **React fragments (`<>...</>`)**, and **nested elements** at any depth,
 * ensuring proper extraction and ordering of child elements.
 * 
 * - **Fragments (`React.Fragment`)** are expanded, preserving their internal elements.
 * - **Nested arrays** are flattened recursively, maintaining child order.
 * - **Unique keys are assigned** to prevent collisions when handling cloned elements within fragments.
 * 
 * @param children - The React children to flatten, which may include fragments, arrays, or single element.
 * @returns A fully flattened array of React nodes, preserving the logical structure.
 */
export const flattenChildren = (children: ReactNode): ReactNode[] => {
    // Initialize the array to hold flattened children:
    const flattenedChildren : ReactNode[] = [];
    
    
    
    // Initialize the child index counter:
    let childIndex = -1;
    
    
    
    // Iterate over each child:
    for (const child of Children.toArray(children)) {
        // Increment child index:
        childIndex++;
        
        
        
        // Handle non-element nodes:
        if (!isValidElement<unknown>(child)) {
            flattenedChildren.push(child);
            continue; // Skip further processing.
        } // if
        
        
        
        // Handle React fragments:
        if (isFragmentElement(child)) {
            // Use existing key (if any) or fallback to its position:
            const fragmentKey = child.key ?? `.${childIndex}`;
            
            
            
            // Initialize the grand-child index counter:
            let grandChildIndex = -1;
            
            
            
            // Iterate over each grandchild in the fragment:
            for (const grandChild of flattenChildren(child.props.children)) {
                // Increment grand-child index:
                grandChildIndex++;
                
                
                
                // Handle non-element grandchild:
                if (!isValidElement<unknown>(grandChild)) {
                    flattenedChildren.push(grandChild);
                    continue; // Skip further processing.
                } // if
                
                
                
                // Clone grandchild with adjusted key to prevent collisions:
                flattenedChildren.push(cloneElement<unknown>(grandChild,
                    // Props:
                    {
                        // Ensure the grandchild has a unique key:
                        key : `${fragmentKey}/${grandChild.key ?? grandChildIndex}`,
                    },
                ));
            } // for
            
            
            
            continue; // Skip fragment itself.
        } // if
        
        
        
        // Handle element nodes:
        flattenedChildren.push(child);
    } // for
    
    
    
    // Return the flattened children:
    return flattenedChildren;
};
