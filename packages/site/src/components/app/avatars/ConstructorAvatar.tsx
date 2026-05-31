import { useMemo } from 'react';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';

import { Team } from '@/gql/graphql';
import { AvatarSizes, useAvatarSize, useGetTeamColor } from '@/hooks';
import { useTeam } from '@/hooks/data';

export type TeamAvatarProps = {
	teamId?: Team['id'];
	size?: AvatarSizes;
};

export default function TeamAvatar({ teamId, size = 'small' }: TeamAvatarProps) {
	const { className, style } = useAvatarSize(size);
	const { team } = useTeam(teamId);
	const getTeamColor = useGetTeamColor();
	const primary = team ? getTeamColor(team.colors, 'primaryHex') : '';

	return useMemo(() => {
		if (!team) {
			return (
				<Avatar variant="rounded" className={className} style={style}>
					<FontAwesomeIcon icon={faIndustry} />
				</Avatar>
			);
		}

		const { name, bio } = team;

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
				src={bio?.thumbnailUrl ?? undefined}
				alt={name ?? ''}
			>
				{initials?.join('')}
			</Avatar>
		);
	}, [team, className, style, primary]);
}
