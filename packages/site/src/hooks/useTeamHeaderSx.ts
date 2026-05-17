import {getContrastText} from '@/lib/color';
import {useTeam} from '@/hooks/data';
import useGetTeamColor from './useGetTeamColor';

export type TeamHeaderColors = {
	primary:    string;
	foreground: string;
};

export default function useTeamHeaderSx(teamId?: string): TeamHeaderColors {
	const {team}     = useTeam(teamId);
	const primary    = useGetTeamColor()(team?.colors);
	const foreground = getContrastText(primary);

	return {primary, foreground};
}
