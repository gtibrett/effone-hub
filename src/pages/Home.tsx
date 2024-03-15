import {usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardHeader, Grid, Typography} from '@mui/material';
import {Page} from '@ui-components';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import RaceWeekend from '../raceWeekend/RaceWeekend';
import {Schedule} from '../season';
import {LapLeader, Poles, Wins} from '../season/stats';
import {DriverStandings, TeamStandings} from '../standings';
import useConstructorStandingsData from '../standings/constructors/useConstructorsStandingsData';

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
	const currentSeasonData = useConstructorStandingsData(season);
	
	const seasonToShow =  (currentSeasonData.data?.races?.[0].teamStandings.length) ? season : season -1;
	
	return (
		<Page
			title={`${season} Season ${seasonToShow}`}
			action={(
				<>
					{season !== seasonToShow && <Typography>Last Season</Typography>}
					<Wins size="small" season={seasonToShow}/>
					<Poles size="small" season={seasonToShow}/>
					<LapLeader size="small" season={seasonToShow}/>
				</>
			)}
		>
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
							<DriverStandings season={seasonToShow} height={100}/>
						</Grid>
						<Grid item xs={12}>
							<TeamStandings season={seasonToShow} height={100}/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
}