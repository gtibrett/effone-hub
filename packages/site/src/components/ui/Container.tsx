'use client';

import {ElementType, HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
	maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	fixed?:    boolean;
	disableGutters?: boolean;
	component?: ElementType;
	sx?:       unknown;
	children?: ReactNode;
};

const MAX_WIDTH = {
	xs: 'max-w-screen-sm',
	sm: 'max-w-screen-md',
	md: 'max-w-screen-lg',
	lg: 'max-w-screen-xl',
	xl: 'max-w-screen-2xl'
} as const;

const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
	{maxWidth = 'lg', fixed: _f, disableGutters, component, sx: _sx, className, children, ...rest},
	ref
) {
	const Tag = (component ?? 'div') as ElementType;
	return (
		<Tag
			ref={ref as never}
			className={cn(
				'mx-auto w-full',
				maxWidth && MAX_WIDTH[maxWidth as keyof typeof MAX_WIDTH],
				!disableGutters && 'px-4 sm:px-6',
				className
			)}
			{...rest}
		>
			{children}
		</Tag>
	);
});

export default Container;
