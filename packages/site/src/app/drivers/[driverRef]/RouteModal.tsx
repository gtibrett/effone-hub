'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@gtibrett/mui-additions';

type RouteModalProps = {
	title: ReactNode;
	dismissHref: string;
	children: ReactNode;
};

// Intercepted modal routes close by popping history (restores the underlying
// page from soft nav). On a hard load there is no app history to pop, so fall
// back to navigating to the parent route.
export default function RouteModal({ title, dismissHref, children }: RouteModalProps) {
	const router = useRouter();

	const dismiss = () => {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			router.back();
		} else {
			router.push(dismissHref);
		}
	};

	return (
		<Dialog
			open
			onClose={dismiss}
			closeIcon={<FontAwesomeIcon icon={faTimes} />}
			maxWidth="lg"
			fullWidth
			title={title}
		>
			{children}
		</Dialog>
	);
}
