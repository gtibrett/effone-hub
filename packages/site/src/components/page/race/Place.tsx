import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, Divider, Link, Typography } from '@mui/material';

import { DriverAvatar } from '@/components/app';
import { useDriver } from '@/hooks/data';
import { DriverId } from '@/types';

type PlaceProps = {
	driverId?: DriverId;
	place?: number | string;
	points?: number | string;
	wins?: number | string;
	asterisk?: boolean;
	className?: string;
};

export default function Place({
	driverId,
	place,
	points,
	wins,
	asterisk = false,
	className
}: PlaceProps) {
	const driver = useDriver(driverId);

	if (!driver) {
		return null;
	}

	const { firstName, lastName, rowId } = driver;
	const name = `${firstName} ${lastName}`;

	return (
		<Card className={className}>
			<CardHeader
				avatar={<DriverAvatar driverId={driverId} size={64} />}
				title={
					<Typography noWrap>
						<Link href={`/drivers/${rowId}`}>{name}</Link>{' '}
						{asterisk && (
							<FontAwesomeIcon
								icon={faAsterisk}
								title="We all know what really happened"
							/>
						)}
					</Typography>
				}
				subheader={
					<>
						{place ? `P${place} ` : ''}
						{points ? (
							<Typography variant="caption">
								<Divider orientation="vertical" /> {points} pts
							</Typography>
						) : (
							''
						)}
						{typeof wins === 'number' ? (
							<Typography variant="caption">
								<Divider orientation="vertical" /> {wins} wins
							</Typography>
						) : (
							''
						)}
					</>
				}
			/>
		</Card>
	);
}
