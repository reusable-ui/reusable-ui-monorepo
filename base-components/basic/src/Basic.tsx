// react:
import {
    // react:
    default as React,
}                           from 'react'

// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    rule,
    style,
    imports,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
    usesCssProps,
}                           from '@cssfn/core'                  // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a color management system:
    colors,
    
    
    
    // a border (stroke) management system:
    borders,
    borderRadiuses,
    
    
    
    // a spacer (gap) management system:
    spacers,
    
    
    
    // a typography management system:
    typos,
    
    
    
    // react helper hooks:
    useMergeClasses,
    
    
    
    // background stuff of UI:
    usesBackground,
    
    
    
    // foreground (text color) stuff of UI:
    usesForeground,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // ring (focus indicator) color of UI:
    usesRing,
    
    
    
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    ResizableProps,
    useResizable,
    
    
    
    // color options of UI:
    usesThemable,
    ThemableProps,
    useThemable,
    
    
    
    // gradient variant of UI:
    usesGradientable,
    GradientableProps,
    useGradientable,
    
    
    
    // outlined (background-less) variant of UI:
    usesOutlineable,
    OutlineableProps,
    useOutlineable,
    
    
    
    // mild (soft color) variant of UI:
    usesMildable,
    MildableProps,
    useMildable,
    
    
    
    // nude variant of UI:
    usesNudible,
    NudibleProps,
    useNudible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component



// configs:
export const [basics, basicValues, cssBasicConfig] = cssConfig(() => {
    const transitionDuration = '300ms';
    
    return {
        // backgrounds:
        backg                : 'transparent'        as CssKnownProps['background'],
        altBackg             : colors.primary       as CssKnownProps['background'],
        backgGrad            : [
            ['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box'],
        ]                                           as CssKnownProps['backgroundImage'],
        
        
        
        // foregrounds:
        foreg                : 'currentColor'       as CssKnownProps['foreground'],
        altForeg             : colors.primaryText   as CssKnownProps['foreground'],
        
        
        
        // borders:
        borderStyle          : borders.style        as CssKnownProps['borderStyle' ],
        borderWidth          : borders.defaultWidth as CssKnownProps['borderWidth' ],
        borderColor          : borders.color        as CssKnownProps['borderColor' ],
        
        borderRadius         : borderRadiuses.md    as CssKnownProps['borderRadius'],
        borderRadiusSm       : borderRadiuses.sm    as CssKnownProps['borderRadius'],
        borderRadiusLg       : borderRadiuses.lg    as CssKnownProps['borderRadius'],
        
        
        
        // rings:
        ring                 : colors.secondaryThin as CssKnownProps['color'],
        
        
        
        // animations:
        transitionDuration   : transitionDuration   as CssKnownProps['transitionDuration'],
        transition           : [
            // appearances:
            ['opacity'      , transitionDuration, 'ease-out'],
            
            // sizes:
            ['inline-size'  , transitionDuration, 'ease-out'],
            ['block-size'   , transitionDuration, 'ease-out'],
            
            // backgrounds:
            ['background'   , transitionDuration, 'ease-out'],
            
            // foregrounds:
            ['color'        , transitionDuration, 'ease-out'],
            
            // borders:
            ['border'       , transitionDuration, 'ease-out'],
            ['border-radius', transitionDuration, 'ease-out'],
            
            // spacings:
         // ['padding'      , transitionDuration, 'ease-out'], // beautiful but uncomfortable
            
            // typos:
            ['font-size'    , transitionDuration, 'ease-out'],
        ]                                           as CssKnownProps['transition'],
        
        
        
        // spacings:
        paddingInline        : [['calc((', spacers.sm, '+', spacers.md, ')/2)']]    as CssKnownProps['paddingInline'],
        paddingBlock         : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']]    as CssKnownProps['paddingBlock' ],
        paddingInlineSm      : spacers.sm                                           as CssKnownProps['paddingInline'],
        paddingBlockSm       : spacers.xs                                           as CssKnownProps['paddingBlock' ],
        paddingInlineLg      : spacers.md                                           as CssKnownProps['paddingInline'],
        paddingBlockLg       : spacers.sm                                           as CssKnownProps['paddingBlock' ],
        
        
        
        // typos:
        fontSize             : typos.fontSizeMd                                                 as CssKnownProps['fontSize'      ],
        fontSizeSm           : [['calc((', typos.fontSizeSm, '+', typos.fontSizeMd, ')/2)']]    as CssKnownProps['fontSize'      ],
        fontSizeLg           : typos.fontSizeLg                                                 as CssKnownProps['fontSize'      ],
        fontFamily           : 'inherit'                                                        as CssKnownProps['fontFamily'    ],
        fontWeight           : 'inherit'                                                        as CssKnownProps['fontWeight'    ],
        fontStyle            : 'inherit'                                                        as CssKnownProps['fontStyle'     ],
        textDecoration       : 'inherit'                                                        as CssKnownProps['textDecoration'],
        lineHeight           : 'inherit'                                                        as CssKnownProps['lineHeight'    ],
    };
}, { prefix: 'bsc' });



