'use client';

import {RaceMap, useMapSeasonRacesToMapPoints} from '@/components/app';
import {Laps, PitStops, Qualifying, Results, SprintResults} from '@/components/page/race';
import {FastestLap, LapLeader, Pole, PositionsGained} from '@/components/page/race/stats';
import {OpenAILink, Page, Link, Tabs, type TabContent} from '@/components/ui';
import {Race} from '@/gql/graphql';
import useRace from '@/hooks/data/useRace';
import {Card, CardContent, CardHeader, CardMedia, Typography} from '@mui/material';

type Props = {
	season: string;
	round:  string;
	race:   Partial<Race>;
};

export default function RoundContent({season: seasonStr, round: roundStr, race}: Props) {
	const season                   = Number(seasonStr);
	const round                    = Number(roundStr);
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();
	const raceData                 = useRace(season, round);
	const results                  = raceData?.raceResults;
	const sprintResults            = (raceData?.sprintRaceResults?.nodes ?? []).filter((r): r is NonNullable<typeof r> => r != null);

	const circuitDescription = race?.circuit?.description?.description || '';
	const hasResults         = Number(results?.nodes?.length) > 0;
	const seasonToShow       = hasResults ? season : season - 1;
	const {points, onClick}  = mapSeasonRacesToFeatures(season, [{
		officialName: race.officialName ?? '',
		round:        race.round ?? 0,
		latitude:     race.circuit?.latitude ?? null,
		longitude:    race.circuit?.longitude ?? null,
		hasResults
	}]);

	const tabs: TabContent[] = [
		{
			id:      'race', label: 'Race',
			content: <Results results={results}/>
		},
		{
			id:      'Sprint', label: 'Sprint',
			content: <SprintResults results={sprintResults}/>
		},
		{
			id:      'quali', label: 'Qualifying',
			content: <Qualifying season={season} round={round}/>
		},
		{
			id:      'laps', label: 'Laps',
			content: <Laps season={season} round={round}/>
		},
		{
			id:      'pit-stops', label: 'Pit Stops',
			content: <PitStops season={season} round={round}/>
		},
		{
			id:      'circuit', label: 'Circuit',
			content: (
				<Card>
					<CardHeader title={<Link href={`/circuits/${race.circuit?.rowId}`}>{race.circuit?.fullName}</Link>}/>
					<CardMedia><RaceMap points={points} onClick={onClick} height={140} centerOn={{latitude: race.circuit?.latitude, longitude: race.circuit?.longitude}} zoom/></CardMedia>
					<CardContent>
						<Typography variant="body1">{circuitDescription} <span className="block"><OpenAILink/></span></Typography>
					</CardContent>
				</Card>
			)
		}
	];

	if (!sprintResults.length) {
		tabs.splice(1, 1);
	}

	return (
		<Page
			title={race.officialName}
			subheader={<Typography>Round {race.round}, {race.date ? (new Date(race.date)).toLocaleDateString() : ''}</Typography>}
			extra={null}
			action={
				race.circuit && (
					<div className="hidden md:block">
						<Card>
							<CardMedia><RaceMap points={points} onClick={onClick} height={140} centerOn={{latitude: race.circuit.latitude, longitude: race.circuit.longitude}} zoom/></CardMedia>
							<CardHeader title={<Link href={`/circuits/${race.circuit.rowId}`}>{race.circuit.fullName}</Link>}/>
						</Card>
					</div>
				)
			}
			actionProps={{xs: 0, md: 3}}
		>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 md:col-span-8 lg:col-span-9 order-2 md:order-1">
					<Card>
						{
							hasResults
								? <Tabs active="race" tabs={tabs}/>
								: (
									<CardContent>
										<Typography variant="h5"><Link href={`/circuits/${race.circuit?.rowId}`}>{race.circuit?.fullName}</Link></Typography>
										<Typography variant="h6">{race.circuit?.placeName}, {race.circuit?.countryId}</Typography>
										{circuitDescription && (
											<>
												<Typography variant="body2">{circuitDescription}</Typography>
												<div className="block text-right"><OpenAILink/></div>
											</>
										)}
									</CardContent>
								)
						}
					</Card>
				</div>

				<div className="col-span-12 md:col-span-4 lg:col-span-3 order-1 md:order-2">
					<Card sx={{height: '100%'}}>
						<CardContent>
							<div className="grid grid-cols-12 gap-4">
								<CardHeader title={`${seasonToShow} Season`}/>
								<Pole season={seasonToShow} round={round} size="small"/>
								<FastestLap season={seasonToShow} round={round} size="small"/>
								<div className="block lg:hidden col-span-12"/>
								<LapLeader season={seasonToShow} round={round} size="small"/>
								<PositionsGained season={seasonToShow} round={round} size="small"/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Page>
	);
}
