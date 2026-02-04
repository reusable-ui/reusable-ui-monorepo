import {
    // React:
    default as React,
} from 'react'
import { type RouterLinkCompatProps, RouterLinkCompat } from '@reusable-ui/router-link-compat'



export const MockRouterLinkCompat = (props: RouterLinkCompatProps) => {
    return (
        <div
            data-mock='RouterLinkCompat'
            data-anchorless={String(props.anchorless ?? false)}
            data-passhref={String(props.passHref ?? false)}
        >
            <RouterLinkCompat {...props} />
        </div>
    )
};
