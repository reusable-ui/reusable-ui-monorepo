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
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // basic variants of UI:
    useBasicVariantProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a base component
import type {
    BasicProps,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import {
    // states:
    TabExpandedChangeEvent,
    
    
    
    // react components:
    TabStateProps,
    TabStateProvider,
}                           from './states/tabState.js'
import {
    // react components:
    TabHeaderProps,
    TabHeader,
}                           from './TabHeader.js'
import {
    // react components:
    TabBodyProps,
    TabBody,
}                           from './TabBody.js'



// styles:
export const useTabStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'g7mp3ol8df' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface TabProps<TElement extends Element = HTMLElement, TTabExpandedChangeEvent extends TabExpandedChangeEvent = TabExpandedChangeEvent>
    extends
        // bases:
        Omit<GenericProps<TElement>,            // the *wrapper* component made from <Generic<TElement> >
            // refs:
            |'elmRef'                           // the elmRef is moved to <TabHeader>
            
            // values:
            |'defaultValue'                     // not supported
            |'value'                            // not supported
            |'onChange'                         // not supported
            
            // formats:
            |'autoCapitalize'                   // not supported
            
            // children:
            |'children'                         // aliased `children` to `tabPanels`
            |'dangerouslySetInnerHTML'          // not supported
        >,
        Omit<TabHeaderProps<Element>,           // the *main* component made from <List<Element> >
            // <Generic>:
            |keyof Omit<GenericProps<TElement>,
                // refs:
                |'elmRef'                       // the elmRef is moved to <TabHeader>
                
                // children:
                |'children'                     // aliased `children` to `tabPanels`
                |'dangerouslySetInnerHTML'      // not supported
            >
        >,
        Omit<TabBodyProps<Element>,             // the *complement* component made from <Content<Element> >
            |keyof BasicProps<Element>
        >,
        
        // states:
        Omit<TabStateProps<TTabExpandedChangeEvent>,
            // data:
            |'tabPanels'                        // already aliased by `children`
            |'tabId'                            // already aliased by `id`
        >
{
    // components:
    /**
     * @deprecated Renamed to `headerComponent`.
     */
    tabHeaderComponent ?: React.ReactComponentElement<any, TabHeaderProps<Element>>|null
    headerComponent    ?: React.ReactComponentElement<any, TabHeaderProps<Element>>|null
    
    
    
    // children:
    children            : TabStateProps<TTabExpandedChangeEvent>['tabPanels']
}
const Tab = <TElement extends Element = HTMLElement, TTabExpandedChangeEvent extends TabExpandedChangeEvent = TabExpandedChangeEvent>(props: TabProps<TElement, TTabExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styles = useTabStyleSheet();
    
    
    
    // identifiers:
    const defaultId = useId();
    
    
    
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // rest props:
    const {
        // refs:
        elmRef,
        outerRef,
        
        
        
        // identifiers:
        id = defaultId,
        
        
        
        // variants:
        size     : _size,               // remove
        theme    : _theme,              // remove
        gradient : _gradient,           // remove
        outlined : _outlined,           // remove
        mild     : _mild,               // remove
        
        orientation,
        listStyle,
        tabPanelStyle,
        
        
        
        // accessibilities:
        label,
        
        
        
        // behaviors:
        lazy,
        actionCtrl,
        
        
        
        // states:
        enabled,
        inheritEnabled,
        active,
        inheritActive,
        readOnly,
        inheritReadOnly,
        
        children : tabPanels,
        defaultExpandedTabIndex,
        expandedTabIndex,
        onExpandedChange,
        
        
        
        // components:
        // @ts-ignore
        tabHeaderComponent,
        headerComponent = tabHeaderComponent ?? (<TabHeader<Element> /> as React.ReactComponentElement<any, TabHeaderProps<Element> >),
        listComponent,
        listItemComponent,
        bodyComponent,
    ...restGenericProps} = props;
    
    
    
    // jsx:
    return (
        /* the *wrapper* component made from <Generic<TElement> > */
        <Generic<TElement>
            // other props:
            {...restGenericProps}
            
            
            
            // refs:
            outerRef={outerRef}
            
            
            
            // identifiers:
            id={id}
            
            
            
            // semantics:
            tag={props.tag ?? 'div'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styles.main}
        >
            <TabStateProvider<TTabExpandedChangeEvent>
                // behaviors:
                lazy={lazy}
                
                
                
                // states:
                defaultExpandedTabIndex={defaultExpandedTabIndex}
                expandedTabIndex={expandedTabIndex}
                onExpandedChange={onExpandedChange}
                
                
                
                // data:
                tabPanels={tabPanels}
                tabId={id}
                tabPanelStyle={tabPanelStyle}
            >
                {/* the *main* component made from <List<Element> > */}
                {/* <TabHeader<Element>> */}
                {(headerComponent !== null) && React.cloneElement<TabHeaderProps<Element>>(headerComponent,
                    // props:
                    {
                        // refs:
                        elmRef            : headerComponent.props.elmRef            ?? elmRef,
                        
                        
                        
                        // variants:
                        ...basicVariantProps,
                        
                        orientation       : headerComponent.props.orientation       ?? orientation,
                        listStyle         : headerComponent.props.listStyle         ?? listStyle,
                        
                        
                        
                        // accessibilities:
                        label             : headerComponent.props.label             ?? label,
                        
                        
                        
                        // behaviors:
                        actionCtrl        : headerComponent.props.actionCtrl        ?? actionCtrl,
                        
                        
                        
                        // states:
                        enabled           : headerComponent.props.enabled           ?? enabled,
                        inheritEnabled    : headerComponent.props.inheritEnabled    ?? inheritEnabled,
                        active            : headerComponent.props.active            ?? active,
                        inheritActive     : headerComponent.props.inheritActive     ?? inheritActive,
                        readOnly          : headerComponent.props.readOnly          ?? readOnly,
                        inheritReadOnly   : headerComponent.props.inheritReadOnly   ?? inheritReadOnly,
                        
                        
                        
                        // components:
                        listComponent     : headerComponent.props.listComponent     ?? listComponent,
                        listItemComponent : headerComponent.props.listItemComponent ?? listItemComponent,
                    },
                )}
                
                {/* the *complement* component made from <Content<Element> > */}
                <TabBody<Element>
                    // variants:
                    {...basicVariantProps}
                    
                    
                    
                    // components:
                    bodyComponent={bodyComponent}
                />
            </TabStateProvider>
        </Generic>
    );
};
export {
    Tab,
    Tab as default,
}
