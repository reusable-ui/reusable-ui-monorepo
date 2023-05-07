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
    // react helper hooks:
    useMergeEvents,
    useMergeClasses,
    
    
    
    // a semantic management system for react web components:
    SemanticTag,
    SemanticRole,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import {
    // react components:
    IndicatorProps,
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'
import {
    // variants:
    CardVariant,
    useCardVariant,
}                           from './variants/CardVariant.js'



// defaults:
const _defaultSemanticTag        : SemanticTag  = 'article' // uses <article>        as the default semantic tag
const _defaultSemanticRole       : SemanticRole = 'article' // uses [role="article"] as the default semantic role

const _defaultHeaderSemanticTag  : SemanticTag  = 'header'  // uses <header>         as the default semantic tag
const _defaultHeaderSemanticRole : SemanticRole = 'header'  // uses [role="header"]  as the default semantic role

const _defaultFooterSemanticTag  : SemanticTag  = 'footer'  // uses <footer>         as the default semantic tag
const _defaultFooterSemanticRole : SemanticRole = 'footer'  // uses [role="footer"]  as the default semantic role

const _defaultBodySemanticTag    : SemanticTag  = ''        // no corresponding semantic tag => defaults to <div>
const _defaultBodySemanticRole   : SemanticRole = ''        // no corresponding semantic role => defaults to presentation/none



// styles:
export const useCardStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'wfc3nwgtcn' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// handlers:
export const handleAnimationEndForward : React.AnimationEventHandler<Element> = (event) => {
    /**
     * because the `usesCardLayout` is neither inherit from `usesIndicatorLayout` nor applies `anim: ...`,
     * so the `onAnimationEnd` will __never__ triggered directly (non_bubbled).
     * 
     * the `useDisableable() => handleAnimationEnd` only perform non_bubbled `onAnimationEnd`.
     * 
     * thus we need to trigger `onAnimationEnd` at <Card> level by forwarding `onAnimationEnd` bubbled from <CardHeader>|<CardBody>|<CardFooter>.
     * 
     * <Card>
     *     <Card(Header|Body|Footer) onAnimationEnd={...} />
     * </Card>
     */
    if ((event.target as Element)?.parentElement === event.currentTarget) {
        event.currentTarget.dispatchEvent(new AnimationEvent('animationend', { animationName: event.animationName, bubbles: true, composed: true }));
    } // if
};



// react components:
export interface CardItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        GenericProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >
{
    // children:
    children ?: React.ReactNode
}
export interface CardCaptionProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardItemProps<TElement>
{
}
export interface CardHeaderProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardCaptionProps<TElement>
{
}
export interface CardFooterProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardCaptionProps<TElement>
{
}
export interface CardBodyProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        CardItemProps<TElement>
{
}
export const CardHeader = <TElement extends Element = HTMLElement>(props: CardHeaderProps<TElement>): JSX.Element|null => {
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        'header',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultHeaderSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultHeaderSemanticRole}
            
            
            
            // classes:
            classes={classes}
        />
    );
};
export const CardFooter = <TElement extends Element = HTMLElement>(props: CardFooterProps<TElement>): JSX.Element|null => {
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        'footer',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultFooterSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultFooterSemanticRole}
            
            
            
            // classes:
            classes={classes}
        />
    );
};
export const CardBody   = <TElement extends Element = HTMLElement>(props: CardBodyProps<TElement>): JSX.Element|null => {
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes`:
        props.classes,
        
        
        
        // classes:
        'body',
    );
    
    
    
    // jsx:
    return (
        <Generic<TElement>
            // other props:
            {...props}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultBodySemanticTag }
            semanticRole = {props.semanticRole ?? _defaultBodySemanticRole}
            
            
            
            // classes:
            classes={classes}
        />
    );
};



export interface CardProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<IndicatorProps<TElement>,
            // variants:
            |'nude' // <Card> cannot be [nude]
        >,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        OrientationableProps,
        CardVariant
{
    // children:
    children ?: React.ReactNode
}
const Card = <TElement extends Element = HTMLElement>(props: CardProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useCardStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const cardVariant            = useCardVariant(props);
    
    
    
    // rest props:
    const {
        // variants:
        orientation : _orientation, // remove
        cardStyle   : _cardStyle,   // remove
    ...restIndicatorProps} = props;
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
        cardVariant.class,
    );
    
    
    
    // handlers:
    const handleAnimationEnd = useMergeEvents(
        // preserves the original `onAnimationEnd`:
        props.onAnimationEnd,
        
        
        
        // hack:
        handleAnimationEndForward,
    );
    
    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restIndicatorProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultSemanticRole}
            
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
            
            
            
            // handlers:
            onAnimationEnd={handleAnimationEnd}
        />
    );
};
export {
    Card,
    Card as default,
}



export interface CardComponentProps<TElement extends Element = HTMLElement>
{
    // refs:
    cardRef         ?: React.Ref<TElement> // setter ref
    
    
    
    // variants:
    cardOrientation ?: CardProps<TElement>['orientation']
    cardStyle       ?: CardProps<TElement>['cardStyle']
    
    
    
    // components:
    cardComponent   ?: React.ReactComponentElement<any, CardProps<TElement>>
    cardChildren    ?: CardProps<TElement>['children']
}
