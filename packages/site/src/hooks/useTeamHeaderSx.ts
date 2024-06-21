import {useTeam} from '@/hooks/data';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {SxProps, useTheme} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export default function useTeamHeaderSx(teamId: Team['teamId']): SxProps {
	const theme      = useTheme();
	const {team}     = useTeam(teamId);
	const background = useGetTeamColor()(team?.colors);
	const color      = theme.palette.getContrastText(background);
	
	return {
		background, color,
		
		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color
		}
	};
}