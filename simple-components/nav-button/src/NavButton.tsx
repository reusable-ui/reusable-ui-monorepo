// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // react components:
    ButtonProps,
    Button,
}                           from '@reusable-ui/button'          // a base component



// react components:
export interface NavButtonProps
    extends
        // bases:
        ButtonProps
{
}
const NavButton = (props: NavButtonProps): JSX.Element|null => {
    // rest props:
    const {
        // remove props:
    ...restButtonProps} = props;
    
    
    
    // jsx:
    return (
        <Button
            // other props:
            {...restButtonProps}
        />
    );
};
export {
    NavButton,
    NavButton as default,
}
