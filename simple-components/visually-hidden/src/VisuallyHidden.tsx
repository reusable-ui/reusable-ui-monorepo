// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // writes css in javascript:
    style,
    imports,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component



// styles:
export const usesVisuallyHiddenLayout = () => {
    return style({
        // layouts:
        display    : ['inline-block',  '!important'], // use inline block, so it takes the width & height as we set
        
        
        
        // positions:
        position   : ['absolute',      '!important'],
        
        
        
        // sizes:
        width      : ['1px',           '!important'],
        height     : ['1px',           '!important'],
        overflow   : ['hidden',        '!important'],
        clip       : ['rect(0,0,0,0)', '!important'],
        
        
        
        // borders:
        border     : ['none',          '!important'],
        
        
        
        // spacings:
        margin     : ['-1px',          '!important'], // fix for https://github.com/twbs/bootstrap/issues/25686
        padding    : [0,               '!important'],
        
        
        
        // typos:
        whiteSpace : ['nowrap',        '!important'],
    });
};

export const useVisuallyHiddenStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesVisuallyHiddenLayout(),
    ]),
}), { id: 'zxyty1yae5' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface VisuallyHiddenProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>
{
}
const VisuallyHidden = <TElement extends Element = HTMLElement>(props: VisuallyHiddenProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet      = useVisuallyHiddenStyleSheet();
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            tag={props.tag ?? 'span'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    VisuallyHidden,
    VisuallyHidden as default,
}