// styles:
export const usesBasicLayout = () => {
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesBackground(basics);
    const {foregroundRule, foregroundVars} = usesForeground(basics);
    const {borderRule    , borderVars    } = usesBorder(basics);
    const {ringRule                      } = usesRing(basics);
    const {animationRule , animationVars } = usesAnimation(basics as any);
    const {paddingRule   , paddingVars   } = usesPadding(basics);
    
    
    
    return style({
        ...imports([
            // features:
            backgroundRule,
            foregroundRule,
            borderRule,
            ringRule,
            animationRule,
            paddingRule,
        ]),
        ...style({
            // layouts:
            display       : 'block',
            
            
            
            // customize:
            ...usesCssProps(basics), // apply config's cssProps
            
            
            
            // accessibilities:
            ...rule(['&::selection', '& ::selection'], { // ::selection on self and descendants
                    // backgrounds:
                backg     : backgroundVars.altBackgColor,
                
                
                
                // foregrounds:
                foreg     : foregroundVars.altForeg,
            }),
            
            
            
            // backgrounds:
            backg         : backgroundVars.backg,
            
            
            
            // foregrounds:
            foreg         : foregroundVars.foreg,
            
            
            
            // borders:
            border        : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
            // animations:
            boxShadow     : animationVars.boxShadow,
            filter        : animationVars.filter,
            anim          : animationVars.anim,
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesBasicVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule   } = usesResizable(basics);
    const {themableRule    } = usesThemable();
    const {gradientableRule} = usesGradientable(basics);
    const {outlineableRule } = usesOutlineable(basics);
    const {mildableRule    } = usesMildable(basics);
    const {nudibleRule     } = usesNudible();
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
            themableRule,
            gradientableRule,
            outlineableRule,
            mildableRule,
            nudibleRule,
        ]),
    });
};

export const useBasicStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesBasicLayout(),
        
        // variants:
        usesBasicVariants(),
    ]),
}), { id: 'rbkpy0qh2b' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface BasicProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>,
        
        // variants:
        ResizableProps,
        ThemableProps,
        GradientableProps,
        OutlineableProps,
        MildableProps,
        NudibleProps
{
}
const Basic = <TElement extends Element = HTMLElement>(props: BasicProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet          = useBasicStyleSheet();
    
    
    
    // variants:
    const resizableVariant    = useResizable(props);
    const themableVariant     = useThemable(props);
    const gradientableVariant = useGradientable(props);
    const outlineableVariant  = useOutlineable(props);
    const mildableVariant     = useMildable(props);
    const nudibleVariant      = useNudible(props);
    
    
    
    // rest props:
    const {
        // variants:
        size     : _size,     // remove
        theme    : _theme,    // remove
        gradient : _gradient, // remove
        outlined : _outlined, // remove
        mild     : _mild,     // remove
        nude     : _nude,     // remove
    ...restGenericProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        resizableVariant.class,
        themableVariant.class,
        gradientableVariant.class,
        outlineableVariant.class,
        mildableVariant.class,
        nudibleVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Basic,
    Basic as default,
}



export interface BasicComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    basicComponent ?: React.ReactComponentElement<any, BasicProps<TElement>>
}

