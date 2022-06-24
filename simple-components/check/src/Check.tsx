// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import type {
    // css values:
    CssComplexBaseValueOf,
    
    
    
    // css custom properties:
    CssCustomSimpleRef,
    CssCustomRef,
    CssCustomValue,
    
    
    
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
    
    CssStyleCollection,
    
    CssSelectorCollection,
}                           from '@cssfn/css-types'                     // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    
    
    
    //combinators:
    children,
    
    
    
    // styles:
    style,
    vars,
    imports,
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
    fallbacks,
}                           from '@cssfn/css-var'                       // strongly typed of css variables
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
    usesPrefixedProps,
}                           from '@cssfn/css-config'                    // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    borderRadiuses,
}                           from '@reusable-ui/borders'                 // a border (stroke) management system
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'                 // a spacer (gap) management system
import {
    // styles:
    fillTextLineHeightLayout,
}                           from '@reusable-ui/layouts'                 // reusable common layouts
import {
    // hooks:
    useMergeClasses,
}                           from '@reusable-ui/hooks'                   // react helper hooks
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
    OrientationName,
    OrientationRuleOptions,
    defaultInlineOrientationRuleOptions,
    normalizeOrientationRule,
    usesOrientationRule,
    OrientationVariant,
    useOrientationVariant,
    gradientOf,
    ifNotOutlined,
    outlinedOf,
    usesForeg,
    usesBorder,
    usesPadding,
    usesAnim,
}                           from '@reusable-ui/basic'                   // a base component
import {
    // hooks:
    ifActived,
    ifActivating,
    ifPassivating,
    ifPassived,
}                           from '@reusable-ui/indicator'               // a base component
import {
    // hooks:
    usesThemeActive,
    ifFocus,
    ifArrive,
    ifLeave,
}                           from '@reusable-ui/control'                 // a base component
import {
    // hooks:
    ifPress,
    isClientSideLink,
}                           from '@reusable-ui/action-control'          // a base component
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



// hooks:

// animations:

//#region check animations
export interface CheckAnimVars {
    /**
     * final filter of the checkbox.
     */
    filter : any
    
    
    
    /**
     * final transform of the checkbox.
     */
    transf : any
    
    
    
    /**
     * final animation of the checkbox.
     */
    anim   : any
}
const [checkAnims] = cssVar<CheckAnimVars>();



const setsFilter        = new Set<CssCustomSimpleRef>();
const setsTransf        = new Set<CssCustomSimpleRef>();
const setsAnim          = new Set<CssCustomSimpleRef>();
const checkAnimRegistry = {
    get filters         ():    CssCustomSimpleRef[]      {
        // dependencies:
        
        // animations:
        const [, anims ] = usesAnim();
        
        
        
        return [
            anims.filterNone, // the filter collection must contain at least 1 of *none* filter, so when rendered it produces a valid css value of filter property
            ...Array.from(setsFilter)
        ];
    },
    registerFilter      (item: CssCustomSimpleRef): void { setsFilter.add(item)    },
    unregisterFilter    (item: CssCustomSimpleRef): void { setsFilter.delete(item) },
    
    
    
    get transfs         ():    CssCustomSimpleRef[]      {
        // dependencies:
        
        // animations:
        const [, anims ] = usesAnim();
        
        
        
        return [
            anims.transfNone, // the transform collection must contain at least 1 of *none* transform, so when rendered it produces a valid css value of transform property
            ...Array.from(setsTransf)
        ];
    },
    registerTransf      (item: CssCustomSimpleRef): void { setsTransf.add(item)    },
    unregisterTransf    (item: CssCustomSimpleRef): void { setsTransf.delete(item) },
    
    
    
    get anims           ():    CssCustomSimpleRef[]      {
        // dependencies:
        
        // animations:
        const [, anims ] = usesAnim();
        
        
        
        return [
            anims.animNone, // the animation collection must contain at least 1 of *none* animation, so when rendered it produces a valid css value of animation property
            ...Array.from(setsAnim)
        ];
    },
    registerAnim        (item: CssCustomSimpleRef): void { setsAnim.add(item)      },
    unregisterAnim      (item: CssCustomSimpleRef): void { setsAnim.delete(item)   },
};
export type CheckAnimRegistry = typeof checkAnimRegistry



export type CheckAnimMixin = readonly [() => CssRule, ReadonlyCssCustomRefs<CheckAnimVars>, CheckAnimRegistry]
/**
 * Uses check animation.
 * @returns A `CheckAnimMixin` represents check animation definitions.
 */
