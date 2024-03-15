import {usePageTitle} from '@gtibrett/mui-additions';
import {Card, CardHeader, Divider, Grid, Hidden, Paper, Typography} from '@mui/material';
import {Page} from '@ui-components';
import {useParams} from 'react-router';
import {useAppState} from '../app/AppStateProvider';
import RaceWeekend from '../raceWeekend/RaceWeekend';
import {DriverStandings, TeamStandings} from '../standings';
import useConstructorStandingsData from '../standings/constructors/useConstructorsStandingsData';
import useDriverStandingsData from '../standings/drivers/useDriversStandingsData';
import Schedule from './Schedule';
import {ConstructorChampion, DNFs, DriverChampion, FastestLap, FastestLaps, LapLeader, Poles, SprintWins, Wins} from './stats';
import PositionsGained from './stats/PositionsGained';

const useSeason = () => {
	const {season = 'current'} = useParams();
	const [appState]           = useAppState();
	
	if (season === 'current' || !season) {
		return appState.currentSeason;
	} else {
		return Number(season);
	}
};

export default function Season() {
	const season = useSeason();
	usePageTitle(`${season} Season`);
	const {data}            = useDriverStandingsData(season);
	const currentSeasonData = useConstructorStandingsData(season);
	
	const seasonToShow = (currentSeasonData.data?.races?.[0].teamStandings.length) ? season : season - 1;
	
	if (isNaN(season)) {
		throw new Error('Unknown season');
	}
	
	let standingCount = 10;
	if (data) {
		standingCount = (data.races?.at(-1)?.driverStandings.length || 10);
	}
	
	const height = standingCount * 24;
	
	return (
		<Page
			title={`${season} Season`}
			headerProps={{sx: {minWidth: 480}}}
		>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={12} lg={9}>
					<Grid container spacing={2} alignItems="stretch">
						<RaceWeekend season={season}/>
						{season === seasonToShow && (
							<>
								<Grid item xs={12} md={6}>
									<DriverStandings season={season} height={height}/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TeamStandings season={season} height={height}/>
								</Grid>
							</>
						)}
						<Grid item xs={12}>
							<Card variant="outlined">
								<CardHeader title="Schedule"/>
								<Schedule season={season}/>
							</Card>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} lg={3}>
					<Paper elevation={0} sx={{mt: 1, pb: {xs: 3, lg: 2}, height: '100%'}}>
						{season !== seasonToShow && <Typography variant="h3" sx={{p:2}}>Last Season</Typography>}
						<Grid container spacing={1}>
							<DriverChampion season={seasonToShow}/>
							<ConstructorChampion season={seasonToShow}/>
						</Grid>
						<Divider variant="middle" sx={{mb: 3, mt: 1}}/>
						<Grid container spacing={2} sx={{px: 2}}>
							<Wins size="small" season={seasonToShow}/>
							<SprintWins size="small" season={seasonToShow}/>
							<Hidden lgUp><Grid item xs={12}/></Hidden>
							<Poles size="small" season={seasonToShow}/>
							<FastestLaps season={seasonToShow}/>
							<Hidden lgUp><Grid item xs={12}/></Hidden>
							<FastestLap season={seasonToShow}/>
							<LapLeader size="small" season={seasonToShow}/>
							<Hidden lgUp><Grid item xs={12}/></Hidden>
							<PositionsGained size="small" season={seasonToShow}/>
							<DNFs size="small" season={seasonToShow}/>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Page>
	);
}