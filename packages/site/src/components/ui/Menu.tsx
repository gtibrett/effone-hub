'use client';

/**
 * Minimal anchor-based Menu — Radix dropdown would be overkill for the
 * single callsite (NavMenu) that needs imperative `anchorEl/open/onClose`.
 * Positions a popover below the anchor; dismisses on outside-click or Esc.
 *
 * No `sx`, no inline color/style overrides on items. Styling via Tailwind.
 */
import {HTMLAttributes, ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {cn} from '@/lib/utils';

export type MenuProps = {
	id?:             string;
	anchorEl:        HTMLElement | null;
	open:            boolean;
	onClose:         () => void;
	hideBackdrop?:   boolean;
	MenuListProps?:  HTMLAttributes<HTMLUListElement>;
	children:        ReactNode;
};

export default function Menu({id, anchorEl, open, onClose, MenuListProps, children}: MenuProps) {
	const [pos, setPos] = useState<{top: number; left: number} | null>(null);
	const ref           = useRef<HTMLUListElement | null>(null);

	useLayoutEffect(() => {
		if (!open || !anchorEl) return;
		const r = anchorEl.getBoundingClientRect();
		setPos({top: r.bottom + window.scrollY, left: r.left + window.scrollX});
	}, [open, anchorEl]);

	useEffect(() => {
		if (!open) return;
		const onDown = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node) && !anchorEl?.contains(e.target as Node)) {
				onClose();
			}
		};
		const onKey  = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
		document.addEventListener('mousedown', onDown);
		document.addEventListener('keydown',   onKey);
		return () => {
			document.removeEventListener('mousedown', onDown);
			document.removeEventListener('keydown',   onKey);
		};
	}, [open, anchorEl, onClose]);

	if (!open || typeof document === 'undefined') return null;

	return createPortal(
		<ul
			ref={ref}
			id={id}
			role="menu"
			className="fixed z-50 min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md p-1"
			style={pos ? {top: pos.top, left: pos.left} : {visibility: 'hidden'}}
			{...MenuListProps}
		>
			{children}
		</ul>,
		document.body
	);
}

export type MenuItemProps = HTMLAttributes<HTMLLIElement> & {
	selected?: boolean;
	disabled?: boolean;
};

export function MenuItem({selected, disabled, className, children, ...rest}: MenuItemProps) {
	return (
		<li
			role="menuitem"
			aria-selected={selected || undefined}
			aria-disabled={disabled || undefined}
			className={cn(
				'cursor-pointer rounded-sm px-3 py-2 text-sm select-none list-none',
				'hover:bg-accent hover:text-accent-foreground',
				selected && 'bg-secondary text-secondary-foreground',
				disabled && 'opacity-50 pointer-events-none',
				className
			)}
			tabIndex={disabled ? -1 : 0}
			{...rest}
		>
			{children}
		</li>
	);
}
