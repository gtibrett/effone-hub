import { useMemo } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';

import { type AvatarSizes, useAvatarSize } from '@/hooks';
import { useDriver } from '@/hooks/data';
import type { DriverId } from '@/types';

export type DriverAvatarProps = {
	driverId?: DriverId;
	size?: AvatarSizes;
};

function DriverAvatar({ driverId, size = 'small' }: DriverAvatarProps) {
	const { className, style } = useAvatarSize(size);
	const driver = useDriver(driverId);

	return useMemo(() => {
		if (!driver) {
			return (
				<Avatar variant="rounded" className={className} style={style}>
					<FontAwesomeIcon icon={faUser} />
				</Avatar>
			);
		}

		const { firstName, lastName, bio } = driver;
		const alt = `${firstName ?? ''} ${lastName ?? ''}`.trim();

		return (
			<Avatar
				variant="rounded"
				className={className}
				style={style}
				src={bio?.thumbnailUrl ?? undefined}
				alt={alt}
			>
				{firstName?.[0]}
				{lastName?.[0]}
			</Avatar>
		);
	}, [className, style, driver]);
}

export default DriverAvatar;
