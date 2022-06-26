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
    // styles:
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from '@reusable-ui/check'                   // a base component
import type {
    // types:
    InputHTMLAttributes,
}                           from '@reusable-ui/input'                   // a neighbor component
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
export const dummyElm = '::before';
export const inputElm = ':first-child';
export const checkElm = '::before';
export const labelElm = ':nth-child(1n+2)';

export const usesRadioLayout = () => {
    // dependencies:
    
    // foregrounds:
    const [             , foregs    ] = usesForeg();
    
    // spacings:
    const [             , paddings  ] = usesPadding();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesCheckLayout(),
        ]),
        ...style({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // items are placed starting from the center (in case of input & label are wrapped, each placed at the center)
            alignItems     : 'center',      // center items vertically (indicator & label are always at center no matter how tall is the wrapper)
            flexWrap       : 'wrap',        // allows the label to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline',    // radio's text should be aligned with sibling text, so the radio behave like <span> wrapper
            
            
            
            // children:
            ...children(dummyElm, {
                ...imports([
                    fillTextLineHeightLayout(),
                ]),
            }),
            ...children(inputElm, {
                ...imports([
                    // layouts:
                    usesCheckLayout(),
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
                    [paddings.paddingInline] : '0px', // discard padding
                    [paddings.paddingBlock ] : '0px', // discard padding
                    ...ifNotLastChild({
                        // spacing between input & label:
                        marginInlineEnd : radios.spacing, // we cannot place a `gap` on the parent flex because the existance of <dummyElm>
                    }),
                    
                    
                    
                    // children:
                    ...children(checkElm, {
                        ...imports([
                            // radio indicator:
                            usesIconImage(
                                /*img   : */radios.img,
                                /*color : */foregs.foreg,
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
                            filter    : checkAnims.filter,
                            transf    : checkAnims.transf,
                            anim      : checkAnims.anim,
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(radios), // apply config's cssProps
                }),
            }),
            ...children(labelElm, {
                // layouts:
                display       : 'inline', // use inline, so it takes the width & height automatically
                
                
                
                // positions:
                verticalAlign : 'baseline', // label's text should be aligned with sibling text, so the label behave like <span> wrapper
                
                
                
                // sizes:
                flex          : [[1, 1, 0]], // growable, shrinkable, initial from 0 width (setting initial to `auto`, when wrapped to next line, causing the text is not centered)
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(radios, 'label')), // apply config's cssProps starting with label***
            }),
        }),
    });
};
export const usesRadioVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(radios);
    
    // foregrounds:
    const [, milds  ] = usesMildVariant();
    const [, foregs ] = usesForeg();
    
    // borders:
    const [, borders] = usesBorder();
    
    
    
    return style({
        ...imports([
            // variants:
            usesCheckVariants(),
            
            // layouts:
            sizesRule,
        ]),
        ...variants([
            rule(['.btn', '.togglerBtn'], {
                ...imports([
                    // layouts:
                    usesButtonLayout(),
                ]),
                ...style({
                    // children:
                    // hides the <dummy> & <Radio>'s indicator:
                    ...children([dummyElm, inputElm], {
                        // layouts:
                        display : 'none',
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(radios, 'btn')), // apply config's cssProps starting with btn***
                    
                    // overwrites propName = {btn}propName:
                    ...overwriteProps(radios, usesPrefixedProps(radios, 'btn')),
                }),
            }),
            rule('.togglerBtn', {
                // customize:
                ...usesCssProps(usesPrefixedProps(radios, 'togglerBtn')), // apply config's cssProps starting with togglerBtn***
                
                // overwrites propName = {togglerBtn}propName:
                ...overwriteProps(radios, usesPrefixedProps(radios, 'togglerBtn')),
            }),
            
            rule('.switch', {
                // children:
                ...children(inputElm, {
                    // sizes:
                    aspectRatio : '2 / 1', // make the width twice the height
                    inlineSize : 'auto',   // make the width twice the height
                    
                    
                    
                    // borders:
                    // circle corners on top:
                    [borders.borderStartStartRadius] : borderRadiuses.pill,
                    [borders.borderStartEndRadius  ] : borderRadiuses.pill,
                    // circle corners on bottom:
                    [borders.borderEndStartRadius  ] : borderRadiuses.pill,
                    [borders.borderEndEndRadius    ] : borderRadiuses.pill,
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(radios, 'switch')), // apply config's cssProps starting with switch***
                }),
                
                
                
                // overwrites propName = {switch}propName:
                ...overwriteProps(radios, usesPrefixedProps(radios, 'switch')),
            }),
        ], { specificityWeight: 1 }),
        ...variants([
            ifNotNude({
                // children:
                ...children(inputElm, {
                    // borders:
                    [borders.borderColor] : foregs.foreg,  // make a contrast border between indicator & filler
                    
                    
                    
                    // animations:
                    boxShadow : ['none', '!important'], // remove double focus indicator animation to the wrapper
                }),
            }),
            ifNude({
                // foregrounds:
                foreg     : [milds.foregFn, '!important'], // no valid/invalid animation
                
                
                
                // animations:
                boxShadow : ['initial'    , '!important'], // no focus animation
            }),
        ], { specificityWeight: 2 }),
    });
};
export const usesRadioStates = () => {
    // dependencies:
    
    // states:
    const [         , focuses] = usesFocusBlurState();
    
    
    
    return style({
        ...imports([
            // states:
            usesCheckStates(),
        ]),
        ...style({
            // children:
            ...children(inputElm, {
                ...vars({
                    // copy focus effect from parent:
                    [focuses.boxShadow] : 'inherit',
                    [focuses.anim     ] : 'inherit',
                }),
            }),
        }),
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
        // spacings:
        spacing           : '0.3em'   as CssKnownProps['gapInline'],
        
        
        
        // animations:
        // forked from Bootstrap 5:
        img               : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")` as CssKnownProps['maskImage'],
        switchImg         : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")` as CssKnownProps['maskImage'],
    };
}, { prefix: 'rad' });



