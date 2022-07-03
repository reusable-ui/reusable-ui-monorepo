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
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'                 // cssfn css specific types
import {
    // rules:
    rule,
    variants,
    states,
    
    
    
    // combinators:
    children,
    
    
    
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
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'             // a spacer (gap) management system
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
    usesSizeVariant,
    OrientationName,
    OrientationVariantOptions,
    defaultBlockOrientationVariantOptions,
    normalizeOrientationVariantOptions,
    usesOrientationVariant,
    OrientationVariant,
    useOrientationVariant,
    gradientOf,
    ifNotOutlined,
    outlinedOf,
    usesBorder,
    usesPadding,
}                           from '@reusable-ui/basic'               // a base component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'             // a base component



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationVariantOptions;
//#endregion orientation



// styles:
export const usesMasonryLayout = (options?: OrientationVariantOptions) => {
    // options:
    options = normalizeOrientationVariantOptions(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationVariant(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    
    
    
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            ...rule(orientationInlineSelector, { // inline
                // layouts:
                display             : 'inline-grid', // use css inline grid for layouting, the core of our Masonry layout
                gridAutoFlow        : 'column',      // items direction is to block & masonry's direction is to inline
                gridAutoColumns     : masonries.itemsRaiseRowHeight,
                gridTemplateRows    : `repeat(auto-fill, minmax(${masonries.itemsMinColumnWidth}, 1fr))`,
                
                // child default sizes:
                alignItems          : 'stretch',     // each item fills the entire Masonry's column height
             // justifyItems        : 'stretch',     // distorting the item's width a bit for consistent multiplies of `itemsRaiseRowHeight` // causing the ResizeObserver doesn't work
                justifyItems        : 'start',       // let's the item to resize so the esizeObserver will work
            }),
            ...rule(orientationBlockSelector , { // block
                // layouts:
                display             : 'grid',        // use css block grid for layouting, the core of our Masonry layout
                gridAutoFlow        : 'row',         // items direction is to inline & masonry's direction is to block
                gridAutoRows        : masonries.itemsRaiseRowHeight,
                gridTemplateColumns : `repeat(auto-fill, minmax(${masonries.itemsMinColumnWidth}, 1fr))`,
                
                // child default sizes:
                justifyItems        : 'stretch',     // each item fills the entire Masonry's column width
             // alignItems          : 'stretch',     // distorting the item's height a bit for consistent multiplies of `itemsRaiseRowHeight` // causing the ResizeObserver doesn't work
                alignItems          : 'start',       // let's the item to resize so the esizeObserver will work
            }),
            
            
            
            // spacings:
            ...rule(orientationInlineSelector, { // inline
                gapInline           : [0, '!important'], // strip out the `gapInline` because it will conflict with masonry's direction
            }),
            ...rule(orientationBlockSelector , { // block
                gapBlock            : [0, '!important'], // strip out the `gapBlock`  because it will conflict with masonry's direction
            }),
            
            
            
            // children:
            ...children('*', {
                // sizes:
                ...rule(parentOrientationInlineSelector, { // inline
                    gridRowEnd    : ['unset', '!important'], // clear from residual effect from blockStyle (if was)
                }),
                ...rule(parentOrientationBlockSelector , { // block
                    gridColumnEnd : ['unset', '!important'], // clear from residual effect from inlineStyle (if was)
                }),
                
                
                
                // spacings:
                ...rule(':not(.firstRow)', {
                    ...rule(parentOrientationInlineSelector, { // inline
                        /*
                        * we use `marginInlineStart` as the replacement of the stripped out `gapInline`
                        * we use `marginInlineStart` instead of `marginInlineEnd`
                        * because finding grid's items at the first row is much easier than at the last row
                        * (we don't need to count the number of grid's item)
                        */
                        marginInlineStart : masonries.gapBlock,
                    }),
                    ...rule(parentOrientationBlockSelector , { // block
                        /*
                        * we use `marginBlockStart` as the replacement of the stripped out `gapBlock`
                        * we use `marginBlockStart` instead of `marginBlockEnd`
                        * because finding grid's items at the first row is much easier than at the last row
                        * (we don't need to count the number of grid's item)
                        */
                        marginBlockStart  : masonries.gapBlock,
                    }),
                }),
            }),
            
            
            
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

export const useMasonryStyleSheet = createUseStyleSheet(() => ({
    ...imports([
        // layouts:
        usesMasonryLayout(),
        
        // variants:
        usesMasonryVariants(),
    ]),
}), { id: 'fiuyy1jxpx' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [masonries, masonryValues, cssMasonryConfig] = cssConfig(() => {
    return {
        // sizes:
        itemsRaiseRowHeight   : '3px'               as CssKnownProps['blockSize'],
        itemsRaiseRowHeightSm : '2px'               as CssKnownProps['blockSize'],
        itemsRaiseRowHeightLg : '4px'               as CssKnownProps['blockSize'],
        
        itemsMinColumnWidth   : 'calc(5 * 40px)'    as CssKnownProps['columnWidth'],
        itemsMinColumnWidthSm : 'calc(3 * 40px)'    as CssKnownProps['columnWidth'],
        itemsMinColumnWidthLg : 'calc(8 * 40px)'    as CssKnownProps['columnWidth'],
        
        
        
        // spacings:
        gapInline             : spacers.sm          as CssKnownProps['gapInline'],
        gapInlineSm           : spacers.xs          as CssKnownProps['gapInline'],
        gapInlineLg           : spacers.md          as CssKnownProps['gapInline'],
        gapBlock              : spacers.sm          as CssKnownProps['gapBlock' ],
        gapBlockSm            : spacers.xs          as CssKnownProps['gapBlock' ],
        gapBlockLg            : spacers.md          as CssKnownProps['gapBlock' ],
    };
}, { prefix: 'msry' });



// react components:
export interface MasonryProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ContentProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // layouts:
        OrientationVariant
{
    // children:
    children        ?: React.ReactNode
}
const Masonry = <TElement extends Element = HTMLElement>(props: MasonryProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useMasonryStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const isOrientationBlock = ((orientationVariant.class || defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
        // refs:
        elmRef,
    ...restContentProps} = props;
    
    
    
    // refs:
    const masonryRefInternal = useRef<TElement|null>(null);
    const mergedElmRef       = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        masonryRefInternal,
    );
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restContentProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // semantics:
            aria-orientation={props['aria-orientation'] ?? (isOrientationBlock ? 'vertical' : 'horizontal')}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Masonry,
    Masonry as default,
}

export type { OrientationName, OrientationVariant }
