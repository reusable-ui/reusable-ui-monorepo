// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// cssfn:
import type {
    // css custom properties:
    CssCustomSimpleRef,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    keyframes,
    ifNotLastChild,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    escapeSvg,
}                           from '@cssfn/cssfn'                         // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook
import {
    // types:
    ReadonlyCssCustomRefs,
    
    
    
    // utilities:
    cssVar,
}                           from '@cssfn/css-var'                       // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'                 // a border (stroke) management system
import {
    // styles:
    fillTextLineHeightLayout,
}                           from '@reusable-ui/layouts'                 // reusable common layouts
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'                   // react helper hooks
import {
    // hooks:
    usePropEnabled,
    usePropReadOnly,
}                           from '@reusable-ui/accessibilities'         // an accessibility management system
import {
    // types:
    DefaultTag,
    DefaultRole,
    
    
    
    // hooks:
    useTestSemantic,
}                           from '@reusable-ui/generic'                 // a base component
import {
    // types:
    StateMixin,
    
    
    
    // hooks:
    usesSizeVariant,
    ifNotNude,
    ifNude,
    usesMildVariant,
    usesForeg,
    usesBorder,
    usesPadding,
    usesAnim,
    fallbackNoneFilter,
    fallbackNoneTransf,
}                           from '@reusable-ui/basic'                   // a base component
import {
    // hooks:
    ifActived,
    ifActivating,
    ifPassivating,
    ifPassived,
    TogglerActiveProps,
    useTogglerActive,
}                           from '@reusable-ui/indicator'               // a base component
import {
    // hooks:
    usesFocusBlurState,
}                           from '@reusable-ui/control'                 // a base component
import {
    // hooks:
    CheckStyle,
    CheckVariant,
    
    
    
    // styles:
    inputElm,
    
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
    
    
    
    // configs:
    checks,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from '@reusable-ui/check'                   // a base component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'                    // an icon set
import {
    // styles:
    usesButtonLayout,
}                           from '@reusable-ui/button'                  // a button ui



// defaults:
const _defaultRadioTag  : DefaultTag  = [null]
const _defaultRadioRole : DefaultRole = 'radio'



// styles:
export const usesRadioLayout = () => {
    // dependencies:
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesCheckLayout(),
        ]),
        ...style({
            // children:
            ...children(inputElm, {
                ...style({
                    // borders:
                    // circle corners on top:
                    [borders.borderStartStartRadius] : borderRadiuses.pill,
                    [borders.borderStartEndRadius  ] : borderRadiuses.pill,
                    // circle corners on bottom:
                    [borders.borderEndStartRadius  ] : borderRadiuses.pill,
                    [borders.borderEndEndRadius    ] : borderRadiuses.pill,
                    
                    
                    
                    // customize:
                    ...usesCssProps(radios), // apply config's cssProps
                }),
            }),
        }),
        ...vars({
            // overwrite <Check>'s selected indicator:
            [checks.img] : radios.img,
        }),
    });
};
export const usesRadioVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(radios);
    
    
    
    return style({
        ...imports([
            // variants:
            usesCheckVariants(),
            
            // layouts:
            sizesRule,
        ]),
    });
};
export const usesRadioStates = () => {
    return style({
        ...imports([
            // states:
            usesCheckStates(),
        ]),
    });
};

