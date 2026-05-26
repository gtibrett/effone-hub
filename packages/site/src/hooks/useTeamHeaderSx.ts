/**
 * Returns {className, style} for a team-header strip. Team-color bg + contrast-color() fg.
 * Cascades bg/fg into nested MuiTypography / MuiTableCell via Tailwind arbitrary variants.
 */
import {useTeam} from '@/hooks/data';
import type {CSSProperties} from 'react';
import useGetTeamColor from './useGetTeamColor';
import type {HeaderStyle} from './useDriverHeaderSx';

const HEADER_CLASS = 'bg-(--header-bg) text-(--header-fg) [&_.MuiTypography-root]:bg-(--header-bg) [&_.MuiTypography-root]:text-(--header-fg) [&_.MuiTableCell-root]:bg-(--header-bg) [&_.MuiTableCell-root]:text-(--header-fg)';

export default function useTeamHeaderSx(teamId?: string): HeaderStyle {
	const {team}     = useTeam(teamId);
	const background = useGetTeamColor()(team?.colors);

	return {
		className: HEADER_CLASS,
		style:     {
			['--header-bg' as string]: background,
			['--header-fg' as string]: `contrast-color(${background} vs white, black)`
		} as CSSProperties
	};
}
