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
    // a set of React node utility functions:
    isReusableUiComponent,
    
    
    
    // react helper hooks:
    useMergeClasses,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    GenericProps,
}                           from '@reusable-ui/generic'         // a generic component



// styles:
export const useGroupItemStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { specificityWeight: 2, id: 'd2scsx4yqe' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:
export interface GroupItemProps
{
    // components:
    elementComponent : React.ReactElement<any>
}
export const GroupItem = (props: GroupItemProps): JSX.Element => {
    // styles:
    const styleSheet = useGroupItemStyleSheet();
    
    
    
    // rest props:
    const {
        // components:
        elementComponent,
    ...restComponentProps} = props;
    
    
    
    // verifies:
    const isReusableUiGroupItemComponent : boolean = isReusableUiComponent<GenericProps<Element>>(elementComponent);
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes` from `elementComponent`:
        (
            isReusableUiGroupItemComponent
            ?
            (elementComponent.props as GenericProps<Element>).classes
            :
            ((elementComponent.props as React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>).className ?? '').split(' ')
        ),
        
        
        
        // styles:
        styleSheet.main,
    );
    
    
    
    // jsx:
    return React.cloneElement<any>(elementComponent,
        // props:
        {
            // other props:
            ...restComponentProps,
            
            
            
            // classes:
            ...(isReusableUiGroupItemComponent ? {
                classes   : classes,
            } : {
                className : classes.filter((c) => !!c).join(' '),
            }),
        },
    );
};
