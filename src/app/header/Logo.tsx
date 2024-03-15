import {Box, Tooltip, useTheme} from '@mui/material';
import {CSSObject} from '@mui/system';
// @ts-ignore
import {ReactComponent as FlagIcon} from './flag-checkered-duotone.svg';

export default function Logo({sx = {}}: { sx?: CSSObject }) {
	const theme = useTheme();
	sx          = {
		...sx,
		display: 'inline',
		'& > svg': {
			width: 32, height: 32,
			display: 'inline'
		},
		'& > svg > path': {
			fill: theme.palette.common.white
		}
	};
	return (
		<Box sx={sx} component="span">
			<Tooltip title="effOne Hub" placement="right">
				<FlagIcon alt="effOne Hub"/>
			</Tooltip>
		</Box>
	);
};