// react components:
export interface RadioProps
    extends
        // bases:
        CheckProps
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
const Radio = (props: RadioProps): JSX.Element|null => {
    // styles:
    const styleSheet   = useRadioStyleSheet();
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        
        
        
        // accessibilities:
        
        // still on <Check> element
        // autoFocus,
        // tabIndex,
        // enterKeyHint,
        
        defaultActive,  // take, to be handled by `useTogglerActive`
        active,         // take, to be handled by `useTogglerActive`
        inheritActive,  // take, to be handled by `useTogglerActive`
        onActiveChange, // take, to be handled by `useTogglerActive`
        
        label,
        
        
        
        // validations:
        required,
        
        
        
        // formats:
        type = 'radio',
        
        
        
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
    ...restCheckProps} = props;
    
    
    
    // refs:
    const inputRefInternal = useRef<HTMLInputElement|null>(null);
    const mergedInputRef   = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        inputRefInternal,
    );
    
    
    
    // states:
    const [isActive, , toggleActive] = useTogglerActive({
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
    const propEnabled       = usePropEnabled(props);
    const propReadOnly      = usePropReadOnly(props);
    
    const isButton          = !!props.checkStyle && ['btn', 'togglerBtn'].includes(props.checkStyle);
    const isToggler         = (props.checkStyle === 'togglerBtn');
    const pressedFn         = props.pressed ?? ((isActive && isToggler) || undefined); // if (active (as pressed) === false) => uncontrolled pressed
    
    const tag               = props.tag         ?? (isButton ? undefined : 'span');
    const role              = props.role;
    const defaultTag        = props.defaultTag  ?? (isButton ? _defaultButtonTag  : _defaultRadioTag );
    const defaultRole       = props.defaultRole ?? (isButton ? _defaultButtonRole : _defaultRadioRole);
    const { isDesiredType : isSemanticCheckOrRadio } = useTestSemantic(
        // test:
        {
            tag,
            role,
            defaultTag,
            defaultRole,
        },
        
        // expected:
        {
            defaultTag  : null, // any tag
            defaultRole : _defaultCheckOrRadioRole,
        }
    );
    const { isDesiredType : isSemanticButton       } = useTestSemantic(
        // test:
        {
            tag,
            role,
            defaultTag,
            defaultRole,
        },
        
        // expected:
        {
            defaultTag  : null, // any tag
            defaultRole : _defaultButtonRole,
        }
    );
    const ariaChecked       = props['aria-checked'] ??  (isSemanticCheckOrRadio         ? isActive : undefined);
    const ariaPressed       = props['aria-pressed'] ?? ((isSemanticButton && isToggler) ? isActive : undefined);
    
    
    
    // handlers:
    const handleClickInternal   = useEvent<React.MouseEventHandler<HTMLInputElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // actions:
        toggleActive();         // handle click as toggle [active]
        event.preventDefault(); // handled
    }, [toggleActive]);
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
    }, [toggleActive]);
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
            onKeyDown = {handleKeyDown}
            onKeyUp   = {handleKeyUp}
            
            
            
            // Radio props:
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
            />
            { !!children && <span>
                { children }
            </span> }
        </Check>
    );
};
export {
    Radio,
    Radio as default,
}