export const usesCheckAnim = (): CheckAnimMixin => {
    // dependencies:
    
    // animations:
    const [, anims ] = usesAnim();
    
    
    
    return [
        () => style({
            ...vars({
                [checkAnims.filter       ] : [[
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    ...checkAnimRegistry.filters,
                ]],
                
                
                
                [checkAnims.transf       ] : [[
                    // combining: transf1 * transf2 * transf3 ...
                    
                    // layers:
                    ...checkAnimRegistry.transfs,
                ]],
                
                
                
                [checkAnims.anim         ] : [
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    ...checkAnimRegistry.anims,
                ],
            }),
            
            
            
            // declare default values at lowest specificity (except for **None):
            ...vars(Object.fromEntries([
                ...checkAnimRegistry.filters   .filter((ref) => (ref !== anims.filterNone   )).map((ref) => [ ref, anims.filterNone    ]),
                ...checkAnimRegistry.transfs   .filter((ref) => (ref !== anims.transfNone   )).map((ref) => [ ref, anims.transfNone    ]),
                ...checkAnimRegistry.anims     .filter((ref) => (ref !== anims.animNone     )).map((ref) => [ ref, anims.animNone      ]),
            ])),
        }),
        checkAnims,
        checkAnimRegistry,
    ];
};
//#endregion check animations


// states:

//#region checkClear
export interface CheckClearVars {
    filterIn  : any
    filterOut : any
    transfIn  : any
    transfOut : any
    anim      : any
}
const [checkVars] = cssVar<CheckClearVars>();

{
    const [, , checkAnimRegistry] = usesCheckAnim();
    checkAnimRegistry.registerFilter(checkVars.filterIn);
    checkAnimRegistry.registerFilter(checkVars.filterOut);
    checkAnimRegistry.registerTransf(checkVars.transfIn);
    checkAnimRegistry.registerTransf(checkVars.transfOut);
    checkAnimRegistry.registerAnim(checkVars.anim);
}



/**
 * Uses check & clear states.
 * @returns A `StateMixin<CheckClearVars>` represents check & clear state definitions.
 */
export const usesCheckClearState = (): StateMixin<CheckClearVars> => {
    return [
        () => style({
            ...states([
                ifActived({
                    ...vars({
                        [checkVars.filterIn ] : checks.filterCheck,
                        
                        [checkVars.transfIn ] : checks.transfCheck,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [checkVars.filterIn ] : checks.filterCheck,
                        [checkVars.filterOut] : checks.filterClear,
                        
                        [checkVars.transfIn ] : checks.transfCheck,
                        [checkVars.transfOut] : checks.transfClear,
                        
                        [checkVars.anim     ] : checks.animCheck,
                    }),
                }),
                
                ifPassivating({
                    ...vars({
                        [checkVars.filterIn ] : checks.filterCheck,
                        [checkVars.filterOut] : checks.filterClear,
                        
                        [checkVars.transfIn ] : checks.transfCheck,
                        [checkVars.transfOut] : checks.transfClear,
                        
                        [checkVars.anim     ] : checks.animClear,
                    }),
                }),
                ifPassived({
                    ...vars({
                        [checkVars.filterOut] : checks.filterClear,
                        
                        [checkVars.transfOut] : checks.transfClear,
                    }),
                }),
            ]),
        }),
        checkVars,
    ];
};
//#endregion checkClear


// appearances:

//#region check style
export type CheckStyle = 'btn'|'togglerBtn'|'switch' // might be added more styles in the future
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
export const inputElm = ':first-child';
export const checkElm = '::before';
export const labelElm = ':nth-child(1n+2)';

