'use client';

/**
 * Card family — passthroughs to shadcn's Card primitives with the legacy
 * MUI `title/subheader/action/avatar` slots on CardHeader. No `sx`, no
 * inline color overrides. Team-colored card headers wrap a parent with
 * the `--team-primary`/`--team-foreground` CSS variables set, then
 * descendants use `bg-team-primary text-team-foreground` utilities.
 *
 * A titled CardHeader paints the slate primary band so page chrome reads
 * consistently across surfaces.
 */
import {Card as ShadcnCard, CardAction as ShadcnCardAction, CardContent as ShadcnCardContent, CardDescription as ShadcnCardDescription, CardFooter as ShadcnCardFooter, CardHeader as ShadcnCardHeader, CardTitle as ShadcnCardTitle} from '@/components/ui/shadcn/card';
import {cn} from '@/lib/utils';
import {forwardRef, type HTMLAttributes, type ReactNode} from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
	variant?: 'outlined' | 'elevation';
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
	{variant = 'elevation', className, ...rest},
	ref
) {
	return <ShadcnCard ref={ref} className={cn(variant === 'outlined' && 'border', className)} {...rest}/>;
});

export type CardHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	title?: ReactNode;
	subheader?: ReactNode;
	action?: ReactNode;
	avatar?: ReactNode;
};

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
	{title, subheader, action, avatar, className, children, ...rest},
	ref
) {
	const hasTitleSlot = title !== undefined && title !== null && title !== false && title !== '';
	
	if (children && !hasTitleSlot && !subheader && !action && !avatar) {
		return (
			<ShadcnCardHeader ref={ref} className={className} {...rest}>
				{children}
			</ShadcnCardHeader>
		);
	}
	
	return (
		<ShadcnCardHeader
			ref={ref}
			className={cn(
				'flex flex-row items-center gap-3',
				hasTitleSlot && 'text-primary-foreground',
				className
			)}
			{...rest}
		>
			{avatar}
			<div className="flex-1">
				{hasTitleSlot ? <ShadcnCardTitle className="text-xl">{title}</ShadcnCardTitle> : null}
				{subheader ? <ShadcnCardDescription>{subheader}</ShadcnCardDescription> : null}
				{children}
			</div>
			{action ? <ShadcnCardAction>{action}</ShadcnCardAction> : null}
		</ShadcnCardHeader>
	);
});

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
	{className, ...rest},
	ref
) {
	return <ShadcnCardContent ref={ref} className={className} {...rest}/>;
});

export type CardActionsProps = HTMLAttributes<HTMLDivElement>;

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(function CardActions(
	{className, ...rest},
	ref
) {
	return <ShadcnCardFooter ref={ref} className={cn('flex items-center gap-2', className)} {...rest}/>;
});
