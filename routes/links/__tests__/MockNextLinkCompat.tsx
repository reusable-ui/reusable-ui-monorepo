import {
    // React:
    default as React,
} from 'react'
import { type NextLinkCompatProps, NextLinkCompat } from '@reusable-ui/next-link-compat'



export const MockNextLinkCompat = (props: NextLinkCompatProps) => {
    return (
        <div
            data-mock='NextLinkCompat'
            data-anchorless={String(props.anchorless ?? false)}
            data-passhref={String(props.passHref ?? false)}
        >
            <NextLinkCompat {...props} />
        </div>
    )
};
