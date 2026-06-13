'use client';

import type { MouseEventHandler, PropsWithChildren } from 'react';
import { Link } from '@mui/material';

export type SkipNavProps = PropsWithChildren<{
	selector: Parameters<typeof document.querySelector>[0];
}>;

export default function SkipNav({ children = 'Skip navigation', selector }: SkipNavProps) {
	const handleSkip: MouseEventHandler<HTMLAnchorElement> = ev => {
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
