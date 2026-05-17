'use client';

/**
 * Port of `@gtibrett/mui-additions/SkipNav`. Visually-hidden link that
 * becomes a focusable "skip to content" affordance for keyboard users.
 * Uses the WCAG-standard sr-only pattern: invisible until :focus, then
 * floats to the top of the viewport.
 */
import {MouseEvent, PropsWithChildren} from 'react';

type SkipNavProps = {
	selector: string;
};

export default function SkipNav({children = 'Skip navigation', selector}: PropsWithChildren<SkipNavProps>) {
	const handleSkip = (ev: MouseEvent<HTMLAnchorElement>) => {
		ev.preventDefault();
		ev.currentTarget.blur();
		const skipTo = document.querySelector<HTMLElement>(selector);
		skipTo?.focus();
	};

	return (
		<a
			tabIndex={0}
			href="#"
			onClick={handleSkip}
			className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:right-0 focus:z-50 focus:bg-background/90 focus:p-5 focus:text-center"
		>
			{children}
		</a>
	);
}
