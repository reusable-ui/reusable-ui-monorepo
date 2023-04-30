// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useId,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheets,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    useMergeStyles,
    
    
    
    // a semantic management system for react web components:
    SemanticTag,
    SemanticRole,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
    useCollapsible,
    useLastKnownExpandedSize,
    ToggleCollapsibleProps,
    useToggleCollapsible,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ActiveChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    BasicProps,
    Basic,
}                           from '@reusable-ui/basic'           // a base component
import {
    // react components:
    ButtonProps,
    Button,
    
    ButtonComponentProps,
}                           from '@reusable-ui/button'          // a button component for initiating an action
import {
    ToggleButtonProps,
    ToggleButton,
    
    ToggleButtonComponentProps,
}                           from '@reusable-ui/toggle-button'   // a button with toggleable active state

// internals:
import {
    // variants:
    DetailsVariant,
    useDetailsVariant,
}                           from './variants/DetailsVariant.js'



// defaults:
const _defaultSemanticTag         : SemanticTag  = ''      // no corresponding semantic tag => defaults to <div>
const _defaultSemanticRole        : SemanticRole = 'group' // uses [role="group"] as the default semantic

const _defaultTogglerSemanticTag  : SemanticTag  = [null, 'button', 'a'   ] // no corresponding semantic tag => defaults to <div>, fallbacks to <button>, <a>
const _defaultTogglerSemanticRole : SemanticRole = [      'button', 'link'] // uses [role="button"] as the default semantic      , fallbacks to [role="link"]



