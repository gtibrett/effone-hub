'use client';

import {
	Dialog as ShadcnDialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/shadcn/dialog';
import {PropsWithChildren, ReactNode} from 'react';

/**
 * App-wide Dialog wrapper — mirrors the
 * `@gtibrett/mui-additions/Dialog` surface (title, open/onClose,
 * closeIcon convenience) on top of shadcn's Radix Dialog.
 *
 * shadcn DialogContent already includes a close button (an X icon set
 * by dialog.tsx, swapped to faXmark in M6). The upstream `closeIcon`
 * prop is accepted but no-ops because the close affordance is
 * built-in — kept in the type so consumer call sites compile without
 * editing each one.
 */
export type DialogProps = {
	title:           ReactNode;
	open:            boolean;
	onClose:         () => void;
	maxWidth?:       'sm' | 'md' | 'lg' | 'xl';
	fullWidth?:      boolean;
	closeIcon?:      ReactNode;
	closeIconTitle?: string;
	actions?:        ReactNode;
	titleSpacing?:   number;
};

const MAX_WIDTH_CLASS: Record<NonNullable<DialogProps['maxWidth']>, string> = {
	sm: 'sm:max-w-md',
	md: 'sm:max-w-2xl',
	lg: 'sm:max-w-4xl',
	xl: 'sm:max-w-6xl'
};

export default function Dialog({
	title,
	open,
	onClose,
	maxWidth = 'md',
	fullWidth,
	actions,
	children
}: PropsWithChildren<DialogProps>) {
	return (
		<ShadcnDialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
			<DialogContent
				className={`${MAX_WIDTH_CLASS[maxWidth]} ${fullWidth ? 'w-full' : ''} max-h-[90vh] overflow-y-auto`}
			>
				<DialogHeader>
					<DialogTitle asChild><div>{title}</div></DialogTitle>
				</DialogHeader>
				{children}
				{actions}
			</DialogContent>
		</ShadcnDialog>
	);
}
