// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useCallback,
    useEffect,
    
    
    
    // utilities:
    startTransition,
}                           from 'react'

// cssfn:
import {
    // rules:
    states,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                     // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'                // reads/writes css variables configuration

// reusable-ui:
import {
    // hooks:
    useTriggerRender,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'               // react helper hooks
import {
    // hooks:
    Result as ValResult,
    
    
    
    // react components:
    ValidationProps,
    ValidationProvider,
}                           from '@reusable-ui/validations'         // a validation management system
import {
    // hooks:
    usesSizeVariant,
}                           from '@reusable-ui/basic'               // a base component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'             // a base component
import {
    // hooks:
    ifValid,
    ifInvalid,
    usesValidInvalidState,
    markValid,
    markInvalid,
    ValidatorHandler,
    useValidInvalidState,
}                           from '@reusable-ui/editable-control'    // a base component



// hooks:



// styles:
export const usesMasonryLayout = () => {
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // customize:
            ...usesCssProps(masonries), // apply config's cssProps
        }),
    });
};
export const usesMasonryVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(masonries);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};
export const usesMasonryStates = () => {
    // dependencies:
    
    // states:
    const [validInvalidStateRule] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // validations:
            validInvalidStateRule,
        ]),
        ...states([
            ifValid({
                ...imports([
                    markValid(),
                ]),
            }),
            ifInvalid({
                ...imports([
                    markInvalid(),
                ]),
            }),
        ]),
    });
};

export const useMasonryStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesMasonryLayout(),
        
        // variants:
        usesMasonryVariants(),
        
        // states:
        usesMasonryStates(),
    ]),
}), { id: 'fiuyy1jxpx' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [masonries, masonryValues, cssMasonryConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'msry' });



// react components:
export interface MasonryProps
    extends
        // bases:
        ContentProps<HTMLMasonryElement>
{
    // children:
    children        ?: React.ReactNode
}
const Masonry = (props: MasonryProps): JSX.Element|null => {
    // styles:
    const styleSheet        = useMasonryStyleSheet();
    
    
    
    // rest props:
    const {
        // remove states props:
        
        // validations:
        enableValidation  : _enableValidation,
        isValid           : _isValid,
        inheritValidation : _inheritValidation,
        customValidator   : _customValidator,
    ...restContentProps} = props;
    
    
    
    // jsx:
    return (
        <Content<HTMLMasonryElement>
            // other props:
            {...restContentProps}
            
            
            
            // refs:
            elmRef={elmRef}
            
            
            
            // semantics:
            semanticTag ={props.semanticTag  ?? 'masonry'}
            semanticRole={props.semanticRole ?? 'masonry'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    Masonry,
    Masonry as default,
}
