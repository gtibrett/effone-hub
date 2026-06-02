import type { PropsWithChildren, ReactNode } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';

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
