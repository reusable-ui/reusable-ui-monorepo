// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    rule,
    variants,
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
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'                   // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui utilities:
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

// reusable-ui features:
import {
    // hooks:
    usesForeground,
}                           from '@reusable-ui/foreground'              // foreground (text color) stuff of UI
import {
    // hooks:
    usesBorder,
}                           from '@reusable-ui/border'                  // border (stroke) stuff of UI
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'                 // padding (inner spacing) stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'               // size options of UI
import {
    // hooks:
    usesMildable,
}                           from '@reusable-ui/mildable'                // mild (soft color) variant of UI
import {
    // hooks:
    ifNotNude,
    ifNude,
}                           from '@reusable-ui/nudible'                 // nude variant of UI

// reusable-ui states:
import {
    // hooks:
    ToggleActivatableProps,
    useToggleActivatable,
}                           from '@reusable-ui/activatable'             // a capability of UI to be highlighted/selected/activated
import {
    // hooks:
    usesFocusable,
}                           from '@reusable-ui/focusable'               // a capability of UI to be focused
import {
    // hooks:
    usesCheckable,
}                           from '@reusable-ui/checkable'               // a capability of UI to be checked

// reusable-ui components:
import {
    // styles:
    usesEditableActionControlLayout,
    usesEditableActionControlVariants,
    usesEditableActionControlStates,
    
    
    
    // react components:
    EditableActionControlProps,
    EditableActionControl,
}                           from '@reusable-ui/editable-action-control' // a base component
import type {
    // types:
    InputHTMLAttributes,
}                           from '@reusable-ui/input'                   // a neighbor component
import {
    // styles:
    usesIconImage,
}                           from '@reusable-ui/icon'                    // an icon component
import {
    // styles:
    usesButtonLayout,
}                           from '@reusable-ui/button'                  // a button component



// defaults:
const _defaultNude     : boolean = true
const _defaultOutlined : boolean = false
const _defaultMild     : boolean = false



// hooks:

// variants:

//#region check style
export type CheckStyle = 'button'|'toggleButton'|'switch' // might be added more styles in the future
export interface CheckVariant {
    checkStyle ?: CheckStyle
}
export const useCheckVariant = (props: CheckVariant) => {
    return {
        class: props.checkStyle ?? null,
    };
};
//#endregion check style



// styles:
export const dummyElm = '::before'
export const inputElm = ':first-child'
export const checkElm = '::before'
export const labelElm = ':nth-child(1n+2)'

