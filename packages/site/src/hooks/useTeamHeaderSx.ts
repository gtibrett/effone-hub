import {useTeam} from '@/hooks/data';
import {getCssContrast} from '@/lib/useContrastText';
import {SxProps} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export default function useTeamHeaderSx(teamId?: string): SxProps {
	const {team}     = useTeam(teamId);
	const background = useGetTeamColor()(team?.colors);
	const color      = getCssContrast(background);

	return {
		background, color,

		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color
		}
	};
}