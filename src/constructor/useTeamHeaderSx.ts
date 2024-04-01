import {useTeam} from '@effonehub/constructor/index';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {SxProps, useTheme} from '@mui/material';

export default function useTeamHeaderSx(teamId: Team['teamId']): SxProps {
	const theme  = useTheme();
	const {team} = useTeam(teamId);
	
	const background = team?.colors.primary || theme.palette.primary.main;
	const color      = theme.palette.getContrastText(background);
	
	return {
		background, color,
		
		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color
		}
	};
}