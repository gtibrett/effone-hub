import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Avatar} from '@mui/material';
import useAvatarSize, {AvatarSizes} from '../ui-components/useAvatarSize';
import {DriverId, useDriver} from './index';

export type DriverAvatarProps = {
	driverId?: DriverId;
	size?: AvatarSizes
}

export default function DriverAvatar({driverId, size = 'small'}: DriverAvatarProps) {
	const sx     = useAvatarSize(size);
	const driver = useDriver(driverId);
	
	if (!driver) {
		return <Avatar variant="rounded" sx={sx}><FontAwesomeIcon icon={faUser}/></Avatar>;
	}
	
	const {forename, surname, bio} = driver;
	
	if (bio?.thumbnail?.source) {
		return <Avatar variant="rounded" alt="" src={bio?.thumbnail?.source} sx={{...sx, objectPosition: 'top'}}/>;
	}
	
	return <Avatar variant="rounded" sx={sx}>{forename?.[0]}{surname?.[0]}</Avatar>;
}