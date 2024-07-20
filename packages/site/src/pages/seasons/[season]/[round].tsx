import {RaceMap, useMapSeasonRacesToMapPoints} from '@/components/app';
import {Laps, PitStops, Qualifying, Results, SprintResults} from '@/components/page/race';
import {FastestLap, LapLeader, Pole, PositionsGained} from '@/components/page/race/stats';
import {OpenAILink, Page, WikipediaLink} from '@/components/ui';
import {Race} from '@/gql/graphql';
import useRace from '@/hooks/data/useRace';
import {apolloClient} from '@/useApolloClient';
import {gql} from '@apollo/client';
import {Link, setPageTitle, TabContent, Tabs} from '@gtibrett/mui-additions';
import {Box, Card, CardContent, CardHeader, CardMedia, Grid, Hidden, Typography} from '@mui/material';

export default function Round(props: { season: string, round: string }) {
	const season                   = Number(props.season);
	const round                    = Number(props.round);
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();
	const race                     = useRace(season, round);
	
	setPageTitle(race ? `Race: ${season} ${race.name}` : 'Race not found');
	
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

export async function getStaticProps({params: {season, round}}: { params: { season: string, round: string, race: Race } }) {
	return {
		props: {
			season, round
		}
	};
}

const AllRacesQuery = gql`
	query AllRacesQuery {
		races {
			year
			round
		}
	}
`;

export async function getStaticPaths() {
	const {data: {races}} = await apolloClient.query<{ races: Race[] }>({query: AllRacesQuery});
	
	const paths = races.map(race => ({
		params: {season: race.year?.toString(), round: race.round?.toString()}
	}));
	
	return {paths, fallback: false};
}