import {useTeam} from '@/hooks/data';
import {getContrastText} from '@/lib/color-utils';
import {SxProps} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export default function useTeamHeaderSx(teamId?: string): SxProps {
	const {team}     = useTeam(teamId);
	const background = useGetTeamColor()(team?.colors);
	const color      = getContrastText(background);
	
	return {
		background, color,
		
		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color
		}
	};
}