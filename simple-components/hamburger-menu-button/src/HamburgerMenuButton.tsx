// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useEvent,
    useMergeEvents,
}                           from '@reusable-ui/hooks'           // react helper hooks
export type {
    // hooks:
    OrientationName,
    OrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // hooks:
    ToggleActiveProps,
    useToggleActive,
}                           from '@reusable-ui/indicator'       // a base component
export {
    // hooks:
    ButtonStyle,
    ButtonVariant,
    ButtonType,
}                           from '@reusable-ui/button'          // a base component
import {
    // react components:
    ToggleButtonProps,
    ToggleButton,
}                           from '@reusable-ui/toggle-button'   // a base component



// react components:
export interface HamburgerMenuButtonProps
    extends
        // bases:
        ToggleButtonProps
{
}
const HamburgerMenuButton = (props: HamburgerMenuButtonProps): JSX.Element|null => {
    // jsx:
    return (
        <ToggleButton
            // other props:
            {...props}
        />
    );
};
export {
    HamburgerMenuButton,
    HamburgerMenuButton as default,
}
