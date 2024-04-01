import {useAppState} from '@effonehub/app';
import {Page} from '@effonehub/ui-components';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, CardHeader, Grid, Hidden} from '@mui/material';
import {useParams} from 'react-router';
import RaceWeekend from '../../raceWeekend/RaceWeekend';
import {DriverStandings, TeamStandings} from '../../standings';
import useConstructorStandingsData from '../../standings/constructors/useConstructorsStandingsData';
import useDriverStandingsData from '../../standings/drivers/useDriversStandingsData';
import Schedule from '../Schedule';
import {DNFs, FastestLap, FastestLaps, LapLeader, Poles, PositionsGained, SprintWins, Wins} from '../stats';

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
	setPageTitle(`${season} Season`);
	const {data}            = useDriverStandingsData(season);
	const currentSeasonData = useConstructorStandingsData(season);
	const seasonToShow      = (currentSeasonData.data?.races?.[0].teamStandings.length) ? season : season - 1;
	
	if (isNaN(season)) {
		throw new Error('Unknown season');
	}
	
	let standingCount = 10;
	if (data) {
		standingCount = Math.max(...data.races?.filter(r => r.driverStandings.length).map(r => r.driverStandings.length || 10));
	}
	
	const height = standingCount * 16;
	
	return (
		<Page
			title={`${season} Season`}
			headerProps={{sx: {minWidth: 480}}}
		>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={12} lg={8}>
					<Grid container spacing={2} alignItems="stretch">
						<RaceWeekend season={season}/>
						<Grid item xs={12}>
							<Card variant="outlined">
								<CardHeader title="Schedule"/>
								<Schedule season={season}/>
							</Card>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Grid container spacing={2}>
						{season !== seasonToShow && (
							<Grid item xs={12}>
								<Card>
									<CardHeader title="Last Season"/>
								</Card>
							</Grid>
						)}
						<Grid item xs={12}>
							<DriverStandings season={seasonToShow} height={height}/>
						</Grid>
						<Grid item xs={12}>
							<TeamStandings season={seasonToShow} height={height}/>
						</Grid>
						<Grid item xs={12}>
							<Card>
								<CardHeader title="Season Stats"/>
								<CardContent>
									<Grid container spacing={1}>
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
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
}