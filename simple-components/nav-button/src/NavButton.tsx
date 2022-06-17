// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useIsomorphicLayoutEffect,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // hooks:
    isClientSideLink,
}                           from '@reusable-ui/action-control'  // a base component
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
import {
    // tests:
    isBrowser,
    isJsDom,
}                           from 'is-in-browser'



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



// hooks:
export interface CurrentActiveProps {
    // nav matches:
    caseSensitive ?: boolean
    end           ?: boolean
    
    
    
    // children:
    children      ?: React.ReactNode
}
export const useCurrentActive = (props: CurrentActiveProps): boolean|undefined => {
    /* server side rendering support */
    /* always return `undefined` on the first render */
    /* so the DOM is __always_the_same__ at the server side & client side */
    const [loaded, setLoaded] = useState(false);
    useIsomorphicLayoutEffect(() => {
        // setups:
        setLoaded(true); // trigger to re-render
    }, []); // runs once on startup
    
    
    
    /* conditionally return - ALWAYS return on server side - NEVER return on client side - it's safe */
    if (typeof(globalThis.location) === 'undefined') return undefined; // server side rendering => not supported yet
    
    
    
    const to = ((): To|undefined => {
        const childProps = React.Children.toArray(props.children).find(isClientSideLink)?.props;
        if (childProps) return childProps.to ?? childProps.href;
        return undefined;
    })();
    /* conditionally return - ASSUMES the children are never changed - ALWAYS return the same - it's 99% safe */
    if (to === undefined) return undefined; // client side <Link> does not exist
    
    
    
    // let currentPathname = useLocation().pathname;            // only works in react-router
    let currentPathname = globalThis?.location?.pathname ?? ''; // works both in react-router & nextjs
    let targetPathname = _useInRouterContext() ? _useResolvedPath(to).pathname : resolvePath(to, currentPathname);
    
    
    
    /* conditionally return AFTER hooks - it's safe */
    if (!loaded) return undefined; // always return `undefined` on the first render
    
    
    
    if (!(props.caseSensitive ?? false)) {
        currentPathname = currentPathname.toLocaleLowerCase();
        targetPathname  = targetPathname.toLocaleLowerCase();
    } // if
    
    
    
    return (
        (currentPathname === targetPathname) // exact match
        ||
        (
            !(
                // user defined:
                props.end
                ??
                // default:
                (targetPathname === '/') // for home page always exact match, otherwise sub match
            ) // sub match
            &&
            (
                currentPathname.startsWith(targetPathname)
                &&
                (currentPathname.charAt(targetPathname.length) === '/') // sub segment
            )
        )
    );
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
