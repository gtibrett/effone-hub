import RaceWeekend from '@/components/page/raceWeekend/RaceWeekend';
import {Schedule, SeasonData} from '@/components/page/season';
import {DriverStandings, TeamStandings} from '@/components/page/season/standings';
import {DNFs, FastestLap, FastestLaps, LapLeader, Poles, PositionsGained, SprintWins, Wins} from '@/components/page/season/stats';
import {Page} from '@/components/ui';
import {apolloClient} from '@/useApolloClient';
import {setPageTitle} from '@gtibrett/mui-additions';
import {Card, CardContent, CardHeader, Grid, Hidden} from '@mui/material';
import SeasonsQuery from '../../components/page/season/SeasonsQuery';

export default function Season(props: { season: string, seasonToShow: string }) {
	const season       = Number(props.season);
	const seasonToShow = Number(props.seasonToShow);
	
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
						<RaceWeekend season={season}/>
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
				</Grid>
			</Grid>
		</Page>
	);
}

export async function getStaticProps({params}: { params: { season: string } }) {
	return {
		props: {
			season:       params.season,
			seasonToShow: params.season
		}
	};
}

export async function getStaticPaths() {
	const {data: {seasons}} = await apolloClient.query<{ seasons: SeasonData[] }>({query: SeasonsQuery});
	
	const paths = seasons.map(season => ({
		params: {season: season.year.toString()}
	}));
	
	return {paths, fallback: false};
}