export const usesCheckLayout = () => {
    // dependencies:
    
    // foregrounds:
    const [             , foregs    ] = usesForeg();
    
    // animations:
    const [checkAnimRule, checkAnims] = usesCheckAnim();
    
    // spacings:
    const [             , paddings  ] = usesPadding();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesEditableActionControlLayout(),
            
            // animations:
            checkAnimRule,
        ]),
        ...style({
            // layouts:
            display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
            flexDirection  : 'row',         // flow to the document's writing flow
            justifyContent : 'center',      // items are placed starting from the center (in case of input & label are wrapped, each placed at the center)
            alignItems     : 'center',      // center items vertically (indicator & label are always at center no matter how tall is the wrapper)
            flexWrap       : 'wrap',        // allows the label to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            verticalAlign  : 'baseline',    // check's text should be aligned with sibling text, so the check behave like <span> wrapper
            
            
            
            // children:
            ...children('::before', {
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
                    filter        : ['initial', '!important'], // uses parent filter
                    
                    
                    
                    // spacings:
                    [paddings.paddingInline] : '0px', // discard padding
                    [paddings.paddingBlock ] : '0px', // discard padding
                    ...ifNotLastChild({
                        // spacing between input & label:
                        marginInlineEnd : checks.spacing,
                    }),
                    
                    
                    
                    // children:
                    ...children(checkElm, {
                        ...imports([
                            // check indicator:
                            usesIconImage(
                                /*iconImage: */checks.img,
                                /*iconColor: */foregRefs.foreg,
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
                            filter    : checkAnimRefs.filter,
                            transf    : checkAnimRefs.transf,
                            anim      : checkAnimRefs.anim,
                        }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(editableControls), // apply config's cssProps
                }),
            }),
        }),
    });
};
export const usesCheckVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizesRule] = usesSizeVariant(checks);
    
    
    
    return style({
        ...imports([
            // variants:
            usesEditableActionControlVariants(),
            
            // layouts:
            sizesRule,
        ]),
        ...variants([
            rule('.ghost', {
                ...style({
                    // borders:
                    boxShadow : ['none', '!important'], // no focus animation
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(checks, 'ghost')), // apply config's cssProps starting with ghost***
                }),
                ...states([
                    ifArrive({
                        // appearances:
                        opacity: checks.ghostOpacityArrive, // increase the opacity to increase visibility
                    }),
                    ifLeave({
                        ...imports([
                            // backgrounds:
                            gradientOf(false), // hides the gradient to increase invisibility
                        ]),
                    }),
                ]),
            }),
        ]),
    });
};
export const usesCheckStates = () => {
    return style({
        ...imports([
            // states:
            usesEditableActionControlStates(),
        ]),
    });
};

export const useCheckStyleSheet = createUseStyleSheet(() => ({
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
    return {
        // spacings:
        gapInline          : spacers.sm as CssKnownProps['gapInline'],
        gapBlock           : spacers.sm as CssKnownProps['gapBlock' ],
        gapInlineSm        : spacers.xs as CssKnownProps['gapInline'],
        gapBlockSm         : spacers.xs as CssKnownProps['gapBlock' ],
        gapInlineLg        : spacers.md as CssKnownProps['gapInline'],
        gapBlockLg         : spacers.md as CssKnownProps['gapBlock' ],
        
        
        
        // typos:
        whiteSpace         : 'normal'   as CssKnownProps['whiteSpace'],
        
        
        
        // ghost style:
        ghostOpacity       : 0.5        as CssKnownProps['opacity'],
        ghostOpacityArrive : 1          as CssKnownProps['opacity'],
    };
}, { prefix: 'chk' });



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
            
            // validations:
            |'minLength'|'maxLength' // text length constraint is not supported
            |'min'|'max'|'step'      // range & step are not supported
            |'pattern'               // text regex is not supported
            
            // formats:
            |'type'                              // always [type="checkbox"] or [type="radio"]
            |'placeholder'|'autoComplete'|'list' // text hints are not supported
        >,
        
        // appearances:
        CheckVariant,
        
        // behaviors:
        TogglerActiveProps
{
    // accessibilities:
    label    ?: string
    
    
    
    // children:
    children ?: React.ReactNode
}
const Check = (props: CheckProps): JSX.Element|null => {
    // styles:
    const styleSheet         = useCheckStyleSheet();
    
    
    
    // variants:
    const checkVariant       = useCheckVariant(props);
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // appearances:
        checkStyle  : _checkStyle,
        
        
        
        // variants:
        outlined = _defaultOutlined,
        mild     = _defaultMild,
        
        
        
        // accessibilities:
        label,
        pressed,
    ...restEditableActionControlProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        checkVariant.class,
    );
    
    
    
    // jsx:
    return (
        <EditableActionControl<HTMLInputElement>
            // other props:
            {...restEditableActionControlProps}
            
            
            
            // semantics:
            aria-label  = {props['aria-label'] ?? label}
            
            
            
            // variants:
            outlined={outlined}
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // accessibilities:
            enabled={props.enabled ?? !(props.disabled ?? false)}
            
            
            
            // Check props:
            {...{
                // actions:
                // type,
            }}
        />
    );
};
export {
    Check,
    Check as default,
}

export type { OrientationName, OrientationVariant }
