import { useMemo } from 'react';
import { Box, Fab, Portal, type SxProps, Tooltip, useTheme } from '@mui/material';

type UkraineButtonProps = {
	noPortal?: boolean;
};

export default function UkraineButton({ noPortal = false }: UkraineButtonProps) {
	const theme = useTheme();
	const sx = useMemo<SxProps>(
		() => ({
			position: noPortal ? 'absolute' : 'fixed',
			bottom: 0,
			right: 0,
			pr: noPortal ? 0 : 4,
			pb: noPortal ? 0 : 3,
			zIndex: theme.zIndex.fab + 1
		}),
		[theme?.zIndex?.fab, noPortal]
	);

	const button = (
		<Box sx={sx}>
			<Tooltip
				title={
					<>
						We stand with Ukraine and its people.
						<br />
						Show your support.
					</>
				}
				placement="left"
				arrow
			>
				<Fab
					aria-label="Stand with Ukraine"
					href="https://cottonbureau.com/p/SE43Q8/shirt/stand-with-ukraine"
					target="_blank"
					sx={{
						background:
							'linear-gradient(0deg, #F7D748 0%, #F7D748 50%, #255AB5 50%, #255AB5 100%)',
						border: `1px solid ${theme.palette.common.white}`
					}}
				></Fab>
			</Tooltip>
		</Box>
	);

	return noPortal ? button : <Portal>{button}</Portal>;
}
