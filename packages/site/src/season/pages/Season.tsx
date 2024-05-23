import {useAppState} from '@effonehub/app';
import {Schedule} from '@effonehub/season';
import {useSeason} from '@effonehub/season/useSeason';
import {Page} from '@effonehub/ui-components';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, CardHeader, Grid, Hidden} from '@mui/material';
import {useParams} from 'react-router';
import RaceWeekend from '../../raceWeekend/RaceWeekend';
import {DriverStandings, TeamStandings} from '../../standings';
import {DNFs, FastestLap, FastestLaps, LapLeader, Poles, PositionsGained, SprintWins, Wins} from '../stats';

export default function Season() {
	const {season: seasonParam = 'current'} = useParams();
	const season                            = useSeason();
	const [appState]                        = useAppState();
	const seasonToShow                      = seasonParam === 'current' ? appState.seasonToShow : season;
	
	setPageTitle(`${season} Season`);
	
	if (isNaN(season)) {
		throw new Error('Unknown season');
	}
	
	return (
		<Page
			title={`${season} Season`}
			headerProps={{sx: {minWidth: 480}}}
		>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={12} lg={8}>
					<Grid container spacing={2} alignItems="stretch">
						<Grid item xs={12} md={12}>
							<RaceWeekend season={season}/>
						</Grid>
						<Grid item xs={12}>
							<Schedule season={season}/>
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
							<DriverStandings season={seasonToShow}/>
						</Grid>
						<Grid item xs={12}>
							<TeamStandings season={seasonToShow}/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Card>
						<CardHeader title="Season Stats"/>
						<CardContent>
							<Grid container spacing={2}>
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
		</Page>
	);
}