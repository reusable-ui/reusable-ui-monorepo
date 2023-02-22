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

// reusable-ui components:
import {
    // react components:
    Indicator,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // react components:
    ActionControl,
}                           from '@reusable-ui/action-control'  // a base component
import {
    // hooks:
    SemanticButtonProps,
    useSemanticButton,
}                           from '@reusable-ui/button'          // a button component



// defaults:
const _defaultItemActionCtrl           : boolean            = false



// styles:
export const useListItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listItemStyles.js')
, { id: '2vajf0sgc2' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names

export const useListActionItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/listActionItemStyles.js')
, { id: '1jdx2owh1e' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface ListItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        SemanticButtonProps<TElement>
{
    // accessibilities:
    // change default value to `true`
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `active` from `List`.  
     * `false`     : independent `active`.
     */
    inheritActive ?: boolean
    
    
    
    // behaviors:
    actionCtrl    ?: boolean
    
    
    
    // children:
    children      ?: React.ReactNode
}
export const ListItem = <TElement extends Element = HTMLElement>(props: ListItemProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet           = useListItemStyleSheet();
    const actionStyleSheet     = useListActionItemStyleSheet();
    
    
    
    // rest props:
    const {
        // behaviors:
        actionCtrl = _defaultItemActionCtrl,
    ...restActionControlProps} = props;
    
    
    
    // fn props:
    const {
        semanticTag  : buttonSemanticTag,
        semanticRole : buttonSemanticRole,
        
        tag  : buttonTag,
        role : buttonRole,
        isSemanticButton,
        
        type : buttonType,
    } = useSemanticButton(props);
    
    /*
        if not [actionCtrl] => use props's semantic(Tag|Role)
        if  is [actionCtrl] => use props's semantic(Tag|Role) ?? use <Button>'s semantic(Tag|Role)
    */
    const semanticTag     = !actionCtrl ? props.semanticTag  : (props.semanticTag  ?? buttonSemanticTag );
    const semanticRole    = !actionCtrl ? props.semanticRole : (props.semanticRole ?? buttonSemanticRole);
    
    /*
        if not [actionCtrl] => use props's (tag|role|type)
        if  is [actionCtrl] => use props's (tag|role|type) ?? (
            if not [defaulting to <button>] => use <button>'s (tag|role|type)
            if  is [defaulting to <button>] => use props's (tag|role|type) ?? replace <button> with <div role='button' type={props.type}>
        )
    */
    const isDefaultButton = isSemanticButton && (props.tag === undefined); // determines if the [tag] was defaulting to <button>
    const tag             = !actionCtrl ? props.tag          : (!isDefaultButton ? buttonTag  : (props.tag  ??                'div'     ));
    const role            = !actionCtrl ? props.role         : (!isDefaultButton ? buttonRole : (props.role ?? (buttonRole || 'button' )));
    const type            = !actionCtrl ? props.type         : (!isDefaultButton ? buttonType : (props.type ??                undefined ));
    
    
    
    // jsx:
    return (
        actionCtrl
        ?
        <ActionControl<TElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            
            
            // variants:
            mild={props.mild ?? 'inherit'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? [styleSheet.main, actionStyleSheet.main].join(' ')}
            
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            
            
            
            // Button props:
            {...{
                // actions:
                type,
            }}
        />
        :
        <Indicator<TElement>
            // other props:
            {...restActionControlProps}
            
            
            
            // semantics:
            semanticTag  = {semanticTag }
            semanticRole = {semanticRole}
            tag          = {tag}
            role         = {role}
            
            
            
            // variants:
            mild={props.mild ?? 'inherit'}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            
            
            
            // accessibilities:
            inheritActive={props.inheritActive ?? true} // change default value to `true`
        />
    );
};



export interface ListItemComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    listItemComponent ?: React.ReactComponentElement<any, ListItemProps<TElement>>
}
