import {usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardHeader, Grid} from '@mui/material';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import {DriverStandings, DriverStandingsChart, Schedule, TeamStandings, useHomePageData} from '../home';
import RaceWeekend from '../raceWeekend/RaceWeekend';
import {Page} from '../ui-components';

const useSeason = () => {
	const {seasonId = 'current'} = useParams();
	const [appState]             = useAppState();
	
	let season: number = 0;
	if (seasonId === 'current' || !seasonId) {
		season = appState.currentSeason;
	} else {
		season = Number(seasonId);
	}
	
	return season;
};

export default function Home() {
	usePageTitle('Home');

	const season          = useSeason();
	const {data, loading} = useHomePageData(season);
	const nextRace        = data?.season.nextRace?.race;

	return (
		<Page title={`${season} Season`}>
			<Grid container spacing={2}>
				{nextRace && <RaceWeekend loading={loading} race={nextRace}/>}
				<Grid item xs={12} md={6}>
					<Card variant="outlined">
						<CardHeader title="Schedule"/>
						<Schedule data={data} loading={loading} season={season}/>
					</Card>
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Card variant="outlined">
								<CardHeader title="Driver's Standings"/>
								<DriverStandingsChart data={data} loading={loading} season={season}/>
								<DriverStandings data={data} loading={loading} season={season}/>
							</Card>
						</Grid>
						<Grid item xs={12}>
							<Card variant="outlined">
								<CardHeader title="Constructor's Standings"/>
								<TeamStandings data={data} loading={loading}/>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
}