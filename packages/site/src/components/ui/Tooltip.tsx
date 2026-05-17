'use client';

/**
 * MUI-shaped Tooltip wrapper backed by shadcn/Radix. Accepts the
 * `title` prop pattern (`<Tooltip title="...">{trigger}</Tooltip>`)
 * the codebase uses today.
 */
import {ReactElement, ReactNode, cloneElement} from 'react';
import {Tooltip as RootTooltip, TooltipContent, TooltipProvider, TooltipTrigger} from './shadcn/tooltip';

export type TooltipProps = {
	title:     ReactNode;
	children:  ReactElement;
	placement?: 'top' | 'right' | 'bottom' | 'left';
	arrow?:    boolean;
	enterDelay?: number;
};

export default function Tooltip({title, children, placement = 'top', enterDelay = 0}: TooltipProps) {
	if (!title) return children;
	return (
		<TooltipProvider delayDuration={enterDelay}>
			<RootTooltip>
				<TooltipTrigger asChild>
					{cloneElement(children as ReactElement<Record<string, unknown>>)}
				</TooltipTrigger>
				<TooltipContent side={placement}>{title}</TooltipContent>
			</RootTooltip>
		</TooltipProvider>
	);
}
