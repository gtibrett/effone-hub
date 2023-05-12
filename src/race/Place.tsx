import {faAsterisk} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card, CardHeader, Divider, Typography} from '@mui/material';
import DriverAvatar from '../drivers/DriverAvatar';
import {DriverId, useDriver} from '../drivers/DriverProvider';
import {Link} from '../ui-components';

type PlaceProps = {
	driverId?: DriverId;
	place?: number | string;
	points?: number | string;
	asterisk?: boolean;
}

export default function Place({driverId, place, points, asterisk = false}: PlaceProps) {
	const driver = useDriver(driverId);
	
	if (!driver) {
		return null;
	}
	
	const {givenName, familyName} = driver;
	const name                    = `${givenName} ${familyName}`;
	
	return (
		<Card>
			<CardHeader
				avatar={<DriverAvatar id={driverId} size={64}/>}
				title={<Typography noWrap><Link to={`/driver/${driverId}`}>{name}</Link> {asterisk && <FontAwesomeIcon icon={faAsterisk} title="We all know what really happened"/>}</Typography>}
				subheader={<>
					{place ? `P${place} ` : ''}
					{points ? <Typography variant="caption"><Divider orientation="vertical"/> {points} pts</Typography> : ''}
				</>}
			/>
		</Card>
	);
}