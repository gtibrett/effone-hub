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
	const sizeClass = useAvatarSize(size);
	const driver    = useDriver(driverId);

	return useMemo(() => {
		if (!driver) {
			return <Avatar variant="rounded" className={sizeClass}><FontAwesomeIcon icon={faUser}/></Avatar>;
		}

		const {firstName, lastName, bio} = driver;
		const alt = `${firstName ?? ''} ${lastName ?? ''}`.trim();

		return (
			<Avatar variant="rounded" className={sizeClass} src={bio?.thumbnailUrl ?? undefined} alt={alt}>
				{firstName?.[0]}{lastName?.[0]}
			</Avatar>
		);
	}, [sizeClass, driver]);
}

export default DriverAvatar;
