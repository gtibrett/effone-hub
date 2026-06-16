import { useMemo } from 'react';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';

import { type TeamDisplay, useTeamDisplay } from '@/components/app/EntityDisplayProvider';
import type { Team } from '@/gql/graphql';
import { type AvatarSizes, useAvatarSize, useGetTeamColor } from '@/hooks';

export type TeamAvatarProps = {
	teamId?: Team['id'];
	team?: TeamDisplay;
	size?: AvatarSizes;
};

export default function TeamAvatar({ teamId, team: teamProp, size = 'small' }: TeamAvatarProps) {
	const { className, style } = useAvatarSize(size);
	const getTeamColor = useGetTeamColor();

	const ctx = useTeamDisplay(teamProp ? undefined : teamId);
	const display: TeamDisplay | undefined = teamProp ?? ctx;

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
