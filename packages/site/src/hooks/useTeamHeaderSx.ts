/**
 * Returns an sx-shaped style object for a team-header strip — team color
 * bg with contrast-aware text via CSS `contrast-color()`.
 */
import {useTeam} from '@/hooks/data';
import {SxProps} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export default function useTeamHeaderSx(teamId?: string): SxProps {
	const {team}     = useTeam(teamId);
	const background = useGetTeamColor()(team?.colors);
	const color      = `contrast-color(${background} vs white, black)`;

	return {
		background, color,

		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color
		}
	};
}
