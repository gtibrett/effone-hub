'use client';

/**
 * Drop-in replacement for `@mui/material/Paper`. Renders a div with the
 * card-like background + border-radius the rest of the UI already uses
 * via the shadcn Card token. `elevation` is dropped (no shadow in this
 * design system); `variant="outlined"` adds a border to match.
 */
import {HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type PaperProps = HTMLAttributes<HTMLDivElement> & {
	variant?:   'elevation' | 'outlined';
	elevation?: number;
	square?:    boolean;
	sx?:        unknown;
	children?:  ReactNode;
};

const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
	{variant = 'elevation', elevation: _e, square, sx: _sx, className, children, ...rest},
	ref
) {
	return (
		<div
			ref={ref}
			className={cn(
				'bg-card text-card-foreground',
				!square && 'rounded-md',
				variant === 'outlined' && 'border',
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
});

export default Paper;
