import {RaceMap, useMapSeasonRacesToMapPoints} from '@/components/app';
import {Laps, PitStops, Qualifying, Results, SprintResults} from '@/components/page/race';
import {FastestLap, LapLeader, Pole, PositionsGained} from '@/components/page/race/stats';
import {OpenAILink, Page, WikipediaLink} from '@/components/ui';
import {useSlugs} from '@/helpers';
import {gql, useQuery} from '@apollo/client';
import {Race as RaceT} from '@gtibrett/effone-hub-graph-api';
import {Link, setPageTitle, TabContent, Tabs} from '@gtibrett/mui-additions';
import {Backdrop, Box, Card, CardContent, CardHeader, CardMedia, Grid, Hidden, Typography} from '@mui/material';

const raceQuery = gql`
	#graphql
	query raceBySeasonRound($season: Int!, $round: Int!) {
		races(condition: { year: $season, round: $round }) {
			name
			date
			round
			url
			summary {
				extract
			}
			circuit {
				circuitRef
				name
				location
				country
				lat
				lng
				circuitDescription {
					description
				}
			}
			results {
				driver {
					driverId
				}
				teamId
				grid
				position
				positionText
				positionOrder
				points
				laps
				time
				milliseconds
				fastestLap
				rank
				fastestLapTime
				status {
					status
				}
			}
			sprintResults {
				driver {
					driverId
				}
				teamId
				grid
				position
				positionText
				positionOrder
				points
				laps
				time
				milliseconds
				fastestLap
				fastestLapTime
				status {
					status
				}
			}
		}
	}
`;

export default function Race() {
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();
	const params                   = useSlugs<{ season: string, round: string }>();
	const season                   = Number(params.season);
	const round                    = Number(params.round);
	
	const {data} = useQuery<{
		races: RaceT[]
	}>(raceQuery, {variables: {season: season, round: round}});
	
	if (!season || !round) {
		throw new Error('Page Not found');
	}
	
	const race: RaceT | undefined = data?.races[0];
	
	setPageTitle(race ? `Race: ${season} ${race.name}` : 'Race not found');
	
	if (!race) {
		return <Backdrop open/>;
	}
	
	const circuitDescription            = race?.circuit?.circuitDescription?.description || '';
	const hasResults                    = Number(race.results.length) > 0;
	const seasonToShow                  = hasResults ? season : season - 1;
	const {points, onClick}             = mapSeasonRacesToFeatures(season, [race].map(
		({name, round, circuit, results}) => {
			const {lng, lat} = circuit || {};
			return {name, round, lat, lng, hasResults: results?.length > 0};
		})
	);
	const {results, sprintResults = []} = race;
	
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
			content: <Qualifying season={Number(season)} round={Number(round)}/>
		},
		{
			id:      'laps', label: 'Laps',
			content: <Laps season={Number(season)} round={Number(round)}/>
		},
		{
			id:      'pit-stops', label: 'Pit Stops',
			content: <PitStops season={Number(season)} round={Number(round)}/>
		},
		{
			id:      'circuit', label: 'Circuit',
			content: (
				         <Card>
					         <CardHeader title={<Link href={`/circuits/${race.circuit?.circuitRef}`}>{race.circuit?.name}</Link>}/>
					         <CardMedia><RaceMap points={points} onClick={onClick} height={140} centerOn={{lat: race.circuit?.lat, lng: race.circuit?.lng}} zoom/></CardMedia>
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
			title={race.name}
			subheader={<Typography>Round {race.round}, {(new Date(race.date || '')).toLocaleDateString()}</Typography>}
			extra={<Typography variant="body2">{race.summary?.extract} <Box component="span" display="inline-block"><WikipediaLink href={race.url}/></Box></Typography>}
			action={
				race.circuit && (<Hidden mdDown>
						             <Card>
							             <CardMedia><RaceMap points={points} onClick={onClick} height={140} centerOn={{lat: race.circuit.lat, lng: race.circuit.lng}} zoom/></CardMedia>
							             <CardHeader title={<Link href={`/circuits/${race.circuit.circuitRef}`}>{race.circuit.name}</Link>}/>
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
							? (
								<Tabs active="race" tabs={tabs}/>
							)
							: (
								<CardContent>
									<Typography variant="h5"><Link href={`/circuits/${race.circuit?.circuitRef}`}>{race.circuit?.name}</Link></Typography>
									<Typography variant="h6">{race.circuit?.location}, {race.circuit?.country}</Typography>
									{circuitDescription && (
										<><Typography variant="body2">{circuitDescription}</Typography>
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