export const usesCheckLayout = () => {
    // dependencies:
    
    // features:
    const {foregroundVars} = usesForeground();
    const {paddingVars   } = usesPadding();
    
    // states:
    const {checkableVars } = usesCheckable();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableActionControlLayout(),
        ]),
        ...style({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // items are placed starting from the center (in case of input & label are wrapped, each placed at the center)
            alignItems     : 'center',      // center items vertically (indicator & label are always at center no matter how tall is the wrapper)
            flexWrap       : 'wrap',        // allows the label to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline',    // <Check>'s text should be aligned with sibling text, so the <Check> behave like <span> wrapper
            
            
            
            // children:
            ...children(dummyElm, {
                ...imports([
                    fillTextLineHeightLayout(),
                ]),
            }),
            ...children(inputElm, {
                ...imports([
                    // layouts:
                    usesEditableActionControlLayout(),
                ]),
                ...style({
                    // layouts:
                    display       : 'inline-block', // use inline-block, so it takes the width & height as we set
                    
                    
                    
                    // sizes:
                    boxSizing     : 'border-box', // the final size is including borders & paddings
                    // the size is exactly the same as current font size:
                    inlineSize    : '1em',
                    blockSize     : '1em',
                    
                    flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's width
                    
                    
                    
                    // accessibilities:
                    pointerEvents : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
                    
                    
                    
                    // borders:
                    overflow      : 'hidden', // clip the icon at borderRadius
                    
                    
                    
                    // animations:
                    filter        : 'none',    // (pseudo) inherit parent filter
                    anim          : 'inherit', //          inherit parent animation
                    
                    
                    
                    // spacings:
                    [paddingVars.paddingInline] : '0px', // discard padding
                    [paddingVars.paddingBlock ] : '0px', // discard padding
                    ...ifNotLastChild({
                        // spacing between input & label:
                        marginInlineEnd : checks.spacing, // we cannot place a `gap` on the parent flex because the existance of <dummyElm>
                    }),
                    
                    
                    
                    // children:
                    ...children(checkElm, {
                        ...imports([
                            // check indicator:
                            usesIconImage(
                                /*image : */checks.indicator,
                                /*color : */foregroundVars.foreg,
                            ),
                        ]),
                        ...style({
                            // layouts:
                            content   : '""',
                            display   : 'block', // fills the entire parent's width
                            
                            
                            
                            // sizes:
                            // fills the entire parent:
                            boxSizing : 'border-box', // the final size is including borders & paddings
                            blockSize : '100%', // fills the entire parent's height
                            
                            
                            
                            // animations:
                            filter    : checkableVars.filter,
                            transform : checkableVars.transform,
                            anim      : checkableVars.anim,
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(checks), // apply config's cssProps
                }),
            }),
            ...children(labelElm, {
                // layouts:
                display       : 'inline', // use inline, so it takes the width & height automatically
                
                
                
                // positions:
                verticalAlign : 'baseline', // <Label>'s text should be aligned with sibling text, so the <Label> behave like <span> wrapper
                
                
                
                // sizes:
                flex          : [[1, 1, 0]], // growable, shrinkable, initial from 0 width (setting initial to `auto`, when wrapped to next line, causing the text is not centered)
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(checks, 'label')), // apply config's cssProps starting with label***
            }),
        }),
    });
};
export const usesCheckVariants = () => {
    // dependencies:
    
    // features:
    const {foregroundVars} = usesForeground();
    const {borderVars    } = usesBorder();
    
    // variants:
    const {resizableRule } = usesResizable(checks);
    const {mildableVars  } = usesMildable();
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableActionControlVariants(),
            resizableRule,
        ]),
        ...variants([
            rule(['.button', '.toggleButton'], {
                ...imports([
                    // layouts:
                    usesButtonLayout(),
                ]),
                ...style({
                    // children:
                    // hides the <dummy> & <Check>'s indicator:
                    ...children([dummyElm, inputElm], {
                        // layouts:
                        display : 'none',
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(checks, 'button')), // apply config's cssProps starting with button***
                    
                    // overwrites propName = {button}propName:
                    ...overwriteProps(checks, usesPrefixedProps(checks, 'button')),
                }),
            }),
            rule('.toggleButton', {
                // customize:
                ...usesCssProps(usesPrefixedProps(checks, 'toggleButton')), // apply config's cssProps starting with toggleButton***
                
                // overwrites propName = {toggleButton}propName:
                ...overwriteProps(checks, usesPrefixedProps(checks, 'toggleButton')),
            }),
            
            rule('.switch', {
                // children:
                ...children(inputElm, {
                    // sizes:
                    aspectRatio : '2 / 1', // make the width twice the height
                    inlineSize : 'auto',   // make the width twice the height
                    
                    
                    
                    // borders:
                    // circle corners on top:
                    [borderVars.borderStartStartRadius] : borderRadiuses.pill,
                    [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
                    // circle corners on bottom:
                    [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
                    [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(checks, 'switch')), // apply config's cssProps starting with switch***
                }),
                
                
                
                // overwrites propName = {switch}propName:
                ...overwriteProps(checks, usesPrefixedProps(checks, 'switch')),
            }),
        ], { specificityWeight: 1 }),
        ...variants([
            ifNotNude({
                // children:
                ...children(inputElm, {
                    // borders:
                    [borderVars.borderColor] : foregroundVars.foreg,  // make a contrast border between indicator & filler
                    
                    
                    
                    // animations:
                    boxShadow : ['none', '!important'], // remove double focus indicator animation to the wrapper
                }),
            }),
            ifNude({
                // foregrounds:
                foreg     : [mildableVars.foregFn, '!important'], // no valid/invalid animation
            }),
        ], { specificityWeight: 2 }),
    });
};
export const usesCheckStates = () => {
    // dependencies:
    
    // states:
    const {focusableVars} = usesFocusable();
    const {checkableRule} = usesCheckable(checks);
    
    
    
    return style({
        ...imports([
            // states:
            usesEditableActionControlStates(),
            checkableRule,
        ]),
        ...style({
            // children:
            ...children(inputElm, {
                ...vars({
                    // copy focus effect from parent:
                    [focusableVars.boxShadow] : 'inherit',
                    [focusableVars.anim     ] : 'inherit',
                }),
            }),
        }),
    });
};

