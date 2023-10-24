import {faAsterisk} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from '@gtibrett/mui-additions';
import {Card, CardHeader, Divider, Typography} from '@mui/material';
import {DriverAvatar, DriverId, useDriver} from '../driver';

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
	
	const {forename, surname, driverRef} = driver;
	const name                           = `${forename} ${surname}`;
	
	return (
		<Card>
			<CardHeader
				avatar={<DriverAvatar driverId={driverId} size={64}/>}
				title={<Typography noWrap><Link to={`/driver/${driverRef}`}>{name}</Link> {asterisk && <FontAwesomeIcon icon={faAsterisk} title="We all know what really happened"/>}</Typography>}
				subheader={<>
					{place ? `P${place} ` : ''}
					{points ? <Typography variant="caption"><Divider orientation="vertical"/> {points} pts</Typography> : ''}
				</>}
			/>
		</Card>
	);
}