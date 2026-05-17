'use client';

/**
 * Port of `@gtibrett/mui-additions/next/LinkBehavior`. Lets MUI's Link
 * (used internally by ThemeProvider via theme.components.MuiLink.
 * defaultProps.component) defer to next/link for client-side routing.
 *
 * Removed alongside the rest of the MUI theme in M12.
 */
import NextLink from 'next/link';
import {forwardRef} from 'react';

const LinkBehavior = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof NextLink>>(
	function LinkBehavior(props, ref) {
		return <NextLink ref={ref} {...props}/>;
	}
);

export default LinkBehavior;
