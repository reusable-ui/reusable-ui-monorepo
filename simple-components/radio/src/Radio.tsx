// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useEffect,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    // utilities:
    escapeSvg,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui configs:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'         // a border (stroke) management system

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'          // border (stroke) stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui states:
import {
    // hooks:
    useToggleActivatable,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated

// reusable-ui components:
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
}                           from '@reusable-ui/check'           // a base component



// styles:
export const usesRadioLayout = () => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
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
                    [borderVars.borderStartStartRadius] : borderRadiuses.pill,
                    [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
                    // circle corners on bottom:
                    [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
                    [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
                    
                    
                    
                    // customize:
                    ...usesCssProps(radios), // apply config's cssProps
                }),
            }),
        }),
        ...vars({
            // overwrite <Check>'s selected indicator:
            [checks.indicator] : radios.indicator,
        }),
    });
};
export const usesRadioVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(radios);
    
    
    
    return style({
        ...imports([
            // variants:
            usesCheckVariants(),
            resizableRule,
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

export const useRadioStyleSheet = dynamicStyleSheet(() => ({
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
        indicator : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#000'/></svg>")}")` as CssKnownProps['maskImage'],
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
        defaultActive,  // take, to be handled by `useToggleActivatable`
        active,         // take, to be handled by `useToggleActivatable`
        inheritActive,  // take, to be handled by `useToggleActivatable`
        onActiveChange, // take, to be handled by `useToggleActivatable`
        
        
        
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
    const [isActive, setActive] = useToggleActivatable({
        enabled         : props.enabled,
        inheritEnabled  : props.inheritEnabled,
        
        readOnly        : props.readOnly,
        inheritReadOnly : props.inheritReadOnly,
        
        defaultActive   : defaultActive ?? defaultChecked, // aliased `defaultChecked` to `defaultActive`
        active          : active        ?? checked,        // aliased `checked`        to `active`
        inheritActive,
        onActiveChange,
    }, /*changeEventTarget :*/inputRefInternal);
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        setActive(true);        // handle click as selecting [active]
        event.preventDefault(); // handled
    }, []);
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
    }, []);
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
            // after <currentRadio> finishes rendering => un-check (clear) the other checked radio (within the same name at the same <form>):
            Promise.resolve(parentGroup).then((parentGroup) => { // trigger the event after the <Radio> has finished rendering (for controllable <Radio>)
                for (const radio of (Array.from(parentGroup.querySelectorAll('input[type="radio"]:not(:checked)')) as HTMLInputElement[])) {
                    if (radio === currentRadio) continue; // <radio> is self => skip
                    if (radio.name !== name)    continue; // <radio>'s name is different to us => skip
                    
                    
                    
                    // fire a custom `onClear` event:
                    radio.dispatchEvent(new CustomEvent('clear', { bubbles: false }));
                } // for
            });
        } // if
        
        
        event.preventDefault(); // handled
    }, []);
    const handleChange          = useMergeEvents(
        // preserves the original `onChange`:
        props.onChange,
        
        
        
        // actions:
        handleChangeInternal,
    );
    
    
    
    // dom effects:
    useEffect(() => {
        // conditions:
        const currentRadio = inputRefInternal.current;
        if (!currentRadio) return; // radio was unloaded => nothing to do
        
        
        
        // handlers:
        const handleClear = (): void => {
            setActive(false); // handle clear as de-selecting [active]
        };
        
        
        
        // setups:
        currentRadio.addEventListener('clear', handleClear);
        
        
        
        // cleanups:
        return () => {
            currentRadio.removeEventListener('clear', handleClear);
        };
    }, []); // runs once on startup
    
    
    
    // jsx:
    return (
        <Check
            // other props:
            {...restCheckProps}
            
            
            
            // refs:
            elmRef={mergedInputRef}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag   ??   ''   }
            semanticRole = {props.semanticRole  ?? 'radio'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            active={isActive}
            
            
            
            // formats:
            type={props.type ?? 'radio'}
            
            
            
            // handlers:
            onClick   = {handleClick}
            onKeyUp   = {handleKeyUp}
            onChange  = {handleChange}
        />
    );
};
export {
    Radio,
    Radio as default,
}

export type { CheckStyle, CheckVariant }
