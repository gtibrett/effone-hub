import RaceWeekend from '@/components/page/raceWeekend/RaceWeekend';
import {Schedule} from '@/components/page/season/index';
import {ScheduleSkeleton} from '@/components/page/season/Schedule';
import {DriverStandings, TeamStandings} from '@/components/page/season/standings';
import {DNFs, FastestLap, FastestLaps, LapLeader, Poles, PositionsGained, SprintWins, Wins} from '@/components/page/season/stats';
import {Page} from '@/components/ui';
import {Season as SeasonT} from '@/gql/graphql';
import {Card, CardContent, CardHeader, Grid, Hidden} from '@mui/material';
import {Suspense} from 'react';

type SeasonProps = {
	season: Pick<SeasonT, 'year'>
};

export default function Season({season}: SeasonProps) {
	
	return (
		<Page
			title={`${season.year} Season`}
			headerProps={{sx: {minWidth: 480}}}
		>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={12} lg={8}>
					<Grid container spacing={2} alignItems="stretch">
						<Suspense><RaceWeekend season={season.year}/></Suspense>
						<Grid item xs={12}>
							<Suspense fallback={<ScheduleSkeleton/>}>
								<Schedule season={season.year}/>
							</Suspense>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} lg={4}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<DriverStandings season={season.year}/>
						</Grid>
						<Grid item xs={12}>
							<TeamStandings season={season.year}/>
						</Grid>
						
						<Grid item xs={12}>
							<Card>
								<CardHeader title="Season Stats"/>
								<CardContent>
									<Grid container spacing={2}>
										<Wins size="small" season={season.year}/>
										<SprintWins size="small" season={season.year}/>
										<Hidden lgUp><Grid item xs={12}/></Hidden>
										<Poles size="small" season={season.year}/>
										<FastestLaps season={season.year}/>
										<Hidden lgUp><Grid item xs={12}/></Hidden>
										<FastestLap season={season.year}/>
										<LapLeader size="small" season={season.year}/>
										<Hidden lgUp><Grid item xs={12}/></Hidden>
										<PositionsGained size="small" season={season.year}/>
										<DNFs size="small" season={season.year}/>
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