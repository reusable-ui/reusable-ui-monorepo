// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'                 // cssfn css specific types
import {
    // rules:
    states,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    escapeSvg,
}                           from '@cssfn/cssfn'                     // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook
import {
    // utilities:
    cssVars,
}                           from '@cssfn/css-vars'                  // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'                // reads/writes css variables configuration

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'           // size options of UI
import {
    // hooks:
    mildOf,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI

// reusable-ui components:
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesPadding,
}                           from '@reusable-ui/basic'               // a base component
import {
    // hooks:
    ifActive,
}                           from '@reusable-ui/indicator'           // a base component
import {
    // hooks:
    markActive as controlMarkActive,
    ifFocus,
    ifArrive,
}                           from '@reusable-ui/control'             // a base component
import {
    // hooks:
    ValidInvalidVars      as EditableControlValidInvalidVars,
    ifValid,
    ifInvalid,
    ifNoValidation,
    usesValidInvalidState as editableControlUsesValidInvalidState,
    
    
    
    // styles:
    usesEditableControlLayout,
    usesEditableControlVariants,
    usesEditableControlStates,
    
    
    
    // react components:
    EditableControlProps,
    EditableControl,
}                           from '@reusable-ui/editable-control'    // a base component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'                // an icon component



// hooks:

// accessibilities:

//#region activePassive
export const markActive = (): CssRule => style({
    ...imports([
        controlMarkActive(),
        
        mildOf(null), // keeps mild variant
    ]),
});
//#endregion activePassive


// validations:

//#region validInvalid
export interface ValidInvalidVars extends EditableControlValidInvalidVars {
    /**
     * final validation icon image.
     */
    iconImg : any
}
const [valids] = cssVars<ValidInvalidVars>();



/**
 * Uses valid & invalid states.
 * @returns A `StateMixin<ValidInvalidVars>` represents valid & invalid state definitions.
 */
export const usesValidInvalidState = (): StateMixin<ValidInvalidVars> => {
    // dependencies:
    const [validInvalidStateRule] = editableControlUsesValidInvalidState();
    
    
    
    return [
        () => style({
            ...imports([
                validInvalidStateRule,
            ]),
            
            
            
            ...vars({
                [valids.iconImg] : 'none',
            }),
            ...states([
                ifValid({
                    ...vars({
                        // apply a *valid* icon indicator:
                        [valids.iconImg] : editableTextControls.iconValid,
                    }),
                }),
                ifInvalid({
                    ...vars({
                        // apply an *invalid* icon indicator:
                        [valids.iconImg] : editableTextControls.iconInvalid,
                    }),
                }),
            ]),
        }),
        valids,
    ];
};
//#endregion validInvalid



// styles:
export const iconElm = '::after'

export const usesEditableTextControlLayout = () => {
    // dependencies:
    
    // spacings:
    const [, paddings] = usesPadding();
    
    // states:
    const [, valids  ] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableControlLayout(),
        ]),
        ...style({
            // children:
            ...children(iconElm, {
                ...imports([
                    usesIconImage(
                        /*img : */valids.iconImg,
                    ),
                ]),
                ...style({
                    // layouts:
                    content         : '""',
                    display         : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // positions:
                    position        : 'absolute',
                    insetInlineEnd  : paddings.paddingInline,
                    insetBlockStart : `calc(50% - (${editableTextControls.iconSize} / 2))`,
                    maskPosition    : 'right', // align icon to the right
                    
                    
                    
                    // sizes:
                    boxSizing       : 'border-box', // the final size is including borders & paddings
                    blockSize       : editableTextControls.iconSize,
                    aspectRatio     : '3 / 2', // make sure the icon's image ratio is 1.5 or less
                    
                    
                    
                    // accessibilities:
                    pointerEvents   : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(editableTextControls, 'icon')), // apply config's cssProps starting with icon***
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(editableTextControls), // apply config's cssProps
        }),
    });
};
export const usesEditableTextControlVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(editableTextControls);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableControlVariants(),
            resizableRule,
        ]),
    });
};
export const usesEditableTextControlStates = () => {
    // dependencies:
    
    // states:
    const [validInvalidStateRule] = usesValidInvalidState();
    
    
    
    return style({
        ...imports([
            // states:
            usesEditableControlStates(),
            
            // validations:
            validInvalidStateRule,
        ]),
        ...states([
            ifActive({
                ...imports([
                    markActive(),
                ]),
            }),
            ifFocus({
                ...imports([
                    markActive(),
                ]),
            }),
            ifArrive({
                ...imports([
                    markActive(),
                ]),
            }),
            
            ifNoValidation({
                ...children(iconElm, {
                    display: 'none', // hides validation icon image
                }),
            }),
        ]),
    });
};

export const useEditableTextControlStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesEditableTextControlLayout(),
        
        // variants:
        usesEditableTextControlVariants(),
        
        // states:
        usesEditableTextControlStates(),
    ]),
}), { id: '783lmd7hos' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [editableTextControls, editableTextControlValues, cssEditableTextControlConfig] = cssConfig(() => {
    return {
        // accessibilities:
        cursor      : 'text' as CssKnownProps['cursor'],
        
        
        
        // animations:
        iconSize    : '1em'  as CssKnownProps['inlineSize'],
        iconValid   : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>")}")`                        as CssKnownProps['maskImage'],
        iconInvalid : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M7.3,6.31,5,4,7.28,1.71a.7.7,0,1,0-1-1L4,3,1.71.72a.7.7,0,1,0-1,1L3,4,.7,6.31a.7.7,0,0,0,1,1L4,5,6.31,7.3A.7.7,0,0,0,7.3,6.31Z'/></svg>")}")` as CssKnownProps['maskImage'],
    };
}, { prefix: 'tedit' });



// react components:
export interface EditableTextControlProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        EditableControlProps<TElement>
{
    // validations:
    minLength ?: number
    maxLength ?: number
}
const EditableTextControl = <TElement extends Element = HTMLElement>(props: EditableTextControlProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet = useEditableTextControlStyleSheet();
    
    
    
    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}
            
            
            
            // variants:
            mild={props.mild ?? true}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
        />
    );
};
export {
    EditableTextControl,
    EditableTextControl as default,
}
