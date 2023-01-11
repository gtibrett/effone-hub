import {Card, CardHeader, Grid} from '@mui/material';
import Schedule from '../schedule/Schedule';
import Constructors from '../standings/Constructors';
import Drivers from '../standings/Drivers';

export default function Home() {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6}>
				<Card variant="outlined">
					<CardHeader title="Schedule"/>
					<Schedule/>
				</Card>
			</Grid>
			<Grid item xs={12} md={6}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Card variant="outlined">
							<CardHeader title="Driver's Standings"/>
							<Drivers/>
						</Card>
					</Grid>
					<Grid item xs={12}>
						<Card variant="outlined">
							<CardHeader title="Constructor's Standings"/>
							<Constructors/>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}