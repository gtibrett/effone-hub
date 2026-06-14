import { useMemo } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';

import { type DriverDisplay, useDriverDisplay } from '@/components/app/EntityDisplayProvider';
import { type AvatarSizes, useAvatarSize } from '@/hooks';
import type { DriverId } from '@/types';

export type DriverAvatarProps = {
	driverId?: DriverId;
	driver?: DriverDisplay;
	size?: AvatarSizes;
};

function DriverAvatar({ driverId, driver: driverProp, size = 'small' }: DriverAvatarProps) {
	const { className, style } = useAvatarSize(size);

	const ctx = useDriverDisplay(driverProp ? undefined : driverId);
	const display: DriverDisplay | undefined = driverProp ?? ctx;

	return useMemo(() => {
		if (!display) {
			return (
				<Avatar variant="rounded" className={className} style={style}>
					<FontAwesomeIcon icon={faUser} />
				</Avatar>
			);
		}

		const { firstName, lastName, thumbnailUrl } = display;
		const alt = `${firstName ?? ''} ${lastName ?? ''}`.trim();

		return (
			<Avatar
				variant="rounded"
				className={className}
				style={style}
				src={thumbnailUrl ?? undefined}
				alt={alt}
			>
				{firstName?.[0]}
				{lastName?.[0]}
			</Avatar>
		);
	}, [className, style, display]);
}

export default DriverAvatar;
