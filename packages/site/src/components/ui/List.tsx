'use client';

/**
 * Drop-in for `@mui/material` List family. Renders semantic ul/li with
 * the small typographic + spacing defaults the about-page consumers
 * expect. ListItemText.primary/secondary become stacked text blocks.
 */
import {HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type ListProps = HTMLAttributes<HTMLUListElement> & {
	dense?:        boolean;
	disablePadding?: boolean;
	subheader?:    ReactNode;
	sx?:           unknown;
};

const List = forwardRef<HTMLUListElement, ListProps>(function List(
	{dense, disablePadding, subheader, sx: _sx, className, children, ...rest},
	ref
) {
	return (
		<>
			{subheader}
			<ul
				ref={ref}
				className={cn('flex flex-col list-none pl-0', !disablePadding && 'py-2', className)}
				{...rest}
			>
				{children}
			</ul>
		</>
	);
});

export default List;

export type ListItemProps = HTMLAttributes<HTMLLIElement> & {
	disablePadding?: boolean;
	dense?:        boolean;
	sx?:           unknown;
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
	{disablePadding, dense, sx: _sx, className, children, ...rest},
	ref
) {
	return (
		<li
			ref={ref}
			className={cn(
				'flex items-center gap-3',
				!disablePadding && (dense ? 'py-1 px-2' : 'py-2 px-4'),
				className
			)}
			{...rest}
		>
			{children}
		</li>
	);
});

export type ListItemIconProps = HTMLAttributes<HTMLSpanElement> & {sx?: unknown};

export const ListItemIcon = forwardRef<HTMLSpanElement, ListItemIconProps>(function ListItemIcon(
	{sx: _sx, className, children, ...rest},
	ref
) {
	return (
		<span ref={ref} className={cn('inline-flex items-center justify-center min-w-9 text-muted-foreground', className)} {...rest}>
			{children}
		</span>
	);
});

export type ListItemTextProps = HTMLAttributes<HTMLDivElement> & {
	primary?:   ReactNode;
	secondary?: ReactNode;
	sx?:        unknown;
};

export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(function ListItemText(
	{primary, secondary, sx: _sx, className, children, ...rest},
	ref
) {
	return (
		<div ref={ref} className={cn('flex flex-col flex-1', className)} {...rest}>
			{primary !== undefined ? <div className="text-base">{primary}</div> : null}
			{secondary !== undefined ? <div className="text-sm text-muted-foreground">{secondary}</div> : null}
			{children}
		</div>
	);
});

export type ListSubheaderProps = HTMLAttributes<HTMLDivElement> & {
	sx?: unknown;
	disableSticky?: boolean;
};

export const ListSubheader = forwardRef<HTMLDivElement, ListSubheaderProps>(function ListSubheader(
	{sx: _sx, disableSticky, className, children, ...rest},
	ref
) {
	return (
		<div
			ref={ref}
			className={cn(
				'px-4 py-2 text-sm font-medium text-muted-foreground bg-background',
				!disableSticky && 'sticky top-0',
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
});
