import {CSSProperties} from 'react';
import {useTheme} from '@/lib/theme';
import {useTeam} from '@/hooks/data';
import useGetTeamColor from './useGetTeamColor';

export default function useTeamHeaderSx(teamId?: string): CSSProperties {
	const theme      = useTheme();
	const {team}     = useTeam(teamId);
	const background = useGetTeamColor()(team?.colors);
	const color      = theme.palette.getContrastText(background);

	return {background, color};
}
