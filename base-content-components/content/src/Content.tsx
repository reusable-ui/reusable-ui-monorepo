// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a semantic management system for react web components:
    Tag,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component
import {
    // react components:
    Button,
    ButtonProps,
}                           from '@reusable-ui/button'          // a button component



// styles:
export const useContentStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: '2h0i4lc78z' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface ContentProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        BasicProps<TElement>
{
    // children:
    children ?: React.ReactNode
}
const Content = <TElement extends Element = HTMLElement>(props: ContentProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet         = useContentStyleSheet();
    
    
    
    // rest props:
    const {
        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restProps}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        >
            {React.Children.map(children, (child) => {
                // link:
                if (
                    React.isValidElement<ButtonProps>(child)
                    &&
                    (
                        // native <a>:
                        (child.type === 'a')
                        ||
                        // native <foo class="... link ...">:
                        (
                            (typeof(child.type) === 'string')
                            &&
                            (child.props.className ?? '').split(' ').some((className) => (className === 'link'))
                        )
                    )
                    &&
                    // not <foo class="... not-link ...">:
                    !(child.props.className ?? '').split(' ').some((className) => (className === 'not-link'))
                ) {
                    return (
                        <Button
                            // semantics:
                            tag={(child.type ?? 'a') as Tag} // copy the original <tag>
                            
                            
                            
                            // variants:
                            buttonStyle='link' // style the <button> as <a>
                            
                            
                            
                            // other props:
                            {...child.props}
                        />
                    );
                } // if
                
                
                
                // other component:
                return child;
            })}
        </Basic>
    );
};
export {
    Content,
    Content as default,
}
