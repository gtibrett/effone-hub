import {AvatarSizes, useAvatarSize} from '@/hooks';
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Avatar} from '@/components/ui';
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
			return <Avatar variant="rounded" style={sx}><FontAwesomeIcon icon={faUser}/></Avatar>;
		}

		const {firstName, lastName, bio} = driver;
		const alt = `${firstName ?? ''} ${lastName ?? ''}`.trim();

		return (
			<Avatar variant="rounded" style={sx} src={bio?.thumbnailUrl ?? undefined} alt={alt}>
				{firstName?.[0]}{lastName?.[0]}
			</Avatar>
		);
	}, [sx, driver]);
}

export default DriverAvatar;
