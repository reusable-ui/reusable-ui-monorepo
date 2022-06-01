import { default as React } from 'react';
import { LinkProps as BaseLinkProps } from 'react-router-dom';
export interface LinkProps extends BaseLinkProps {
    component?: React.ReactElement;
    passHref?: boolean;
}
/**
 * The public API for rendering a history-aware <a>.
 *
 * @see https://reactrouter.com/docs/en/v6/components/link
 */
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export { Link, Link as default, };
