import {useTeam} from '@/hooks/data';
import {getContrastText, getCssContrast, SUPPORTS_CONTRAST_COLOR} from '@/lib/useContrastText';
import {SxProps} from '@mui/material';
import useGetTeamColor from './useGetTeamColor';

export default function useTeamHeaderSx(teamId?: string): SxProps {
	const {team}          = useTeam(teamId);
	const background      = useGetTeamColor()(team?.colors);
	const color           = getContrastText(background);
	const cssOnlyContrast = {[SUPPORTS_CONTRAST_COLOR]: {color: getCssContrast(background)}};

	return {
		background, color, ...cssOnlyContrast,

		'& .MuiTypography-root, & .MuiTableCell-root': {
			background, color, ...cssOnlyContrast
		}
	};
}