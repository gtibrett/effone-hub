import {Team} from '@/gql/graphql';
import {AvatarSizes, useAvatarSize, useGetTeamColor} from '@/hooks';
import {useTeam} from '@/hooks/data';
import {getContrastText} from '@/lib/color';
import {faIndustry} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Avatar} from '@/components/ui';
import {CSSProperties, useMemo} from 'react';

export type TeamAvatarProps = {
	teamId?: Team['id'];
	size?: AvatarSizes
}

export default function TeamAvatar({teamId, size = 'small'}: TeamAvatarProps) {
	const sizeClass    = useAvatarSize(size);
	const {team}       = useTeam(teamId);
	const getTeamColor = useGetTeamColor();

	return useMemo(() => {
		if (!team) {
			return <Avatar variant="rounded" className={sizeClass}><FontAwesomeIcon icon={faIndustry}/></Avatar>;
		}

		const {name, colors, bio} = team;
		const primary             = getTeamColor(colors, 'primaryHex', false);
		const textColor           = getContrastText(primary);

		const initials = name?.replace('F1 Team', '')
		                     .replace(/[ -]/i, '')
		                     .split('')
		                     .filter(l => l.toUpperCase() === l);

		// Inject the dynamic team color via the `--team-primary` / `--team-foreground`
		// CSS vars; `bg-team-primary` / `text-team-foreground` utilities (defined in
		// globals.css) then pick them up so the Avatar stays a pure className-driven
		// surface.
		const teamStyle = {
			'--team-primary':    primary,
			'--team-foreground': textColor
		} as CSSProperties;

		return (
			<Avatar
				variant="rounded"
				className={`${sizeClass} bg-team-primary text-team-foreground`}
				style={teamStyle}
				src={bio?.thumbnailUrl ?? undefined}
				alt={name ?? ''}
			>
				{initials?.join('')}
			</Avatar>
		);
	}, [team, getTeamColor, sizeClass]);
}
