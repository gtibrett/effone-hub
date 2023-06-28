import {Card, CardHeader, Divider, Typography} from '@mui/material';
import DriverAvatar from '../drivers/DriverAvatar';
import {DriverId, useDriver} from '../drivers/DriverProvider';
import Link from '../ui-components/Link';

type PlaceProps = {
	driverId?: DriverId;
	place?: number | string;
	points?: number | string;
}

export default function Place({driverId, place, points}: PlaceProps) {
	const driver = useDriver(driverId);
	
	if (!driver) {
		return null;
	}
	
	const {givenName, familyName} = driver;
	const name                    = `${givenName} ${familyName}`;
	
	return (
		<Card elevation={0}>
			<CardHeader
				avatar={<DriverAvatar id={driverId} size={64}/>}
				title={<Typography noWrap><Link to={`/driver/${driverId}`}>{name}</Link></Typography>}
				subheader={<>
					{place ? `P${place} ` : ''}
					{points ? <Typography variant="caption"><Divider orientation="vertical"/> {points} pts</Typography> : ''}
				</>}
			/>
		</Card>
	);
}