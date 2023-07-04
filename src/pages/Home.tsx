import {usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardHeader, Grid} from '@mui/material';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import RaceWeekend from '../race/RaceWeekend';
import Schedule from '../schedule/Schedule';
import Constructors from '../standings/Constructors';
import Drivers from '../standings/Drivers';
import DriversChart from '../standings/DriversChart';
import {Page} from '../ui-components';

export default function Home() {
	usePageTitle('Home');
	
	const {seasonId = 'current'} = useParams();
	const [appState]             = useAppState();
	
	let season: number = 0;
	if (seasonId === 'current' || !seasonId) {
		season = appState.currentSeason;
	} else {
		season = Number(seasonId);
	}
	
	return (
		<>
			<Page title={`${season} Season`}>
				<Grid container spacing={2}>
					{seasonId === 'current' && <RaceWeekend/>}
					<Grid item xs={12} md={6}>
						<Card variant="outlined">
							<CardHeader title="Schedule"/>
							<Schedule season={season}/>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Card variant="outlined">
									<CardHeader title="Driver's Standings"/>
									<DriversChart season={season}/>
									<Drivers season={season}/>
								</Card>
							</Grid>
							<Grid item xs={12}>
								<Card variant="outlined">
									<CardHeader title="Constructor's Standings"/>
									<Constructors season={season}/>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Page>
		</>
	);
}