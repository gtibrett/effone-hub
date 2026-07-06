'use client';

import { type PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import { Box, Portal } from '@mui/material';

const POINTER_OFFSET = 12;

type ChartsHoverTooltipProps = PropsWithChildren<{
	// Viewport (client) pixel position of the pointer.
	clientX: number;
	clientY: number;
}>;

// Pointer-following tooltip for charts driven by LineHoverHitLayer. Portals to
// <body> with fixed positioning so overflow-hidden chart containers can't clip
// it, sizes to max-content so width never depends on nearby viewport edges,
// and flips to the opposite side of the pointer when it would overflow.
export function ChartsHoverTooltip({ clientX, clientY, children }: ChartsHoverTooltipProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [flip, setFlip] = useState({ x: false, y: false });

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) {
			return;
		}
		const { width, height } = el.getBoundingClientRect();
		const x = clientX + POINTER_OFFSET + width > window.innerWidth;
		const y = clientY + POINTER_OFFSET + height > window.innerHeight;
		setFlip(prev => (prev.x === x && prev.y === y ? prev : { x, y }));
	}, [clientX, clientY]);

	const offset = (flipped: boolean) =>
		flipped ? `calc(-100% - ${POINTER_OFFSET}px)` : `${POINTER_OFFSET}px`;

	return (
		<Portal>
			<Box
				ref={ref}
				sx={{
					position: 'fixed',
					left: `${clientX}px`,
					top: `${clientY}px`,
					transform: `translate(${offset(flip.x)}, ${offset(flip.y)})`,
					width: 'max-content',
					pointerEvents: 'none',
					zIndex: 'tooltip'
				}}
			>
				{children}
			</Box>
		</Portal>
	);
}