export const useCheckStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCheckLayout(),
        
        // variants:
        usesCheckVariants(),
        
        // states:
        usesCheckStates(),
    ]),
}), { id: 'nx58strmq2' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [checks, checkValues, cssCheckConfig] = cssConfig(() => {
    // dependencies:
    
    const {checkableVars : {filterIn: checkFilterIn, filterOut: checkFilterOut, transformIn: checkTransformIn, transformOut: checkTransformOut}} = usesCheckable();
    
    
    
    //#region keyframes
    const frameChecked = style({
        filter    : [[
            checkFilterIn,
        ]],
        
        transform : [[
            checkTransformIn,
        ]],
    });
    const frameCleared = style({
        filter    : [[
            checkFilterOut,
        ]],
        
        transform : [[
            checkTransformOut,
        ]],
    });
    const [keyframesCheckRule, keyframesCheck] = keyframes({
        from  : frameCleared,
        to    : frameChecked,
    });
    keyframesCheck.value = 'check'; // the @keyframes name should contain 'check' in order to be recognized by `usesCheckable`
    const [keyframesClearRule, keyframesClear] = keyframes({
        from  : frameChecked,
        to    : frameCleared,
    });
    keyframesClear.value = 'clear'; // the @keyframes name should contain 'clear' in order to be recognized by `usesCheckable`
    
    
    
    const frameChecking = style({
        transformOrigin: 'left', 
        transform : [[
            checkTransformIn,
            'scaleX(1.2)', // add a bumpy effect
        ]],
    });
    const frameClearing = style({
        transformOrigin: 'right',
        transform : [[
            checkTransformOut,
            'scaleX(1.2)', // add a bumpy effect
        ]],
    });
    const [keyframesSwitchCheckRule, keyframesSwitchCheck] = keyframes({
        from  : frameCleared,
        '50%' : frameChecking,
        to    : frameChecked,
    });
    keyframesSwitchCheck.value = 'switchCheck'; // the @keyframes name should contain 'check' in order to be recognized by `usesCheckable`
    const [keyframesSwitchClearRule, keyframesSwitchClear] = keyframes({
        from  : frameChecked,
        '50%' : frameClearing,
        to    : frameCleared,
    });
    keyframesSwitchClear.value = 'switchClear'; // the @keyframes name should contain 'clear' in order to be recognized by `usesCheckable`
    //#endregion keyframes
    
    
    
    return {
        // spacings:
        spacing                 : '0.3em'   as CssKnownProps['gapInline'],
        
        
        
        // animations:
        // forked from Bootstrap 5:
        indicator               : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")` as CssKnownProps['maskImage'],
        switchIndicator         : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")` as CssKnownProps['maskImage'],
        
        
        checkFilterIn           : [[
            'opacity(100%)',
        ]]                                  as CssKnownProps['filter'   ],
        checkFilterOut          : [[
            'opacity(0%)',
        ]]                                  as CssKnownProps['filter'   ],
        checkTransformIn        : 'initial' as CssKnownProps['transform'],
        checkTransformOut       : 'initial' as CssKnownProps['transform'],
        
        ...keyframesCheckRule,
        ...keyframesClearRule,
        checkAnimIn             : [
            ['150ms', 'ease-out', 'both', keyframesCheck      ],
        ]                                   as CssKnownProps['animation'],
        checkAnimOut            : [
            ['150ms', 'ease-out', 'both', keyframesClear      ],
        ]                                   as CssKnownProps['animation'],
        
        
        switchCheckFilterIn     : [[
            'opacity(100%)',
        ]]                                  as CssKnownProps['filter'   ],
        switchCheckFilterOut    : [[
            'opacity(50%)',
        ]]                                  as CssKnownProps['filter'   ],
        switchCheckTransformIn  : [[
            'translateX(0.5em)',
        ]]                                  as CssKnownProps['transform'],
        switchCheckTransformOut : [[
            'translateX(-0.5em)',
        ]]                                  as CssKnownProps['transform'],
        
        ...keyframesSwitchCheckRule,
        ...keyframesSwitchClearRule,
        switchCheckAnimIn       : [
            ['200ms', 'ease-out', 'both', keyframesSwitchCheck],
        ]                                   as CssKnownProps['animation'],
        switchCheckAnimOut      : [
            ['200ms', 'ease-out', 'both', keyframesSwitchClear],
        ]                                   as CssKnownProps['animation'],
    };
}, { prefix: 'chk' });



// handlers:
export const handleInputClickTriggersChange : React.MouseEventHandler<Element> = (event) => {
    event.stopPropagation(); // a hack to prevent the `triggerChange` triggers `onClick` => re-trigger `triggerChange` => infinity trigger
};



// react components:
export interface CheckProps
    extends
        // bases:
        EditableActionControlProps<HTMLInputElement>,
        
        // input[type="checkbox"]:
        Omit<InputHTMLAttributes<HTMLInputElement>,
            // semantics:
            |'role'                  // we redefined [role] in <Generic>
            
            // layouts:
            |'size'                  // we use css way to resize
            
            // accessibilities:
            |'enterKeyHint'          // no special [enter] keyboard
            |'disabled'              // we use [enabled] instead of [disabled]
            
            // validations:
            |'minLength'|'maxLength' // text length constraint is not supported
            |'min'|'max'|'step'      // range & step are not supported
            |'pattern'               // text regex is not supported
            
            // formats:
            |'type'                              // always [type="checkbox"] or [type="radio"]
            |'placeholder'|'autoComplete'|'list' // text hints are not supported
        >,
        
        // variants:
        CheckVariant,
        
        // states:
        ToggleActivatableProps
{
    // accessibilities:
    label          ?: string
    
    
    
    // formats:
    type           ?: 'checkbox' | 'radio'
    
    
    
    // values:
    defaultChecked ?: boolean
    checked        ?: boolean
    
    
    
    // children:
    children       ?: React.ReactNode
}
const Check = (props: CheckProps): JSX.Element|null => {
    // styles:
    const styleSheet   = useCheckStyleSheet();
    
    
    
    // variants:
    const checkVariant = useCheckVariant(props);
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // variants:
        checkStyle : _checkStyle, // remove
        
        nude       = _defaultNude,
        outlined   = _defaultOutlined,
        mild       = _defaultMild,
        
        
        
        // states:
        defaultActive,  // take, to be handled by `useToggleActivatable`
        active,         // take, to be handled by `useToggleActivatable`
        inheritActive,  // take, to be handled by `useToggleActivatable`
        onActiveChange, // take, to be handled by `useToggleActivatable`
        
        pressed,
        
        
        
        // accessibilities:
        
        // still on <EditableActionControl> element
        // autoFocus,
        // tabIndex,
        // enterKeyHint,
        
        label,
        
        
        
        // validations:
        required,
        
        
        
        // formats:
        type = 'checkbox',
        
        
        
        // forms:
        name,
        form,
        
        
        
        // values:
        defaultValue,
        value,
        onChange, // forwards to `input[type]`
        
        defaultChecked, // take, to be aliased to `defaultActive`
        checked,        // take, to be aliased to `active`
        
        
        
        // children:
        children,
    ...restEditableActionControlProps} = props;
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    
    
    
    // states:
    const [isActive, , toggleActive] = useToggleActivatable({
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
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);
    
    const isToggleButton = (props.checkStyle === 'toggleButton');
    const pressedFn      = pressed ?? (((isActive && isToggleButton) && !outlined && !mild) || undefined); // if (active (as pressed) === false) => uncontrolled pressed
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        checkVariant.class,
    );
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleActive();         // handle click as toggle [active]
        event.preventDefault(); // handled
    }, []);
    const handleClick           = useMergeEvents(
        // preserves the original `onClick`:
        props.onClick,
        
        
        
        // actions:
        handleClickInternal,
    );
    
    const handleKeyDownInternal = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            event.preventDefault(); // prevents pressing space for scrolling page
        } // if
    }, []);
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown`:
        props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    
    const handleKeyUpInternal   = useEvent<React.KeyboardEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        if ((event.key === ' ') || (event.code === 'Space')) {
            toggleActive();         // handle click as toggle [active]
            event.preventDefault(); // handled
        } // if
    }, []);
    const handleKeyUp           = useMergeEvents(
        // preserves the original `onKeyUp`:
        props.onKeyUp,
        
        
        
        // actions:
        handleKeyUpInternal,
    );
    
    const handleChangeDummy     = useEvent<React.ChangeEventHandler<HTMLInputElement>>((_event) => {
        /* nothing to do */
    }, []);
    const handleChange          = useMergeEvents(
        // preserves the original `onChange`:
        onChange,
        
        
        
        // dummy:
        handleChangeDummy, // just for satisfying React of controllable <input>
    );
    
    
    
    // jsx:
    return (
        <EditableActionControl<HTMLInputElement>
            // other props:
            {...restEditableActionControlProps}
            
            
            
            // semantics:
            tag          = {props.tag           ??   'span'  }
            semanticTag  = {props.semanticTag   ??     ''    }
            semanticRole = {props.semanticRole  ?? 'checkbox'}
            
            aria-label   = {props['aria-label'] ?? label}
            
            
            
            // variants:
            nude={nude}
            outlined={outlined}
            mild={mild}
            
            
            
            // states:
            active={isActive}
            pressed={pressedFn}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // handlers:
            onClick   = {handleClick}
            onKeyDown = {handleKeyDown}
            onKeyUp   = {handleKeyUp}
            
            
            
            // Check props:
            {...{
                // actions:
                // type,
            }}
        >
            <input
                // refs:
                ref={mergedInputRef}
                
                
                
                // accessibilities:
                
                {...{
                    // autoFocus,    // still on <EditableControl> element
                    tabIndex : -1,   // not focusable
                    // enterKeyHint, // not supported
                }}
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={propReadOnly} // locks the value & no validation if readOnly
                
                
                
                // forms:
                {...{
                    name,
                    form,
                }}
                
                
                
                // values:
                {...{
                    defaultValue,
                    value,
                    
                    // defaultChecked,   // fully controllable, no defaultChecked
                    checked  : isActive, // fully controllable
                    onChange : handleChange,
                }}
                
                
                
                // validations:
                {...{
                    required,
                }}
                
                
                
                // formats:
                {...{
                    type,
                }}
                
                
                
                // handlers:
                onClick={handleInputClickTriggersChange} // a hack to prevent the `triggerChange` triggers `onClick` => re-trigger `triggerChange` => infinity trigger
            />
            { !!children && <span>
                { children }
            </span> }
        </EditableActionControl>
    );
};
export {
    Check,
    Check as default,
}
