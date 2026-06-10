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
			<Box
				sx={{
					backdropFilter: 'blur(4px)',
					borderRadius: 0.5,
					overflow: 'hidden',
					minWidth: 160,
					background: inverted.palette.background.paper,
					color: `contrast-color(${inverted.palette.background.paper})`,
					fontSize: inverted.typography.caption.fontSize,
					boxShadow: inverted.shadows[6]
				}}
			>
				{heading != null ? (
					<Typography
						variant="caption"
						component="div"
						sx={{
							px: 1,
							py: 0.5,
							borderBottom: `1px solid ${inverted.palette.divider}`,
							fontWeight: 'bold'
						}}
					>
						{heading}
					</Typography>
				) : null}
				<Box sx={{ px: 1, py: 0.5 }}>{children}</Box>
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
