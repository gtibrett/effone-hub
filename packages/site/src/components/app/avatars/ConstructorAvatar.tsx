import {Team} from '@/gql/graphql';
import {AvatarSizes, useAvatarSize, useGetTeamColor} from '@/hooks';
import {useTeam} from '@/hooks/data';
import {faIndustry} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Avatar} from '@mui/material';
import {useMemo} from 'react';

export type TeamAvatarProps = {
	teamId?: Team['id'];
	size?: AvatarSizes
}

export default function TeamAvatar({teamId, size = 'small'}: TeamAvatarProps) {
	const sizeSx       = useAvatarSize(size);
	const {team}       = useTeam(teamId);
	const getTeamColor = useGetTeamColor();
	const primary      = team ? getTeamColor(team.colors, 'primaryHex') : '';

	return useMemo(() => {
		if (!team) {
			return <Avatar variant="rounded" sx={sizeSx}><FontAwesomeIcon icon={faIndustry}/></Avatar>;
		}

		const {name, bio} = team;

		const initials = name?.replace('F1 Team', '')
		                     .replace(/[ -]/i, '')
		                     .split('')
		                     .filter(l => l.toUpperCase() === l);

		return (
			<Avatar
				variant="rounded"
				sx={sizeSx}
				style={{background: primary, color: `contrast-color(${primary} vs white, black)`}}
				src={bio?.thumbnailUrl ?? undefined}
				alt={name ?? ''}
			>
				{initials?.join('')}
			</Avatar>
		);
	}, [team, sizeSx, primary]);
}
