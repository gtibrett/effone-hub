import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { Box, type PopperProps, ThemeProvider, Typography } from '@mui/material';
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
			<Box className="backdrop-blur-xs rounded overflow-hidden min-w-40 w-max shadow">
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

// ChartsTooltipContainer's Popper defaults its portal `container` to the chart
// layer div — inside any overflow-hidden ancestor, so tooltips get clipped and
// transform/filter ancestors shrink-to-fit the popper near viewport edges
// (content wraps, tooltip resizes). Portal to body instead; lazy fn keeps it
// SSR-safe.
const getTooltipContainer = () => document.body;

// ChartsTooltipContainer hard-codes its Popper `modifiers` and only enables
// flip for coarse pointers — with a mouse the tooltip just slides along the
// edge instead of flipping to the other side of the pointer. It does merge
// `popperOptions`, and MUI Popper concatenates popperOptions.modifiers after
// the built-ins (popper.js merges by name, last wins), so flip is injected here.
const tooltipPopperOptions: PopperProps['popperOptions'] = {
	modifiers: [
		{
			name: 'flip',
			enabled: true,
			options: {
				fallbackPlacements: ['left-start', 'top-start', 'bottom-start']
			}
		}
	]
};

// MUI X Charts self-contained components expose `slots.tooltip` as an
// ElementType<ChartsTooltipProps>, not a per-trigger content slot. Wrap a
// content component in ChartsTooltipContainer so it can be plugged in via
// slots={{ tooltip: createItemTooltipSlot(Body) }}.
export function createItemTooltipSlot(Content: ComponentType) {
	function ItemTooltipSlot(props: { trigger?: unknown }) {
		return (
			<ChartsTooltipContainer
				{...(props as object)}
				trigger="item"
				container={getTooltipContainer}
				popperOptions={tooltipPopperOptions}
			>
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
			<ChartsTooltipContainer
				{...(props as object)}
				trigger="axis"
				container={getTooltipContainer}
				popperOptions={tooltipPopperOptions}
			>
				<Content />
			</ChartsTooltipContainer>
		);
	}

	AxisTooltipSlot.displayName = `AxisTooltipSlot(${Content.displayName || Content.name || 'Anonymous'})`;
	return AxisTooltipSlot;
}
