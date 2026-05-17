import RaceWeekend from '@/components/page/raceWeekend/RaceWeekend';
import {Schedule} from '@/components/page/season/index';
import {ScheduleSkeleton} from '@/components/page/season/Schedule';
import {DriverStandings, TeamStandings} from '@/components/page/season/standings';
import {DNFs, FastestLap, FastestLaps, LapLeader, Poles, PositionsGained, SprintWins, Wins} from '@/components/page/season/stats';
import {Page} from '@/components/ui';
import {Season as SeasonT} from '@/gql/graphql';
import {Card, CardContent, CardHeader} from '@mui/material';
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
			<div className="grid grid-cols-12 gap-4 items-stretch">
				<div className="col-span-12 lg:col-span-8">
					<div className="grid grid-cols-12 gap-4 items-stretch">
						<Suspense><RaceWeekend season={season.year}/></Suspense>
						<div className="col-span-12">
							<Suspense fallback={<ScheduleSkeleton/>}>
								<Schedule season={season.year}/>
							</Suspense>
						</div>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-4">
					<div className="grid grid-cols-12 gap-4">
						<div className="col-span-12">
							<DriverStandings season={season.year}/>
						</div>
						<div className="col-span-12">
							<TeamStandings season={season.year}/>
						</div>

						<div className="col-span-12">
							<Card>
								<CardHeader title="Season Stats"/>
								<CardContent>
									<div className="grid grid-cols-12 gap-4">
										<Wins size="small" season={season.year}/>
										<SprintWins size="small" season={season.year}/>
										<div className="block lg:hidden col-span-12"/>
										<Poles size="small" season={season.year}/>
										<FastestLaps season={season.year}/>
										<div className="block lg:hidden col-span-12"/>
										<FastestLap season={season.year}/>
										<LapLeader size="small" season={season.year}/>
										<div className="block lg:hidden col-span-12"/>
										<PositionsGained size="small" season={season.year}/>
										<DNFs size="small" season={season.year}/>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}