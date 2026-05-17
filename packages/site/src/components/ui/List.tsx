'use client';

/**
 * List family — semantic `<ul>` + `<li>` with Tailwind utility classes.
 * No `sx`. The `<ul>` is reset to `list-none` so default browser markers
 * don't show.
 */
import {HTMLAttributes, ReactNode, forwardRef} from 'react';
import {cn} from '@/lib/utils';

export type ListProps = HTMLAttributes<HTMLUListElement> & {
	dense?:          boolean;
	disablePadding?: boolean;
	subheader?:      ReactNode;
};

const List = forwardRef<HTMLUListElement, ListProps>(function List(
	{dense: _dense, disablePadding, subheader, className, children, ...rest},
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
	dense?:          boolean;
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
	{disablePadding, dense, className, children, ...rest},
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

export type ListItemIconProps = HTMLAttributes<HTMLSpanElement>;

export const ListItemIcon = forwardRef<HTMLSpanElement, ListItemIconProps>(function ListItemIcon(
	{className, children, ...rest},
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
};

export const ListItemText = forwardRef<HTMLDivElement, ListItemTextProps>(function ListItemText(
	{primary, secondary, className, children, ...rest},
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
	disableSticky?: boolean;
};

export const ListSubheader = forwardRef<HTMLDivElement, ListSubheaderProps>(function ListSubheader(
	{disableSticky, className, children, ...rest},
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
