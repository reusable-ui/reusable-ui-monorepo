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

// other libs:
import {
    Pathname,
    To,
    parsePath,
}                           from 'history'



// utilities:

/* forked from react-router v6 */

/**
 * Returns a resolved path relative to the given `fromPathname`.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/resolve-path
 */
export const resolvePath  = (to: To, fromPathname : Pathname = '/'): Pathname => {
    const {
        pathname : toPathname,
    } = (typeof(to) === 'string') ? parsePath(to) : to;
    
    
    
    const pathname : Pathname = (
        toPathname
        ?
        (
            toPathname.startsWith('/')
            ?
            toPathname                                    // absolute path, eg:   /shoes/foo
            :
            resolveRelativePath(fromPathname, toPathname) // relative path, eg:   ../shoes/foo
        )
        :
        fromPathname
    );
    
    return pathname;
};

const resolveRelativePath = (fromPathname: Pathname, relativePath: Pathname): Pathname => {
    const segments = (
        fromPathname
        .replace(/\/+$/, '') // remove the last /   =>   /products/foo/  =>   /products/foo
        .split('/')          // split by /          =>   /products/foo   =>   ['', 'products', 'foo']
    );
    const relativeSegments = relativePath.split('/');
    
    
    
    for (const relativeSegment of relativeSegments) {
        switch (relativeSegment) {
            case '.': // . => current
                /* nothing to do */
                break;
            
            case '..': // .. => move up
                if (segments.length > 1) { // keep the root '' segment so the pathname starts at / when `join('/')`ed
                    segments.pop();        // .. => move up => remove the last segment
                } // if
                break;
            
            default:
                segments.push(relativeSegment); // add a new segment to the last
                break;
        } // switch
    } // for
    
    
    
    // merge the segment(s) to a final absolute pathName:
    if (segments.length > 1) return segments.join('/');
    return '/';
};



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
