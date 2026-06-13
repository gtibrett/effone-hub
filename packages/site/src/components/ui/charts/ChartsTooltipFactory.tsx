import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { ChartsTooltipContainer } from '@mui/x-charts';

import { useInvertedTheme } from '../Theme';

type ChartsTooltipBodyProps = PropsWithChildren<{
	heading?: ReactNode;
}>;

// Wraps a MUI X Charts tooltip slot's content in an inverted-theme card with
// backdrop blur — matches the visual treatment NivoTooltipFactory provided.
// Consumers render their per-chart tooltip body inside this.
export function ChartsTooltipBody({ heading, children }: ChartsTooltipBodyProps) {
	const inverted = useInvertedTheme();

	return (
		<ThemeProvider theme={inverted}>
			<Box className="backdrop-blur-xs rounded overflow-hidden min-w-40 shadow">
				{heading != null ? (
					<Typography
						variant="caption"
						component="div"
						className="px-1 py-0.5 border-b border-b-divider font-bold"
					>
						{heading}
					</Typography>
				) : null}
				<Box>{children}</Box>
			</Box>
		</ThemeProvider>
	);
}

// MUI X Charts self-contained components expose `slots.tooltip` as an
// ElementType<ChartsTooltipProps>, not a per-trigger content slot. Wrap a
// content component in ChartsTooltipContainer so it can be plugged in via
// slots={{ tooltip: createItemTooltipSlot(Body) }}.
export function createItemTooltipSlot(Content: ComponentType) {
	function ItemTooltipSlot(props: { trigger?: unknown }) {
		return (
			<ChartsTooltipContainer {...(props as object)} trigger="item">
				<Content />
			</ChartsTooltipContainer>
		);
	}

	ItemTooltipSlot.displayName = `ItemTooltipSlot(${Content.displayName || Content.name || 'Anonymous'})`;
	return ItemTooltipSlot;
}

export function createAxisTooltipSlot(Content: ComponentType) {
	function AxisTooltipSlot(props: { trigger?: unknown }) {
		return (
			<ChartsTooltipContainer {...(props as object)} trigger="axis">
				<Content />
			</ChartsTooltipContainer>
		);
	}

	AxisTooltipSlot.displayName = `AxisTooltipSlot(${Content.displayName || Content.name || 'Anonymous'})`;
	return AxisTooltipSlot;
}
