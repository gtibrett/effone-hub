import {Link} from '@gtibrett/mui-additions';
import {Card, CardHeader, Typography} from '@mui/material';
import {DriverAvatar, DriverId, useDriver} from '../../driver';

type StatCardProps = {
	driverId?: DriverId;
	label: string;
}

export default function StatCard({driverId, label}: StatCardProps) {
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
				title={<Typography noWrap><Link to={`/driver/${driverRef}`}>{name}</Link></Typography>}
				subheader={<>{label}</>}
			/>
		</Card>
	);
}