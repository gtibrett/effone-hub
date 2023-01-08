import {Card, CardHeader, Grid, Typography} from '@mui/material';
import DriverAvatar from '../drivers/DriverAvatar';
import {DriverId, useDriver} from '../drivers/DriverProvider';
import {Race as RaceT} from '../types/ergast';
import Link from '../ui-components/Link';

type PlaceProps = {
	driverId: DriverId;
	place: number;
}

function Place({driverId, place}: PlaceProps) {
	const driver = useDriver(driverId);
	
	if (!driver) {
		return null;
	}
	
	const {givenName, familyName, nationality} = driver;
	const name                                 = `${givenName} ${familyName}`;
	
	return (
		<Card elevation={0}>
			<CardHeader
				avatar={<DriverAvatar id={driverId} size={64}/>}
				title={<Typography noWrap><Link to={`/driver/${driverId}`}>{name}</Link></Typography>}
				subheader={`P${place}`}
			/>
		</Card>
	);
}

export default function Podium({results}: { results: RaceT['Results'] }) {
	if (!results?.length) {
		return null;
	}
	
	const [p1, p2, p3] = results;
	
	return (
		<Grid container spacing={2}>
			{p1.Driver && <Grid item>
				<Place driverId={p1.Driver.driverId} place={1}/>
			</Grid>}
			
			{p2.Driver && <Grid item>
				<Place driverId={p2.Driver.driverId} place={2}/>
			</Grid>}
			
			{p3.Driver && <Grid item>
				<Place driverId={p3.Driver.driverId} place={3}/>
			</Grid>}
		</Grid>
	);
};