'use client';

/**
 * Drop-in replacement for `@mui/material/Card` + `CardHeader` +
 * `CardContent` rendering shadcn's Card primitives. Preserves the
 * `title`/`subheader`/`action`/`avatar` props on CardHeader because
 * many consumers pass them positionally.
 */
import {
	Card as ShadcnCard,
	CardAction as ShadcnCardAction,
	CardContent as ShadcnCardContent,
	CardDescription as ShadcnCardDescription,
	CardFooter as ShadcnCardFooter,
	CardHeader as ShadcnCardHeader,
	CardTitle as ShadcnCardTitle
} from '@/components/ui/shadcn/card';
import {forwardRef, type HTMLAttributes, type ReactNode} from 'react';
import {cn} from '@/lib/utils';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
	variant?:   'outlined' | 'elevation';
	elevation?: number;
	sx?:        unknown; // accepted for legacy MUI callsites; ignored (drop sx in follow-up)
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
	{variant = 'outlined', elevation: _elevation, sx: _sx, className, ...rest},
	ref
) {
	// shadcn Card already ships with a border + shadow appropriate for both
	// MUI variants; we mostly use Card as a structural wrapper. variant is
	// accepted so existing consumers compile but it's a visual no-op here.
	return <ShadcnCard ref={ref} className={cn(className)} {...rest}/>;
});

export type CardHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	title?:                     ReactNode;
	subheader?:                 ReactNode;
	action?:                    ReactNode;
	avatar?:                    ReactNode;
	sx?:                        unknown;
	titleTypographyProps?:      unknown;
	subheaderTypographyProps?:  unknown;
};

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
	{title, subheader, action, avatar, sx: _sx, titleTypographyProps: _ttp, subheaderTypographyProps: _stp, className, children, style, ...rest},
	ref
) {
	if (children && !title && !subheader && !action && !avatar) {
		return (
			<ShadcnCardHeader ref={ref} className={className} style={style} {...rest}>
				{children}
			</ShadcnCardHeader>
		);
	}

	const hasTitle = title !== null && title !== undefined && title !== false && title !== '';

	return (
		<ShadcnCardHeader
			ref={ref}
			className={cn(
				'flex flex-row items-center gap-3',
				hasTitle && 'bg-primary text-primary-foreground',
				className
			)}
			{...rest}
			style={style}
		>
			{avatar}
			<div className="flex-1">
				{title ? <ShadcnCardTitle className="text-xl">{title}</ShadcnCardTitle> : null}
				{subheader ? <ShadcnCardDescription>{subheader}</ShadcnCardDescription> : null}
				{children}
			</div>
			{action ? <ShadcnCardAction>{action}</ShadcnCardAction> : null}
		</ShadcnCardHeader>
	);
});

export type CardContentProps = HTMLAttributes<HTMLDivElement> & {sx?: unknown};

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
	{sx: _sx, className, ...rest},
	ref
) {
	return <ShadcnCardContent ref={ref} className={className} {...rest}/>;
});

export type CardActionsProps = HTMLAttributes<HTMLDivElement> & {sx?: unknown};

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(function CardActions(
	{sx: _sx, className, ...rest},
	ref
) {
	return <ShadcnCardFooter ref={ref} className={cn('flex items-center gap-2', className)} {...rest}/>;
});
