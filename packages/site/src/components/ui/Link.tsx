'use client';

import NextLink, {type LinkProps as NextLinkProps} from 'next/link';
import {forwardRef, type AnchorHTMLAttributes, type MouseEventHandler} from 'react';
import {cn} from '@/lib/utils';

/**
 * App-wide Link component — wraps next/link and adds the MUI-style `color`
 * prop the existing consumers (`<Link color="secondary"/>`, ...) pass.
 *
 * Replaces the MUI <Link/> + `@gtibrett/mui-additions/Link` re-export so M9
 * can drop the mui-additions dep. External links (absolute URL, `mailto:`,
 * `tel:`, or explicit `external` prop) render a plain <a/> with
 * `target=_blank rel=noopener noreferrer`; everything else goes through
 * Next's client-side router via NextLink.
 */
export type LinkColor =
	| 'inherit'
	| 'primary'
	| 'secondary'
	| 'textPrimary'
	| 'textSecondary'
	| 'error';

type AnchorOnlyProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'color' | 'href' | 'onClick'
>;

export type LinkProps = AnchorOnlyProps &
	Partial<Pick<NextLinkProps, 'prefetch' | 'replace' | 'scroll'>> & {
		href:      NextLinkProps['href'] | undefined;
		color?:    LinkColor;
		external?: boolean;
		onClick?:  MouseEventHandler<HTMLAnchorElement>;
	};

const COLOR_CLASS: Record<LinkColor, string> = {
	inherit:       'text-inherit',
	primary:       'text-primary',
	secondary:     'text-secondary',
	textPrimary:   'text-foreground',
	textSecondary: 'text-muted-foreground',
	error:         'text-destructive'
};

const BASE_CLASS = 'underline-offset-4 hover:underline cursor-pointer';

function isExternalHref(href: NextLinkProps['href'] | undefined, explicit?: boolean): boolean {
	if (explicit) return true;
	if (typeof href !== 'string') return false;
	return /^(https?:|mailto:|tel:|\/\/)/i.test(href);
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
	{color = 'secondary', external, className, href, children, prefetch, replace, scroll, ...rest},
	ref
) {
	const cls = cn(BASE_CLASS, COLOR_CLASS[color], className);

	// Render an anchor when the destination isn't routable via Next, or when
	// the consumer used Link purely for its onClick affordance (href="#").
	if (href === undefined || isExternalHref(href, external)) {
		const safeHref = typeof href === 'string' ? href : '#';
		const externalProps = isExternalHref(href, external)
			? {target: '_blank', rel: 'noopener noreferrer'}
			: {};
		return (
			<a ref={ref} href={safeHref} className={cls} {...externalProps} {...rest}>
				{children}
			</a>
		);
	}

	return (
		<NextLink
			ref={ref}
			href={href}
			className={cls}
			prefetch={prefetch}
			replace={replace}
			scroll={scroll}
			{...rest}
		>
			{children}
		</NextLink>
	);
});

export default Link;
