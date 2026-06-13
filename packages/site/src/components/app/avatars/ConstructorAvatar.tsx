import { useMemo } from 'react';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';

import {
	type TeamDisplay,
	teamToDisplay,
	useTeamDisplay
} from '@/components/app/EntityDisplayProvider';
import type { Team } from '@/gql/graphql';
import { type AvatarSizes, useAvatarSize, useGetTeamColor } from '@/hooks';
import { useTeam } from '@/hooks/data';

export type TeamAvatarProps = {
	teamId?: Team['id'];
	team?: TeamDisplay;
	size?: AvatarSizes;
};

export default function TeamAvatar({ teamId, team: teamProp, size = 'small' }: TeamAvatarProps) {
	const { className, style } = useAvatarSize(size);
	const getTeamColor = useGetTeamColor();

	// resolve-then-skip: suppress fetches via undefined id
	const id = teamProp?.id ?? teamId;
	const ctx = useTeamDisplay(teamProp ? undefined : id);
	const { team: hookTeam } = useTeam(teamProp || ctx ? undefined : id);
	const display: TeamDisplay | undefined = teamProp ?? ctx ?? teamToDisplay(hookTeam);

	const primary = display ? getTeamColor(display.colors, 'primaryHex') : '';

	return useMemo(() => {
		if (!display) {
			return (
				<Avatar variant="rounded" className={className} style={style}>
					<FontAwesomeIcon icon={faIndustry} />
				</Avatar>
			);
		}

		const { name, thumbnailUrl } = display;

		const initials = name
			?.replace('F1 Team', '')
			.replace(/[ -]/i, '')
			.split('')
			.filter(l => l.toUpperCase() === l);

		return (
			<Avatar
				variant="rounded"
				className={className}
				style={{
					...style,
					background: primary,
					color: `contrast-color(${primary})`
				}}
				src={thumbnailUrl ?? undefined}
				alt={name ?? ''}
			>
				{initials?.join('')}
			</Avatar>
		);
	}, [display, className, style, primary]);
}