export const useRadioStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesRadioLayout(),
        
        // variants:
        usesRadioVariants(),
        
        // states:
        usesRadioStates(),
    ]),
}), { id: 'f4fvh7cm5b' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [radios, radioValues, cssRadioConfig] = cssConfig(() => {
    return {
        // animations:
        // forked from Bootstrap 5:
        img : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#000'/></svg>")}")` as CssKnownProps['maskImage'],
    };
}, { prefix: 'rad' });



// react components:
export interface RadioProps
    extends
        // bases:
        CheckProps
{
}
const Radio = (props: RadioProps): JSX.Element|null => {
    // styles:
    const styleSheet   = useRadioStyleSheet();
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // accessibilities:
        defaultActive,  // take, to be handled by `useTogglerActive`
        active,         // take, to be handled by `useTogglerActive`
        inheritActive,  // take, to be handled by `useTogglerActive`
        onActiveChange, // take, to be handled by `useTogglerActive`
        
        
        
        // values:
        defaultChecked, // take, to be aliased to `defaultActive`
        checked,        // take, to be aliased to `active`
    ...restCheckProps} = props;
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    
    
    
    // states:
    const [isActive, setActive] = useTogglerActive({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive   : defaultActive ?? defaultChecked, // aliased `defaultChecked` to `defaultActive`
        active          : active        ?? checked,        // aliased `checked`        to `active`
        inheritActive,
        onActiveChange,
    }, /*changeEventTarget :*/inputRefInternal);
    
    
    
    // fn props:
    const isButton          = !!props.checkStyle && ['btn', 'togglerBtn'].includes(props.checkStyle);
    
    const defaultTag        = props.defaultTag  ?? (isButton ? undefined : _defaultRadioTag );
    const defaultRole       = props.defaultRole ?? (isButton ? undefined : _defaultRadioRole);
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        setActive(true);        // handle click as selecting [active]
        event.preventDefault(); // handled
    }, [setActive]);
    const handleClick           = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    const handleKeyUpInternal   = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            setActive(true);        // handle click as selecting [active]
            event.preventDefault(); // handled
        } // if
    }, [setActive]);
    const handleKeyUp           = useMergeEvents(
        // preserves the original `onKeyUp`:
        props.onKeyUp,
        
        
        
        // actions:
        handleKeyUpInternal,
    );
    
    const handleChangeInternal  = useEvent<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        const currentRadio = event.target;
        const name = currentRadio.name;
        if (!name)                  return; // the <Radio> must have a name
        
        const isChecked = currentRadio.checked;
        if (!isChecked)             return; // the <Radio> is checked not cleared
        
        
        
        // actions:
        
        let parentGroup = currentRadio.parentElement;
        //#region find nearest <form> or <grandGrandParent>
        while (parentGroup) {
            if (parentGroup.tagName === 'FORM') break; // found nearest <form>
            
            // find next:
            const grandParent = parentGroup.parentElement;
            if (!grandParent) break; // nothing more to search
            parentGroup = grandParent;
        } // while
        //#endregion find nearest <form> or <grandGrandParent>
        
        
        if (parentGroup) {
            for (const radio of (Array.from(parentGroup.querySelectorAll('input[type="radio"]')) as HTMLInputElement[])) {
                if (radio === currentRadio) continue; // <radio> is self => skip
                if (radio.name !== name)    continue; // <radio>'s name is different to us => skip
                
                
                
                // fire a custom `onClear` event:
                radio.dispatchEvent(new Event('clear', { bubbles: false }));
            } // for
        } // if
        
        
        event.preventDefault(); // handled
    }, []);
    const handleChange          = useMergeEvents(
        // preserves the original `onChange`:
        props.onChange,
        
        
        
        // actions:
        handleChangeInternal,
    );
    
    
    
    // jsx:
    return (
        <Check
            // other props:
            {...restCheckProps}
            
            
            
            // semantics:
            tag          = {tag}
            role         = {role}
            defaultTag   = {defaultTag}
            defaultRole  = {defaultRole}
            
            aria-checked = {ariaChecked}
            aria-pressed = {ariaPressed}
            aria-label   = {props['aria-label'] ?? label}
            
            
            
            // variants:
            nude={props.nude ?? true}
            mild={props.mild ?? false}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)} // aliasing [disabled] => ![enabled]
            active={isActive}
            pressed={pressedFn}
            
            
            
            // handlers:
            onClick   = {handleClick}
            onKeyUp   = {handleKeyUp}
            onChange  = {handleChange}
            
            
            
            // Radio props:
            {...{
                // actions:
                // type,
            }}
        />
    );
};
export {
    Radio,
    Radio as default,
}

export type { CheckStyle, CheckVariant }
