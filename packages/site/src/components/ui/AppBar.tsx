'use client';

import {ElementType, HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type AppBarProps = HTMLAttributes<HTMLElement> & {
	position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
	color?:    string;
	component?: ElementType;
	sx?:       unknown;
	children?: ReactNode;
};

const POSITION: Record<string, string> = {
	fixed:    'fixed top-0 left-0 right-0',
	absolute: 'absolute top-0 left-0 right-0',
	sticky:   'sticky top-0',
	static:   'static',
	relative: 'relative'
};

const AppBar = forwardRef<HTMLElement, AppBarProps>(function AppBar(
	{position = 'fixed', color: _c, component, sx: _sx, className, children, ...rest},
	ref
) {
	const Tag = (component ?? 'header') as ElementType;
	return (
		<Tag
			ref={ref as never}
			className={cn(
				'w-full bg-primary text-primary-foreground shadow z-10',
				POSITION[position] ?? '',
				className
			)}
			{...rest}
		>
			{children}
		</Tag>
	);
});

export default AppBar;

export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
	variant?: 'regular' | 'dense';
	disableGutters?: boolean;
	sx?:      unknown;
};

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
	{variant = 'regular', disableGutters, sx: _sx, className, children, ...rest},
	ref
) {
	return (
		<div
			ref={ref}
			className={cn(
				'flex items-center',
				variant === 'dense' ? 'min-h-12' : 'min-h-16',
				!disableGutters && 'px-4 sm:px-6',
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
});
