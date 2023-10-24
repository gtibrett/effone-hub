import {usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardHeader, Grid} from '@mui/material';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import {DriverStandings, Schedule, TeamStandings} from '../home';
import RaceWeekend from '../raceWeekend/RaceWeekend';
import {Page} from '../ui-components';

const useSeason = () => {
	const {seasonId = 'current'} = useParams();
	const [appState]             = useAppState();
	
	if (seasonId === 'current' || !seasonId) {
		return appState.currentSeason;
	} else {
		return Number(seasonId);
	}
};

export default function Home() {
	usePageTitle('Home');
	const season = useSeason();
	
	return (
		<Page title={`${season} Season`}>
			<Grid container spacing={2}>
				<RaceWeekend season={season}/>
				<Grid item xs={12} md={6}>
					<Card variant="outlined">
						<CardHeader title="Schedule"/>
						<Schedule season={season}/>
					</Card>
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<DriverStandings season={season}/>
						</Grid>
						<Grid item xs={12}>
							<TeamStandings season={season}/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
}