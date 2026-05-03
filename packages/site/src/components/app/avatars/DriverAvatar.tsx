import {AvatarSizes, useAvatarSize} from '@/hooks';
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Avatar} from '@mui/material';
import {useMemo} from 'react';

export type DriverAvatarProps = {
	driverId?: DriverId;
	size?: AvatarSizes
}

function DriverAvatar({driverId, size = 'small'}: DriverAvatarProps) {
	const sx     = useAvatarSize(size);
	const driver = useDriver(driverId);
	
	return useMemo(() => {
		if (!driver) {
			return <Avatar variant="rounded" sx={sx}><FontAwesomeIcon icon={faUser}/></Avatar>;
		}
		
		const {firstName, lastName} = driver;

		return <Avatar variant="rounded" sx={sx}>{firstName?.[0]}{lastName?.[0]}</Avatar>;
	}, [sx, driver]);
}

export default DriverAvatar;