// styles:
export const useDetailsStyleSheet = dynamicStyleSheets(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: '8sv7el5gq9' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface DetailsProps<TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>
    extends
        // bases:
        BasicProps<TElement>,
        
        // states:
        ToggleCollapsibleProps<TExpandedChangeEvent>, // implements `onExpandedChange` & `defaultExpanded` (implements controllable & uncontrollable)
        
        // components:
        ButtonComponentProps,
        ToggleButtonComponentProps,
        
        // variants:
        DetailsVariant
{
    // accessibilities:
    label            ?: React.ReactNode
    
    
    
    // behaviors:
    lazy             ?: boolean
    
    
    
    // components:
    /**
     * @deprecated renamed to `bodyComponent`
     */
    contentComponent ?: React.ReactComponentElement<any, BasicProps<Element>>
    bodyComponent    ?: React.ReactComponentElement<any, BasicProps<Element>>
    
    
    
    // children:
    children         ?: React.ReactNode
}
const Details = <TElement extends Element = HTMLElement, TExpandedChangeEvent extends ExpandedChangeEvent = ExpandedChangeEvent>(props: DetailsProps<TElement, TExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet          = useDetailsStyleSheet();
    
    
    
    // variants:
    const detailsVariant      = useDetailsVariant(props);
    
    
    
    // basic variant props:
    const {
        mild = true, // set the default [mild] to true
    ...restBasicVariantProps} = useBasicVariantProps(props);
    const basicVariantProps = {
        ...restBasicVariantProps,
        mild,
    };
    
    
    
    // rest props:
    const {
        // variants:
        detailsStyle : _detailsStyle, // remove
        
        
        
        // accessibilities:
        label,
        
        
        
        // behaviors:
        lazy       = false,
        
        
        
        // states:
        defaultExpanded,  // take, to be handled by `useToggleCollapsible`
        expanded,         // take, to be handled by `useToggleCollapsible`
        onExpandedChange, // take, to be handled by `useToggleCollapsible`
        
        
        
        // components:
        buttonRef,
        buttonOrientation,
        buttonStyle,
        buttonComponent       = (<Button         /> as React.ReactComponentElement<any, ButtonProps>),
        buttonChildren,
        
        toggleButtonComponent = (<ToggleButton   /> as React.ReactComponentElement<any, ToggleButtonProps>),
        
        // @ts-ignore
        contentComponent,
        bodyComponent         = // @ts-ignore
                                contentComponent
                                ??
                                (<Basic<Element> /> as React.ReactComponentElement<any, BasicProps<Element>>),
        
        
        
        // children:
        children,
    ...restBasicProps} = props;
    
    
    
    // identifiers:
    const defaultId     = useId();
    const collapsibleId = bodyComponent.props.id ?? defaultId;
    
    
    
    // states:
    const [isExpanded, setExpanded] = useToggleCollapsible<TExpandedChangeEvent>({
        defaultExpanded,
        expanded,
        // onExpandedChange, // trigger manually `onExpandedChange`, not to passed here to avoid double trigger of `onExpandedChange`
    });
    
    const collapsibleState      = useCollapsible<Element, TExpandedChangeEvent>({ expanded: isExpanded });
    const isVisible             = collapsibleState.isVisible; // visible = showing, shown, hidding ; !visible = hidden
    const lastKnownExpandedSize = useLastKnownExpandedSize<Element>(collapsibleState);
    
    
    
    // refs:
    const mergedButtonRef    = useMergeRefs(
        // preserves the original `elmRef` from `buttonComponent`:
        buttonComponent.props.elmRef,
        
        
        
        // preserves the original `buttonRef` from `props`:
        buttonRef,
    );
    const mergedBodyOuterRef = useMergeRefs<Element>(
        // preserves the original `outerRef` from `bodyComponent`:
        bodyComponent.props.outerRef,
        
        
        
        lastKnownExpandedSize.setRef,
    );
    
    
    
    // classes:
    const variantClasses      = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        detailsVariant.class,
    );
    
    const toggleButtonClasses = useMergeClasses(
        // preserves the original `classes` from `toggleButtonComponent`:
        toggleButtonComponent.props.classes,
        
        
        
        // classes:
        styleSheet.toggler,
        
        
        
        // hacks:
        ((!isExpanded || null) && 'last-visible-child'),
    );
    
    const bodyStateClasses    = useMergeClasses(
        // preserves the original `stateClasses` from `bodyComponent`:
        bodyComponent.props.stateClasses,
        
        
        
        // states:
        collapsibleState.class,
    );
    const bodyClasses         = useMergeClasses(
        // preserves the original `classes` from `bodyComponent`:
        bodyComponent.props.classes,
        
        
        
        // classes:
        styleSheet.body,
    );
    
    
    
    // styles:
    const mergedBodyStyle    = useMergeStyles(
        // styles:
        lastKnownExpandedSize.style,
        
        
        
        // preserves the original `style` from `bodyComponent` (can overwrite the `lastKnownExpandedSize.style`):
        bodyComponent.props.style,
    );
    
    
    
    // handlers:
    const handleExpandedChangeInternal       = useEvent<EventHandler<TExpandedChangeEvent>>((event) => {
        setExpanded(event.expanded);
    });
    const handleExpandedChangeByToggleButton = useEvent<EventHandler<ActiveChangeEvent>>((event) => {
        // create an expanded event:
        const expandedChangeEvent = { expanded: event.active } as TExpandedChangeEvent;
        
        
        
        // <ToggleButton> expanded/collapsed => request to show/hide the <DetailsBody>:
        onExpandedChange?.(expandedChangeEvent); // request to change the [expanded] to <Parent>
        
        
        
        // actions:
        handleExpandedChangeInternal(expandedChangeEvent);
    });
    const handleToggleButtonActiveChange     = useMergeEvents(
        // preserves the original `onActiveChange` from `toggleButtonComponent`:
        toggleButtonComponent.props.onActiveChange,
        
        
        
        // forwards the original `onExpandedChange` from `props`:
        handleExpandedChangeByToggleButton,
    );
    
    const handleBodyAnimationStart           = useMergeEvents(
        // preserves the original `onAnimationStart` from `bodyComponent`:
        bodyComponent.props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleBodyAnimationEnd             = useMergeEvents(
        // preserves the original `onAnimationEnd` from `bodyComponent`:
        bodyComponent.props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    
    
    // jsx:
    return (
        <Basic<TElement>
            // other props:
            {...restBasicProps}
            
            
            
            // semantics:
            semanticTag  = {props.semanticTag  ?? _defaultSemanticTag }
            semanticRole = {props.semanticRole ?? _defaultSemanticRole}
            
            
            
            // variants:
            mild={mild}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        >
            {/* <ToggleButton> */}
            {React.cloneElement<ToggleButtonProps>(toggleButtonComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...toggleButtonComponent.props,
                    
                    
                    
                    // semantics:
                    semanticTag     : toggleButtonComponent.props.semanticTag  ?? _defaultTogglerSemanticTag,
                    semanticRole    : toggleButtonComponent.props.semanticRole ?? _defaultTogglerSemanticRole,
                    'aria-controls' : toggleButtonComponent.props['aria-controls'] ?? collapsibleId,
                    
                    
                    
                    // classes:
                    classes         : toggleButtonClasses,
                    
                    
                    
                    // states:
                    active          : toggleButtonComponent.props.active ?? isExpanded,
                    onActiveChange  : handleToggleButtonActiveChange,
                    
                    
                    
                    /* <Button> */
                    buttonComponent : toggleButtonComponent.props.buttonComponent ?? React.cloneElement<ButtonProps>(buttonComponent,
                        // props:
                        {
                            // refs:
                            elmRef      : mergedButtonRef,
                            
                            
                            
                            // variants:
                            orientation : buttonComponent.props.orientation ?? buttonOrientation,
                            buttonStyle : buttonComponent.props.buttonStyle ?? buttonStyle,
                        },
                    ),
                },
                
                
                
                // children:
                buttonComponent.props.children ?? toggleButtonComponent.props.children ?? buttonChildren ?? label,
            )}
            
            
            
            {/* collapsible <Basic> */}
            {React.cloneElement<BasicProps<Element>>(bodyComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...bodyComponent.props,
                    
                    
                    
                    // refs:
                    outerRef         : mergedBodyOuterRef,
                    
                    
                    
                    // identifiers:
                    id               : collapsibleId,
                    
                    
                    
                    // classes:
                    stateClasses     : bodyStateClasses,
                    classes          : bodyClasses,
                    
                    
                    
                    // styles:
                    style            : mergedBodyStyle,
                    
                    
                    
                    // handlers:
                    onAnimationStart : handleBodyAnimationStart,
                    onAnimationEnd   : handleBodyAnimationEnd,
                },
                
                
                
                // children:
                bodyComponent.props.children ?? ((!lazy || isVisible) && children),
            )}
        </Basic>
    );
};
export {
    Details,
    Details as default,
}
