'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import type { LineSeriesType } from '@mui/x-charts';

type EndLineLabelsOverlayProps = {
	series: LineSeriesType[];
	yMin: number;
	yMax: number;
	yReversed?: boolean;
	height: number;
	marginTop: number;
	marginBottom: number;
	marginLeft: number;
	marginRight: number;
	hoveredSeriesId?: string | null;
	onHoverChange?: (seriesId: string | null) => void;
	onClick?: (seriesId: string) => void;
	fontSize?: number;
	xPadding?: number;
};

// HTML overlay version of EndLineLabels. The composition-mode SVG version
// could position correctly but didn't pick up MUI X's tooltip pointer
// plumbing reliably; rendering as HTML siblings lets us keep the
// self-contained <LineChart> (which has working hover/tooltip) AND get
// proper DOM event handling for click + hover on each label.
export default function EndLineLabelsOverlay({
	series,
	yMin,
	yMax,
	yReversed = false,
	height,
	marginTop,
	marginBottom,
	marginLeft: _marginLeft,
	marginRight,
	hoveredSeriesId = null,
	onHoverChange,
	onClick,
	fontSize = 11,
	xPadding = 32
}: EndLineLabelsOverlayProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	useLayoutEffect(() => {
		const el = ref.current?.parentElement;
		if (!el) {
			return;
		}
		const update = () => setContainerWidth(el.getBoundingClientRect().width);
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const plotHeight = height - marginTop - marginBottom;
	const range = yMax - yMin || 1;
	const xLeft = containerWidth - marginRight + xPadding;
	const interactive = Boolean(onHoverChange || onClick);

	return (
		<Box ref={ref} sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
			{series.map(s => {
				if (!s.data) {
					return null;
				}
				let last: number | null = null;
				for (let i = s.data.length - 1; i >= 0; i--) {
					const v = s.data[i];
					if (typeof v === 'number') {
						last = v;
						break;
					}
				}
				if (last == null) {
					return null;
				}
				const ratio = (last - yMin) / range;
				const yPx = yReversed
					? marginTop + ratio * plotHeight
					: marginTop + (1 - ratio) * plotHeight;
				const id = String(s.id);
				const dim = hoveredSeriesId && hoveredSeriesId !== id;
				const labelRaw = typeof s.label === 'function' ? s.label('legend') : s.label;
				return (
					<Box
						key={id}
						sx={{
							position: 'absolute',
							top: `${yPx}px`,
							left: `${xLeft}px`,
							transform: 'translateY(-50%)',
							color: (s.color as string) || 'currentColor',
							fontSize: `${fontSize}px`,
							lineHeight: 1,
							whiteSpace: 'nowrap',
							cursor: interactive ? 'pointer' : 'default',
							opacity: dim ? 0.25 : 1,
							transition: 'opacity 120ms',
							pointerEvents: interactive ? 'auto' : 'none',
							userSelect: 'none'
						}}
						onMouseEnter={onHoverChange ? () => onHoverChange(id) : undefined}
						onMouseLeave={onHoverChange ? () => onHoverChange(null) : undefined}
						onClick={onClick ? () => onClick(id) : undefined}
					>
						{labelRaw ?? ''}
					</Box>
				);
			})}
		</Box>
	);
}
