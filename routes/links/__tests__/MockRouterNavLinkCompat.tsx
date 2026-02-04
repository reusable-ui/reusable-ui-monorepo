import {
    // React:
    default as React,
} from 'react'
import { RouterNavLinkCompatProps, RouterNavLinkCompat } from '@reusable-ui/router-link-compat'



export const MockRouterNavLinkCompat = (props: RouterNavLinkCompatProps) => {
    return (
        <div
            data-mock='RouterNavLinkCompat'
            data-anchorless={String(props.anchorless ?? false)}
            data-passhref={String(props.passHref ?? false)}
        >
            <RouterNavLinkCompat {...props} />
        </div>
    )
};
