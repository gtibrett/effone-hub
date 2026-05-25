'use client';

import {Link} from '@mui/material';
import {MouseEventHandler, PropsWithChildren} from 'react';

/**
 * Local fork of `SkipNav` from @gtibrett/mui-additions. Forked so the
 * background color flips with the OS scheme via the Tailwind
 * `--color-background-paper` token; the upstream component piped the value
 * through MUI's `alpha()`, whose `decomposeColor` throws on var() inputs.
 *
 * `sr-only` + `focus:not-sr-only` is Tailwind's visually-hidden /
 * skip-link idiom — keyboard-focuses the link without showing it to
 * sighted users until focus arrives.
 *
 * Track upstream fix in @gtibrett/mui-additions, then re-import from
 * the package and delete this file.
 */
export type SkipNavProps = PropsWithChildren<{
	selector: Parameters<typeof document.querySelector>[0]
}>;

export default function SkipNav({children = 'Skip navigation', selector}: SkipNavProps) {
	const handleSkip: MouseEventHandler<HTMLAnchorElement> = (ev) => {
		ev.preventDefault();
		ev.currentTarget.blur();

		const skipTo = document.querySelector<HTMLElement>(selector);
		skipTo?.focus();
	};

	return (
		<Link
			tabIndex={0}
			className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:right-0 focus:p-5 focus:text-center focus:z-[1051] focus:bg-background-paper/10"
			onClick={handleSkip}
			href="#"
		>
			{children}
		</Link>
	);
}
