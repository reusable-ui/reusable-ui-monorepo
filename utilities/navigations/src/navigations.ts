// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useState,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useIsomorphicLayoutEffect,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // utilities:
    isClientSideLink,
}                           from '@reusable-ui/client-sides'    // a set of client-side functions

// other libs:
import {
    // types:
    Pathname,
    To,
    
    
    
    // utilities:
    parsePath,
}                           from 'history'                      // a helper lib



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
type ReactRouterModule  = typeof import('react-router')
type PartialReactRouterModule = Pick<ReactRouterModule, 'useInRouterContext'|'useResolvedPath'>
let reactRouterModule : PartialReactRouterModule|null|undefined = undefined;
(async () => {
    try {
        const { useInRouterContext, useResolvedPath } = await import(/* webpackChunkName: 'react-router' */ 'react-router');
        if (reactRouterModule === undefined) { // prevents conditionally run different hooks on re-render
            reactRouterModule = { useInRouterContext, useResolvedPath };
        } // if
    }
    catch {
        reactRouterModule = null;
    } // try
})();

export interface DetermineCurrentPageProps {
    // navigations:
    caseSensitive ?: boolean
    end           ?: boolean
    
    
    
    // children:
    children      ?: React.ReactNode
}
export const useDetermineCurrentPage = (props: DetermineCurrentPageProps): boolean|undefined => {
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
    
    
    
    // let currentPathname = useLocation().pathname;               // only works in react-router
    let currentPathname = globalThis?.location?.pathname ?? '';    // works both in react-router & nextjs
    if (reactRouterModule === undefined) reactRouterModule = null; // prevents conditionally run different hooks on re-render
    let targetPathname  = (
        (
            reactRouterModule
            &&
            (reactRouterModule.useInRouterContext() || undefined)
            &&
            reactRouterModule.useResolvedPath(to).pathname
        )
        ??
        resolvePath(to, currentPathname)
    );
    
    
    
    /* conditionally return AFTER hooks - it's safe */
    if (!loaded) return undefined; // always return `undefined` on the first render
    
    
    
    const {
        // navigations:
        caseSensitive = false,
        end           = (targetPathname === '/'), // the default for home page is always exact match, otherwise sub match
    } = props;
    
    
    
    if (!caseSensitive) {
        currentPathname = currentPathname.toLowerCase();
        targetPathname  = targetPathname.toLowerCase();
    } // if
    
    
    
    return (
        (currentPathname === targetPathname) // exact match
        ||
        (
            !end // sub match
            &&
            (
                currentPathname.startsWith(targetPathname)
                &&
                (currentPathname.charAt(targetPathname.length) === '/') // sub segment
            )
        )
    );
};
