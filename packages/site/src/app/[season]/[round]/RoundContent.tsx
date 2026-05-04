'use client';

import {RaceMap, useMapSeasonRacesToMapPoints} from '@/components/app';
import {Laps, PitStops, Qualifying, Results, SprintResults} from '@/components/page/race';
import {FastestLap, LapLeader, Pole, PositionsGained} from '@/components/page/race/stats';
import {OpenAILink, Page} from '@/components/ui';
import {Race} from '@/gql/graphql';
import useRace from '@/hooks/data/useRace';
import {Link, TabContent, Tabs} from '@gtibrett/mui-additions';
import {Box, Card, CardContent, CardHeader, CardMedia, Grid, Hidden, Typography} from '@mui/material';

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
						<Typography variant="body1">{circuitDescription} <Box component="span" display="block"><OpenAILink/></Box></Typography>
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
					<Hidden mdDown>
						<Card>
							<CardMedia><RaceMap points={points} onClick={onClick} height={140} centerOn={{latitude: race.circuit.latitude, longitude: race.circuit.longitude}} zoom/></CardMedia>
							<CardHeader title={<Link href={`/circuits/${race.circuit.rowId}`}>{race.circuit.fullName}</Link>}/>
						</Card>
					</Hidden>
				)
			}
			actionProps={{xs: 0, md: 3}}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8} lg={9} order={{xs: 2, md: 1}}>
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
												<Box textAlign="right" display="block"><OpenAILink/></Box>
											</>
										)}
									</CardContent>
								)
						}
					</Card>
				</Grid>

				<Grid item xs={12} md={4} lg={3} order={{xs: 1, md: 2}}>
					<Card sx={{height: '100%'}}>
						<CardContent>
							<Grid container spacing={2}>
								<CardHeader title={`${seasonToShow} Season`}/>
								<Pole season={seasonToShow} round={round} size="small"/>
								<FastestLap season={seasonToShow} round={round} size="small"/>
								<Hidden lgUp><Grid item xs={12}/></Hidden>
								<LapLeader season={seasonToShow} round={round} size="small"/>
								<PositionsGained season={seasonToShow} round={round} size="small"/>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
}
