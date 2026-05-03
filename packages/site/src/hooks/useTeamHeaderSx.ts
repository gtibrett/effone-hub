import {useTeam} from '@/hooks/data';
import {SxProps, useTheme} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export default function useTeamHeaderSx(teamId?: string): SxProps {
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