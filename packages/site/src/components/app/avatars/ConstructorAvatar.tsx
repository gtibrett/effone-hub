import {AvatarSizes, useAvatarSize, useGetTeamColor} from '@/hooks';
import {useTeam} from '@/hooks/data';
import {faIndustry} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Team} from '@gtibrett/effone-hub-graph-api';
import {Avatar, useTheme} from '@mui/material';

export type ConstructorAvatarProps = {
	teamId?: Team['teamId'];
	size?: AvatarSizes
}

export default function ConstructorAvatar({teamId, size = 'small'}: ConstructorAvatarProps) {
	const theme        = useTheme();
	const sizeSx       = useAvatarSize(size);
	const {team}       = useTeam(teamId);
	const getTeamColor = useGetTeamColor();
	
	if (!team) {
		return <Avatar variant="rounded" sx={sizeSx}><FontAwesomeIcon icon={faIndustry}/></Avatar>;
	}
	
	const {name, colors} = team;
	const primary        = getTeamColor(colors, 'primary', false);
	const textColor      = theme.palette.getContrastText(primary);
	
	const initials = name?.replace('F1 Team', '')
	                     .replace(/[ -]/i, '')
	                     .split('')
	                     .filter(l => l.toUpperCase() === l);
	
	return <Avatar variant="rounded" sx={{...sizeSx, background: primary, color: textColor}}>{initials?.join('')}</Avatar>;
}